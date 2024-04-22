import './Recipe.css'
import { Link } from 'react-router-dom'

export default function Recipe({ recipe }) {

  const { name, ingredients, tags } = recipe

  return (
    <Link to="/" className='recipe'>
      <img src="https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg" alt="recipe" />
      <div className="content">
        <h3>{name}</h3>
        <p>
          <span>Ingredients: </span>
          {ingredients.join(', ')}
        </p>

        <div className="tag-container">
          {tags.map((tag, index) => <span className='tag' key={index}>{tag}</span>)}
        </div>
      </div>

    </Link>
  )
}