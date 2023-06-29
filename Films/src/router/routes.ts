import HomeView from "@/views/HomeView.vue";
import type { RouteRecordRaw } from "vue-router";
import FilmView from "@/views/FilmView.vue";
import FavoritesView from "@/views/FavoritesView.vue";

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
  },
  {
    path: "/favorites",
    name: "favorites",
    component: FavoritesView
  },
];