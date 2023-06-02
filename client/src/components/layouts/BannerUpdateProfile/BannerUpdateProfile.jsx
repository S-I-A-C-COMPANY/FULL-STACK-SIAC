
import React from 'react';

// UI
import { ImgUI } from '../../UI/ImgUI/ImgUI'
import { ButtonUI } from '../../UI/ButtonUI/ButtonUI'
import { useState, useEffect } from 'react'
import axios from 'axios'

//IMG
import imageBanner from '../../../Images/iconUser.png'

// const render = 'https://backend-render-corp.onrender.com'
const localHost = 'http://localhost:5000'

export const BannerUpdateProfile = () => {

    const [datUser, setUser] = useState([])

    useEffect(() => {
    
        const getInfoUser = async () => {
          try {
            const res = await axios.get(`${localHost}/api/users/me`);
            setUser(res.data);
            
          } catch (err) {
            console.log(err);
          }
          // console.log(datUser.name)
        };
        getInfoUser();
        },[])
      


    return (
        <div className="banner">
            <ImgUI style='imgUpdatedProfile' routeImg={imageBanner} />
            <ButtonUI style='btnUpload' text='+' />

            <div className="groupText">
                <p className="nameUpdatedProfile">{datUser.name}</p>
                <p className="emailUpdatedProfile">{datUser.email}</p>
            </div>
        </div>
    )
}
