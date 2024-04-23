export default function fetchRecipesInvalidStub(ingredient, filter) {

  return new Promise(resolve => {
    const dummyRecipes = [
      {
        name: "pasta",
        ingredients: ["Tomatoes", "Basil", "Garlic", "Salt", "Pepper"],
        tags: ["vegan", "keto"]
      },
      {
        name: "pizza",
        ingredients: ["Tomatoes", "Basil", "Garlic", "Salt", "Pepper"],
        tags: []
      },
      {
        name: "apple pie",
        ingredients: ["Apple", "Flour", "Milk", "Salt"],
        tags: ["vegan"]
      },
    ]

    setTimeout(() => resolve({
      success: true,
      error: '',
      recipes: []
    }), 1000) // Simulate async API call delay
  })
}