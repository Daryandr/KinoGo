import { defineStore } from 'pinia'
import type { Film } from '@/types/main'
import axios from 'axios'

export const useFilmsStore = defineStore('films', {
  state: () => ({
    films:[] as Film[]
  }),
  getters: {
    getFilm: (state) => (filmId: string) => {
      return state.films.find((film) => film._id === filmId)
    }
  },
  actions: {
    async getFilms() {
      try {
        this.films = await axios.get('http://localhost:8081/list');
      } catch (error) {
        console.error(error);
      }
    }
  },
})