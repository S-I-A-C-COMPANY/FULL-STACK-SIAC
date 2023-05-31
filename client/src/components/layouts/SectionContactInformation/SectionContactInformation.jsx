// UI
import { useState } from "react";
import axios from "axios";

// const render = 'https://backend-render-corp.onrender.com'
const localHost = "http://localhost:5000";

export const SectionContactInformation = () => {
  const [datUser, setUser] = useState([]);

  const getInfoUser = async () => {
    try {
      const res = await axios.get(`${localHost}/api/users/me`);
      setUser(res.data);
      // console.log(res.data)
    } catch (err) {
      console.log(err);
    }
  };
  getInfoUser();

  return (
    <section className="contactInformation">
      <h2>Informacion de contacto:</h2>
      <label className="type">
        Email:<p className="emailProfile">{datUser.email}</p>
      </label>
      <label className="type">
        Phone:<p className="phoneProfile">????????</p>
      </label>
      <label className="type">
        Address:<p className="addressProfile">??????</p>
      </label>
      <label className="type">
        Dni:<p className="dniProfile">??????</p>
      </label>
    </section>
  );
};
