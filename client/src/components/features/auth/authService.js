import axios from 'axios'

// const API_URL = 'https://backend-render-corp.onrender.com/api/users'
const API_URL = '/api/users'

// Register User
const register = async (userData) =>{
    const response = await axios.post(API_URL + '/register',userData)
}

// Login User
const login = async (userData) =>{
    const response = await axios.post(API_URL + '/login',userData)
    if(response.data){
        localStorage.setItem('user', JSON.stringify(response.data.token))

        return response.data
    }
}

//forgot pass
const forgotPass = async (userData) =>{
   const response = await axios.post(API_URL + '/forgot-password',userData)
}
const profileUpdate = async (userData) =>{
    // console.log(userData);
   const response = await axios.put(API_URL + '/profile',userData)
   console.log(response.data);
}

// Logout User
const logout = ()=>{
    localStorage.removeItem('user')
}
const authService = {
    register,
    logout,
    forgotPass,
    login,
    profileUpdate,
}

export default authService
