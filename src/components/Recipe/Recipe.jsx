import './Recipe.css'

export default function Recipe({ recipe }) {

  const { name, ingredients, tags } = recipe;

  return(
    <div className='recipe'>
      <h3>{name}</h3>
      <ul>
        <h4>Ingredients:</h4>
        {ingredients.map((ingredient, index) => <li key={index}>{ingredient}</li>)}
      </ul>
      <div className="tag-container">
        {tags.map((tag, index) => <span className='tag' key={index}>{tag}</span>)}
      </div>
    </div>
  )
}