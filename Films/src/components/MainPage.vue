<script lang="ts">
import { defineComponent } from "vue";
import { useFilmsStore } from "@/stores/filmsStore";
import SearchBar from "@/components/SearchBar.vue";
import SortDropdown from "@/components/SortDropdown.vue";
import FilmCard from "@/components/FilmCard.vue";

export default defineComponent({
  name: "MainPage",
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
    sortedFilms() {
      const val = this.sortValue;
      if (val == "По рейтингу") return useFilmsStore().filmsByRating;
      else if (val == "По году") return useFilmsStore().filmsByYear;
      else if (val == "По хронометражу") return useFilmsStore().filmsByTime;
      else return useFilmsStore().filmsByName;
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
      v-if="sortedFilms.length==0"
      class="d-flex justify-content-center"
    >
      <div
        class="spinner-border text-white m-5"
        role="status"
      >
        <span class="visually-hidden">Загрузка...</span>
      </div>
    </div>
    <div
      class="d-flex justify-content-center"
      v-else-if="filteredFilms.length==0"
    >
      <h3 class="text-white">
        По вашему запросу ничего не найдено
      </h3>
    </div>
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
.spinner-border{
  width: 3rem;
  height: 3rem;
}
</style>
