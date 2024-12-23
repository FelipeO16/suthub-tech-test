<template>
  <div>
    <div class="px-2 py-1 bg-primary-100 text-primary-500 rounded-full text-xs uppercase cursor-pointer" @click="$emit('tagSelected')">
      <slot />
    </div>
  </div>
</template>