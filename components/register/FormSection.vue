<template>
  <section class="container h-full">
    <header class="w-full flex justify-center">
      <h1 class="text-primary-500 text-2xl font-medium w-full text-center md:text-left px-4">Cadastro de usuário</h1>
    </header>
    <DynamicForm :formSchema="formSchema" @submit="handleFormSubmit" />
    <Dialogue
      :is-open="resumeModal.visible"
      @close-modal="resumeModal.visible = false"
    >
      <template #title>{{ resumeModal.title }} </template>
      <template #description>
        <div v-for="field in formSchema.fields">
          <div class="flex justify-between items-center gap-2 w-full" v-if="resumeModal.content[field.name]">
            <span class="text-gray-500">{{ field.label }}</span>
            <span class="border-t border-dashed flex-grow h-0"></span>
            <span class="text-gray-800">{{
              resumeModal.content[field.name]
            }}</span>
          </div>
        </div>
      </template>
    </Dialogue>
  </section>
</template>

<script lang="ts" setup>
import * as Yup from "yup";
import type { FormSchema, UserData } from "~/shared/types/register";

const formSchema = {
  fields: [
    {
      label: "Nome completo",
      name: "fullName",
      placeholder: "Digite seu nome completo",
      as: "input",
      rules: Yup.string()
        .matches(
          /^[a-zA-ZÀ-ÿ]+(\s[a-zA-ZÀ-ÿ]+)+$/,
          "O campo deve conter pelo menos nome e sobrenome"
        )
        .required("Este campo é obrigatório"),
    },
    {
      label: "CPF",
      name: "cpf",
      placeholder: "Digite seu CPF",
      as: "input",
      mask: "###.###.###-##",
      rules: useCpfValidation(),
    },
    {
      label: "Data de nascimento",
      name: "birthDate",
      as: "input",
      type: "date",
      rules: Yup.date()
        .transform((value, originalValue) =>
          originalValue === "" ? new Date() : value
        )
        .min(
          new Date(new Date().setFullYear(new Date().getFullYear() - 65)),
          "Idade máxima é de 65 anos."
        )
        .max(
          new Date(new Date().setFullYear(new Date().getFullYear() - 18)),
          "Idade mínima é de 18 anos."
        )
        .required("Este campo é obrigatório"),
    },
    {
      label: "Telefone celular",
      name: "phone",
      placeholder: "(99) 99999-9999",
      as: "input",
      mask: "(##) #####-####",
      rules: Yup.string()
        .matches(/^\(\d{2}\)\s\d{5}-\d{4}$/, "Número inválido.")
        .required("Este campo é obrigatório"),
    },
    {
      label: "CEP",
      name: "cep",
      as: "input",
      placeholder: "Digite seu CEP",  
      mask: "#####-###",
      rules: Yup.string()
        .matches(/^\d{5}-\d{3}$/, "CEP inválido.")
        .required("Este campo é obrigatório"),
    },
    {
      label: "Rua",
      name: "street",
      as: "input",
      disabled: true,
      rules: Yup.string().required("Este campo é obrigatório"),
    },
    {
      label: "Bairro",
      name: "neighborhood",
      disabled: true,
      as: "input",
      rules: Yup.string().required("Este campo é obrigatório"),
    },
    {
      label: "Cidade",
      name: "city",
      disabled: true,
      as: "input",
      rules: Yup.string().required("Este campo é obrigatório"),
    },
    {
      label: "Estado",
      name: "state",
      disabled: true,
      as: "input",
      rules: Yup.string()
        .matches(/^[A-Z]{2}$/, "Deve conter somente 2 letras maiúsculas.")
        .required("Este campo é obrigatório"),
    },
    {
      label: "Renda mensal",
      name: "monthlyIncome",
      as: "currency",
      prepend: "R$",
      mask: "R$ #.###,##",
      rules: Yup.number()
        .typeError("Este campo deve ser um número válido.")
        .min(1000, "Renda mínima de R$ 1.000,00.")
        .required("Este campo é obrigatório"),
    },
    {
      label: "Possui carro?",
      name: "hasCar",
      as: "toggle",
      options: ["sim", "não"],
      rules: Yup.string()
        .test(
          "is-sim",
          'É obrigatório selecionar "sim".',
          (value) => value === "sim"
        )
        .required("Este campo é obrigatório"),
      hint: {
        text: "Porque precisamos desta informação?",
        modalContent:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis, dolores pariatur iusto harum at optio impedit, rem nam amet eos modi consectetur numquam dicta molestias error odit similique dolor nesciunt?",
      },
    },
    {
      label: "Espécie do pet",
      name: "petType",
      as: "toggle",
      options: ["cão", "gato"],
      rules: Yup.string().required("Este campo é obrigatório"),
    },
    {
      label: "Raça do pet",
      name: "petBreed",
      as: "select",
      options: (context) => {
        const petType = context?.values?.petType;
        if (petType === "cão") {
          return [
            "Labrador",
            "Poodle",
            "Bulldog",
            "Chihuahua",
            "Pastor Alemão",
            "Outra",
          ];
        } else if (petType === "gato") {
          return ["Persa", "Siamês", "Maine Coon", "Sphynx", "Bengal", "Outra"];
        }
        return [];
      },
      rules: Yup.string().required("Este campo é obrigatório"),
    },
    {
      label: "Outra raça",
      name: "otherBreed",
      as: "input",
      conditional: (context) => context?.values?.petBreed === "Outra",
      rules: Yup.string().when("petBreed", (petBreed, schema) => {
        return petBreed[0] === "Outra"
          ? schema.required("Este campo é obrigatório")
          : schema;
      }),
    },
  ],
} as FormSchema;



const resumeModal = ref({
  visible: false,
  title: "",
  content: {} as UserData,
});

const handleFormSubmit = async (values: Record<string, any>) => {
  const value = values as UserData;
  try {
    resumeModal.value.content = value;
    resumeModal.value.title = "Cadastro realizado com sucesso!";
    resumeModal.value.visible = true;
    resumeModal.value.content.monthlyIncome = formatValue(
      resumeModal.value.content.monthlyIncome
    );
    resumeModal.value.content.birthDate = formatDate(
      resumeModal.value.content.birthDate
    );
  } catch (error) {
    console.error("Erro ao validar formulário:", error);
  }
};

const formatValue = (val: string) => {
  const formatNumber = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
    maximumFractionDigits: 3,
  });
  return formatNumber.format(Number(val));
};

const formatDate = (val: string) => {
  const [year, month, day] = val.split('-');
  return `${day}/${month}/${year}`;
};
</script>
