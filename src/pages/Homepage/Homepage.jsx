import { useEffect, useState, useRef } from 'react'
import { Recipe } from '../../components'
import { GridLoader } from "react-spinners"
import { useDictionaryAPI, useSpoonacularAPI } from '../../hooks'
import { filterRecipesByTags, formatRawIngredientsList, removeFilter } from '../../utils'
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
  const [searchedIngredients, setSearchedIngredients] = useState([])
  const [invalidIngredients, setinvalidIngredients] = useState([])
  const [filters, setFilters] = useState([])

  const filterFormRef = useRef()
  const { isWord } = useDictionaryAPI()
  const { isIngredient } = useSpoonacularAPI()

  const handleInputChange = (e) => {
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
    reset(false)

    // Error for empty search input
    if(textInput.length <= 0) {
      toast.error('Please Enter an ingredient to search.')
      return
    }
    
    setIsLoading(true)

    const { 
      uniqueIngredients, 
      invalidIngredients 
    } = await formatRawIngredientsList(textInput, isWord, isIngredient)
    
    let fetchFunc = fetchRecipesByIngredientsStub
    if (uniqueIngredients[0] === 'orange') fetchFunc = fetchRecipesNotFoundStub

    const { success, error, recipes } = await fetchFunc(uniqueIngredients)

    if (!success) {
      setSearchedIngredients(uniqueIngredients)
      setinvalidIngredients(invalidIngredients)
      setIsLoading(false)
      return
    }

    setRecipes(recipes)
    setSearchedIngredients(uniqueIngredients)

    // if filters are applied, filter the recipes list
    if(filters.length > 0) {
      const tempRecipes = filterRecipesByTags(recipes, filters)
      setFilteredRecipes(tempRecipes)
    } else {
      setFilteredRecipes(recipes)
    }

    setinvalidIngredients(invalidIngredients)
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
    setinvalidIngredients([])
    setTextInput('')
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
              disabled={isLoading}
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
            {
              searchedIngredients.map((ingredient, index) =>
                <button type="button" role="button" key={index}>
                  {ingredient}
                  <img onClick={removeSearchedIngredient} id={ingredient} src={CloseSvg} alt="close icon" />
                </button>
            )}
          </div>

          {
            invalidIngredients.length > 0 &&
            <p className='invalid-ingredients'>Invalid ingredient{invalidIngredients.length > 1 && 's'}: {invalidIngredients.join(', ')}</p>
          }

        </form>

        {
          isLoading &&
          <div className="full-screen" data-testid="spinner">
            <GridLoader color="#007bff" size={15} margin={2} />
          </div>
        }
  
        {
          recipes.length > 0 && filteredRecipes.length <= 0 &&
          <p className='error-message'>No recipe found with the currently applied filters.</p>
        }

        {
          searchedIngredients <= 0 && invalidIngredients.length > 0 &&
          <p className='error-message'>Invalid ingredients list.</p>
        }

        {
          !isLoading && recipes.length <= 0 && searchedIngredients.length > 0 &&
          <p className='error-message'>No recipe found for the entered ingredients list.</p>
        }

        {!isLoading && recipes.length > 0 && searchedIngredients.length > 0 &&
          <div className='recipes-container'>
            {filteredRecipes.map((recipe, index) => <Recipe recipe={recipe} key={index} />)}
          </div>
        }
      </div>
    </section>
  )
}
