
import React, { useState,useEffect } from 'react';
import { MainUpdateProfile } from '../../layouts/MainUpdateProfile/MainUpdateProfile'
import axios from 'axios';

export const UpdateProfile = () => {

  
const token = localStorage.getItem('user').replace(/^"(.*)"$/, '$1');


// Verificar si el token existe
if (token) {
  // Agregar el token a los encabezados de las solicitudes
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
} else {
  // Redireccionar o manejar la ausencia del token según tus necesidades
}


  const [shouldReload, setShouldReload] = useState(true);

  useEffect(() => {
    const isReloaded = localStorage.getItem("isReloaded");
    if (isReloaded) {
      setShouldReload(false);
    } else {
      localStorage.setItem("isReloaded", "true");
      window.location.reload();
    }

    // Limpiar el localStorage en el evento beforeunload
    window.addEventListener("beforeunload", () => {
      localStorage.removeItem("isReloaded");
    });

    // Remover el listener del evento beforeunload en el cleanup del useEffect
    return () => {
      window.removeEventListener("beforeunload", () => {
        localStorage.removeItem("isReloaded");
      });
    };
  }, []);
  return (
    <MainUpdateProfile /> 
  )
}
