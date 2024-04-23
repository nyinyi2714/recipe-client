export default function fetchRecipesInvalidStub(ingredient) {

  return new Promise(resolve => {

    setTimeout(() => resolve({
      success: false,
      error: 'Invalid Ingredients List.',
      recipes: []
    }), 1000) // Simulate async API call delay
  })
}