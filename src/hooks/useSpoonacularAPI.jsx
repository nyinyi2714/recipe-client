export default function useSpoonacularAPI() {

  const isIngredient = async (ingredient) => {
    try {
      let response = await fetch(`https://api.spoonacular.com/food/ingredients/search?query=${ingredient}&number=1&apiKey=dd711d6019f04c348d74b6d5fcb12fe7`)
      response = await response.json()
      console.log(response)
      if(response.results[0].name.split(' ').includes(ingredient)) {
        return true
      } 
      return false

    } catch (error) {
      return false
    }
  }

  return{
    isIngredient
  }
}