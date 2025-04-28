import Home from "./pages/Home"
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import { Toaster } from 'react-hot-toast';
import Dashboard from "./pages/Dashboard.jsx"
import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from "./components/Header.js";

const App = () => {
  const [user, setUser] = useState(null)
  console.log("🚀 ~ App ~ user:", user)

  useEffect(()=>{
    const userData = JSON.parse(localStorage.getItem("user"))
    setUser(userData)
  },[])

  localStorage
  return (
  <BrowserRouter>
  <Header user={user}/>
    <Toaster position="top-right" reverseOrder={false} />
  <Routes>
    <Route path="/" element={user ? <Dashboard/> : <Home/>}/>
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<Signup />} />
  </Routes>
  </BrowserRouter>
  )
}

export default App
