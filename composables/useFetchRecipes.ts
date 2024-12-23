export default async function() {
  const response = await fetch('https://dummyjson.com/recipes?limit=10&skip=10&select=name,image,tags')
  return response.json()
}
