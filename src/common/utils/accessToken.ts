import store from "@/store";
import queryString from "qs";
import { getAccessTokenByCode } from "../request/http.api";
export const USER_CODE_KEY = "code";
export const ACCESS_TOKEN_KEY = "accessToken";

// 存储新的code和获取新的accessToken的方法
const setCodeAndAccessToken = async (code: string) => {
  uni.setStorageSync(USER_CODE_KEY, code);
  // 调用登录接口获取token
  const res = await getAccessTokenByCode({ code });
  const merchantAppAccessToken = res.data?.merchantAppAccessToken || "";
  if (!merchantAppAccessToken) return;
  uni.setStorageSync(ACCESS_TOKEN_KEY, merchantAppAccessToken);
};

// 根据code获取accessToken
export const getAccessTokenByCodeFromUrl = async () => {
  const urlParams = (() => {
    let res: Record<string, any> = {};
    const search = window?.location?.search || "";
    const hash = window?.location?.hash || "";

    if (search) {
      const params = search.replace("?", "");
      res = {
        ...res,
        ...queryString.parse(params),
      };
    }

    if (hash) {
      const [, params] = hash.split("?");
      res = {
        ...res,
        ...queryString.parse(params),
      };
    }
    return res;
  })();
  // 如果当前传递进来的code和存储的code不一致，则调用登录接口重新获取token
  const urlCode = urlParams[USER_CODE_KEY] || "";
  if (urlCode) {
    // 比较当前传递进来的code和存储的code是否一致
    if (urlCode == store.state.code) {
      // 如果没有token则调用登录接口
      if (!store.state.accessToken) {
        await setCodeAndAccessToken(urlCode);
      }
    } else {
      // 如果传递的code值与本地存储的code值不相等，则调用登录接口重新获取token
      await setCodeAndAccessToken(urlCode);
    }
  }
};
