<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "SearchBar",
  props: {
    inputValue: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      input: ""
    };
  },
  watch: {
    inputValue(value) {
      this.input = value;
    }
  },
  methods: {
    setSearch() {
      this.$emit("search", this.input);
    }
  }
});
</script>

<template>
  <form
    class="d-flex justify-content-center m-5"
    @submit.prevent="setSearch"
    @keydown.enter.prevent="setSearch"
  >
    <input
      class="form-control fs-6"
      v-model="input"
      type="search"
      placeholder="Название фильма, сериала"
    >
    <button
      class="btn btn-primary"
      type="submit"
    >
      <i class="bi bi-search fs-5" />
    </button>
  </form>
</template>

<style scoped lang="scss">
.form-control {
  width: 35rem;
  height: 3rem;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}

.btn {
  width: 3rem;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}
</style>