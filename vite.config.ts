import react from "@vitejs/plugin-react"
import svgr from "vite-plugin-svgr";
import { defineConfig } from "vite"
import path from "path"
 
export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})