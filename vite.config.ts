import { copyFileSync, mkdirSync } from "node:fs";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    {
      name: "copy-files",
      writeBundle() {
        copyFileSync("src/manifest.json", "dist/manifest.json");
        copyFileSync("src/main/main.css", "dist/main.css");
      },
    },
  ],
  build: {
    outDir: "dist",
    minify: false,
    rollupOptions: {
      input: {
        main: "./src/main/main.ts",
      },
      output: {
        entryFileNames: "[name].js",
      },
      treeshake: false,
    },
  },
});
