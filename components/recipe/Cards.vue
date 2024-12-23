<template>
  <div class="cards">
    <RecipeCard v-for="recipe in recipes" :key="recipe.id" :recipe="recipe" @filterByTag="$emit('filterCardsByTag', $event)" />
  </div>
</template>

<script lang="ts" setup>

import type { ShortRecipe } from '@/shared/types/recipes'

const props = defineProps<{
  recipes: Array<ShortRecipe>
}>()
</script>

<style scoped>
.cards {
  @apply grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 p-4;
}




</style>