import Vue from "vue";
import Router from "vue-router";

const Login = () => import("components/Login");
const Home = () => import("components/Home");
const Welcome = () => import("components/Welcome");
const Users = () => import("components/user/Users.vue");
const Rights = () => import("components/power/Rights");
const Roles = () => import("components/power/Roles");
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
