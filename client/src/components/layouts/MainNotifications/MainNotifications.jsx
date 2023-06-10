
import React from 'react';
// Layout
import { ContentNotifications } from '../ContentNotifications/ContentNotifications'
import { SideBar } from '../SideBar/SideBar';


export const MainNotifications = () => {
  return (
    <main className='mainNotifications'>
      <SideBar />
      <ContentNotifications />
    </main>
  )
}
