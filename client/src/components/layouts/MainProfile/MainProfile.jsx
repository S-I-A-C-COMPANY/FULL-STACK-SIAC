import React from 'react'
import { ContentProfile } from '../ContentProfile/ContentProfile'
import { SideBarProfile } from '../SideBarProfile/SideBarProfile'

import React from 'react';

export const MainProfile = () => {
  return (
    <div className='mainProfile'>
        <SideBarProfile />
        
        <ContentProfile />
    </div>
  )
}
