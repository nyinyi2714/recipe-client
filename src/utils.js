export const formatRawIngredientsList = async (rawIngredientsList, isWord, isIngredient) => {
  console.log(rawIngredientsList)

  // split the string into array using "," and trim trailing whitespace 
  // filter empty ingredients and convert to lowercase for standardized search query
  let formattedIngredients = rawIngredientsList.split(',')
    .map(ingredient => ingredient.trim().toLowerCase())
    .filter(ingredient => ingredient.length > 0)

  // Convert the array to a Set to remove duplicates
  formattedIngredients = new Set(formattedIngredients)

  // If you need to convert the Set back to an array
  formattedIngredients = Array.from(formattedIngredients)

  let ingredientsList = {
    uniqueIngredients: [],
    invalidIngredients: []
  }

  // Filter out invalid words and invalid ingredients
  for(const i of formattedIngredients) {

    const isWordFlag = await isWord(i)
    if(isWordFlag && await isIngredient(i)) {
      ingredientsList.uniqueIngredients.push(i)
    }
    else ingredientsList.invalidIngredients.push(i)
  }

  console.log(ingredientsList)

  return ingredientsList
}

// Function to get recipes with tags that include all filters in the filters array
export const filterRecipesByTags = (recipes, filters) => {
  return recipes.filter((recipe) => {
    // Ensure every filter in the filters array is included in the recipe's tags
    return filters.every((filter) => recipe.tags.includes(filter));
  });
};

// Function to remove a filter from the filters array
export const removeFilter = (filters, filterToRemove) => {
  return filters.filter((filter) => filter !== filterToRemove);
};