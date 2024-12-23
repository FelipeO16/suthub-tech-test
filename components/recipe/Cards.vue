<template>
  <div class="cards">
    <RecipeCard v-for="recipe in recipes" :key="recipe.id" :recipe="recipe" />
    <!-- <div class="card col-span-1" v-for="recipe in recipes" :key="recipe.id">
      <img :src="recipe.image" alt="Placeholder" class="w-full h-48 object-cover" />
      <div class="p-4">
        <h2 class="text-xl font-bold">{{ recipe.name }}</h2>
        <div class="tags">
          <RecipeTag v-for="tag in recipe.tags" :key="tag" class="mr-2">{{ tag }}</RecipeTag>
        </div>
      </div>
    </div> -->
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