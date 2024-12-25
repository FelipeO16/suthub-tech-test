# Aplicativo Web - Teste SUTHUB

Este repositório contém a solução para o teste da SUTHUB, desenvolvido utilizando **Vue 3**, **Nuxt 3**, **Headless UI**, **TailwindCSS** e **TypeScript**. A aplicação é responsiva e cumpre todos os requisitos estabelecidos no desafio. Abaixo, segue uma descrição detalhada das funcionalidades implementadas e instruções para execução.

## Funcionalidades

### Página 1: Cadastro de Usuário
[Cadastro de Usuário](https://suthub-tech-test.nuxt.dev/register)

![image](https://github.com/user-attachments/assets/4a80efaa-8d31-42cd-a468-cfabaa551a70)


Formulário de cadastro contendo os seguintes campos obrigatórios:
- **Nome completo**: Validação para pelo menos 2 palavras.
- **CPF**: Validação de CPF válido, com máscara automática.
- **Data de nascimento**: Formato brasileiro, com validação de idade entre 18 e 65 anos.
- **Telefone celular**: Validação de número com código de área e máscara automática.
- **CEP**: Máscara automática, com busca automática de endereço para os campos:
  - Rua
  - Bairro
  - Cidade
  - Estado (somente 2 letras maiúsculas)
- **Renda mensal**: Apenas números, com prepend de "R$" e valor mínimo de R$ 1000,00.
- **Possui carro**: Toggle obrigatório (somente "sim" permitido), com link que abre uma modal explicativa.
- **Espécie do pet**: Toggle entre “cão” ou “gato”.
- **Raça do pet**: Select dinâmico com opções baseadas na espécie selecionada e campo adicional para "outro" caso selecionado.

Validação completa para garantir que nenhum campo seja enviado incorretamente. Caso tudo esteja correto, os dados são apresentados em uma modal ou página para conferência do usuário.

### Página 2: Galeria de Receitas e Busca por Tags

[Galeria de Receitas e Busca por Tags](https://suthub-tech-test.nuxt.dev/recipes)

![image](https://github.com/user-attachments/assets/68a43014-0809-4616-a427-ed963216220a)


Utiliza a API de Recipes (https://dummyjson.com/docs/recipes) para:
- Apresentar uma galeria de receitas com:
  - Imagem do prato
  - Nome da receita
  - Tags
- Permitir filtro por tags associadas às receitas:
  - Exibe tags em ordem alfabética
  - Implementa busca funcional de tags

Ao clicar em uma receita, apresenta-se uma modal ou página com:
- Nome da receita
- Imagem do prato
- Tags
- Tempo total de preparação (soma de prep time e cook time)
- Avaliação (exibida com ícones ou emojis)
- Número de porções (exibido com ícones ou emojis)
- Ingredientes (lista numerada)
- Instruções (lista numerada)

Quando nenhuma receita correspondente é encontrada, exibe mensagem amigável sugerindo nova busca.

### Página 3: Lista e Busca de Usuários

[Lista e Busca de Usuários](https://suthub-tech-test.nuxt.dev/search)

![image](https://github.com/user-attachments/assets/730eafc0-f127-466a-a5e5-2b3a1c124193)


Utiliza a API de Users (https://dummyjson.com/docs/users) para:
- Apresentar uma tabela paginada (20 itens por página), ordenada alfabeticamente por nome, com:
  - Foto do usuário
  - Nome completo
  - Data de nascimento (formato brasileiro)
  - Gênero
  - Localização (endereço completo)
  - Botão que abre o Google Maps na localização geográfica do usuário
- Campo de busca por nome do usuário:
  - Realiza consulta na API e exibe resultados em ordem alfabética

## Tecnologias Utilizadas

- **Vue 3**: Framework JavaScript progressivo.
- **Nuxt 3**: Framework baseado em Vue para aplicações server-side e single-page.
- **Headless UI**: Componentes acessíveis para interfaces modernas.
- **TailwindCSS**: Framework CSS utilitário para design responsivo.
- **TypeScript**: Superset do JavaScript que adiciona tipagem estática.

## Instruções para Execução

### Requisitos
- Node.js v16 ou superior
- Gerenciador de pacotes npm ou yarn

### Passos
1. Clone este repositório:
   ```bash
   git clone <URL_DO_REPOSITORIO>
   cd <NOME_DO_REPOSITORIO>
   ```

2. Instale as dependências:
   ```bash
   npm install
   # ou
   yarn install
   ```

3. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   # ou
   yarn dev
   ```

4. Acesse a aplicação no navegador:
   ```
   http://localhost:3000
   ```

### Build para Produção
1. Gere os arquivos otimizados:
   ```bash
   npm run generate
   # ou
   yarn generate
   ```

### Deploy
A aplicação foi implantada utilizando o **Nuxt Hub**, garantindo acessibilidade online e gerenciamento de build otimizado.

## Demonstração
A aplicação está disponível online para navegação através do link principal:

- [https://suthub-tech-test.nuxt.dev/](https://suthub-tech-test.nuxt.dev/)

Você também pode acessar as páginas individualmente:

- Página de cadastro: [https://suthub-tech-test.nuxt.dev/register](https://suthub-tech-test.nuxt.dev/register)
- Página de receitas: [https://suthub-tech-test.nuxt.dev/recipes](https://suthub-tech-test.nuxt.dev/recipes)
- Página de usuários: [https://suthub-tech-test.nuxt.dev/search](https://suthub-tech-test.nuxt.dev/search)

### Responsivo
![image](https://github.com/user-attachments/assets/2dad3c21-2138-4d11-9cbe-121183d39327)![image](https://github.com/user-attachments/assets/7a43d7a3-85f7-4a21-872e-b470c07f5c0f)![image](https://github.com/user-attachments/assets/924460db-03d7-443d-9fc0-309cf3d60a2c)




## Licença
Este projeto está licenciado sob a [MIT License](LICENSE).

