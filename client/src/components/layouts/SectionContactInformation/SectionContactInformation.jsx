import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const localHost = "http://localhost:5000";

export const SectionContactInformation = () => {
  const [datUser, setUser] = useState({});
  const [pageLoaded, setPageLoaded] = useState(false);

  useEffect(() => {
    const getInfoUser = async () => {
      try {
        const res = await axios.get(`${localHost}/api/users/me`);
        setUser(res.data);
        setPageLoaded(true);
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    getInfoUser();
  }, []);

  useEffect(() => {
    if (pageLoaded && (!datUser.phone || !datUser.address)) {
      Swal.fire({
        title: "¡Actualice su información!",
        icon: "warning",
        confirmButtonText: "Aceptar",
      });
    }
  }, [pageLoaded, datUser.phone, datUser.address]);

  return (
    <section className="contactInformation">

      <label className="type">
        Dni:
        {datUser.dni? (
          <p className="dniProfile">{datUser.dni}</p>
        ):(
          <p className="dniProfile"> Cargando..</p>
        )}
      </label>

      <label className="type">
        Email:
        {datUser.email? (
          <p className="emailProfile">{datUser.email}</p>
        ):(
          <p className="emailProfile"> Cargando..</p>
        )}
      </label>
      

      <label className="type">
        Phone:
        {datUser.phone ? (
          <p className="phoneProfile">{datUser.phone}</p>
        ) : (
          <p className="updateMessage-red">
            ¡Actualice su número de contacto!
          </p>
        )}
      </label>

      <label className="type">
        Address:
        {datUser.address ? (
          <p className="addressProfile">{datUser.address}</p>
        ) : (
          <p className="updateMessage-red">
            ¡Actualice su dirección!
          </p>
        )}
      </label>
    </section>
  );
};
