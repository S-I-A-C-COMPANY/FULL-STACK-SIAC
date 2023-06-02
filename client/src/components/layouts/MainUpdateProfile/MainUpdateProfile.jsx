import React from "react";

import { SideBarProfile } from "../SideBarProfile/SideBarProfile";
import { ContentUpdateProfile } from "../ContentUpdateProfile/ContentUpdateProfile";

export const MainUpdateProfile = () => {
 
  return (
    <main className='mainUpdateProfile'>
        <SideBarProfile />

        <ContentUpdateProfile />
    </main>
  )
}
