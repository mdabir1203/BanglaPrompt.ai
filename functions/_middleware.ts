// Only expose keys that are safe to ship to the browser bundle.
const PUBLIC_ENV_KEYS = [
  "SUPABASE_URL",
  "SUPABASE_ANON_KEY",
] as const;

type PublicEnvKey = (typeof PUBLIC_ENV_KEYS)[number];

type EnvRecord = Record<string, string | undefined>;

type MiddlewareContext = {
  request: Request;
  env: EnvRecord;
  next: () => Promise<Response>;
};

const createRuntimeEnvScript = (env: EnvRecord): string | null => {
  const payload: Partial<Record<PublicEnvKey, string>> = {};

  for (const key of PUBLIC_ENV_KEYS) {
    const value = env[key];

    if (typeof value === "string" && value.length > 0) {
      payload[key] = value;
    }
  }

  if (Object.keys(payload).length === 0) {
    return null;
  }

  const json = JSON.stringify(payload).replace(/</g, "\\u003c");

  return `(() => {\n  const existing = typeof window !== "undefined" && window.__ENV__ ? window.__ENV__ : {};\n  const update = Object.assign({}, ${json});\n  const nextEnv = { ...existing, ...update };\n\n  if (typeof window !== "undefined") {\n    window.__ENV__ = nextEnv;\n  }\n\n  try {\n    // eslint-disable-next-line @typescript-eslint/no-explicit-any\n    (globalThis as any).__ENV__ = nextEnv;\n  } catch (_) {\n    // Swallow errors when assigning to immutable globals.\n  }\n})();`;
};

export const onRequest = async (context: MiddlewareContext): Promise<Response> => {
  const response = await context.next();
  const contentType = response.headers.get("content-type") ?? "";

  if (!contentType.includes("text/html")) {
    return response;
  }

  const runtimeEnvScript = createRuntimeEnvScript(context.env);

  if (!runtimeEnvScript) {
    return response;
  }

  const rewriter = new HTMLRewriter().on("head", {
    element(element) {
      element.append(`\n<script data-runtime-env="supabase">${runtimeEnvScript}\n</script>\n`, {
        html: true,
      });
    },
  });

  return rewriter.transform(response);
};
