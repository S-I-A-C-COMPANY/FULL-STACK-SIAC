import React from 'react'
import { Link } from 'react-router-dom'
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { forgotPass, reset } from "../../features/auth/authSlice";
// UI
import { ButtonUI } from '../../UI/ButtonUI/ButtonUI'
import { InputUI } from '../../UI/InputUI/InputUI'

export const ContainerFormResetPass = () => {

    const [formData, setFormData] = useState({
        password: "",
        passwordAuth: ""
    });

    const { password, passwordAuth } = formData;

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
            password,
            passwordAuth,
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
                        valueInpt={password}
                        textInpt='Introduce Tu Contraseña'
                        eventInpt={onChange}
                    />
                    <InputUI
                        style='inputConfirm'
                        typeInpt='text'
                        idInpt={'email'}
                        nameInpt='email'
                        valueInpt={passwordAuth}
                        textInpt='Confirma Tu Contraseña'
                        eventInpt={onChange}
                    />
                </div>
                <ButtonUI typeBtn="submit" style='btnSend' text='Enviar' />
            </form>
            <Link className='back' to='/login'>Volver Al Inicio</Link>
        </div>
    )
}
