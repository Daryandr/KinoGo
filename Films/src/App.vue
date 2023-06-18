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
  <div class="cont bg-dark">
    <HeaderNav />
    <MainPage />
  </div>
  <RouterView />
</template>

<style lang="scss" scoped>

.cont {
  height: 100vh;
}

</style>
