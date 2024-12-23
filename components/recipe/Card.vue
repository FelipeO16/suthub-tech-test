<template>
  <div
    class="card max-w-sm bg-white border border-primary-200 rounded-lg shadow"
  >
    <img class="rounded-t-lg" :src="recipe.image" :alt="recipe.name" />
    <div class="p-5">
      <h5
        class="mb-2 text-2xl font-bold tracking-tight text-primary-900 "
      >
        {{ recipe.name }}
      </h5>
      <div class="tags">
        <RecipeTag v-for="tag in recipe.tags" :key="tag" class="mr-2" @tagSelected="$emit('filterByTag', tag)">{{
          tag
        }}</RecipeTag>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { ShortRecipe } from "@/shared/types/recipes";

const props = defineProps<{
  recipe: ShortRecipe;
}>();
</script>

<style scoped>
.tags {
  @apply mt-2 flex flex-wrap gap-2;
}

.card {
  @apply bg-white shadow-md rounded-md hover:scale-105 transition-transform duration-300 ease-in-out;
}
</style>
