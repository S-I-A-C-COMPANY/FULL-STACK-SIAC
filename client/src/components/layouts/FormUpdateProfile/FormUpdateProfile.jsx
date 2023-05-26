// UI
import { ImgUI } from "../../UI/ImgUI/ImgUI";
import { InputUI } from "../../UI/InputUI/InputUI";
import { ButtonUI } from "../../UI/ButtonUI/ButtonUI";

import axios from "axios";

import { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { profileUpdate, reset } from "../../features/auth/authSlice";
import Swal from "sweetalert2";

//IMG
import imgUser from '../../../Images/imgUser.png'
import imgCall from '../../../Images/forms/Call.svg'
import imgMail from '../../../Images/forms/Mail.svg'
import imgPass from '../../../Images/forms/pass.svg'
import imgDir from '../../../Images/forms/dir.svg'

// const render = 'https://backend-render-corp.onrender.com'
const localHost = 'http://localhost:5000'

export const FormUpdateProfile = () => {

    const [datUser, setUser] = useState([])

    const getInfoUser = async ()=>{
        
        try{
            const res = await axios.get(`${localHost}/api/users/me`)
             setUser(res.data);
            // console.log(res.data)
            
        }catch(err){
            console.log(err)
        }
    }
    getInfoUser()


    // update user:

     const [formData, setFormData] = useState({});

  const { emailFound,  name,email,phone,address,password,passwordAuth} = formData;
// console.log(emailFound);
  const navigate = useNavigate();
  const dispatch = useDispatch();

//   const { user, isError, isSuccess, message } = useSelector(
//     (state) => state.auth
//   );

//   useEffect(() => {
//     if (isSuccess || user) {
   

//       navigate("");
//     }

//     dispatch(reset());
//   }, [user, isError, isSuccess, message, navigate, dispatch]);



  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const userData = {
        emailFound : datUser.email, name,email,phone,address,password
    };


    dispatch(profileUpdate(userData));
  };


    return (
        
        <form className="formProfile" onSubmit={onSubmit}>
            <div className="containInputs">
                <ImgUI style='imgUser' routeImg={imgUser} />
                <InputUI 
                typeInpt='text'
                idInpt='name'
                nameInpt='name'
                valueInpt={name}
                style='inputs' 
                textInpt={datUser.name}
                eventInpt={onChange}
                
                
                />
            </div>

            <div className="containInputs">
                <ImgUI style='imgUser' routeImg={imgMail} />
                <InputUI 
                typeInpt='email'
                idInpt='email'
                nameInpt='email'
                valueInpt={email}
                style='inputs' 
                textInpt={datUser.email}
                eventInpt={onChange}


                 />
            </div>

            <div className="containInputs">
                <ImgUI style='imgUser' routeImg={imgCall} />
                <InputUI 
                typeInpt='tel'
                idInpt='phone'
                nameInpt='phone'
                valueInpt={phone}
                style='inputs' 
                textInpt='Celular'
                eventInpt={onChange}
                />
            </div>

            <div className="containInputs">
                <ImgUI style='imgUser' routeImg={imgDir} />
                <InputUI 
                 typeInpt='text'
                 idInpt='address'
                 nameInpt='address'
                 valueInpt={address}
                 style='inputs' 
                 textInpt='Direccion' 
                eventInpt={onChange}
                 />
            </div>

            <div className="containInputs">
                <ImgUI style='imgUser' routeImg={imgPass} />
                <InputUI 
                typeInpt='password'
                idInpt='password'
                nameInpt='password'
                valueInpt={password}
                style='inputs' 
                textInpt='Contraseña'
                eventInpt={onChange}
                
                />
            </div>

            <div className="containInputs">
                <ImgUI style='imgUser' routeImg={imgPass} />
                <InputUI 
                typeInpt='password'
                idInpt='passwordAuth'
                nameInpt='passwordAuth'
                valueInpt={passwordAuth}
                style='inputs' 
                textInpt='Verificar Contraseña'
                eventInpt={onChange}
                
                />
            </div>

            <ButtonUI typeBtn='submit' style='btnUpdate' text='Actualizar' />
        </form>
    )
}
