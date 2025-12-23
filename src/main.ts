import { createSSRApp } from "vue";
import store from "./store/index"; // 引入store文件
import App from "./App.vue";
import uviewPlus from "uview-plus";
import { initRequest } from "./common/request/index";
export function createApp() {
  const app = createSSRApp(App);
  app.use(store);

  app.use(uviewPlus, () => {
    return {
      options: {
        // 修改$u.config对象的属性
        config: {
          // 修改默认单位为rpx，相当于执行 uni.$u.config.unit = 'rpx'
          unit: "rpx",
        },
      },
    };
  });

  // 引入请求封装
  initRequest();

  return {
    app,
  };
}
