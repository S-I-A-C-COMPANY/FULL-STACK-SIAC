/* eslint-disable eqeqeq */
/* eslint-disable react/style-prop-object */
import { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login, reset } from "../../features/auth/authSlice";
import { Link } from "react-router-dom";

// LAYOUTS
import { SectionLeft } from "../../layouts/SectionLeft/SectionLeft";
import { HeadingFormLogin } from "../../layouts/HeadingFormLogin/HeadingFormLogin";

// UI
import { InputUI } from "../../UI/InputUI/InputUI";
import { ButtonUI } from "../../UI/ButtonUI/ButtonUI";



function Login() {
  const [formData, setFormData] = useState({
    dni: "",
    password: "",
  });

  const { dni, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {

    if (isSuccess || user) {
      navigate("/profile");
    }

    if(isSuccess){
      toast.success("Inicio con exito")
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
      dni,
      password,
    };

    if (dni == '' && password == '') {
      toast.error("Error, Campos Vacios")
    } else if (dni == '') {
      toast.error("Campo Dni Vacio")
    } else if (password == '') {
      toast.error("Campo Password Vacio")
    }

    dispatch(login(userData));
  };

  return (
    <div className="containerPrincipal">
      <SectionLeft />

      <section className="sectionRight">

        <section className="formLogin">
          <HeadingFormLogin />

          <form onSubmit={onSubmit}>
            <div className="form-group">
              <InputUI
                typeInpt="text"
                style="form-comtrol"
                idInpt="dni"
                nameInpt="dni"
                valueInpt={dni}
                textInpt="Identificacion"
                eventInpt={onChange}
              />
            </div>
            <div className="form-group">
              <InputUI
                typeInpt="password"
                style="form-comtrol"
                idInpt="password"
                nameInpt="password"
                valueInpt={password}
                textInpt="Contraseña"
                eventInpt={onChange}
              />
            </div>

            <div className="form-group">
              <ButtonUI typeBtn="submit" style="btn btn-block" text="Ingresar" />
              <p className="register">¿No tienes una cuenta?<Link className="info-register" to="/register">Registrarse</Link></p>
            </div>

            <Link className="forgot-password" to="/forgot-password">
              Has olvidado tu contraseña
            </Link>

            <Link className="reset-password" to="/reset-password">
              Reestablecer contraseña
            </Link>

          </form>
        </section>
      </section>
    </div>
  );
}

export default Login;
