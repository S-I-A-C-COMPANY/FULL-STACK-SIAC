import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import React from 'react';
// Layout
import Login from "./components/pages/Login/Login";
import Register from "./components/pages/Register/Register";
import { Home } from "./components/pages/Home/Home";
import { ForgotPassword } from "./components/pages/ForgotPassword/ForgotPassword";
import { Profile } from "./components/pages/Profile/Profile";
import { ResetPassword } from "./components/pages/ResetPassword/ResetPassword";
import { Products } from "./components/pages/Products/Products";
import { Notifications } from "./components/pages/Notifications/Notifications";
import { Users } from "./components/pages/Users/Users";
import { UpdateProfile } from "./components/pages/UpdateProfile/UpdateProfile";
import { ProductsUser } from "./components/pages/ProductsUser/ProductsUser"


function App() {
  window.document.title = 'SIAC'
  return (
    <>
      <Router>
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/profile" element={<Profile />} />

            <Route path="/update-profile" element={<UpdateProfile />} />

            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products-user" element={<ProductsUser />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/users" element={<Users />} />

            <Route path="/products-user" element={<ProductsUser />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  )
}


export default App;
