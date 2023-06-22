<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "SearchBar"
});
</script>

<template>
  <form
    class="d-flex justify-content-center m-5"
    @submit.prevent=""
  >
    <input
      class="form-control"
      @input="this.$emit('search',$event.target.value)"
      type="search"
      placeholder="Название фильма, сериала"
    >
    <button
      class="btn btn-primary"
      type="submit"
    >
      <i class="bi bi-search" />
    </button>
  </form>
</template>

<style scoped lang="scss">
.form-control {
  width: 40vw;
  height: 3.5rem;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  font-size: 1.4em;
}

.btn {
  width: 3.5rem;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}

.bi-search {
  font-size: 1.4em;
}
</style>