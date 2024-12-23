<template>
  <div class="flex w-full flex-col md:flex-row items-center justify-end gap-0 bg-white h-auto p-4">
    <div class="text-primary-600 w-32">Busca por tags </div>
    <div class="flex flex-col md:flex-row gap-16 md:gap-4 w-full min-h-40 md:min-h-16 ">
      <div class="flex flex-col ">
        <h3 class="text-sm text-primary-400">
          Tag 1
        </h3>
        <div class="flex relative  min-w-40 w-full z-50">
          <Select
            :options="tags"
            :selected-option="tags[0]"
            v-model="selectedTags[0]"
          />
        </div>
      </div>
  
      <div class="flex flex-col ">
        <h3 class="text-sm text-primary-400">
          Tag 2
        </h3>
        <div class="flex relative  min-w-40 w-full">
          <Select
            :options="tags"
            :selected-option="tags[1]"
            v-model="selectedTags[1]"
          />
        </div>
      </div>
      <button class="bg-primary-500 text-white px-4 py-2 rounded-xl w-full mt-3 md:w-20" @click="$emit('search', selectedTags)">
        Buscar
      </button>
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
