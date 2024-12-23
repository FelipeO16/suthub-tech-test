<template>
  <div>
    <HeadlessTransitionRoot appear :show="isOpen" as="template">
      <HeadlessDialog as="div" @close="$emit('close-modal')" class="relative z-10">
        <HeadlessTransitionChild
          as="template"
          enter="duration-300 ease-out"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="duration-200 ease-in"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-black/25" />
        </HeadlessTransitionChild>

        <div class="fixed inset-0 overflow-y-auto">
          <div
            class="flex min-h-full items-center justify-center p-4 text-center"
          >
            <HeadlessTransitionChild
              as="template"
              enter="duration-300 ease-out"
              enter-from="opacity-0 scale-95"
              enter-to="opacity-100 scale-100"
              leave="duration-200 ease-in"
              leave-from="opacity-100 scale-100"
              leave-to="opacity-0 scale-95"
            >
              <HeadlessDialogPanel
                class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
              >
                <HeadlessDialogTitle
                  as="h3"
                  class="text-lg font-medium leading-6 text-primary-900"
                >
                  <slot name="title" />
                </HeadlessDialogTitle>
                <div class="mt-2">
                  <p class="text-sm text-gray-500">
                    <slot name="description"/>
                  </p>
                </div>

                <div class="mt-4">
                  <button
                    type="button"
                    class="inline-flex justify-center rounded-md border border-transparent bg-primary-100 px-4 py-2 text-sm font-medium text-primary-900 hover:bg-primary-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                    @click="$emit('close-modal')"
                  >
                    Fechar
                  </button>
                </div>
              </HeadlessDialogPanel>
            </HeadlessTransitionChild>
          </div>
        </div>
      </HeadlessDialog>
    </HeadlessTransitionRoot>
  </div>
</template>

<script lang="ts" setup>
defineProps<{ isOpen: boolean }>();
</script>