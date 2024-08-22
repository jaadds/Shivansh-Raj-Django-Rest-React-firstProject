import React from "react"
import { BrowserRouter as Router, Route, Routes, Navigate, BrowserRouter } from 'react-router-dom';
import Login from "./pages/login";
import Home from "./pages/home";
import Notfound from "./pages/notfound";
import Register from "./pages/register";
import ProtectedRoute from "./components/ProtectedRoute"

function Logout() {
  localStorage.clear()
  return <Navigate to="/login"/>
}

function RegisterandLogin() {
  localStorage.clear()
  return <Register />
}
// function LoginUser() {
//   // localStorage.clear()
//   return <Login />
// }

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route 
            path = "/"
            element = {
              // This protected Route is going to act like a firewall we cant access home untill Protected route is ran
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path = "/register" element = {<RegisterandLogin />}/>
          <Route path = "*" element = {<Notfound />}/>  
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
