<script lang="ts">
import { defineComponent } from "vue";
import { useFilmsStore } from "@/stores/filmsStore";

export default defineComponent({
  name: "FilmPage",
  props: {
    filmId: {
      type: String,
      required: true
    }
  },
  computed: {
    film() {
      return useFilmsStore().getFilm(this.filmId);
    }
  }
});
</script>

<template>
  <div class="container">
    <h1 class="text-white">{{ film.name }}</h1>
  </div>
</template>

<style scoped lang="scss">

</style>