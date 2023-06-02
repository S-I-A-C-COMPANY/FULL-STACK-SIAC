
// UI
import React, { useState , useEffect} from "react";
import axios from "axios";

// const render = 'https://backend-render-corp.onrender.com'
const localHost = "http://localhost:5000";
export const SectionContactInformation = () => {
  const [datUser, setUser] = useState({});

  useEffect(() => {
    const getInfoUser = async () => {
      try {
        const res = await axios.get(`${localHost}/api/users/me`);
        setUser(res.data);
        
      } catch (err) {
        console.log(err);
      }
    };

    getInfoUser();
  }, []);

  useEffect(() => {
    if (!("phone" in datUser)) {
      setUser((prevUser) => ({
        ...prevUser,
        phone: "Actualice su número de contacto",
      }));
    }
    if (!("address" in datUser)) {
      setUser((prevUser) => ({
        ...prevUser,
        address: "Actualice su número de contacto"
      }));
    }
  }, [datUser]);

  return (
    <section className="contactInformation">
      <h2>Informacion de contacto:</h2>
      <label className="type">
        Dni:<p className="dniProfile">{datUser.dni}</p>
      </label>
      <label className="type">
        Email:<p className="emailProfile">{datUser.email}</p>
      </label>

      <label className="type">
        Phone:<p className="phoneProfile">{datUser.phone}</p>
      </label>

      <label className="type">
        Address:<p className="addressProfile">{datUser.address}</p>
      </label>
    </section>
  );
};
