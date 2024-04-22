import { useEffect, useState } from 'react'
import { Recipe } from '../../components'
import { GridLoader } from "react-spinners"
import CloseSvg from '../../assets/x-thin.svg'
import './Homepage.css'

import { fetchRecipesByIngredientsStub } from '../../stubs'
import { toast } from 'react-toastify'

export default function Homepage() {
  const [textInput, setTextInput] = useState('')
  const [recipes, setRecipes] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [searchedIngredients, setSearchedIngredients] = useState([])

  const handleInputChange = (e) => {
    setErrorMessage('')

    // Get the raw input
    const rawInput = e.target.value;

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

    console.log(uniqueIngredientsArray)

    if (uniqueIngredientsArray.length <= 0) {
      toast.error("Please type at least 1 valid ingredient.")
      return
    }

    reset()
    setIsLoading(true)

    const { success, error, recipes } = await fetchRecipesByIngredientsStub(uniqueIngredientsArray)

    if (!success) {
      setErrorMessage(error)
      setIsLoading(false)
      return
    }
    
    setRecipes(recipes)
    setSearchedIngredients(uniqueIngredientsArray)
    setIsLoading(false)
  }

  const reset = () => {
    toast.dismiss()
    setRecipes([])
    setSearchedIngredients([])
    setTextInput('')
    setErrorMessage('')
    setIsLoading(false)

  }

  const removeSearchedIngredient = (e) => {
    const filteredSearchedIngredients = searchedIngredients.filter(i => i !== e.target.id)
    setSearchedIngredients(filteredSearchedIngredients)
  }

  return (
    <section className='homepage'>

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

      {!isLoading && recipes.length > 0 &&
        <div className='recipes-container'>
          {recipes.map((recipe, index) => <Recipe recipe={recipe} key={index} />)}
        </div>
      }

    </section>
  )
}
