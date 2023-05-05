import React from 'react'

// UI
import { ImgUI } from '../../UI/ImgUI/ImgUI'

// IMG
import logoTwo from '../../../Images/searchPerson.svg'


export const ContainerInfoResetPass = () => {
  return (
    <section className="info">
        <p>No te preocupes nosotros te ayudamos!!</p>

        <div class="imgMsg">
            <ImgUI routeImg={logoTwo}/>
        </div>
    </section>
  )
}
