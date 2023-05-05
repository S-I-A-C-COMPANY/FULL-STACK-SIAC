import React from 'react'
import { Link } from 'react-router-dom'


export const ContainerLeft = () => {
  return (
    <div className='containerText'>
        <h1 className='titleInfo'>Servimos la comida que necesitas con amor.</h1>
        <p className='information'>Este es un tipo de restaurante que normalmente sirve comidas y bebidas, además de refrigerios ligeros como productos horneados o bocadillos.</p>
    
        <Link className='btnExplore' to="/login">
          Explorar
        </Link>

        {/* <Link className='btnExplore' to="/profile">
          Profile
        </Link> */}



    </div>
  )
}
