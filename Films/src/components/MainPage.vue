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
  async beforeCreate() {
    await useFilmsStore().fetchFilms();
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
      class="d-flex justify-content-center"
      v-if="filteredFilms.length==0"
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

</style>
