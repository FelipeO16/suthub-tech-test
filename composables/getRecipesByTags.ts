export default async function (tags: string[]) {
  const recipes = ref([]);
  if (tags.length > 1) {
    const {data} = await useFetch(
      `https://dummyjson.com/recipes/tag/${tags[0]}?&select=name,image,tags`
    );
    const recipesByTag = data.value.recipes.filter((recipe) =>
      recipe.tags.includes(tags[1])
    );
    recipes.value = recipesByTag;
  } else if (tags.length == 1) {
    const {data} = await useFetch(
      `https://dummyjson.com/recipes/tag/${tags[0]}?&select=name,image,tags`
    );
    recipes.value = data.value.recipes;
  } else {
    const { data } = await useFetch("https://dummyjson.com/recipes");
    recipes.value = data.value.recipes; 
  }

  return recipes.value;
};
