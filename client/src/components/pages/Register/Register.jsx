import { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { register, reset } from "../../features/auth/authSlice";

// LAYOUTS
import { SectionLeft } from "../../layouts/SectionLeft/SectionLeft";
import { HeadingFormRegister } from "../../layouts/HeadingFormRegister/HeadingFormRegister";

// UI
import { InputUI } from "../../UI/InputUI/InputUI";
import { ButtonUI } from "../../UI/ButtonUI/ButtonUI";

import { Link } from "react-router-dom";

function Register() {
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
    if (isSuccess || user) {
      Swal.fire({
        title: "Exito!",
        text: "Usuario registrado",
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

    if (passwordAuth == '') {
      Swal.fire({
        title: "Error!",
        text: "El campo confirmar contraseña esta vacio",
        icon: "error",
        confirmButtonText: "Ok",
      })
    } else if (name == '' && dni == '' && email == '' && password == '' && passwordAuth == '') {
      Swal.fire({
        title: "Error!",
        text: "Los campos estan vacios",
        icon: "error",
        confirmButtonText: "Ok",
      });
    } else if (name == '') {
      Swal.fire({
        title: "Error!",
        text: "El campo nombre esta vacio",
        icon: "error",
        confirmButtonText: "Ok",
      });
    } else if (dni == '') {
      Swal.fire({
        title: "Error!",
        text: "El campo identificacion esta vacio",
        icon: "error",
        confirmButtonText: "Ok",
      });
    } else if (email == '') {
      Swal.fire({
        title: "Error!",
        text: "El campo e-mail esta vacio",
        icon: "error",
        confirmButtonText: "Ok",
      });
    } else if (password == '') {
      Swal.fire({
        title: "Error!",
        text: "El campo contraseña esta vacio",
        icon: "error",
        confirmButtonText: "Ok",
      });
    } else if (password !== passwordAuth) {
      Swal.fire({
        title: "Error!",
        text: "La contraseña no coincide",
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
    else {
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
                textInpt="Ingrese su e-mail"
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
            <Link className="login" to="/login">
              Tengo Cuenta
            </Link>
          </form>
        </section>
      </section>
    </div>
  );
}
export default Register;