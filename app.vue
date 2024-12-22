<template>
  <div>
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
provideHeadlessUseId(() => useId())
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');

.inter {
  font-family: "Inter", serif;
  font-optical-sizing: auto;
  font-weight: 400;
  font-style: normal;
}
</style>