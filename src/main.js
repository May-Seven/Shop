import Vue from "vue";
import App from "./App";
import router from "./router";

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
//导入全局样式表
import "./assets/css/global.css";
import axios from 'axios'
Vue.use(ElementUI);
Vue.config.productionTip = false;

axios.defaults.baseURL = "http://test.qhhz.xyz:8888/api/private/v1/";

Vue.prototype.$http = axios;


/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  render: h => h(App)
});
