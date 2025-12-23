// 引入拦截器配置
import { requestInterceptors, responseInterceptors } from "./interceptors";

//  初始化请求配置
const initRequest = () => {
  uni.$u.http.setConfig((defaultConfig) => {
    /* defaultConfig 为默认全局配置 */
    // 生产环境下使用生产环境的baseURL
    if (process.env.NODE_ENV === "production") {
      defaultConfig.baseURL =
        window.location.protocol + "//" + window.location.host; /* 根域名 */
    }
    return defaultConfig;
  });
  requestInterceptors();
  responseInterceptors();
};
export { initRequest };
