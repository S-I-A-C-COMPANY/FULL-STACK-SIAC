// UI
import { ImgUI } from "../../UI/ImgUI/ImgUI";
import { InputUI } from "../../UI/InputUI/InputUI";
import { ButtonUI } from "../../UI/ButtonUI/ButtonUI";

import axios from "axios";
import { useState } from "react";


//IMG
import imgUser from '../../../Images/imgUser.png'
import imgCall from '../../../Images/forms/Call.svg'
import imgMail from '../../../Images/forms/Mail.svg'
import imgPass from '../../../Images/forms/pass.svg'
import imgDir from '../../../Images/forms/dir.svg'

// const render = 'https://backend-render-corp.onrender.com'
const localHost = 'http://localhost:5000'

export const FormUpdateProfile = () => {

    var userInfo = JSON.parse(localStorage.getItem('user'));
    let idInfo = userInfo._id
    const [datUser, setUser] = useState([])

    const getInfoUser = async ()=>{
        
        try{
            const res = await axios.get(`${localHost}/api/users/me/`+idInfo)
             setUser(res.data);
            // console.log(res.data)
            
        }catch(err){
            console.log(err)
        }
    }
    getInfoUser()



    return (
        
        <form className="formProfile" action="">
            <div className="containInputs">
                <ImgUI style='imgUser' routeImg={imgUser} />
                <InputUI 
                style='inputs' 
                textInpt={datUser.name}
                
                />
            </div>

            <div className="containInputs">
                <ImgUI style='imgUser' routeImg={imgMail} />
                <InputUI 
                style='inputs' 
                textInpt={datUser.email} />
            </div>

            <div className="containInputs">
                <ImgUI style='imgUser' routeImg={imgCall} />
                <InputUI 
                style='inputs' 
                textInpt='Celular' />
            </div>

            <div className="containInputs">
                <ImgUI style='imgUser' routeImg={imgDir} />
                <InputUI 
                style='inputs' 
                textInpt='Direccion' />
            </div>

            <div className="containInputs">
                <ImgUI style='imgUser' routeImg={imgPass} />
                <InputUI 
                style='inputs' 
                textInpt='Contraseña' />
            </div>

            <div className="containInputs">
                <ImgUI style='imgUser' routeImg={imgPass} />
                <InputUI 
                style='inputs' 
                textInpt='Contraseña' />
            </div>

            <ButtonUI typeBtn='submit' style='btnUpdate' text='Actualizar' />
        </form>
    )
}
