<template>
  <div>
    <div class="px-2 py-1 bg-primary-100 text-primary-500 rounded-full text-xs uppercase cursor-pointer flex justify-center items-center" @click="$emit('tagSelected')">
      <slot />
      <Icon v-if="closeButton" name="material-symbols:close-rounded" class="w-3 h-3 ml-1 cursor-pointer" @click="$emit('remove')" />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  closeButton?: boolean;
}>();
</script>