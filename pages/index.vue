<template>
  <main class="menu">
    <ul class="links">
      <li v-for="link in links" class="" :key="link.id">
        <NuxtLink :to="link.url" class="link">
          {{ link.title }}
        </NuxtLink>
      </li>
    </ul>
  </main>
</template>

<script setup lang="ts">
import { links } from '~/shared/config/links';
</script>

<style scoped>
.menu {
  @apply flex justify-center items-center h-screen text-lg w-screen bg-gray-100;
}

.links {
  @apply flex flex-col gap-4 ;
}

.link {
  @apply text-primary-500 hover:text-white hover:bg-primary-500 bg-white border-2 border-primary-500 rounded-lg font-semibold  w-full text-center block p-2;
}
</style>
