<script setup lang="ts">
import MainPage from "@/components/Films.vue";
import { useFilmsStore } from "@/stores/filmsStore";
</script>

<template>
  <main>
    <MainPage :films="useFilmsStore().getFavorites" />
  </main>
</template>