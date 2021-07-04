import Vue from "vue";
import Router from "vue-router";


const Login = () => import ("components/Login");
const Home = () => import ("components/Home");
  
Vue.use(Router);

const router = new Router({
  routes: [
    {path: "/Login",component: Login},
    {path: "/",redirect: "/Login"},
    {path: "/Home", component: Home}],
  mode: "history"
});

//挂载路由导航守卫
router.beforeEach((to, from, next) => {
  if (to.path === "/login") return next();
  const tokenStr = window.sessionStorage.getItem("token");
  if (!tokenStr) return next("/login");
  next();
});

export default router;
