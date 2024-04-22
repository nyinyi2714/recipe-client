import { createContext, useContext, useState } from 'react'

const StateContext = createContext()

export function useStateContext() {
  return useContext(StateContext)
}

export function StateContextProvider({ children }) {
  const [user, setUser] = useState(null)
  const [myCourse, setMyCourse] = useState(null)
  const [courses, setCourses] = useState([
    {
      "id": 28,
      "notes_pdf": "https://hackathon1-today-19.s3.amazonaws.com/Lecture1.pdf",
      "course_title": "Comp 541",
      "instructor": "john",
      "semester": "fall",
      "user": 11,
      "year": 2024
    },
    {
      "id": 29,
      "notes_pdf": "https://hackathon1-today-19.s3.amazonaws.com/Lecture1_n8PqZ2v.pdf",
      "course_title": "comp 110",
      "instructor": "john",
      "semester": "fall",
      "user": 11,
      "year": 2024
    },
    {
      "id": 30,
      "notes_pdf": "https://hackathon1-today-19.s3.amazonaws.com/Lecture2_e9uRGua.pdf",
      "course_title": "comp 101",
      "instructor": "john",
      "semester": "fall",
      "user": 11,
      "year": 2024
    },
    {
      "id": 31,
      "notes_pdf": "https://hackathon1-today-19.s3.amazonaws.com/Lecture3.pdf",
      "course_title": "comp 300",
      "instructor": "john",
      "semester": "fall",
      "user": 11,
      "year": 2024
    }
  ]
)

  const states = {
    user,
    setUser,
    courses,
    setCourses,
    myCourse,
    setMyCourse
  }

  return (
    <StateContext.Provider value={states}>
      {children}
    </StateContext.Provider>
  )
}

export default StateContext
