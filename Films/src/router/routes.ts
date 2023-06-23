import HomeView from "@/views/HomeView.vue";
import type { RouteRecordRaw } from "vue-router";
import FilmView from "@/views/FilmView.vue";

export const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView
  },
  {
    path: "/film/:id",
    name: "film",
    component: FilmView,
    props: true
  }
];