<template>
  <div
    class="flex w-full flex-col items-start justify-end gap-4 bg-white h-auto p-4"
  >
    <div
      class="text-primary-600 w-32 font-medium text-lg self-center md:self-start"
    >
      Busca por tags
    </div>
    <div
      class="flex flex-col md:flex-row gap-16 md:gap-4 w-full min-h-40 md:min-h-16"
    >
      <div class="flex flex-col">
        <h3 class="text-sm text-primary-400">Tag 1</h3>
        <div class="flex relative md:min-w-40 lg:min-w-72 w-full z-50">
          <Select
            :options="tags"
            :selected-option="tags[0]"
            v-model="selectedTags[0]"
          />
        </div>
      </div>

      <div class="flex flex-col">
        <h3 class="text-sm text-primary-400">Tag 2</h3>
        <div class="flex relative md:min-w-40 lg:min-w-72 w-full">
          <Select
            :options="tags"
            :selected-option="tags[1]"
            v-model="selectedTags[1]"
          />
        </div>
      </div>
      <div class="flex flex-col gap-2 md:flex-row">
        <button
          class="bg-primary-500 text-white flex justify-center items-center rounded-md w-full md:w-36 h-10 self-end font-medium"
          @click="$emit('search', selectedTags)"
        >
          Buscar
        </button>
        <button
          class="text-primary-500 border border-primary-500 flex justify-center items-center rounded-md w-full md:w-36 h-10 self-end font-medium"
          @click="$emit('clearFilters'), (selectedTags = [])"
        >
          Limpar filtros
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Tag } from "@/shared/types/recipes";
const props = defineProps<{
  tags: Array<Tag>;
}>();

const selectedTags = ref<Array<Tag>>([]);
</script>

<style></style>
