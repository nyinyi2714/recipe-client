import { useEffect, useState, useRef } from 'react'
import { Recipe } from '../../components'
import { GridLoader } from "react-spinners"
import { useDictionaryAPI } from '../../hooks'
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
  const [errorMessage, setErrorMessage] = useState('')
  const [searchedIngredients, setSearchedIngredients] = useState([])
  const [mispelledIngredients, setMispelledIngredients] = useState([])
  const [filters, setFilters] = useState([])

  const filterFormRef = useRef()
  const { checkWord } = useDictionaryAPI()

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
    
    const { 
      uniqueIngredients, 
      mispelledIngredients 
    } = await formatRawIngredientsList(textInput, checkWord)


    if (uniqueIngredients.length <= 0) {
      toast.error("Please type at least 1 valid ingredient.")
      return
    }

    reset(false)
    setIsLoading(true)

    let fetchFunc = fetchRecipesByIngredientsStub
    if (uniqueIngredients[0] === 'table') fetchFunc = fetchRecipesInvalidStub
    else if (uniqueIngredients[0] === 'orange') fetchFunc = fetchRecipesNotFoundStub

    const { success, error, recipes } = await fetchFunc(uniqueIngredients)

    if (!success) {
      setErrorMessage(error)
      setSearchedIngredients(uniqueIngredients)
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

    setMispelledIngredients(mispelledIngredients)
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
    setMispelledIngredients([])
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
            {
              searchedIngredients.map((ingredient, index) =>
                <button type="button" role="button" key={index}>
                  {ingredient}
                  <img onClick={removeSearchedIngredient} id={ingredient} src={CloseSvg} alt="close icon" />
                </button>
            )}
          </div>

          {
            mispelledIngredients.length > 0 &&
            <p className='mispelled-ingredients'>Mispelled Ingredients: {mispelledIngredients.join(', ')}</p>
          }

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
