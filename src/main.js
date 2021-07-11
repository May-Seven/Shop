import Vue from "vue";
import App from "./App";
import router from "./router";

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
//导入全局样式表
import "./assets/css/global.css";
import axios from "axios";

import TreeTable from "vue-table-with-tree-grid";

// 导入富文本编辑器
import VueQuillEditor from "vue-quill-editor";
// 导入富文本编辑器样式
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

import NProgress from "nprogress";
import "nprogress/nprogress.css";

Vue.component("tree-table", TreeTable);
Vue.use(ElementUI);
// 全局注册富文本编辑器
Vue.use(VueQuillEditor);
Vue.config.productionTip = false;

axios.defaults.baseURL = "https://www.liulongbin.top:8888/api/private/v1/";
axios.interceptors.request.use(config => {
  // console.log(config)
  NProgress.start();
  config.headers.Authorization = window.sessionStorage.getItem("token");
  // 在最后必须 return config
  return config;
});

axios.interceptors.response.use(config => {
  NProgress.done();
  return config
});

Vue.prototype.$http = axios;
Vue.filter("dataFormat", function(originval) {
  const dt = new Date(originval * 1000);
  const y = dt.getFullYear();
  const m = (dt.getMonth() + 1 + "").padStart(2, "0");
  const d = (dt.getDate() + "").padStart(2, "0");

  const hh = (dt.getHours() + "").padStart(2, "0");
  const mm = (dt.getMinutes() + "").padStart(2, "0");
  const ss = (dt.getSeconds() + "").padStart(2, "0");
  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`;
});

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  render: h => h(App)
});
