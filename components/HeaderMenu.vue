<template>
  <header class="container">
    <nav
      class="flex justify-between items-center h-16 bg-primary-950 text-primary-500 shadow-sm font-sans relative px-8"
      role="navigation"
    >
      <div>
        <NuxtLink to="/" class="text-lg font-sans font-medium">
          <img src="https://www.suthub.com/_nuxt/img/logo-suthub-white.ab9b576.png" width="150"alt="">
        </NuxtLink>
        <div class="absolute top-4 right-4 w-56 text-right sm:hidden">
          <HeadlessMenu as="div" class="relative inline-block text-left">
            <div>
              <HeadlessMenuButton
                class="inline-flex w-full justify-center rounded-md bg-primary-500 px-4 py-2 text-sm font-medium text-white hover:bg-primary-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
              >
                Menu
                <Icon
                  name="tabler:chevron-down"
                  class="-mr-1 ml-2 h-5 w-5 text-white"
                  aria-hidden="true"
                />
              </HeadlessMenuButton>
            </div>
            <HeadlessMenuItems
              class="absolute right-0 mt-2 w-80 block origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none"
            >
              <div class="px-1 py-1">
                <HeadlessMenuItem v-slot="{ active }" v-for="link in links" :key="link.id">
                  <button
                    :class="[
                      active ? 'bg-primary-500 text-white' : 'text-primary-700',
                      'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                    ]"
                  >
                    <Icon
                      name="material-symbols-light:open-in-new"
                      :active="active"
                      class="mr-2 h-5 w-5 text-primary-500 font-bold"
                      aria-hidden="true"
                    />
                    <NuxtLink :to="link.url">
                      {{ link.title }}
                    </NuxtLink>
                  </button>
                </HeadlessMenuItem>
              </div>
            </HeadlessMenuItems>
          </HeadlessMenu>
        </div>
      </div>
      <ul class="gap-4 hidden sm:flex">
        <li v-for="link in links" :key="link.id">
          <NuxtLink :to="link.url" :class="$router.currentRoute.value.path == link.url ? 'bg-primary-500 text-white': ' text-white'" class="text-sm font-sans font-medium rounded-md p-2 ">{{ link.label }}</NuxtLink>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script setup>
import { links } from "~/shared/config/links";
</script>
