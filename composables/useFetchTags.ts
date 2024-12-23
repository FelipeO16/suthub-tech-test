export default async function() {
  const response = await fetch('https://dummyjson.com/recipes/tags')
  return response.json()
}
