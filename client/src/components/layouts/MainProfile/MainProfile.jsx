import { Link, useNavigate } from "react-router-dom";


import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/auth/authSlice";
// UI
import { ImgUI } from "../../UI/ImgUI/ImgUI";
import { InputUI } from "../../UI/InputUI/InputUI";
import { ButtonUI } from "../../UI/ButtonUI/ButtonUI";


//IMG
import logoWhite from '../../../Images/whiteIcon.png'
import imageBanner from '../../../Images/iconUser.png'
import iconHome from '../../../Images/iconHome.png'
import iconNotifications from '../../../Images/iconNotifications.png'
import iconCalendary from '../../../Images/iconCalendary.png'
import iconStats from '../../../Images/iconStats.png'
import iconProfile from '../../../Images/iconProfile.png'

import imgUser from '../../../Images/imgUser.png'



export const MainProfile = () => {
    const dispatch = useDispatch();

    const onSubmit = () => {
        dispatch(logout());
      };
    
  return (
    <main className='mainProfile'>

        <div className='sideBar'>
            <nav className="navBarInSideBar">
                <ul>
                    <li className="listLinks"><Link className="links" to='/'><ImgUI style='imgIcon' routeImg={logoWhite}/></Link></li>
                    <li className="listLinks"><Link className="links" to=''><ImgUI style='iconHome' routeImg={iconHome}></ImgUI></Link></li>
                    <li className="listLinks"><Link className="links" to=''><ImgUI style='iconNotification' routeImg={iconNotifications}></ImgUI></Link></li>
                    <li className="listLinks"><Link className="links" to=''><ImgUI style='iconCalendary' routeImg={iconCalendary}></ImgUI></Link></li>
                    <li className="listLinks"><Link className="links" to=''><ImgUI style='iconStats' routeImg={iconStats}></ImgUI></Link></li>
                    <li className="listLinks"><Link className="links" to=''><ImgUI style='iconProfile' routeImg={iconProfile}></ImgUI></Link></li>
                </ul>

                <ul>
                    <Link to="/"> 
                    <li className="listLinks">
                        
                        <ButtonUI onClicks={onSubmit} style='btnLogout' text='Logout'/> 
                        
                       
                        
                    </li>
                    </Link>
                </ul>

            </nav> 
        </div>

        <div className="contentImages">

            <div className="banner">
                <ImgUI style='imgProfile' routeImg={imageBanner}/>
                <ButtonUI style='btnUpload' text='+'/>

                <div className="groupText">
                    <p className="nameProfile">siac company</p>
                    <p className="emailProfile">siac@gmail.com</p>
                </div>

            </div>
        

            <form className="formProfile" action="">

                <div className="containInputs">
                    <ImgUI style='imgUser' routeImg={imgUser} />
                    <InputUI style='inputs' textInpt='Nombre Completo' />  
                </div>
            

                <div className="containInputs">
                    <ImgUI style='imgUser' routeImg={imgUser} />
                    <InputUI style='inputs' textInpt='Example@gmail.com'/>
                </div>

                <div className="containInputs">
                    <ImgUI style='imgUser' routeImg={imgUser} />
                    <InputUI style='inputs' textInpt='Celular'/>
                </div>

                <div className="containInputs">
                    <ImgUI style='imgUser' routeImg={imgUser} />
                    <InputUI style='inputs' textInpt='Direccion'/>
                </div>
                
                <div className="containInputs">
                    <ImgUI style='imgUser' routeImg={imgUser} />
                    <InputUI style='inputs' textInpt='Contraseña'/>
                </div>

                <div className="containInputs">
                    <ImgUI style='imgUser' routeImg={imgUser} />
                    <InputUI style='inputs' textInpt='Contraseña'/>
                </div>
            
                <ButtonUI typeBtn='submit' style='btnUpdate' text='Actualizar' />
            </form>

            
        </div>
    </main>
  )
}
