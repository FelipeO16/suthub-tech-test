export default async function() {
  const response = await fetch('https://dummyjson.com/recipes?limit=10&select=name,image,tags&sortBy=name&order=asc')
  return response.json()
}
