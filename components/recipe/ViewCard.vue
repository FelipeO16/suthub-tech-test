<template>
  <div>
    <Dialogue :is-open="modal.isModalVisible" @close-modal="closeModal()" flex>
      <template #title> {{ recipe.name }} </template>
      <template #description>
        <div class="space-y-2">
          <div class="recipe-image">
            <img :src="recipe.image" alt="recipe image" />
          </div>
          <div class="recipe-tags">
            <span class="recipe-info">Tags: </span>
            <RecipeTag v-for="tag in recipe.tags" :key="tag" class="mr-2">{{
              tag
            }}</RecipeTag>
          </div>
          <div class="recipe-rating flex items-center gap-1">
            <span class="recipe-info">Avaliação: </span>
            <span class="text-yellow-500 text-lg flex">
              <Icon
                name="material-symbols:star"
                v-for="i in Math.floor(recipe.rating)"
                :key="i"
              />
              <Icon
                name="material-symbols:star-half"
                v-if="recipe.rating % 1 >= 0.5"
              />
              <Icon name="material-symbols:star-outline" v-else />
            </span>
            ({{ recipe.rating }})
          </div>
          <div class="recipe-servings">
            <span class="recipe-info">Porções: </span>
            <span v-for="i in recipe.servings" :key="i">🍕</span>
            ({{ recipe.servings }})
            
          </div>
          <div class="recipe-total-time">
            <span class="recipe-info">Tempo total de preparação: </span>
            {{ recipe.prepTimeMinutes + recipe.cookTimeMinutes }} minutos
          </div>
          <div class="recipe-ingredients"></div>
          <!-- Ingredientes: em uma lista numerada -->
          <div class="recipe-ingredients">
            <span class="recipe-info inline-block">Ingredientes:</span>
            <ol class="ml-2">
              <li
                v-for="(ingredient, index) in recipe.ingredients"
                :key="index"
              >
                <span class="recipe-info">{{ index + 1 }}</span> - {{ ingredient }}
              </li>
            </ol>
          </div>
          <div class="recipe-instructions">
            <span class="recipe-info inline-block">Modo de preparo:</span>
            <ol class="ml-2 space-y-2">
              <li
                v-for="(ingredient, index) in recipe.instructions"
                :key="index"
                class="flex gap-2"
              >
                <span class="recipe-info">{{ index + 1 }}º</span> {{ ingredient }}
              </li>
            </ol>
          </div>
        </div>
      </template>
    </Dialogue>
  </div>
</template>

<script lang="ts" setup>
import type { Recipe } from "@/shared/types/recipes";

const props = defineProps<{
  recipe: Recipe;
  showRecipe: boolean;
}>();

const modal = ref({
  isModalVisible: props.showRecipe,
  modalTitle: "",
});

const emit = defineEmits(["close"]);

const closeModal = async () => {
  modal.value.isModalVisible = false;
  emit("close");
};
</script>

<style scoped>

.recipe-image {
  @apply w-full max-w-sm rounded-md overflow-hidden;
}

.recipe-tags {
  @apply mt-2 flex flex-wrap;
}

.recipe-info {
  @apply text-primary-500;
}

.recipe-ingredients, recipe-instructions {
  @apply flex flex-col gap-1
}
</style>
