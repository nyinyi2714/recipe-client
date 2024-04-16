import { Routes, Route } from 'react-router-dom'
import Homepage from './pages/Homepage/Homepage'
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Homepage />} />
      </Routes>
    </div>
  );
}

export default App;

// {
//   recipes: [ 
//     {
//       name: "chicken pasta", 
//       ingredients: ["1 lb of chicken breast", "2 eggs", "3 cups of flour"],
//       image_url: "http://asdf",
//       instructions: "some text",
//       tags: ["breakfast", "vegan", "keto"]
//     },
//     {
//       // more recipe object
//     }
//   ]
// }
