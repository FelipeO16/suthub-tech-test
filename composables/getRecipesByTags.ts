export default async function (tags: string[]) {
  if (tags.length) {
    const {data} = await useFetch(
      `https://dummyjson.com/recipes/tag/${tags[0]}?&select=name,image,tags`
    );
    const recipesByTag = data.value.recipes.filter((recipe) =>
      tags.every((tag) => recipe.tags.includes(tag))
    );
    return recipesByTag;
  }
    const { data } = await useFetch("https://dummyjson.com/recipes?limit=10&skip=10&select=name,image,tags");
    return data.value.recipes; 
}
