import Vue from "vue";
import Router from "vue-router";

const Login = () => import("components/Login");
const Home = () => import("components/Home");
const Welcome = () => import("components/Welcome");
const Users = () => import("components/user/Users.vue");
const Rights = () => import("components/power/Rights");
const Roles = () => import("components/power/Roles");
const Cate = () => import("components/goods/Cate");
const Params=()=>import("components/goods/Params");
const List = () => import("components/goods/List");
const Add = () => import("components/goods/Add");
const Order=()=>import("components/order/Order")
Vue.use(Router);

const router = new Router({
  routes: [
    { path: "/Login", component: Login },
    { path: "/", redirect: "/Login" },
    {
      path: "/Home",
      component: Home,
      redirect: "/Welcome",
      children: [
        {
          path: "/Welcome",
          component: Welcome
        },
        {
          path: "/users",
          component: Users
        },
        {
          path: "/Rights",
          component: Rights
        },
        {
          path: "/Roles",
          component: Roles
        },
        {
          path: "/categories",
          component: Cate
        },
        {
          path: "/Params",
          component: Params
        },
        {
          path: "/goods",
          component: List
        },
        {
          path: "/goods/add",
          component: Add
        },
        {
          path: "/orders",
          component:Order
        }
      ]
    }
  ],
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
