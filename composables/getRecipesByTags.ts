export default async function (tags: string[]) {
  if (tags.length) {
    const response = await $fetch(
      `https://dummyjson.com/recipes/tag/${tags[0]}?&select=name,image,tags&sortBy=name&order=asc`
    );
    const recipesByTag = response.recipes.filter((recipe) =>
      tags.every((tag) => recipe.tags.includes(tag))
    );
    return recipesByTag;
  }
    const { data } = await useFetch("https://dummyjson.com/recipes?limit=10&select=name,image,tags&sortBy=name&order=asc");
    return data.value.recipes; 
}
