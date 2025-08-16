import { copyFileSync, mkdirSync } from "node:fs";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    {
      name: "copy-files",
      writeBundle() {
        copyFileSync("src/manifest.json", "dist/manifest.json");
        copyFileSync("src/main/main.css", "dist/main.css");
        copyFileSync("src/popup/popup.css", "dist/popup.css");
        copyFileSync("src/popup/popup.html", "dist/popup.html");
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
        socket: "./src/socket/socket.ts",
      },
      output: {
        entryFileNames: "[name].js",
      },
      treeshake: false,
    },
  },
});
