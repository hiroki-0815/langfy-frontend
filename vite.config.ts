import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { NodeGlobalsPolyfillPlugin } from "@esbuild-plugins/node-globals-polyfill";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      // Explicitly alias global for libraries expecting a Node.js environment
      global: "globalThis",
    },
  },
  define: {
    // Ensures that globalThis is recognized as global
    global: "globalThis",
  },
  optimizeDeps: {
    esbuildOptions: {
      // Define global for polyfills
      define: {
        global: "globalThis",
      },
      plugins: [
        // Add polyfills for Node.js modules
        NodeGlobalsPolyfillPlugin({
          process: true,
          buffer: true,
        }),
      ],
    },
  },
  build: {
    rollupOptions: {
      plugins: [
        // Optional: Add Rollup plugin to handle Node.js polyfills
        require("rollup-plugin-polyfill-node")(),
      ],
    },
  },
});
