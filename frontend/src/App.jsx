import React from 'react'
import { BrowserRouter , Routes, Route, Navigation, Navigate } from 'react-router-dom'
import Register from './pages/Register'
import Login0 from './pages/login'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import ProtectedRoute from './components/ProtectsRoute'


function Logout(){
  localStorage.clear()
  return <Navigate to="login" />
}

function RegisterAndLogout(){
  localStorage.clear()
  return < Register />

}


function App() {
  return (
    <div>App</div>
  )
}

export default App