<template>
  <div class="w-full flex flex-col items-center gap-4 relative ">
    <header-menu />
    <main class="container flex flex-col gap-4">
      <div class="w-full">
        <RecipeSearchRecipes
          :tags="tags"
          @search="filterByTags"
          @clearFilters="clearFilters"
        />
      </div>
      <RecipeCards :recipes="recipes" @filterCardsByTag="filterByTag($event)" @openCard="openCard" />
      <Dialogue
        :is-open="modal.isModalVisible"
        @close-modal="closeModal()"
      >
        <template #title> {{ modal.modalTitle }} </template>
        <template #description>
          {{ modal.modalContent }}
        </template>
      </Dialogue>
      <RecipeViewCard v-if="showRecipe" :recipe="recipe" @close="showRecipe = false" :showRecipe="showRecipe" />
    </main>
  </div>
</template>

<script setup lang="ts">
const recipes = ref([]);
const tags = await useFetchTags();

const modal = ref({
  isModalVisible: false,
  modalTitle: "",
  modalContent: "",
});

const recipe = ref<Recipe | null>(null);
const showRecipe = ref(false);

onMounted(async () => {
  const result = await useFetchRecipes();
  recipes.value = result.recipes;
});

const filterByTags = async (tags: string[]) => {
  recipes.value = await getRecipesByTags(tags);
  if (recipes.value.length === 0) {
    modal.value = {
      isModalVisible: true,
      modalTitle: "Ops!",
      modalContent: "Nenhum resultado encontrado para a busca, mas você pode tentar novemente usando outras tags",
    };
  }
};

const closeModal = async () => {
  modal.value.isModalVisible = false;
  const result = await useFetchRecipes();
  recipes.value = result.recipes;
};

const filterByTag = async (tag: string) => {
  const { data } = await useFetch(
    `https://dummyjson.com/recipes/tag/${tag}?&select=name,image,tags`
  );
  recipes.value = data.value.recipes;
};

const clearFilters = async () => {
  const result = await useFetchRecipes();
  recipes.value = result.recipes;
};

const openCard = async (recipeId: Recipe) => {
  recipe.value = await getRecipeById(recipeId);
  showRecipe.value = true
};
</script>
