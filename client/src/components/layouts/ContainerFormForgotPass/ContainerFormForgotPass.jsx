
import { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { forgotPass, reset } from "../../features/auth/authSlice";
import { Link } from 'react-router-dom'
// UI
import { ButtonUI } from '../../UI/ButtonUI/ButtonUI'
import { InputUI } from '../../UI/InputUI/InputUI'


export const ContainerFormForgotPass = () => {
  const [formData, setFormData] = useState({
    email: ""
  });

  const {email} = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

   useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      navigate("/");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);


  
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  
  const onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email,
    };

    dispatch(forgotPass(userData));
  };

  return (
    <div className="campoDatos">
        <form onSubmit={onSubmit}>
            <div className="email">
                <InputUI 
                typeInpt='text' 
                idInpt={'email'}
                nameInpt='email' 
                valueInpt={email}
                textInpt='Introduce Tu Correo'
                eventInpt={onChange}
                />
            </div>
        <ButtonUI typeBtn="submit" style='btnSendForgotPass' text='Enviar'/>
        </form>
        <Link className='back' to='/login'>Volver Al Inicio</Link>
        
    </div>
  )
}
