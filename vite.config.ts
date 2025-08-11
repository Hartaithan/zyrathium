import { copyFileSync, mkdirSync } from "node:fs";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    {
      name: "copy-files",
      writeBundle() {
        copyFileSync("src/manifest.json", "dist/manifest.json");

        mkdirSync("dist/main", { recursive: true });
        copyFileSync("src/main/main.css", "dist/main/main.css");

        mkdirSync("dist/popup", { recursive: true });
        copyFileSync("src/popup/popup.css", "dist/popup/popup.css");
        copyFileSync("src/popup/popup.html", "dist/popup/popup.html");
      },
    },
  ],
  build: {
    outDir: "dist",
    minify: false,
    rollupOptions: {
      input: {
        main: "./src/main/main.ts",
        popup: "./src/popup/popup.ts",
      },
      output: {
        entryFileNames: "[name]/[name].js",
      },
      treeshake: false,
    },
  },
});
