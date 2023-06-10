
import React from 'react';

import { ContainerProducts } from '../ContainerProducts/ContainerProducts'
import { SideBar } from '../SideBar/SideBar'


export const MainProducts = () => {
  return (
    <main className="mainProducts">
        <SideBar />
        <ContainerProducts />
    </main>
  )
}
