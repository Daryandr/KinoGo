<script lang="ts">
import { defineComponent } from "vue";
import { RouterLink } from "vue-router";

export default defineComponent({
  name: "HeaderNav",
  components: { RouterLink },
  data() {
    return {
      isMarkHover: false
    };
  }
});
</script>

<template>
  <header>
    <nav class="navbar navbar-expand-lg navbar-dark px-5">
      <div class="container-fluid">
        <RouterLink class="navbar-brand fs-2" to="/">
          <i class="bi bi-film" />
          KinoGo
        </RouterLink>
        <RouterLink to="/favorites">
          <i
            @mouseenter="isMarkHover = true"
            v-if="!isMarkHover"
            class="bi bi-bookmark text-white fs-3" />
          <i
            @mouseleave="isMarkHover = false"
            v-if="isMarkHover"
            class="bi bi-bookmark-fill text-white fs-3" />
        </RouterLink>
      </div>
    </nav>
  </header>
</template>

<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Candal&display=swap');

.container-fluid {
  height: 10vh;
}

.navbar-brand {
  font-family: 'Candal', sans-serif;
}

.navbar {
  background: linear-gradient(0deg, transparent 0%, $primary 100%);
}
</style>