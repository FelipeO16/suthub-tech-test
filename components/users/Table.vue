<template>
  <table class="min-w-full bg-white shadow-md rounded-md">
      <thead class="bg-primary-500 text-white">
        <tr>
          <th class="px-4 py-2">Foto</th>
          <th class="px-4 py-2">Nome</th>
          <th class="px-4 py-2">Data de Nascimento</th>
          <th class="px-4 py-2">Gênero</th>
          <th class="px-4 py-2">Localização</th>
          <th class="px-4 py-2">Mapa</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id" class="border-t">
          <td class="px-4 py-2">
            <img :src="user.image" alt="Foto do usuário" class="w-12 h-12 rounded-full" />
          </td>
          <td class="px-4 py-2">{{ user.firstName }} {{ user.lastName }}</td>
          <td class="px-4 py-2">
            {{ new Date(user.birthDate).toLocaleDateString("pt-BR") }}
          </td>
          <td class="px-4 py-2">{{ user.gender }}</td>
          
          <td class="px-4 py-2 ">
            {{ user.address
              ? `${user.address.address}, ${user.address.city}, ${user.address.state}, ${user.address.postalCode}`
              : "N/A" }}
              
          </td>
          <td class="px-4 py-2 ">
            <a :href="`https://www.google.com/maps?q=${user.address.coordinates.lat},${user.address.coordinates.lng}`" class="bg-primary-100 text-primary-700 text-sm p-2 rounded-md flex w-fit items-center gap-2">
              Ver no mapa <Icon name="material-symbols:map-search" class="text-primary-500 text-lg" />
            </a>
          </td>
        </tr>
      </tbody>
    </table>
</template>

<script lang="ts" setup>
import type { User } from '@/shared/types/users';

defineProps<{
  users: User[];
}>()
</script>


<style scoped>
table th,
table td {
  @apply text-left
}

table th {
  @apply text-sm font-medium
}

table td {
  @apply text-sm text-primary-800
}
</style>