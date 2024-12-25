<template>
  <div>
    <table class="min-w-full bg-white shadow-md rounded-md hidden lg:inline-table">
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
            <img
              :src="user.image"
              alt="Foto do usuário"
              class="w-12 h-12 rounded-full"
            />
          </td>
          <td class="px-4 py-2">{{ user.firstName }} {{ user.lastName }}</td>
          <td class="px-4 py-2">
            {{ new Date(user.birthDate).toLocaleDateString("pt-BR") }}
          </td>
          <td class="px-4 py-2">{{ user.gender }}</td>

          <td class="px-4 py-2">
            {{
              user.address
                ? `${user.address.address}, ${user.address.city}, ${user.address.state}, ${user.address.postalCode}`
                : "N/A"
            }}
          </td>
          <td class="px-4 py-2">
            <a
              :href="`https://www.google.com/maps?q=${user.address.coordinates.lat},${user.address.coordinates.lng}`"
              target="_blank"
              class="bg-primary-100 text-primary-700 text-sm p-2 rounded-md flex w-fit items-center gap-2"
            >
              Ver no mapa
              <Icon
                name="material-symbols:map-search"
                class="text-primary-500 text-lg"
              />
            </a>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="bg-white shadow-md rounded-md p-4 space-y-4 block lg:hidden">
      <div
        v-for="user in users"
        :key="user.id"
        class="border border-gray-200 rounded-lg p-4 space-y-3 bg-primary-100"
      >
        <div class="flex items-center space-x-4">
          <img
            :src="user.image"
            alt="Foto do usuário"
            class="w-16 h-16 rounded-full"
          />
          <div>
            <h2 class="text-lg font-semibold text-primary-900">
              {{ user.firstName }} {{ user.lastName }}
            </h2>
            <p class="text-sm text-primary-950">
              {{ new Date(user.birthDate).toLocaleDateString("pt-BR") }}
            </p>
          </div>
        </div>
        <div>
          <p class="text-sm text-primary-950">
            <strong>Gênero:</strong> {{ user.gender }}
          </p>
        </div>
        <div>
          <p class="text-sm text-primary-950">
            <strong>Localização:</strong>
            {{
              user.address
                ? `${user.address.address}, ${user.address.city}, ${user.address.state}, ${user.address.postalCode}`
                : "N/A"
            }}
          </p>
        </div>
        <div>
          <a
            :href="`https://www.google.com/maps?q=${user.address.coordinates.lat},${user.address.coordinates.lng}`"
            target="_blank"
            class="bg-primary-100 text-primary-700 text-sm  rounded-md flex w-fit items-center gap-2"
          >
            Ver no mapa
            <Icon
              name="material-symbols:map-search"
              class="text-primary-500 text-lg"
            />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { User } from "@/shared/types/users";

defineProps<{
  users: User[];
}>();
</script>

<style scoped>
table th,
table td {
  @apply text-left;
}

table th {
  @apply text-sm font-medium;
}

table td {
  @apply text-sm text-primary-800;
}
</style>
