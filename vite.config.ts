import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.NODE_ENV === "development" ? "/" : process.env.VITE_BASE_PATH || "/",
  optimizeDeps: {
    entries: ["src/main.tsx"],
  },
  plugins: [
    react()
  ],
  resolve: {
    preserveSymlinks: true,
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 5173,
    strictPort: true,
    host: true,
    allowedHosts: true,
  },
  build: {
    // Limit concurrent operations to avoid pipe errors
    minify: 'esbuild',
    target: 'esnext',
    cssTarget: 'chrome61',
    rollupOptions: {
      maxParallelFileOps: 1,
      output: {
        manualChunks: undefined
      }
    }
  },
  define: {
    'import.meta.env._VITE_MAX_CONCURRENCY': 1
  }
});