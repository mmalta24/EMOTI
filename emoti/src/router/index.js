import Vue from "vue";
import VueRouter from "vue-router";
import LandingPage from "../views/LandingPage.vue";
import Home from "../views/Home.vue";
import Activities from "../views/Activities.vue";
import Activity from "../views/Activity.vue";
import Profile from "../views/Profile.vue";
import ActivitiesP from "../views/ActivitiesP.vue";
import Class from "../views/Class.vue"

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
  },
  {
    path: "/activities",
    name: "Activities",
    component: Activities
  },
  {
    path:"/activities/:activityName",
    name: "Activity",
    component: Activity
  },
  {
    path:"/profile",
    name:"Profile",
    component: Profile
  },
  {
    path:"/myactivities",
    name:"Activities P.",
    component: ActivitiesP,
  },
  {
    path:"/class",
    name:"Class",
    component: Class
  }

];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
