import React from 'react'
import {BrowserRouter,Route,Routes,Router} from "react-router-dom"
import UserRegister from "./Pages/Auth/UserRegister.jsx"
import UserLogin from './Pages/Auth/UserLogin.jsx'
import FoodPartnerLogin from './Pages/Auth/FoodPartnerLogin.jsx'
import FoodPartnerRegister from './Pages/Auth/FoodPartnerRegister.jsx'
const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/user/register" element={<UserRegister/>} />
        <Route path="/user/login" element={<UserLogin/>} />
        <Route path="/food-partner/register" element={<FoodPartnerRegister/>} />
        <Route path="/food-partner/login" element={<FoodPartnerLogin/>} />
      </Routes>
    </BrowserRouter>

  )
}

export default AppRoutes
