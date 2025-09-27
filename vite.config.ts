import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
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
        "react-remove-scroll-bar$": path.resolve(
          __dirname,
          "./src/lib/polyfills/react-remove-scroll-bar.tsx",
        ),
        "@supabase/node-fetch": path.resolve(
          __dirname,
          "./src/integrations/supabase/browser-node-fetch.ts",
        ),
      },
    },
    define: {
      global: "globalThis",
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
