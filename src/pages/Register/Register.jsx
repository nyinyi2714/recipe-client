import './Register.css'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks'
import { useState } from 'react'

/**
 * Component for user registration.
 * @returns {JSX.Element} - The rendered Register component.
 */
export default function Register() {
  const navigate = useNavigate()
  const { register } = useAuth()

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
   * Handles the registration process.
   * @param {Object} e - The event object.
   */
  const handleRegister = async (e) => {
    e.preventDefault()

    // Attempt to register the user using the provided data
    const success = await register(formData)

    // If registration is successful, redirect to homepage
    if(success) navigate('/')
    // Else, display an error message
    else {
      // TODO: Implement error handling
    }
  }

  return (
    <section className="register">
      <form onSubmit={handleRegister}>
        <h2>Register</h2>
        <div className='flex-container'>
          {/* Email input */}
          <div>
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
          <div>
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
          {/* Confirm Password input */}
          <div>
            <label htmlFor="confirm_password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
            <input 
              type="password" 
              id="confirm_password" 
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
              placeholder="•••••••••" 
              required 
            />
          </div>
        </div>

        {/* Register Button */}
        <button 
          type="submit" 
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Register
        </button>
        {/* Link to login page */}
        <p>Already have an account? <Link className="text-blue-700" to="/login">Login Here</Link></p>
      </form>
    </section>
  )
}
