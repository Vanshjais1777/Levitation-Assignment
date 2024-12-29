import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist", // Ensure the output directory is 'dist'
  },
  server: {
    proxy: {
      "/api": "http://localhost:4000", // Forward API requests to the backend
    },
  },
});
