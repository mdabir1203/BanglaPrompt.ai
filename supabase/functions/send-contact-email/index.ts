import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ContactRequest {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? ""
    );

    const { name, email, subject, message }: ContactRequest = await req.json();

    // Store contact submission in database
    const { data, error: dbError } = await supabase
      .from('contacts')
      .insert([
        {
          name,
          email,
          subject,
          message,
          created_at: new Date().toISOString()
        }
      ]);

    if (dbError) {
      console.error("Database error:", dbError);
      throw new Error("Failed to store contact submission");
    }

    // Send confirmation email to user
    const emailResponse = await resend.emails.send({
      from: "AI Prompt Engineering BD <onboarding@resend.dev>",
      to: [email],
      subject: "আমরা আপনার বার্তা পেয়েছি!",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #2563eb; text-align: center;">ধন্যবাদ, ${name}!</h1>
          <p style="font-size: 16px; line-height: 1.6;">
            আমরা আপনার বার্তা পেয়েছি এবং যত দ্রুত সম্ভব আপনার সাথে যোগাযোগ করব।
          </p>
          <div style="background: #f3f4f6; padding: 20px; margin: 20px 0; border-radius: 8px;">
            <h3 style="margin: 0 0 10px 0; color: #374151;">আপনার বার্তা:</h3>
            <p style="margin: 0; color: #6b7280;"><strong>বিষয়:</strong> ${subject}</p>
            <p style="margin: 10px 0 0 0; color: #6b7280;">${message}</p>
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
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);