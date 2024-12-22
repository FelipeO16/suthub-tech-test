import * as Yup from "yup";

export interface FormSchema {
  fields: Field[];
}

export type Name = "fullName" | "cpf" | "birthDate" | "phone" | "cep" | "street" | "neighborhood" | "city" | "state" | "monthlyIncome" | "hasCar" | "petType" | "petBreed" | "otherBreed";


export interface UserData {
  fullName: string;
  cpf: string;
  birthDate: string;
  phone: string;
  cep: string;
  street: string;
  neighborhood: string;
  city: string;
  state: string;
  monthlyIncome: string;
  hasCar: string;
  petType: string;
  petBreed: string;
  otherBreed: string;
}


export interface Field {
  label: string;
  name: Name;
  as: "input" | "currency" | "toggle" | "select";
  rules: Yup.StringSchema | Yup.NumberSchema | Yup.DateSchema;
  mask?: string;
  type?: string;
  disabled?: boolean;
  placeholder?: string;
  prepend?: string;
  options?: string[] | ((context: any) => string[]);
  hint?: {
    text: string;
    modalContent: string;
  };
  conditional?: (context: any) => boolean;
}

