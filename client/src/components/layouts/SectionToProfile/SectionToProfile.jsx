import React from "react";
import { Link } from "react-router-dom";

export const SectionToProfile = () => {
  return (
    <section className='sectionToProfile'>
        <p className='infoToUpdate'>¿Desea actualizar su perfil?</p>
        <Link className='anchorToUpdateProfile' to='/update-profile'>Si</Link>
    </section>  
  )
}
