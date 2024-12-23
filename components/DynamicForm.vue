<template>
  <form @submit.prevent="handleSubmit">
    <div
      v-for="(field, index) in formSchema.fields"
      :key="index"
      class="form-group"
    >
      <label v-if="field.label" :for="field.name" class="text-primary-800">{{
        field.label
      }}</label>
      <span
        v-if="field.hint"
        class="hint"
        @click="showModal(field.hint)"
      >
        <Icon
          name="material-symbols:info-outline-rounded"
          class="h-4 w-4 "
        />
        {{ field.hint.text }}
      </span>
      <div class="w-full">
        <input
          v-if="
            field.mask &&
            field.as === 'input' &&
            (!field.conditional || field.conditional(context))
          "
          :id="field.name"
          :name="field.name"
          v-model="formValues[field.name]"
          :disabled="field.disabled"
          :type="field.type || 'text'"
          :placeholder="field.placeholder || ''"
          v-mask="field.mask"
          @blur="validateField(field.name)"
          class="form-control"
        />

        <Money3Component
          v-if="
            field.mask &&
            field.as === 'currency' &&
            (!field.conditional || field.conditional(context))
          "
          v-model.number="formValues[field.name]"
          v-bind="moneyConfig"
          @blur="validateField(field.name)"
        />
        <input
          v-if="
            !field.mask &&
            field.as === 'input' &&
            (!field.conditional || field.conditional(context))
          "
          :id="field.name"
          :name="field.name"
          v-model="formValues[field.name]"
          :type="field.type || 'text'"
          :disabled="field.disabled"
          :placeholder="field.placeholder || ''"
          @blur="validateField(field.name)"
          class="form-control"
        />

        <div
          v-else-if="
            field.as === 'select' &&
            (!field.conditional || field.conditional(context))
          "
          class="relative py-4"
        >
          <Select
            v-if="resolveOptions(field).length > 0"
            v-model="formValues[field.name]"
            :options="resolveOptions(field)"
            :selected-option="resolveOptions(field)[0]"
            @update:model-value="() => validateField(field.name)"
          />
        </div>

        <div v-else-if="field.as === 'toggle'" class="toggle-group">
          <HeadlessRadioGroup v-model="formValues[field.name]" @update:model-value="() => validateField(field.name)">
            <div class="flex gap-2">
              <HeadlessRadioGroupOption
                v-for="option in field.options"
                v-slot="{ checked }"
                :value="option"
              >
                <span
                  :class="checked ? 'bg-primary-500 text-white' : 'bg-gray-100'"
                  class="text-sm px-2 rounded-lg py-1 bg-primary-100 cursor-pointer mb-2 text-primary-500"
                  >{{ option }}</span
                >
              </HeadlessRadioGroupOption>
            </div>
          </HeadlessRadioGroup>
        </div>
      </div>

      <div v-if="errors[field.name]" class="error">
        {{ errors[field.name] }}
      </div>
    </div>

    <Dialogue :is-open="isModalVisible" @close-modal="closeModal">
      <template #title> {{ modalTitle }} </template>
      <template #description>
        {{ modalContent }}
      </template>
    </Dialogue>

    <div class="submit-button block w-full p-4">
      <button
        type="submit"
        class="bg-primary-500 text-white px-4 py-2 rounded-xl w-full mt-3 md:w-20"
      >
        Enviar
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import * as Yup from "yup";
import { Money3Component } from "v-money3";

import type { Field, FormSchema } from "~/shared/types/register";

const initializeFormValues = (fields: Field[]) => {
  return fields.reduce((acc: Record<string, any>, field: Field) => {
    acc[field.name] = "";
    return acc;
  }, {});
};

const props = defineProps<{ formSchema: FormSchema }>();
const formValues = reactive(initializeFormValues(props.formSchema.fields));
const errors = reactive<Record<string, string>>({});
const isModalVisible = ref(false);
const modalContent = ref("");
const modalTitle = ref("");
const moneyConfig = {
  decimal: ",",
  thousands: ".",
  prefix: "R$ ",
  precision: 2,
  masked: false,
};

const context = computed(() => ({ values: formValues }));

const handleSubmit = async () => {
  try {
    resetErrors();
    const validationSchema = createValidationSchema();
    await validationSchema.validate(formValues, { abortEarly: false });
    emit("submit", { ...formValues });
  } catch (validationErrors) {
    if (validationErrors instanceof Yup.ValidationError) {
      validationErrors.inner.forEach((error) => {
        if (error.path) {
          errors[error.path] = error.message;
        }
      });
    }
  }
};

const createValidationSchema = () => {
  const shape: Record<string, Yup.Schema<any>> = {};
  props.formSchema.fields.forEach((field) => {
    if (field.rules) shape[field.name] = field.rules;
  });
  return Yup.object().shape(shape);
};

const resolveOptions = (field: Field) => {
  if (typeof field.options === "function") {
    return field.options(context.value);
  }
  return field.options || [];
};

const showModal = ({text, modalContent: content}: { text: string, modalContent: string}) => {
  modalContent.value = content;
  modalTitle.value = text;
  isModalVisible.value = true;
};

const closeModal = () => {
  modalContent.value = "";
  isModalVisible.value = false;
};

const resetErrors = () => {
  for (const key in errors) {
    errors[key] = "";
  }
};

const validateField = async (fieldName: string) => {
  const field = props.formSchema.fields.find((f) => f.name === fieldName);

  if (field?.rules) {
    try {
      await field.rules.validate(formValues[fieldName]);
      errors[fieldName] = "";
    } catch (validationError) {
      if (validationError instanceof Yup.ValidationError) {
        errors[fieldName] = validationError.message;
      }
    }
  }
  if (
    fieldName === "cep" &&
    /^[0-9]{5}-[0-9]{3}$/.test(formValues[fieldName])
  ) {
    try {
      const address = await fetchAddressByCep(formValues[fieldName]);
      formValues.street = address.logradouro || "";
      formValues.neighborhood = address.bairro || "";
      formValues.city = address.localidade || "";
      formValues.state = address.uf || "";
    } catch (error) {
      errors[fieldName] = "CEP inválido ou não encontrado.";
    }
  }
};

const fetchAddressByCep = async (cep: string) => {
  try {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const address = await response.json();

    if (address.erro) {
      throw new Error("CEP inválido.");
    }

    return address;
  } catch (error) {
    throw error;
  }
};

const emit = defineEmits<{
  (e: "submit", values: Record<string, any>): void;
}>();
</script>

<style scoped>
form {
  @apply flex flex-col md:flex-row md:flex-wrap;
}

.form-group {
  @apply border-b p-4 w-full md:max-w-[50%] space-y-2;
}

.toggle-group {
  @apply flex;
}

input {
  @apply w-full focus:outline-primary-400 bg-primary-100 text-primary-600 p-2 placeholder:text-primary-500/50 disabled:bg-slate-100;
}

input[type="date"]::-webkit-calendar-picker-indicator {
  @apply bg-none -z-10;
}

.error {
  @apply text-red-500 text-sm;
}

.hint {
  @apply text-primary-400 cursor-pointer text-xs ml-2 gap-1 inline-flex;
}


</style>
