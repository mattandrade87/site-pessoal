import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "/site-pessoal/",
  build: {
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          // Preserva nomes de arquivos PDF
          if (assetInfo.name && assetInfo.name.endsWith(".pdf")) {
            return `assets/[name].[ext]`;
          }
          return `assets/[name]-[hash].[ext]`;
        },
      },
    },
  },
});
