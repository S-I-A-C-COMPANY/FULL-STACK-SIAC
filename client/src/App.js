import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


import Login from "./components/pages/Login/Login";
import Register from "./components/pages/Register/Register";
import { Home } from "./components/pages/Home/Home";
import { ForgotPassword } from "./components/pages/ForgotPassword/ForgotPassword";
import { Profile } from "./components/pages/Profile/Profile";
import { ResetPassword } from "./components/pages/ResetPassword/ResetPassword";
import { Products } from "./components/pages/Products/Products";
import { Notifications } from "./components/pages/Notifications/Notifications";



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
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/products" element={<Products />} />
            <Route path="/notifications" element={<Notifications />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  )
}


export default App;
