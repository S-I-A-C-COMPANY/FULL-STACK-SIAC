import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
// UI
import { ImgUI } from "../../UI/ImgUI/ImgUI";

// IMG
import imageBanner from "../../../Images/iconUser.png";

export const BannerProfile = () => {
  // const render = 'https://backend-render-corp.onrender.com'
  const localHost = "http://localhost:5000";

  const [datUser, setUser] = useState([]);

  
  useEffect(() => {
    
  const getInfoUser = async () => {
    try {
      const res = await axios.get(`${localHost}/api/users/me`);
      setUser(res.data);
      
    } catch (err) {
      console.log(err);
    }
    // console.log(datUser.name)
  };
  getInfoUser();
  },[])

  return (
    <div className="bannerProfile">
      <ImgUI style="imgProfile" routeImg={ datUser.image|| imageBanner} />
      <p className="nameProfile">{datUser.name}</p>
    </div>
  );
};
