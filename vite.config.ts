import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.VITE_BASENAME || "/",
  plugins: [react(), svgr()],
  server: {
    host: "localhost",
    port: 3000,
    open: true,
  },
});
