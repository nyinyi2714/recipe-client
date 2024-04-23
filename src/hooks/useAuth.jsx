import { useStateContext } from '../StateContext'

export default function useAuth() {
  const { setUser } = useStateContext()

  /**
 * It retrieves an access token upon successful login and stores
 * it along with user data in local storage.
 * @param {string} email - The user's email address.
 * @param {string} password - The user's password.
 * 
 * @return {Promise<boolean>} - A promise that resolves to `true`
 * if login is successful, `false` otherwise.
 */
  async function login({ email, password }) {

    try {

      let response = await fetch(`${process.env.REACT_APP_BACKEND_URL}login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      if (response.ok) {
        const responseData = await response.json()

        // Save token and user in local storage
        localStorage.setItem("token", responseData.token)
        setUser(responseData.user)

        return true
      } else {
        console.error("Error logging in. Status code:", response.status)
        return false
      }
    } catch (error) {
      console.error("Error logging in:", error)
    }
  }

  /**
 * It retrieves an access token upon successful registration and 
 * stores it along with user data in local storage.
 * 
 * @param {string} username - The username.
 * @param {string} email - The user's email address.
 * @param {string} password - The user's password.
 * 
 * @return {Promise<boolean>} - A promise that resolves to `true` 
 * if registration is successful, `false` otherwise.
 */
  async function register({ username, email, password }) {
    try {
      let response = await fetch(`${process.env.REACT_APP_BACKEND_URL}signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      })

      if (response.ok) {
        const responseData = await response.json()

        // Save token and user in local storage
        localStorage.setItem("token", responseData.token)
        setUser(responseData.user)


        return true
      } else {
        console.error("Error registering. Status code:", response.status)
        return false
      }
    } catch (error) {
      console.error("Error registering:", error)
    }
  }

  /**
 * This function attempts to log out the user by sending a POST request 
 * to the backend API's logout endpoint. It removes the access token and 
 * user data from local storage upon successful logout.
 * 
 * @return {Promise<boolean>} - A promise that resolves to `true` if 
 * logout is successful, `false` otherwise.
 */
  async function logout() {
    try {
      let response = await fetch(`${process.env.REACT_APP_BACKEND_URL}logout`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      })

      if (response.ok) {

        // remove token from local storage
        localStorage.removeItem("token")
        setUser(null)
        

        return true
      } else {
        console.error("Error logging out. Status code:", response.status)
        return false
      }
    } catch (error) {
      console.error("Error logging out:", error)
    }
  }

  /**
   * This function retrieves the access token stored in local storage and fetch
   * userData from the backend API's user endpoint
   * 
   * @return {Promise<object>} - A promise that resolves to the user data object 
   * on success, `false` otherwise.
   */
  async function getUser() {
    try {
      let response = await fetch(`${process.env.REACT_APP_BACKEND_URL}user`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      })

      if (response.ok) {
        const responseData = await response.json()
        return responseData
      } else {
        console.error("Error registering. Status code:", response.status)
        return false
      }
    } catch (error) {
      console.error("Error registering:", error)
    }
  }

  return {
    login,
    register,
    logout,
    getUser,
  }
}






