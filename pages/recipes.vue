<template>
  <div class="w-full flex flex-col items-center gap-4 relative bg-primary-100">
    <header-menu />
    <main class="container flex flex-col gap-4">
      <div class="w-full">
        <RecipeSearchRecipes :tags="tags" @search="searchByTags" />
      </div>
      <RecipeCards :recipes="recipes"  />
      <!-- <pre>{{ recipes }}</pre> -->
    </main>
  </div>
</template>

<script setup lang="ts">
const recipes = ref([])
const tags = await useFetchTags()

onMounted(async () => {
  const result = await useFetchRecipes()
  recipes.value = result.recipes
})

const searchByTags = (tags: string[]) => {
  console.log(tags)
}




</script>