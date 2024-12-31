import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // Tambahkan konfigurasi server di sini
  server: {
    proxy: {
      "/api": "http://127.0.0.1:5000",
    },
  },
});
