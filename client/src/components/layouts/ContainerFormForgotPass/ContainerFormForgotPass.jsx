
import { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { forgotPass, reset } from "../../features/auth/authSlice";
import { Link } from 'react-router-dom'
import Swal from "sweetalert2";
// UI
import { ButtonUI } from '../../UI/ButtonUI/ButtonUI'
import { InputUI } from '../../UI/InputUI/InputUI'


export const ContainerFormForgotPass = () => {
  const [formData, setFormData] = useState({
    email: ""
  });

  const { email } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isSuccess || user) {
      Swal.fire({
        title: "Exito!",
        text: "Enlace enviado con exito a tu correo",
        icon: "success",
        confirmButtonText: "Ok"
      })

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

    if (email == '') {
      Swal.fire({
        title: "Error!",
        text: "El campo E-mail esta vacio",
        icon: "error",
        confirmButtonText: "Ok",
      });
    }

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
            textInpt='Introduce Tu E-mail'
            eventInpt={onChange}
          />
        </div>
        <ButtonUI typeBtn="submit" style='btnSendForgotPass' text='Enviar' />
      </form>
      <Link className='back' to='/login'>Volver Al Inicio</Link>

    </div>
  )
}
