import React from 'react'

// UI
import { ImgLeft } from '../../UI/ImgLeft/ImgLeft'

// IMG
import logoOrder from '../../../Images/Exclude.png'
import logoLogin from '../../../Images/heroBg.png'


export const SectionLeft = () => {
  return (
    <section className='sectionLeft'>
        <ImgLeft style='orderLogo' path= {logoOrder} />
        <ImgLeft style='leftContain' path={logoLogin} />
    </section>
  )
}
