import React, { useContext, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

// UI
import { ImgUI } from '../../UI/ImgUI/ImgUI';
import { InputUI } from '../../UI/InputUI/InputUI';
import { ButtonUI } from '../../UI/ButtonUI/ButtonUI';

// redux
import { profileUpdate } from '../../features/auth/authSlice';

// Images
import imgUser from '../../../Images/imgUser.png';
import imgCall from '../../../Images/forms/Call.svg';
import imgMail from '../../../Images/forms/Mail.svg';
import imgPass from '../../../Images/forms/pass.svg';
import imgDir from '../../../Images/forms/dir.svg';

export const FormUpdateProfile = () => {
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const initialFormData = {
    name: '',
    email: '',
    phone: '',
    address: '',
    password: '',
    passwordAuth: '',
  };

  const [formData, setFormData] = useState(initialFormData);
  const { name, email, phone, address, password, passwordAuth } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const isEmptyFields = !name || !email || !phone || !address || !password || !passwordAuth;

    if (isEmptyFields) {
      const confirmResult = await Swal.fire({
        title: '¿Está seguro?',
        text: 'Hay campos vacíos en el formulario. ¿Desea continuar?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, enviar',
        cancelButtonText: 'Cancelar',
      });

      if (confirmResult.isConfirmed) {
        await sendForm();
      }
    } else {
      await sendForm();
    }
  };

  const sendForm = async () => {
    const userData = {
      name,
      email,
      phone,
      address,
    };

    if (password) {
      userData.password = password;
    }

    // Filtrar propiedades vacías
    const nonEmptyUserData = {
      ...(userData.name !== '' && { name: userData.name }),
      ...(userData.email !== '' && { email: userData.email }),
      ...(userData.phone !== '' && { phone: userData.phone }),
    };

    try {
      await dispatch(profileUpdate(nonEmptyUserData));
      Swal.fire({
        title: 'Éxito',
        text: 'Actualización exitosa',
        icon: 'success',
        timer: 2000,
        showConfirmButton: false,
      }).then(() => {
        setFormData(initialFormData);
        navigate('/profile');
      });
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: 'No se pudo actualizar la información',
        icon: 'error',
        timer: 2000,
        showConfirmButton: false,
      });
    }
  };

  return (
    <form className="formProfile" onSubmit={onSubmit}>
      <div className="containInputs">
        <ImgUI style="imgUser" routeImg={imgUser} />
        <InputUI
          typeInpt="text"
          idInpt="name"
          nameInpt="name"
          valueInpt={name}
          style="inputs"
          textInpt="Ingrese su nombre"
          eventInpt={onChange}
        />
      </div>

      <div className="containInputs">
        <ImgUI style="imgUser" routeImg={imgMail} />
        <InputUI
          typeInpt="email"
          idInpt="email"
          nameInpt="email"
          valueInpt={email}
          style="inputs"
          textInpt="TuCorreo@gmail.com"
          eventInpt={onChange}
        />
      </div>

      <div className="containInputs">
        <ImgUI style="imgUser" routeImg={imgCall} />
        <InputUI
          typeInpt="tel"
          idInpt="phone"
          nameInpt="phone"
          valueInpt={phone}
          style="inputs"
          textInpt="Celular"
          eventInpt={onChange}
        />
      </div>

      <div className="containInputs">
        <ImgUI style="imgUser" routeImg={imgDir} />
        <InputUI
          typeInpt="text"
          idInpt="address"
          nameInpt="address"
          valueInpt={address}
          style="inputs"
          textInpt="Direccion"
          eventInpt={onChange}
        />
      </div>

      <div className="containInputs">
        <ImgUI style="imgUser" routeImg={imgPass} />
        <InputUI
          typeInpt="password"
          idInpt="password"
          nameInpt="password"
          valueInpt={password}
          style="inputs"
          textInpt="Nueva Contraseña"
          eventInpt={onChange}
        />
      </div>

      <div className="containInputs">
        <ImgUI style="imgUser" routeImg={imgPass} />
        <InputUI
          typeInpt="password"
          idInpt="passwordAuth"
          nameInpt="passwordAuth"
          valueInpt={passwordAuth}
          style="inputs"
          textInpt="Verificar Contraseña"
          eventInpt={onChange}
        />
      </div>

      <ButtonUI typeBtn="submit" style="btnUpdate" text="Actualizar" />
    </form>
  );
};


