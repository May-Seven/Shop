import Vue from "vue";
import App from "./App";
import router from "./router";

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
//导入全局样式表
import "./assets/css/global.css";
import axios from "axios";

import TreeTable from "vue-table-with-tree-grid";
Vue.component("tree-table", TreeTable);
Vue.use(ElementUI);
Vue.config.productionTip = false;

axios.defaults.baseURL = "https://www.liulongbin.top:8888/api/private/v1/";
axios.interceptors.request.use(config => {
  // console.log(config)

  config.headers.Authorization = window.sessionStorage.getItem("token");
  // 在最后必须 return config
  return config;
});

Vue.prototype.$http = axios;

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  render: h => h(App)
});
