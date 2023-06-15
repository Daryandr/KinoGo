<script lang="ts">
import {defineComponent} from 'vue'
import { useFilmsStore } from '@/stores/filmsStore'

export default defineComponent({
  name: 'MainPage',
  data() {
    return{

    }
  },
  computed: {

  },
  async beforeCreate() {
    await useFilmsStore().getFilms()
  },
  methods: {

  }
})
</script>

<template>
  <div>

  </div>
</template>

<style lang="sass" scoped>

</style>
