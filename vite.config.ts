import { defineConfig } from "vite";
import uni from "@dcloudio/vite-plugin-uni";
import https from 'https';
import { constants } from 'crypto';

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.NODE_ENV === "production" ? "/staticcodecard-h5/" : "/",
  plugins: [uni()],
  css: {
    preprocessorOptions: {
      scss: {
        // 取消sass废弃API的报警
        silenceDeprecations: ["legacy-js-api", "color-functions", "import"],
      },
    },
  },
  server: {
    proxy: {
      "/api/": {
        target: "https://dtp-test.crland.com.cn/",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
        agent: new https.Agent({
          secureOptions: constants.SSL_OP_ALLOW_UNSAFE_LEGACY_RENEGOTIATION
        })
      },
    },
  },
});
