// IMG
import logoWhite from '../../../Images/whiteIcon.png'
import iconHome from '../../../Images/iconHome.png'
import iconNotifications from '../../../Images/iconNotifications.png'

// UI
import { Link } from 'react-router-dom'
import { ImgUI } from '../../UI/ImgUI/ImgUI'


export const SideBarProducts = () => {
    return (
        <div className='sideBar'>
            <nav className="navBarInSideBar">
                <ul>
                    <li className="listLinks"><Link className="links" to=''><ImgUI style='imgIcon' routeImg={logoWhite} /></Link></li>
                    <li className="listLinks"><Link className="links" to=''><ImgUI style='iconHome' routeImg={iconHome}></ImgUI></Link></li>
                    <li className="listLinks"><Link className="links" to=''><ImgUI style='iconNotification' routeImg={iconNotifications}></ImgUI></Link></li>
                </ul>
            </nav>
        </div>
    )
}
