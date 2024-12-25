<template>
  <div class="w-full flex flex-col items-center gap-4 relative">
    <header-menu />
    <main class="container flex flex-col">
      <div
        class="bg-primary-100 flex flex-col gap-2 p-4 text-primary-500 rounded-t-xl"
      >
        <h1 class="font-bold text-primary-500">Lista e Busca de Usuários</h1>

        <div class="flex">
          <input
            v-model="searchQuery"
            placeholder="Buscar por nome"
            class="flex-1 px-4 py-2 border rounded-md focus-visible:outline-primary-500 placeholder:text-primary-400"
          />
        </div>
      </div>

      <div class="overflow-x-auto border-x border-primary-100">
        <UsersTable :users="users" />
      </div>

      <div
        class=" bg-primary-100 p-4 rounded-b-md"
      >
        <div class="flex items-center justify-between" v-if="!isSearching">
          <button
            :disabled="currentPage === 1"
            @click="currentPage--"
            class="px-4 py-2 bg-primary-500 text-white rounded-md"
          >
            Anterior
          </button>
          <span class="text-primary-500">Página {{ currentPage }} de {{ totalPages }}</span>
          <button
            :disabled="currentPage === totalPages"
            @click="currentPage++"
            class="px-4 py-2 bg-primary-500 text-white rounded-md"
          >
            Próxima
          </button>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import type { User, Users } from "@/shared/types/users";

const apiUrl = "https://dummyjson.com/users";
const users = ref<Array<User>>([]);
const searchQuery = ref("");
const currentPage = ref(1);
const itemsPerPage = 20;
const totalUsers = ref(0);
const isSearching = computed(() => searchQuery.value.trim() !== "");

const fetchUsers = async () => {
  let url;
  if (isSearching.value) {
    url = `${apiUrl}/search?q=${searchQuery.value}`;
  } else {
    url = `${apiUrl}?limit=${itemsPerPage}&skip=${
      (currentPage.value - 1) * itemsPerPage
    }`;
  }

  const data = (await $fetch(url)) as Users;
  users.value = data.users || [];
  totalUsers.value = isSearching.value ? users.value.length : data.total || 0;

  users.value.sort((a, b) => a.firstName.localeCompare(b.firstName));
};

const totalPages = computed(() => Math.ceil(totalUsers.value / itemsPerPage));

onMounted(() => fetchUsers());
watch([currentPage, searchQuery], fetchUsers);
</script>
