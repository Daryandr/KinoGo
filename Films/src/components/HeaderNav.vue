<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "HeaderNav"
});
</script>

<template>
  <header>
    <nav class="navbar navbar-expand-lg navbar-dark px-5">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">
          <i class="bi bi-film" />
          KinoGo
        </a>
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
  font-size: 2em;
}

.navbar {
  z-index: 1;
  background: linear-gradient(0deg, transparent 0%, $primary 100%);
}
</style>