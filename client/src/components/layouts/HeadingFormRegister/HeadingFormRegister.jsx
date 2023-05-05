import React from "react";

// UI
import { ImgUI } from "../../UI/ImgUI/ImgUI";

// IMG
import logo from "../../../Images/logo.png";

export const HeadingFormRegister = () => {
  return (
    <section className="heading2">
      <div className="containerIcon">
        <ImgUI style="imgLogoRegister" routeImg={logo} />
      </div>

      <h1>Registro</h1>
      <p className="txtInfoRegister">Por favor cree una cuenta</p>
    </section>
  );
};
