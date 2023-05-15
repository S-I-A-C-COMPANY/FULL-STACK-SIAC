
import React, { useState,useEffect } from 'react';

import { MainProfile } from '../../layouts/MainProfile/MainProfile'

export const Profile = () => {
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
    <MainProfile />
  )
}
