import React from 'react'
import {BrowserRouter,Route,Routes,Router} from "react-router-dom"
import UserRegister from "./Pages/Auth/UserRegister.jsx"
import UserLogin from './Pages/Auth/UserLogin.jsx'
import FoodPartnerLogin from './Pages/Auth/FoodPartnerLogin.jsx'
import FoodPartnerRegister from './Pages/Auth/FoodPartnerRegister.jsx'
import Home from "./Pages/General/Home.jsx"
import CreateFood from './Pages/food-partner/CreateFood.jsx'
import Profile from './Pages/food-partner/Profle.jsx'
const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/user/register" element={<UserRegister/>} />
        <Route path="/user/login" element={<UserLogin/>} />
        <Route path="/food-partner/register" element={<FoodPartnerRegister/>} />
        <Route path="/food-partner/login" element={<FoodPartnerLogin/>} />
        <Route path="/" element={<Home/>}/>
        <Route path="/create-food" element={<CreateFood/>}/>
         <Route path="/food-partner/:id" element={<Profile/>} />
      </Routes>
    </BrowserRouter>

  )
}

export default AppRoutes
