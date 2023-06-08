<script lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import MainPage from './components/MainPage.vue'
import {defineComponent} from 'vue'

export default defineComponent({
  name: 'App',
  components: {
    MainPage,
    RouterLink,
    RouterView,
  }
})
</script>

<template>
  <header>
<!--        <RouterLink to="/">Home</RouterLink>-->
  </header>
  <MainPage />
  <RouterView />
</template>

<style lang="sass" scoped>

</style>
