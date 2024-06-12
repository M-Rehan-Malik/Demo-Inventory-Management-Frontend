import React from 'react'
import './App.css'
import { RouterProvider } from 'react-router-dom'
import router from './Routes'

export const URL = import.meta.env.VITE_REACT_APP_API_URL

function App() {
  return (
      <RouterProvider router={router} />
  )
}

export default App
