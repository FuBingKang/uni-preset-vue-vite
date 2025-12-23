import { createStore } from "vuex";
import { ACCESS_TOKEN_KEY, USER_CODE_KEY } from "@/common/utils/accessToken";

type ThemeType = "theme-one" | "theme-two" | "theme-three";

export default createStore({
  state: {
    themeType: (uni.getStorageSync("themeType") || "theme-one") as ThemeType,
    // token
    accessToken: uni.getStorageSync(ACCESS_TOKEN_KEY) || "",
    // 第三方传递过来的code
    code: uni.getStorageSync(USER_CODE_KEY) || "",
  },
  mutations: {},
  actions: {
  },
});
