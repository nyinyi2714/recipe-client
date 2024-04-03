import { useState } from 'react';
import axios from 'axios';

function Homepage() {
  const [textInput, setTextInput] = useState('');
  const [recipes, setRecipes] = useState([]);

  const handleInputChange = (event) => {
    setTextInput(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/api/input', { 
        recipe_name: textInput,
        ingredients: [],
       });

      console.log('Response:', response.data);
      setRecipes(response.data)

    } catch (error) {
      console.error('Error:', error);
      // Handle error
    }
  };

  return (
    <div style={styles.container}>
      <input
        type="text"
        value={textInput}
        onChange={handleInputChange}
        style={styles.input}
        placeholder="Enter text"
      />
      <button onClick={handleSubmit} style={styles.button}>Search</button>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '20px',
  },
  input: {
    padding: '10px',
    margin: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    width: '300px',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
};

export default Homepage;
