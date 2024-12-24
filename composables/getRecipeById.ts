export default async function (id: number) {
  const response = await $fetch(
    'https://dummyjson.com/recipes/' + id
  );
  return response;
}
