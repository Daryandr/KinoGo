import { defineStore } from "pinia";
import type { Film } from "@/types/main";
import axios from "axios";

export const useFilmsStore = defineStore("films", {
  state: () => ({
    films: [] as Film[]
  }),
  getters: {
    getFilm: (state) => (filmId: string) => {
      return state.films.find((film) => film._id === filmId);
    },
    filmsByName: state => {
      return state.films.sort((a, b) => a.name.localeCompare(b.name));
    },
    filmsByRating: state => {
      return state.films.sort((a, b) => b.rating.kp - a.rating.kp);
    },
    filmsByYear: state => {
      return state.films.sort((a, b) => b.year - a.year);
    },
    filmsByTime: state => {
      return state.films.sort((a, b) => a.movieLength - b.movieLength);
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
    }
  }
});