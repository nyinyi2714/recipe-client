import { useState } from 'react';
import Recipe from '../../components/Recipe/Recipe';
import { GridLoader } from "react-spinners";
import './Homepage.css';

export default function Homepage() {
  const [textInput, setTextInput] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (event) => {
    setTextInput(event.target.value);
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    const recipesData = await fetchIngredientsStub();
    setIsLoading(false);
    setRecipes(recipesData);
  }

  const fetchIngredientsStub = () => {
    return new Promise(resolve => {
      const dummyRecipes = [
        {
          name: "chicken pasta",
          ingredients: ["Tomatoes", "Basil", "Garlic", "Salt", "Pepper"],
          tags: ["breakfast", "vegan", "keto"]
        },
      ]
      setTimeout(() => resolve(dummyRecipes), 1000); // Simulate async API call delay
    });
  }

  return (
    <section className='homepage'>

      <form onSubmit={handleSearch}>
        <input
          type="search"
          value={textInput}
          onChange={handleInputChange}
          className='search'
          placeholder="Enter Recipe"
        />
        <button role='submit' className='search-btn'>Search</button>
      </form>

      {
        isLoading &&
        <div className="spinner">
          <GridLoader color="#007bff" size={15} margin={2} />
        </div>
      }

      { !isLoading && recipes.length > 0 &&
        <div className='recipes-container'>
          {recipes.map((recipe, index) => <Recipe recipe={recipe} key={index} />)}
        </div>
      }

    </section>
  );
}
