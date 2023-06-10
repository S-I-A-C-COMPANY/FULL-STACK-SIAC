import React from "react";

import { ContentUpdateProfile } from "../ContentUpdateProfile/ContentUpdateProfile";
import { SideBar } from "../SideBar/SideBar";

export const MainUpdateProfile = () => {
 
  return (
    <main className='mainUpdateProfile'>
        <SideBar />

        <ContentUpdateProfile />
    </main>
  )
}
