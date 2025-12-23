// @ts-ignore
import { http as uviewHttp } from "uview-plus";
import HttpRequest, {
  HttpRequestConfig as LuchHttpRequestConfig,
} from "uview-plus/libs/luch-request/index";

interface HttpRequestConfig extends LuchHttpRequestConfig {
  custom?: {
    auth?: boolean;
  };
}

const http: HttpRequest = uviewHttp;

// 如果是开发环境，设置api代理前缀
// 开发环境
let api = "";
if (import.meta.env.DEV) {
  api = "/api";
} else {
  api = "";
}

// get请求，注意：get请求的配置等，都在第二个参数中，
export const checkStatus = (data: { shop_static_code_id: any }) => {
  return http.get(
    `${api}/cashier-app/v1/shopstaticcode/${
      data.shop_static_code_id ? `${data.shop_static_code_id}/` : ""
    }checkStatus`
  );
};
// 创建购物单并获取收银台页面地址
export const shopListAdd = (params: any, config: HttpRequestConfig = {}) =>
  http.post(
    `${api}/cashier-app/v1/shopstaticcode/shoplist/add`,
    params,
    config
  );

// 检查是否有待支付的订单
export const unpaidOrder = (
  params: { orderApp: string; consumerCode: any; sellerCode: any },
  config: HttpRequestConfig = {}
) =>
  http.post(
    `${api}/cashier-app/v1/shopstaticcode/shop/unpaidOrder`,
    params,
    config
  );

// 检查店铺有效
export const validate = (
  params: { bizApp: any; shopCode: any },
  config: HttpRequestConfig = {}
) =>
  http.post(
    `${api}/cashier-app/v1/shopstaticcode/shop/validate`,
    params,
    config
  );

// post请求
// 查询商户的销售订单列表
export const queryOrderPage = (params: any, config: HttpRequestConfig = {}) =>
  http.post(
    `${api}/merchant/application/v1/shop/static-code/order/queryPage`,
    params,
    config
  );

// 查询商户的退货订单列表
export const returnOrder = (params: any, config: HttpRequestConfig = {}) =>
  http.post(
    `${api}/merchant/application/v1/shop/static-code/returnOrder/queryPage`,
    params,
    config
  );

// 查询商户的销售业绩汇总
export const querySalesSummary = (
  params: any,
  config: HttpRequestConfig = {}
) =>
  http.post(
    `${api}/merchant/application/v1/shop/static-code/salesSummary/query`,
    params,
    config
  );
// 查询商户的退货申请单列表
export const returnOrderApply = (params: any, config: HttpRequestConfig = {}) =>
  http.post(
    `${api}/merchant/application/v1/shop/static-code/returnOrderApply/queryPage`,
    params,
    config
  );

  // 查询商户的销售订单详情
export const salesOrderDetail = (params: any, config: HttpRequestConfig = {}) =>
  http.post(
    `${api}/merchant/application/v1/shop/static-code/order/queryDetail`,
    params,
    config
  );

  // 查询商户的退货订单详情
export const returnOrderDetail = (params: any, config: HttpRequestConfig = {}) =>
  http.post(
    `${api}/merchant/application/v1/shop/static-code/returnOrder/queryDetail`,
    params,
    config
  );
  
  // 查询商户的退货申请单详情
export const returnOrderApplyDetail = (params: any, config: HttpRequestConfig = {}) =>
  http.post(
    `${api}/merchant/application/v1/shop/static-code/returnOrderApply/queryDetail`,
    params,
    config
  );

// 通过一点万象token登录
export const loginYdwx = (params: any, config = {}) =>
  http.post(`${api}/cashier-app/v1/login/ydwx`, params, config);

// 通过良贾code获取商户后端Token Copy
export const getAccessTokenByCode = (
  params: { code: string },
  config: HttpRequestConfig = {
    custom: { auth: false },
  }
) => {
  return http.post(`${api}/merchant/application/v1/shop/static-code/getUserToken`, params, config);
};

// 获取商场名、店铺名、商品名
export const queryShoplistParams = (params: any, config = {}) =>
  http.post(`${api}/cashier-app/v1/shopstaticcode/queryShoplistParams`, params, config);

// 退货申请单预查询
export const returnOrderApplyPreCheck = (params: any, config = {}) =>
  http.post(`${api}/merchant/application/v1/shop/static-code/returnOrderApply/preCheck`, params, config);

// 退货申请单创建
export const returnOrderApplyApply = (params: any, config = {}) =>
  http.post(`${api}/merchant/application/v1/shop/static-code/returnOrderApply/apply`, params, config);
