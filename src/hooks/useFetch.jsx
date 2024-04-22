export default function useFetch() {
  async function fetchRecipes(ingredients) {
    try {
      let response = await fetch(`${process.env.REACT_APP_BACKEND_URL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify()
      })
  
      if (response.ok) {
        const responseData = await response.json()
        return responseData
      } else {
        console.error("Error fetching. Status code:", response.status)
        return false
      }
    } catch (error) {
      console.error("Error fetching:", error)
    }
  }

  async function fetchAllCourses() {
    try {
      let response = await fetch(`${process.env.REACT_APP_BACKEND_URL}`, {
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
        console.error("Error fetching. Status code:", response.status)
        return false
      }
    } catch (error) {
      console.error("Error fetching:", error)
    }
  }

  return {
    fetchRecipes,
    fetchAllCourses
  }
}