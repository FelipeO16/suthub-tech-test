import * as Yup from "yup";


export const useCpfValidation = () => {
  function validateCPF(cpf: string): boolean {
    cpf = cpf.replace(/[^\d]+/g, '');

    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
      return false;
    }

    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let firstDigit = 11 - (sum % 11);
    if (firstDigit >= 10) {
      firstDigit = 0;
    }
    if (firstDigit !== parseInt(cpf.charAt(9))) {
      return false;
    }
  
    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += parseInt(cpf.charAt(i)) * (11 - i);
    }
    let secondDigit = 11 - (sum % 11);
    if (secondDigit >= 10) {
      secondDigit = 0;
    }
    if (secondDigit !== parseInt(cpf.charAt(10))) {
      return false;
    }
  
    return true;
  }

  const cpfValidation = Yup.string()
  .test('valid-cpf', 'CPF inválido', (value) => value ? validateCPF(value) : false)
  .required('Este campo é obrigatório');
    
  return cpfValidation
}
