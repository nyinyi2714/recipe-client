import { useEffect, useState, useRef } from 'react'
import { Recipe } from '../../components'
import { GridLoader } from "react-spinners"
import CloseSvg from '../../assets/x-thin.svg'
import './Homepage.css'

import { toast } from 'react-toastify'
import {
  fetchRecipesByIngredientsStub,
  fetchRecipesInvalidStub,
  fetchRecipesNotFoundStub,
} from '../../stubs'

export default function Homepage() {
  const [textInput, setTextInput] = useState('')
  const [recipes, setRecipes] = useState([])
  const [filteredRecipes, setFilteredRecipes] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [searchedIngredients, setSearchedIngredients] = useState([])
  const [filters, setFilters] = useState([])

  const filterFormRef = useRef()

  const handleInputChange = (e) => {
    setErrorMessage('')
    toast.dismiss()

    // Get the raw input
    const rawInput = e.target.value

    // if exceed max characters (200), trigger an error toast
    if (rawInput.length > 200) {
      toast.error("Exceeded Max Characters.")
      return
    }

    // Keep only alphabetic characters
    const cleanedInput = rawInput.replace(/[^a-zA-Z, ]/g, '')
    setTextInput(cleanedInput)
  }

  const handleSearch = async (e) => {
    e.preventDefault()

    const rawIngredientsString = textInput


    // split the string into array using "," and trim trailing whitespace 
    // filter empty ingredients and convert to lowercase for standardized search query
    let formattedIngredients = rawIngredientsString.split(',')
      .map(ingredient => ingredient.trim().toLowerCase())
      .filter(ingredient => ingredient.length > 0)

    // Convert the array to a Set to remove duplicates
    const uniqueIngredientsSet = new Set(formattedIngredients);

    // If you need to convert the Set back to an array
    const uniqueIngredientsArray = Array.from(uniqueIngredientsSet);

    if (uniqueIngredientsArray.length <= 0) {
      toast.error("Please type at least 1 valid ingredient.")
      return
    }

    reset(false)
    setIsLoading(true)

    let fetchFunc = fetchRecipesByIngredientsStub
    if (uniqueIngredientsArray[0] === 'table') fetchFunc = fetchRecipesInvalidStub
    else if (uniqueIngredientsArray[0] === 'orange') fetchFunc = fetchRecipesNotFoundStub

    const { success, error, recipes } = await fetchFunc(uniqueIngredientsArray)

    if (!success) {
      setErrorMessage(error)
      setSearchedIngredients(uniqueIngredientsArray)
      setIsLoading(false)
      return
    }

    setRecipes(recipes)
    setSearchedIngredients(uniqueIngredientsArray)

    // if filters are applied, filter the recipes list
    if(filters.length > 0) {
      const tempRecipes = filterRecipesByTags(recipes, filters)
      setFilteredRecipes(tempRecipes)
    } else {
      setFilteredRecipes(recipes)
    }

    setIsLoading(false)
  }

  const handleFilters = (e) => {
    const filter = e.target.id
    const isChecked = e.target.checked
    if(isChecked) setFilters(prev => [...prev, filter])
    else setFilters(prev => removeFilter(prev, filter))
  }

  useEffect(() => {
    if(filters.length <= 0) {
      setFilteredRecipes(recipes)
    } else {
      setFilteredRecipes(filterRecipesByTags(recipes, filters))
    }
  }, [filters])

  const reset = (isResetFilter = true) => {
    toast.dismiss()
    setRecipes([])
    setFilteredRecipes([])
    setSearchedIngredients([])
    setTextInput('')
    setErrorMessage('')
    setIsLoading(false)
    if(isResetFilter) {
      setFilters([])
      filterFormRef.current.reset()
    }
  }

  const removeSearchedIngredient = (e) => {
    const filteredSearchedIngredients = searchedIngredients.filter(i => i !== e.target.id)
    setSearchedIngredients(filteredSearchedIngredients)
  }

  // Function to get recipes with tags that include all filters in the filters array
  const filterRecipesByTags = (recipes, filters) => {
    return recipes.filter((recipe) => {
      // Ensure every filter in the filters array is included in the recipe's tags
      return filters.every((filter) => recipe.tags.includes(filter));
    });
  };

  // Function to remove a filter from the filters array
  const removeFilter = (filters, filterToRemove) => {
    return filters.filter((filter) => filter !== filterToRemove);
  };

  return (
    <section className='homepage'>
      <form className="filter" ref={filterFormRef}>
        <h2>Dietary Restrictions</h2>
        <div className="checkbox-container">
          <label htmlFor="keto"><input onChange={handleFilters} className="focus:ring-0 focus:ring-transparent" type="checkbox" name="keto" id="keto" /> Keto</label>
          <label htmlFor="vegan"><input onChange={handleFilters} className="focus:ring-0 focus:ring-transparent" type="checkbox" name="vegan" id="vegan" /> Vegan</label>
          <label htmlFor="gluten-free"><input onChange={handleFilters} className="focus:ring-0 focus:ring-transparent" type="checkbox" name="gluten-free" id="gluten-free" /> Gluten Free</label>
          <label htmlFor="low-calories"><input onChange={handleFilters} className="focus:ring-0 focus:ring-transparent" type="checkbox" name="low-calories" id="low-calories" /> Low Calories</label>
        </div>
      </form>
      <div>
        <form onSubmit={handleSearch}>
          <div className='searchbar-container'>
            <input
              type="search"
              value={textInput}
              onChange={handleInputChange}
              className='search'
              placeholder="Enter Ingredients"
            />
            <button name="search" type='submit' className='btn search-btn'>Search</button>
            <button
              onClick={() => reset()}
              name="reset"
              type='button'
              className='btn reset-btn'
            >
              Reset
            </button>
          </div>
          <div className="searched-ingredients">
            {searchedIngredients.map((ingredient, index) =>
              <button type="button" role="button" key={index}>
                {ingredient}
                <img onClick={removeSearchedIngredient} id={ingredient} src={CloseSvg} alt="close icon" />
              </button>
            )}
          </div>

        </form>

        {
          isLoading &&
          <div className="full-screen" data-testid="spinner">
            <GridLoader color="#007bff" size={15} margin={2} />
          </div>
        }

        {
          errorMessage.length > 0 &&
          <p className='error-message'>{errorMessage}</p>
        }

        {
          recipes.length > 0 && filteredRecipes.length <= 0 &&
          <p className='error-message'>No recipe found with the current filters.</p>
        }

        {!isLoading && recipes.length > 0 &&
          <div className='recipes-container'>
            {filteredRecipes.map((recipe, index) => <Recipe recipe={recipe} key={index} />)}
          </div>
        }
      </div>
    </section>
  )
}
