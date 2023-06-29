<script lang="ts">
import { defineComponent, PropType } from "vue";
import type { Film } from "@/types/main";
import { RouterLink } from "vue-router";
import { useFilmsStore } from "@/stores/filmsStore";

export default defineComponent({
  name: "FilmCard",
  components: { RouterLink },
  props: {
    film: {
      type: Object as PropType<Film>,
      required: true
    }
  },
  methods: {
    getRatingColor(rating) {
      if (rating > 7) return "bg-success";
      else if (rating > 4) return "bg-warning";
      else return "bg-danger";
    },
    isFilmLiked(id) {
      return useFilmsStore().isFilmLiked(id);
    }
  }
});
</script>

<template>
  <RouterLink class="card text-white m-3 bg-dark" :to="'/film/'+film._id">
    <img
      class="card-img-top"
      :src="film.poster"
      alt="Failed to load"
    >
    <div class="card-img-overlay d-flex flex-column justify-content-end">
      <div class="d-flex align-items-start flex-wrap">
        <h4 class="card-title me-2">
          {{ film.name }}
        </h4>
        <i
          class="bi bi-star-fill me-2"
          v-if="isFilmLiked(film._id)"
        />
        <h5
          class="rating"
          :class="getRatingColor(film.rating.kp)"
        >
          {{ film.rating.kp.toFixed(1) }}
        </h5>
      </div>
      <div class="card-text">
        {{ film.shortDescription }}
      </div>
    </div>
  </RouterLink>
</template>

<style scoped lang="scss">
.card-img-overlay {
  z-index: 1;
  background: linear-gradient(0deg, $primary 0%, transparent 100%);
  opacity: 0;
  transition: opacity 0.3s;
  font-size: 2.2vmin;

  &:hover {
    opacity: 1;
  }
}

.bi-star-fill {
  font-size: 2.6vmin;
  color: $secondary;
}

.card-title {
  font-size: 3vmin;
}

.card-img-top {
  border-radius: 0.5rem;
}

.rating {
  padding: 0.2rem;
  border-radius: 0.5rem;
  font-size: 2.6vmin;
}
</style>