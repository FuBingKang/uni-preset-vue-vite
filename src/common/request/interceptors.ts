import store from "@/store";
import { HttpError, HttpResponse } from "uview-plus/libs/luch-request";
import { ACCESS_TOKEN_KEY } from "../utils/accessToken";

const openConsole = true;

/** 请求拦截 */
const requestInterceptors = () => {
  uni.$u.http.interceptors.request.use(
    (config) => {
      const { url, params, data, custom = {} } = config;
      if (openConsole) {
        const dataStr = data ? JSON.stringify(data) : "null";
        const paramsStr = params ? JSON.stringify(params) : "null";
        console.log(
          `请求 ==>【url】${url}【data】${dataStr}【params】${paramsStr}`
        );
      }
      config.header = config.header || {};

      const { auth = true } = custom;
      if (auth) {
        // 开发环境下，使用固定的token，生产环境使用接口返回的token
        if (process.env.NODE_ENV === "production") {
          config.header["access-token"] = uni.getStorageSync(ACCESS_TOKEN_KEY);
        } else {
          // 由于良贾小程序传递的code只能使用一次，开发环境下使用固定的token，或者需要一个没使用过的code作为参数传递进页面，获取新的token
          config.header["access-token"] =
            uni.getStorageSync(ACCESS_TOKEN_KEY) || "";
        }
      }
      
      // 初始化请求拦截器时，会执行此方法，此时data为undefined，赋予默认{}
      config.data = config.data || {};

      return config;
    },
    (
      config // 可使用async await 做异步操作
    ) => Promise.reject(config)
  );
};

const responseConsole = (response: HttpResponse | HttpError) => {
  if (!openConsole) return;
};

/** 响应拦截 */
const responseInterceptors = () => {
  uni.$u.http.interceptors.response.use(
    (response) => {
      responseConsole(response);
      /* 对响应成功做点什么 可使用async await 做异步操作*/
      const data = response.data;
      return data || {};
    },
    (response) => {
      responseConsole(response);
      /*  对响应错误做点什么 （statusCode !== 200）*/
      if (response.statusCode !== 200) {
        uni.$u.toast(`${response.data?.resultMsg || response.data?.error || "请求失败"}`);
      }
      return Promise.reject(response);
    }
  );
};

export { requestInterceptors, responseInterceptors };
