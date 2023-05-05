import { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { register, reset } from "../../features/auth/authSlice";

// LAYOUTS
import { SectionLeft } from "../../layouts/SectionLeft/SectionLeft";
import { HeadingFormRegister } from "../../layouts/HeadingFormRegister/HeadingFormRegister";

// UI
import { InputUI } from "../../UI/InputUI/InputUI";
import { ButtonUI } from "../../UI/ButtonUI/ButtonUI";



export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    dni: "",
    email: "",
    password: "",
    passwordAuth: "",
  });

  const { name, dni, email, password, passwordAuth } = formData;

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

    if (password !== passwordAuth) {
      toast.error("Password dont match");
    } else {
      const userData = {
        name,
        dni,
        email,
        password,
      };

      dispatch(register(userData));
    }
  };

  return (
    <div className="containerPrincipal">
      <SectionLeft />

      <section className="sectionRight">

        <section className="formRegister">
          <HeadingFormRegister />

          <form onSubmit={onSubmit}>
            <div className="form-group2">
              <InputUI
                typeInpt="text"
                style="form-comtrol"
                idInpt="name"
                nameInpt="name"
                valueInpt={name}
                textInpt="Ingrese su nombre"
                eventInpt={onChange}
              />
            </div>
            <div className="form-group2">
              <InputUI
                typeInpt="text"
                style="form-comtrol"
                idInpt="dni"
                nameInpt="dni"
                valueInpt={dni}
                textInpt="Ingrese su identificacion"
                eventInpt={onChange}
              />
            </div>
            <div className="form-group2">
              <InputUI
                typeInpt="email"
                style="form-comtrol"
                idInpt="email"
                nameInpt="email"
                valueInpt={email}
                textInpt="Ingrese su email"
                eventInpt={onChange}
              />
            </div>
            <div className="form-group2">
              <InputUI
                typeInpt="password"
                style="form-comtrol"
                idInpt="password"
                nameInpt="password"
                valueInpt={password}
                textInpt="Ingrese su contraseña"
                eventInpt={onChange}
              />
            </div>
            <div className="form-group2">
              <InputUI
                typeInpt="password"
                style="form-comtrol"
                idInpt="passwordAuth"
                nameInpt="passwordAuth"
                valueInpt={passwordAuth}
                textInpt="Confirma su contraseña"
                eventInpt={onChange}
              />
            </div>

            <div className="form-group2">
              <ButtonUI
                typeBtn="submit"
                style="btn2 btn-block2"
                text="Registrarse"
              />
            </div>

            <Link className="recover-password" to="/login">
              Tengo Cuenta
            </Link>

          </form>
        </section>
      </section>
    </div>
  );
}