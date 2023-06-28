<script lang="ts">
import { RouterView } from "vue-router";
import HeaderNav from "@/components/HeaderNav.vue";
import { defineComponent } from "vue";
import { useFilmsStore } from "@/stores/filmsStore";

export default defineComponent({
  name: "App",
  components: {
    HeaderNav,
    RouterView
  },
  async beforeCreate() {
    await useFilmsStore().fetchFilms();
    useFilmsStore().trainRecommender();
  },
});
</script>

<template>
  <div class="bg-dark min-vh-100 d-flex flex-column">
    <HeaderNav />
    <RouterView />
    <footer class="container-fluid mt-auto" />
  </div>
</template>

<style lang="scss" scoped>
.container-fluid {
  height: 10vh;
  z-index: 1;
  background: linear-gradient(0deg, $primary 0%, transparent 100%);
}
</style>
