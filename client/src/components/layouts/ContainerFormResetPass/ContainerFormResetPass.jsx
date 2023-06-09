import React from 'react'
import { Link } from 'react-router-dom'
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { forgotPass, reset } from "../../features/auth/authSlice";
import Swal from "sweetalert2";
// UI
import { ButtonUI } from '../../UI/ButtonUI/ButtonUI'
import { InputUI } from '../../UI/InputUI/InputUI'

export const ContainerFormResetPass = () => {

    const [formData, setFormData] = useState({
        password: "",
        passwordAuth: "",
    });

    const { password, passwordAuth } = formData;

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user, isError, isSuccess, message } = useSelector(
        (state) => state.auth
    );

    useEffect(() => {
        if (isError) {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: message,
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 2000,
            });
          }

        if (isSuccess || user) {
           Swal.fire({
              title: "Exito!",
              text: "Contraseña reestablecida con exito",
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
            password,
            passwordAuth,
        };

        // dispatch(forgotPass(userData));
    }

    return (
        <div className="campoDatos">
            <form onSubmit={onSubmit}>
                <div className="email">
                    <InputUI
                        typeInpt='text'
                        idInpt='password'
                        nameInpt='password'
                        valueInpt={password}
                        textInpt='Introduce Tu Contraseña'
                        eventInpt={onChange}
                    />
                    <InputUI
                        style='inputConfirm'
                        typeInpt='passwordAuth'
                        idInpt='passwordAuth'
                        nameInpt='passwordAuth'
                        valueInpt={passwordAuth}
                        textInpt='Confirma Tu Contraseña'
                        eventInpt={onChange}
                    />
                </div>
                <ButtonUI typeBtn="submit" style='btnSendResetPass' text='Enviar' />
            </form>
            <Link className='back' to='/login'>Volver Al Inicio</Link>
        </div>
    )
}
