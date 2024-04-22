export default function fetchRecipesByIngredientsStub(ingredient) {

  return new Promise(resolve => {
    const dummyRecipes = [
      {
        name: "chicken pasta",
        ingredients: ["Tomatoes", "Basil", "Garlic", "Salt", "Pepper"],
        tags: ["breakfast", "vegan", "keto"]
      },
    ]

    setTimeout(() => resolve({
      success: true,
      error: '',
      recipes: dummyRecipes
    }), 1000) // Simulate async API call delay
  })
}