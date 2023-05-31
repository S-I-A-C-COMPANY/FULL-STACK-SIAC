
import React from 'react';

import { SideBarProfile } from "../SideBarProfile/SideBarProfile";
import { ContentProfile } from "../ContentProfile/ContentProfile";

export const MainProfile = () => {
 

  return (
    <main className='mainProfile'>
        <SideBarProfile />

        <ContentProfile />
    </main>
  )
}
