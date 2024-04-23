import { Routes, Route } from 'react-router-dom'
import { Homepage, Login, Register } from './pages'
import { Navbar } from './components'

import { ToastContainer, Slide } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './App.css'

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>

      <ToastContainer
        position="top-center"
        autoClose={3500}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnHover={false}
        theme="light"
        transition={Slide}
        limit={10}
      />
    </div>
  )
}

export default App

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
