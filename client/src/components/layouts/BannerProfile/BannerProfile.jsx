import React, { useEffect, useState } from "react";
import axios from "axios";
// UI
import { ImgUI } from "../../UI/ImgUI/ImgUI";
// IMG
import imageBanner from "../../../Images/iconUser.png";

export const BannerProfile = () => {
  const localHost = "http://localhost:5000";
  const [datUser, setUser] = useState({});

  useEffect(() => {
    const getInfoUser = async () => {
      try {
        const res = await axios.get(`${localHost}/api/users/me`);
        setUser(res.data);
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getInfoUser();
  }, []);

  const formattedName =
    datUser.name && datUser.name.charAt(0).toUpperCase() + datUser.name.slice(1);
  const formattedRole =
    datUser.roles && datUser.roles.charAt(0).toUpperCase() + datUser.roles.slice(1);

  return (
    <div className="bannerProfile">
      <div className="contentUserBanner">
        <ImgUI style="imgProfile" routeImg={datUser.image || imageBanner} />
        <p className="nameProfile">{formattedName}</p>
        <p className="roleProfile">{formattedRole}</p>
      </div>
    </div>
  );
};
