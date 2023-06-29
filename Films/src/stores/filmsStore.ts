import { defineStore } from "pinia";
import type { Film } from "@/types/main";
import axios from "axios";

export const useFilmsStore = defineStore("films", {
  state: () => ({
    films: [] as Film[],
    recs: [] as Film[],
    favorites: [] as string[]
  }),
  getters: {
    getFilm: (state) => (filmId: string) => {
      return state.films.find((film) => film._id === filmId);
    },
    getFavorites: state => {
      return state.films.filter(film => state.favorites.indexOf(film._id) != -1);
    }
  },
  actions: {
    async fetchFilms() {
      try {
        const response = await axios.get("http://localhost:8081/list");
        this.films = response.data;
      } catch (error) {
        console.error(error);
      }
      this.fetchFavorites();
    },
    async fetchRecs(id: string) {
      try {
        const response = await axios.get(`http://localhost:8081/recs/${id}`);
        this.recs = response.data;
      } catch (error) {
        console.error(error);
      }
    },
    fetchFavorites() {
      const favs = localStorage.getItem("favorites");
      if (favs != null) {
        this.favorites = JSON.parse(favs);
      }
    },
    addToFavorites(id: string) {
      this.favorites.push(id);
      localStorage.setItem("favorites", JSON.stringify(this.favorites));
    },
    delFromFavorites(id: string) {
      const index = this.favorites.indexOf(id);
      if (index > -1) {
        this.favorites.splice(index, 1);
        localStorage.setItem("favorites", JSON.stringify(this.favorites));
      }
    },
    isFilmLiked(id: string): boolean {
      return this.favorites.indexOf(id) > -1;
    }
  }
});