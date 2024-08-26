import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  root: "web",
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "web/index.html"),
      },
      output: {
        dir: resolve(__dirname, "./dist"),
      },
    },
  },

  server: {
    open: "./index.html",
  },
});
