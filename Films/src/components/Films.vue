<script lang="ts">
import { defineComponent } from "vue";
import SearchBar from "@/components/SearchBar.vue";
import SortDropdown from "@/components/SortDropdown.vue";
import FilmCard from "@/components/FilmCard.vue";
import { useFilmsStore } from "@/stores/filmsStore";

export default defineComponent({
  name: "MainPage",
  props: ["films"],
  components: {
    SearchBar,
    SortDropdown,
    FilmCard
  },
  data() {
    return {
      sortValue: "По названию",
      searchInput: ""
    };
  },
  computed: {
    storeFilms() {
      return useFilmsStore().films;
    },
    sortedFilms() {
      const val = this.sortValue;
      const films = [...this.films];
      if (val == "По рейтингу") return films.sort((a, b) => b.rating.kp - a.rating.kp);
      else if (val == "По году") return films.sort((a, b) => b.year - a.year);
      else if (val == "По хронометражу") return films.sort((a, b) => a.movieLength - b.movieLength);
      else return films.sort((a, b) => a.name.localeCompare(b.name));
    },
    filteredFilms() {
      return this.sortedFilms.filter((film) => film.name.toLowerCase().includes(this.searchInput.toLowerCase()));
    }
  },
  methods: {
    setSearch(input) {
      this.searchInput = input;
    },
    setSort(value) {
      this.sortValue = value;
    }
  }
});
</script>

<template>
  <div class="container">
    <SearchBar @search="setSearch" />
    <SortDropdown @sort="setSort" />
    <div
      v-if="storeFilms.length==0"
      class="d-flex justify-content-center"
    >
      <div
        class="spinner-border text-white m-5"
        role="status"
      >
        <span class="visually-hidden">Загрузка...</span>
      </div>
    </div>
    <h4
      v-else-if="films.length==0"
      class="text-white text-center"
    >
      Фильмы не найдены
    </h4>
    <h4
      v-else-if="filteredFilms.length==0"
      class="text-white text-center"
    >
      По вашему запросу ничего не найдено
    </h4>
    <div
      v-else
      class="row row-cols-2 row-cols-lg-3 row-cols-xl-4"
    >
      <div
        class="col p-0"
        v-for="film in filteredFilms"
        :key="film._id"
      >
        <FilmCard :film="film" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.spinner-border {
  width: 3rem;
  height: 3rem;
}
</style>
