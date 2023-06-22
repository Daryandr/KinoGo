<script lang="ts">
import { RouterLink, RouterView } from "vue-router";
import MainPage from "./components/MainPage.vue";
import HeaderNav from "@/components/HeaderNav.vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",
  components: {
    MainPage,
    HeaderNav,
    RouterLink,
    RouterView
  }
});
</script>

<template>
  <div class="bg-dark min-vh-100 d-flex flex-column">
    <HeaderNav />
    <MainPage />
    <footer class="container-fluid mt-auto" />
  </div>
  <RouterView />
</template>

<style lang="scss" scoped>
.container-fluid {
  height: 10vh;
  z-index: 1;
  background: linear-gradient(0deg, $primary 0%, transparent 100%);
}
</style>
