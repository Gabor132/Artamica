import Vue from "vue";
import Router from "vue-router";
import { authGuard } from "./auth/authGuard";

Vue.use(Router);

export default new Router({
  //mode: "history",
  routes: [
    {
      path: "/",
      redirect: "/login",
      meta: {
        title: process.env.VUE_APP_TITLE
      }
    },
    {
      path: "/login",
      name: "login",
      component: () => import("./views/Login.vue"),
    },
    {
      path: "/register",
      name: "register",
      component: () => import("./views/Register.vue"),
    },
    {
      path:"/index",
      name: "index",
      component: () => import("./views/Index.vue"),
      beforeEnter: authGuard
    },
    {
      path: "/about",
      name: "about",
      component: () => import("./views/About.vue")
    },
    {
      path: "/profile",
      name: "profile",
      component: () => import("./views/Profile.vue"),
      beforeEnter: authGuard
    },
    {
      path: "/artists",
      name: "artists",
      component: () => import("./views/Artists.vue"),
      beforeEnter: authGuard
    },
    {
      path: "/artworks",
      name: "artworks",
      component: () => import("./views/Artworks.vue"),
      beforeEnter: authGuard
    },
    {
      path: "/messages",
      name: "messages",
      component: () => import("./views/Messages.vue"),
      beforeEnter: authGuard
    },
    {
      path: "/devtools",
      name: "devtools",
      component: () => import("./views/dev/DevTools.vue"),
      beforeEnter: authGuard
    }
  ]
});
