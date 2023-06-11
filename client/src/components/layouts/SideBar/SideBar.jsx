
import React from 'react';
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../features/auth/authSlice";

// UI
import { ImgUI } from "../../UI/ImgUI/ImgUI";

//IMG
import logoWhite from "../../../Images/whiteIcon.png";
import iconNotifications from "../../../Images/iconNotifications.png";
import iconMenu from "../../../Images/iconCalendary.png";
import iconProfile from "../../../Images/iconProfile.png";
import iconLogout from "../../../Images/iconLogout.png";
import iconUsers from "../../../Images/iconUsers.png"

export const SideBar = () => {

  const dispatch = useDispatch();

  const onSubmit = () => {
    dispatch(logout());
  };

  let rol =  'admin';
  // let rol =  'mesero';
  // let rol =  'Jefe cocina';

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
            <ImgUI style="iconCalendary" routeImg={iconMenu}></ImgUI>
          </Link>
        </li>
        <li className="listLinks">
          <Link className="links" to="/users">
            <ImgUI style="iconStats" routeImg={iconUsers}></ImgUI>
          </Link>
        </li>
      </ul>
      )}

      {rol === "Jefe cocina" && (
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
            <ImgUI style="iconCalendary" routeImg={iconMenu}></ImgUI>
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