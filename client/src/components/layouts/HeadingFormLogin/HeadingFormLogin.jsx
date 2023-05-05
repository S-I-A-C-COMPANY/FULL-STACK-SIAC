import React from "react";

// UI
import { ImgUI } from "../../UI/ImgUI/ImgUI";

// IMG
import logo from "../../../Images/logo.png";

export const HeadingFormLogin = () => {
  return (
    <section className="heading">
      <div className="containerIcon">
        <ImgUI style="imgLogoLogin" routeImg={logo} />
      </div>

      <h1>Bienvenido</h1>
      <p className="txtInfoLogin">Por favor inicie sesion en su cuenta</p>
    </section>
  );
};
