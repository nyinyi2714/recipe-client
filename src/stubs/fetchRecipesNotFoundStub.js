export default function fetchRecipesNotFoundStub(ingredient) {

  return new Promise(resolve => {

    setTimeout(() => resolve({
      success: false,
      error: 'No recipe found with the input ingredient list.',
      recipes: []
    }), 1000) // Simulate async API call delay
  })
}