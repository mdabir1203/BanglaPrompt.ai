import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { Resend } from "npm:resend@2.0.0";
import { z } from "npm:zod@3.23.8";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const ALLOWED_ORIGINS = new Set([
  "https://promptbazaar.ai",
  "https://www.promptbazaar.ai",
  "https://promptbazaar-ai.pages.dev",
]);

const RATE_LIMIT_MAX_REQUESTS = 3;
const RATE_LIMIT_WINDOW_MINUTES = 15;

const DEFAULT_HEADERS = {
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  Vary: "Origin",
};

const createCorsHeaders = (origin: string | null) => {
  if (origin && ALLOWED_ORIGINS.has(origin)) {
    return {
      ...DEFAULT_HEADERS,
      "Access-Control-Allow-Origin": origin,
    };
  }

  return null;
};

class HttpError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = "HttpError";
  }
}

const ContactRequestSchema = z
  .object({
    name: z.string().trim().min(2, "Name must be at least 2 characters long").max(100, "Name must be at most 100 characters long"),
    email: z.string().trim().email("A valid email address is required").max(254, "Email must be at most 254 characters long"),
    subject: z.string().trim().min(3, "Subject must be at least 3 characters long").max(150, "Subject must be at most 150 characters long"),
    message: z.string().trim().min(10, "Message must be at least 10 characters long").max(2000, "Message must be at most 2000 characters long"),
  })
  .strict();

const escapeHtml = (unsafe: string) =>
  unsafe.replace(/[&<>"']/g, (char) => {
    switch (char) {
      case "&":
        return "&amp;";
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case '"':
        return "&quot;";
      case "'":
        return "&#39;";
      default:
        return char;
    }
  });

const handler = async (req: Request): Promise<Response> => {
  const origin = req.headers.get("origin");
  const corsHeaders = createCorsHeaders(origin);

  if (req.method === "OPTIONS") {
    if (!corsHeaders) {
      return new Response("Forbidden", {
        status: 403,
        headers: {
          ...DEFAULT_HEADERS,
          "Content-Type": "text/plain",
        },
      });
    }

    return new Response(null, { status: 204, headers: corsHeaders });
  }

  try {
    if (!corsHeaders) {
      throw new HttpError(403, "Origin not allowed");
    }

    if (req.method !== "POST") {
      throw new HttpError(405, "Method not allowed");
    }

    const contentType = req.headers.get("content-type");
    if (!contentType || !contentType.toLowerCase().includes("application/json")) {
      throw new HttpError(415, "Unsupported content type");
    }

    let payload: unknown;
    try {
      payload = await req.json();
    } catch (error) {
      console.error("Failed to parse JSON body", error);
      throw new HttpError(400, "Invalid JSON payload");
    }

    const validationResult = ContactRequestSchema.safeParse(payload);
    if (!validationResult.success) {
      const validationMessage = validationResult.error.issues
        .map((issue) => `${issue.path.join(".") || "field"}: ${issue.message}`)
        .join("; ");
      throw new HttpError(400, `Validation failed: ${validationMessage}`);
    }

    const data = validationResult.data;

    const sanitized = {
      name: escapeHtml(data.name),
      email: escapeHtml(data.email),
      subject: escapeHtml(data.subject),
      message: escapeHtml(data.message),
    };

    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY");

    if (!supabaseUrl || !supabaseAnonKey) {
      console.error("Missing Supabase environment configuration");
      throw new Error("Service configuration error");
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    const windowStartIso = new Date(
      Date.now() - RATE_LIMIT_WINDOW_MINUTES * 60 * 1000
    ).toISOString();

    const { count: recentSubmissions, error: rateLimitError } = await supabase
      .from("contacts")
      .select("id", { count: "exact", head: true })
      .eq("email", sanitized.email)
      .gte("created_at", windowStartIso);

    if (rateLimitError) {
      console.error("Rate limit lookup failed:", rateLimitError);
      throw new Error("Unable to verify submission quota");
    }

    if ((recentSubmissions ?? 0) >= RATE_LIMIT_MAX_REQUESTS) {
      console.warn(
        "Rate limit exceeded for email",
        sanitized.email,
        `within ${RATE_LIMIT_WINDOW_MINUTES} minutes`
      );
      throw new HttpError(429, "Too many submissions. Please try again later.");
    }

    // Store contact submission in database
    const { error: dbError } = await supabase
      .from("contacts")
      .insert([
        {
          name: sanitized.name,
          email: sanitized.email,
          subject: sanitized.subject,
          message: sanitized.message,
          created_at: new Date().toISOString(),
        },
      ]);

    if (dbError) {
      console.error("Database error:", dbError);
      throw new Error("Failed to store contact submission");
    }

    const messageForEmail = sanitized.message.replace(/\n/g, "<br />");

    // Send confirmation email to user
    const emailResponse = await resend.emails.send({
      from: "AI Prompt Engineering BD <onboarding@resend.dev>",
      to: [sanitized.email],
      subject: "আমরা আপনার বার্তা পেয়েছি!",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #2563eb; text-align: center;">ধন্যবাদ, ${sanitized.name}!</h1>
          <p style="font-size: 16px; line-height: 1.6;">
            আমরা আপনার বার্তা পেয়েছি এবং যত দ্রুত সম্ভব আপনার সাথে যোগাযোগ করব।
          </p>
          <div style="background: #f3f4f6; padding: 20px; margin: 20px 0; border-radius: 8px;">
            <h3 style="margin: 0 0 10px 0; color: #374151;">আপনার বার্তা:</h3>
            <p style="margin: 0; color: #6b7280;"><strong>বিষয়:</strong> ${sanitized.subject}</p>
            <p style="margin: 10px 0 0 0; color: #6b7280;">${messageForEmail}</p>
          </div>
          <p style="font-size: 14px; color: #6b7280; text-align: center;">
            AI Prompt Engineering BD টিম<br>
            বাংলাদেশের AI শিক্ষার ভবিষ্যৎ গড়ছি
          </p>
        </div>
      `,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true, emailResponse }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: unknown) {
    if (error instanceof HttpError) {
      console.warn("Handled error in send-contact-email function:", error.message);
      return new Response(JSON.stringify({ error: error.message }), {
        status: error.status,
        headers: {
          "Content-Type": "application/json",
          ...(corsHeaders ?? DEFAULT_HEADERS),
        },
      });
    }

    const message = error instanceof Error ? error.message : String(error);
    console.error("Unexpected error in send-contact-email function:", error);
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
        ...(corsHeaders ?? DEFAULT_HEADERS),
      },
    });
  }
};

serve(handler);
