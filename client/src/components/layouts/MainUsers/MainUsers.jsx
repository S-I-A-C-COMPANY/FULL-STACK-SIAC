import React from 'react';
// Layout
import { ContentUsers } from '../ContentUsers/ContentUsers'
import { SideBar } from '../SideBar/SideBar';


export const MainUsers = () => {
  return (
    <main className='mainUsers'>
        <SideBar />
        <ContentUsers />
    </main>
  )
}
