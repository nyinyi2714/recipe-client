import './Login.css'
import { Link, useNavigate } from 'react-router-dom'
import {useAuth} from '../../hooks'
import { useState } from 'react'

/**
 * Component for user login.
 * @returns {JSX.Element} - The rendered Login component.
 */
export default function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()
 
  // State to manage form data
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  /**
   * Updates the form data based on user input.
   * @param {Object} e - The event object.
   */
  const handleFormInput = (e) => {
    setFormData(prevStates => ({
      ...prevStates,
      [e.target.id]: e.target.value,
    }))
  }

  /**
   * Handles the login process.
   * @param {Object} e - The event object.
   */
  const handleLogin = async (e) => {
    e.preventDefault()

    // Attempt to login using the provided credentials
    const success = await login(formData)

    // If login is successful, redirect to homepage
    if(success) navigate('/')
    // Else, display an error message
    else {
      // TODO: Implement error handling
    }
  }

  return (
    <section className="login">
      <form onSubmit={handleLogin}>
        <h2>Login</h2>
        {/* Email input */}
        <div className="mb-6">
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email address</label>
          <input 
            value={formData.email} 
            onChange={handleFormInput} 
            type="email" 
            id="email" 
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
            placeholder="john.doe@gmail.com" 
            required 
          />
        </div>
        {/* Password input */}
        <div className="mb-6">
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
          <input 
            value={formData.password} 
            onChange={handleFormInput} 
            type="password" 
            id="password" 
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
            placeholder="•••••••••" 
            required 
          />
        </div>

        {/* Login button */}
        <button 
          type="submit" 
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Login
        </button>
        {/* Link to registration page */}
        <p>Don't have an account? <Link className="text-blue-700" to="/register">Register Here</Link></p>
      </form>
    </section>
  )
}
