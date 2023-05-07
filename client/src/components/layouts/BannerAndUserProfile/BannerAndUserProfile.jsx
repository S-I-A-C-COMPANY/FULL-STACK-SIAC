// UI
import { ImgUI } from '../../UI/ImgUI/ImgUI'
import { ButtonUI } from '../../UI/ButtonUI/ButtonUI'

//IMG
import imageBanner from '../../../Images/iconUser.png'

export const BannerAndUserProfile = () => {
    return (
        <div className="banner">
            <ImgUI style='imgProfile' routeImg={imageBanner} />
            <ButtonUI style='btnUpload' text='+' />

            <div className="groupText">
                <p className="nameProfile">siac company</p>
                <p className="emailProfile">siac@gmail.com</p>
            </div>
        </div>
    )
}
