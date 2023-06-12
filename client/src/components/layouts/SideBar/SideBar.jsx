import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../features/auth/authSlice";
import axios from "axios";

// UI
import { ImgUI } from "../../UI/ImgUI/ImgUI";

//IMG
import logoWhite from "../../../Images/whiteIcon.png";
import iconNotifications from "../../../Images/iconNotifications.png";
import iconProductManagement from "../../../Images/managementProduct.png"
import iconProfile from "../../../Images/iconProfile.png";
import iconLogout from "../../../Images/iconLogout.png";
import iconUsers from "../../../Images/iconUsers.png"

export const SideBar = () => {

  const dispatch = useDispatch();
  const [rol, setRol] = useState("");

  useEffect(() => {
    const fetchRole = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/users/me");
        const { roles } = res.data;
        setRol(roles);
      } catch (err) {
        console.log(err);
      }
    };

    fetchRole();

    const interval = setInterval(() => {
      fetchRole();
    }, 5000); // Actualizar el rol cada 5 segundos

    return () => {
      clearInterval(interval);
    };
  }, []);

  const onSubmit = () => {
    dispatch(logout());
  };

  return (
    <div className="sideBar">
      <nav className="navBarInSideBar">

        {rol === "admin" && (
          <ul>
            <li className="listLinks">
              <ImgUI style="imgIcon" routeImg={logoWhite} />
            </li>
            <li className="listLinks">
              <Link className="links" to="/profile">
                <ImgUI style="iconProfile" routeImg={iconProfile}></ImgUI>
              </Link>
            </li>
            <li className="listLinks">
              <Link className="links" to="/notifications">
                <ImgUI
                  style="iconNotification"
                  routeImg={iconNotifications}
                ></ImgUI>
              </Link>
            </li>
            <li className="listLinks">
              <Link className="links" to="/products">
                <ImgUI style="iconProductManagement" routeImg={iconProductManagement}></ImgUI>
              </Link>
            </li>
            <li className="listLinks">
              <Link className="links" to="/users">
                <ImgUI style="iconStats" routeImg={iconUsers}></ImgUI>
              </Link>
            </li>
          </ul>
        )}

        {rol === "Jefe Cocina" && (
          <ul>
            <li className="listLinks">
              <ImgUI style="imgIcon" routeImg={logoWhite} />
            </li>
            <li className="listLinks">
              <Link className="links" to="/profile">
                <ImgUI style="iconProfile" routeImg={iconProfile}></ImgUI>
              </Link>
            </li>
            <li className="listLinks">
              <Link className="links" to="/notifications">
                <ImgUI
                  style="iconNotification"
                  routeImg={iconNotifications}
                ></ImgUI>
              </Link>
            </li>
            <li className="listLinks">
              <Link className="links" to="/products">
                <ImgUI style="iconProductManagement" routeImg={iconProductManagement}></ImgUI>
              </Link>
            </li>
          </ul>
        )}

        {rol === "mesero" && (
          <ul>
            <li className="listLinks">
              <ImgUI style="imgIcon" routeImg={logoWhite} />
            </li>
            <li className="listLinks">
              <Link className="links" to="/profile">
                <ImgUI style="iconProfile" routeImg={iconProfile}></ImgUI>
              </Link>
            </li>
            <li className="listLinks">
              <Link className="links" to="/notifications">
                <ImgUI
                  style="iconNotification"
                  routeImg={iconNotifications}
                ></ImgUI>
              </Link>
            </li>
          </ul>
        )}

        <ul>
          <li className="listLinks">
            <Link onClick={onSubmit} className="toHome" to="/">
              <ImgUI style="iconLogout" routeImg={iconLogout}></ImgUI>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};
