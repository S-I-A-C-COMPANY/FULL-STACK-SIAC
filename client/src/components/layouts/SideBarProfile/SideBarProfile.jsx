import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../features/auth/authSlice";

// UI
import { ImgUI } from "../../UI/ImgUI/ImgUI";
import { ButtonUI } from "../../UI/ButtonUI/ButtonUI";

//IMG
import logoWhite from '../../../Images/whiteIcon.png'
import iconHome from '../../../Images/iconHome.png'
import iconNotifications from '../../../Images/iconNotifications.png'
import iconCalendary from '../../../Images/iconCalendary.png'
import iconStats from '../../../Images/iconStats.png'
import iconProfile from '../../../Images/iconProfile.png'


export const SideBarProfile = () => {

    const dispatch = useDispatch();

    const onSubmit = () => {
        dispatch(logout());
    };

    return (
        <div className='sideBar'>
            <nav className="navBarInSideBar">
                <ul>
                    <li className="listLinks"><Link className="links" to='/'><ImgUI style='imgIcon' routeImg={logoWhite} /></Link></li>
                    <li className="listLinks"><Link className="links" to=''><ImgUI style='iconHome' routeImg={iconHome}></ImgUI></Link></li>
                    <li className="listLinks"><Link className="links" to=''><ImgUI style='iconNotification' routeImg={iconNotifications}></ImgUI></Link></li>
                    <li className="listLinks"><Link className="links" to=''><ImgUI style='iconCalendary' routeImg={iconCalendary}></ImgUI></Link></li>
                    <li className="listLinks"><Link className="links" to=''><ImgUI style='iconStats' routeImg={iconStats}></ImgUI></Link></li>
                    <li className="listLinks"><Link className="links" to=''><ImgUI style='iconProfile' routeImg={iconProfile}></ImgUI></Link></li>
                </ul>

                <ul>
                    <Link to="/">
                        <li className="listLinks">
                            <ButtonUI onClicks={onSubmit} style='btnLogout' text='Logout' />
                        </li>
                    </Link>
                </ul>
            </nav>
        </div>
    )
}
