import request from "@/utils/request";
import axios from "axios";

import Cookies from "js-cookie";
import { Message } from "element-ui";
import store from "@/store";
import router from "@/router";

const service = axios.create({
  baseURL: `${window.location.origin}`, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
});

service.interceptors.request.use(
  async config => {
    store.dispatch("loading/setLoading", true);
    return config;
  },
  error => {
    store.dispatch("loading/setLoading", false);
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  response => {
    store.dispatch("loading/setLoading", false);
    const code = response.data.code || response.status || response.code || {};
    switch (+code) {
      case 404:
        Message({
          type: "error",
          message: response.data.msg
        });
        break;
      case 403:
        Message({
          type: "error",
          message: response.data.msg
        });
        store.dispatch("loading/setLoading", false);
        break;
      case 402:
        Message({
          type: "error",
          message: response.data.msg
        });
        break;
      case 500:
        Message({
          type: "waring",
          message: response.data.msg
        });
        store.dispatch("loading/setLoading", false);
        break;
      case 411:
        Message({
          type: "waring",
          message: response.data.msg
        });
        store.dispatch("loading/setLoading", false);
        break;
      case 501:
        Message({
          type: "waring",
          message: response.data.msg
        });
        store.dispatch("loading/setLoading", false);
        break;
      case 400:
        Message({
          type: "waring",
          message: response.message
        });
        store.dispatch("loading/setLoading", false);
        break;
      case 401:
        Message({
          type: "waring",
          message: response.data.msg
        });
        sessionStorage.removeItem("Token");
        return router.push("/login");
        break;
      case 200:
        return response.data;
        break;
      case 504:
        return response.data;
        break;
      default:
    }
  },
  error => {
    store.dispatch("loading/setLoading", false);
    const status = error.response.status || error.code || {};
    switch (+status) {
      case 401:
        store.dispatch("loading/setLoading", false);
        Cookies.set("Admin-Token", "");
        sessionStorage.removeItem("Token");
        return router.push("/login");
        break;
      case 406:
        store.dispatch("loading/setLoading", false);
        Cookies.set("Admin-Token", "");
        sessionStorage.removeItem("Token");
        return router.push("/login");
        break;

      case 411:
        Message({
          type: "waring",
          message: response.message
        });
        store.dispatch("loading/setLoading", false);
        break;
      case 400:
        Message({
          type: "waring",
          message:
            error.response.data.error_description || error.response.data.msg
        });
        store.dispatch("loading/setLoading", false);
        sessionStorage.removeItem("Token");
        return router.push("/login");
      default:
        store.dispatch("loading/setLoading", false);
        Message({
          type: "waring",
          message: response.message
        });
    }
  }
);
// import Qs from "qs";

export function login(data) {
  return service({
    url: "/server/base/oauth/token",
    headers: {
      "User-Type": "Gov_User",
      Authorization: "Basic Y29zbW9wbGF0OmNvc21vcGxhdF9zZWNyZXQ=",
      "Captcha-Key": data.key,
      "Captcha-Code": data.code
    },
    method: "post",
    data: data.show
  });
}

export function getInfo(data) {
  return request({
    url: "/server/grid/menuRole/loadCodesByUser",
    // url:'http://rap2.taobao.org:38080/app/mock/data/1673099',
    method: "post",
    data
  });
}

export function logout() {
  return request({
    url: "/vue-element-admin/user/logout",
    method: "post"
  });
}

export const getAllDept = async data => {
  return request({
    url: "/server/staff/department/loadAllBySelect",
    method: "get",
    params: data
  });
};

export const getUserObject = async data => {
  return request({
    url: "/server/grid/userInfo/loadCurrentInfo",
    method: "get",
    params: data
  });
};
