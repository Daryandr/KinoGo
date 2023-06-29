<script lang="ts">
import { defineComponent } from "vue";
import { useFilmsStore } from "@/stores/filmsStore";
import FilmCard from "@/components/FilmCard.vue";
import vue3HorizontalList from "vue3-horizontal-list";

export default defineComponent({
  name: "FilmPage",
  components: { FilmCard, vue3HorizontalList },
  props: {
    filmId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      listOptions: {
        responsive: [
          { end: 576, size: 2 },
          { start: 576, end: 768, size: 2 },
          { start: 768, end: 992, size: 3 },
          { start: 992, end: 1200, size: 3 },
          { start: 1200, size: 4 },
          { start: 1400, size: 5 }],
        navigation: {
          start: 0,
          color: "#2E3D54"
        }
      }
    };
  },
  computed: {
    film() {
      return useFilmsStore().getFilm(this.filmId);
    },
    recommendedFilms() {
      return useFilmsStore().recs;
    }
  },
  async beforeCreate() {
    await useFilmsStore().fetchRecs(this.filmId);
  },
  methods: {
    getRatingColor(rating) {
      if (rating > 7) return "text-success";
      else if (rating > 4) return "text-warning";
      else return "text-danger";
    },
    addToFavorites() {
      useFilmsStore().addToFavorites(this.filmId);
    },
    deleteFromFavorites() {
      useFilmsStore().delFromFavorites(this.filmId);
    },
    isFilmLiked() {
      return useFilmsStore().isFilmLiked(this.filmId);
    }
  }
});
</script>

<template>
  <div class="container mt-5 text-white">
    <div
      v-if="!film"
      class="d-flex justify-content-center"
    >
      <div
        class="spinner-border m-5"
        role="status"
      >
        <span class="visually-hidden">Загрузка...</span>
      </div>
    </div>
    <div v-else>
      <div class="row">
        <div class="col-sm-12 col-md-4">
          <img
            :src="film.poster"
            class="img-fluid mb-3"
            alt="Failed to load"
          >
        </div>
        <div class="col-sm-12 col-md-8 ps-4">
          <div class="d-flex justify-content-between mb-3">
            <h1 class="ml-5">{{ film.name }}</h1>
            <i
              class="bi bi-star-fill"
              v-if="isFilmLiked()"
              @click="deleteFromFavorites"
            />
            <i
              class="bi bi-star"
              v-else
              @click="addToFavorites"
            />
          </div>
          <div class="d-flex text">
            <p class="me-4">{{ film.alternativeName }}</p>
            <p class="me-4">
              <i class="bi bi-calendar me-1" />
              {{ film.year }} г.
            </p>
            <p>
              <i class="bi bi-clock me-1" />
              {{ film.movieLength }} мин.
            </p>
          </div>
          <p class="text">{{ film.description }}</p>
          <h4>Рейтинг</h4>
          <div class="text d-flex">
            <div class="d-flex flex-column">
              <div
                class="rating"
                :class="getRatingColor(film.rating.kp)"
              >
                <img
                  src="../assets/pics/kinopoisk-icon.svg"
                  class="rating-img"
                  alt="Failed to load"
                >
                <b>{{ film.rating.kp.toFixed(2) }}</b>
              </div>
              <p class="v-text">{{ film.votes.kp }} оценок</p>
            </div>
            <div class="d-flex flex-column">
              <div
                class="rating"
                :class="getRatingColor(film.rating.kp)"
              >
                <img
                  src="../assets/pics/imdb-logo.svg"
                  class="rating-img"
                  alt="Failed to load"
                >
                <b>{{ film.rating.imdb.toFixed(2) }}</b>
              </div>
              <p class="v-text">{{ film.votes.imdb }} оценок</p>
            </div>
          </div>
          <div v-if="film.watchability">
            <h4>Где смотреть</h4>
            <div class="text d-flex flex-wrap">
              <a
                v-for="watch in film.watchability"
                :key="watch.name"
                :href="watch.url"
                target="_blank"
                class="link mt-3 me-5"
              >
                <img
                  :src="watch.logo"
                  class="rating-img"
                  alt="Failed to load"
                >
                {{ watch.name }}
              </a>
            </div>
          </div>
        </div>
      </div>
      <div
        v-if="recommendedFilms.length!=0"
        class="row mt-5">
        <h3 class="mb-0">Похожие фильмы</h3>
        <vue3-horizontal-list
          :items="recommendedFilms"
          :options="listOptions"
        >
          <template v-slot:default="{ item }">
            <FilmCard :film="item" />
          </template>
        </vue3-horizontal-list>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.spinner-border {
  width: 3rem;
  height: 3rem;
}

.bi-star-fill, .bi-star {
  font-size: 2.4rem;
  color: $secondary;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
}

.text {
  font-size: 1.4rem;
}

.v-text {
  font-size: 1rem;
}

.rating-img {
  width: 3rem;
  height: 3rem;
  margin-right: 0.5rem;
}

.rating {
  padding: 0.3rem;
  margin-right: 3rem;
  border-radius: 0.5rem;
  background-color: $primary;
}

.link {
  text-decoration: none;
  color: white;

  &:hover {
    opacity: 0.9;
  }
}

</style>