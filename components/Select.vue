<template>
  <div class="absolute top-0 w-full">
    <HeadlessListbox v-model="selectedOption" @update:modelValue="() => $emit('update:modelValue', selectedOption)">
      <div class="relative mt-1">
        <HeadlessListboxButton
          class="relative w-full cursor-default   py-2 pl-3 pr-10 text-left  sm:text-sm bg-primary-100"
        >
          <span class="block truncate text-primary-500">{{ selectedOption ? selectedOption : 'Selecione' }}</span>
          <span
            class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
          >
            <Icon
              name="tabler:chevron-down"
              class="h-5 w-5 text-primary-500"
              aria-hidden="true"
            />
          </span>
        </HeadlessListboxButton>

        <transition
          leave-active-class="transition duration-100 ease-in"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <HeadlessListboxOptions
            class="absolute mt-1 max-h-60 w-full overflow-auto  bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
          >
            <HeadlessListboxOption
              v-slot="{ active, selected }"
              v-for="option in options"
              :key="option"
              :value="option"
              as="template"
            >
              <li
                :class="[
                  active ? 'bg-primary-100 text-primary-700' : 'text-primary-400',
                  'relative cursor-default select-none py-2 pl-10 pr-4',
                ]"
              >
                <span
                  :class="[
                    selected ? 'font-medium text-primary-500' : 'font-normal',
                    'block truncate',
                  ]"
                  >{{ option }}</span
                >
                <span
                  v-if="selected"
                  class="absolute inset-y-0 left-0 flex items-center pl-3 text-primary-600"
                >
                  <Icon name="material-symbols:check" class="h-5 w-5" aria-hidden="true" />
                </span>
              </li>
            </HeadlessListboxOption>
          </HeadlessListboxOptions>
        </transition>
      </div>
    </HeadlessListbox>
  </div>
</template>

<script setup lang="ts">

defineProps<{
  options: Array<string>;
}>();

const selectedOption = ref();



</script>
