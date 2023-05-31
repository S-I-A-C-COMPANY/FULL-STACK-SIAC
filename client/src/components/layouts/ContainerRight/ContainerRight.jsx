
import React from 'react';
// UI
import { ImgUI } from '../../UI/ImgUI/ImgUI'

// IMG
import imagePlate from '../../../Images/foodImg.png'

export const ContainerRight = () => {
  return (
    <div className='containImage'>
      <ImgUI style='imgPlate' routeImg={imagePlate} />
    </div>
  )
}
