import Vue from "vue";
import Router from "vue-router";
import Store from "./store";

Vue.use(Router);

const ifNotAuthenticated = function(to, from, next) {
  if (!Store.getters.isAuthenticated) {
    next();
    return;
  }
  next("/index");
};
const ifAuthenticated = function(to, from, next) {
  if (Store.getters.isAuthenticated) {
    next();
    return;
  }
  next("/login");
};

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
      beforeEnter: ifNotAuthenticated
    },
    {
      path: "/register",
      name: "register",
      component: () => import("./views/Register.vue"),
      beforeEnter: ifNotAuthenticated
    },
    {
      path:"/index",
      name: "index",
      component: () => import("./views/Index.vue"),
      beforeEnter: ifAuthenticated
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
      beforeEnter: ifAuthenticated
    },
    {
      path: "/artists",
      name: "artists",
      component: () => import("./views/Artists.vue"),
      beforeEnter: ifAuthenticated
    },
    {
      path: "/artworks",
      name: "artworks",
      component: () => import("./views/Artworks.vue"),
      beforeEnter: ifAuthenticated
    },
    {
      path: "/messages",
      name: "messages",
      component: () => import("./views/Messages.vue"),
      beforeEnter: ifAuthenticated
    },
    {
      path: "/devtools",
      name: "devtools",
      component: () => import("./views/dev/DevTools.vue"),
      beforeEnter: ifAuthenticated
    }
  ]
});
