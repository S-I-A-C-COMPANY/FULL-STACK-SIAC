import React from 'react';
import { ImgUI } from '../../UI/ImgUI/ImgUI';
import logo from '../../../Images/logo.png';

export const ContainerImgResetPass = () => {
  return (
    <div className="img">
      <ImgUI style='imgLogo' routeImg={logo} />
    </div>
  );
};
