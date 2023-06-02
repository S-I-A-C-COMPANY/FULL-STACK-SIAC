import React from 'react'
import { Link } from "react-router-dom";
// UI
import { ImgUI } from '../../UI/ImgUI/ImgUI'

// IMG
import iconToCar from "../../../Images/iconCar.png"

export const ContainerTittleMenuUser = () => {
  return (
    <div className='containerTittle'>
        <div className="tittleMenuUser">
            <h1 className='tittleUser'>Menú</h1>   
        </div>

        <Link className='containerIcon' to='/products-user'>
            <ImgUI style='iconToCar' routeImg={iconToCar} />
        </Link>
    </div>
  )
}
