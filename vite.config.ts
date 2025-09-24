import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const supabaseUrl = env.SUPABASE_URL ?? env.VITE_SUPABASE_URL ?? "";
  const supabaseAnonKey = env.SUPABASE_ANON_KEY ?? env.VITE_SUPABASE_ANON_KEY ?? "";

  return {
    server: {
      host: "::",
      port: 8080,
    },
    plugins: [
      react(),
      mode === 'development'
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    define: {
      "import.meta.env.SUPABASE_URL": JSON.stringify(supabaseUrl),
      "import.meta.env.SUPABASE_ANON_KEY": JSON.stringify(supabaseAnonKey),
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes("node_modules")) {
              // Keeping React in the default vendor chunk avoids circular
              // imports between custom chunks that caused React to be
              // undefined during runtime. This prevents "createContext" errors
              // in the production bundle.
              if (id.includes("radix-ui")) return "radix-ui";
              if (id.includes("@tanstack")) return "tanstack";
              return "vendor";
            }
          },
        },
      },
    },
  };
});
