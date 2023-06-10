import React from 'react'
import { ContentProfile } from '../ContentProfile/ContentProfile'
import { SideBar } from '../SideBar/SideBar'

export const MainProfile = () => {
  return (
    <div className='mainProfile'>
        <SideBar />
        
        <ContentProfile />
    </div>
  )
}
