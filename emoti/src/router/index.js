import Vue from "vue";
import VueRouter from "vue-router";
import LandingPage from "../views/LandingPage.vue";
import Home from "../views/Home.vue";
import Activities from "../views/Activities.vue";
import Activity from "../views/Activity.vue";
import Profile from "../views/Profile.vue";
import ActivitiesP from "../views/ActivitiesP.vue";
import Class from "../views/Class.vue"
import ManagerUser from "../views/ManagerUser.vue"
import ManagerActivities from "../views/ManagerActivities.vue"

import store from "../store/index.js";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "LandingPage",
    component: LandingPage,
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/activities",
    name: "Activities",
    component: Activities,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path:"/activities/:activityName",
    name: "Activity",
    component: Activity,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path:"/profile",
    name:"Profile",
    component: Profile,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path:"/myactivities",
    name:"Activities P.",
    component: ActivitiesP,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path:"/class",
    name:"Class",
    component: Class,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path:"/manageruser",
    name:"ManagerUser",
    component:ManagerUser,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path:"/manageractivities",
    name:"ManagerActivities",
    component:ManagerActivities,
    meta: {
      requiresAuth: true,
    },
  }

];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !store.getters.getLoggedUser) {
    next({ name: "LandingPage" });
  } else {
    next();
  }
});
export default router;
