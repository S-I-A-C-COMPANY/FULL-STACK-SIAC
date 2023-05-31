
import React from 'react';
// IMG
import logoWhite from "../../../Images/whiteIcon.png";
import iconNotifications from "../../../Images/iconNotifications.png";
import iconProfile from "../../../Images/iconProfile.png";
import iconStats from "../../../Images/iconStats.png";
import iconUsers from "../../../Images/iconUsers.png"

// UI
import { Link } from "react-router-dom";
import { ImgUI } from "../../UI/ImgUI/ImgUI";

export const SideBarProducts = () => {
  return (
    <div className="sideBar">
      <nav className="navBarInSideBar">
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
              <ImgUI style="iconNotification" routeImg={iconNotifications}></ImgUI>
            </Link>
          </li>
          <li className="listLinks">
            <Link className="links" to="/">
              <ImgUI style="iconStats" routeImg={iconStats}></ImgUI>
            </Link>
          </li>
          <li className="listLinks">
            <Link className="links" to="/users">
              <ImgUI style="iconStats" routeImg={iconUsers}></ImgUI>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};
