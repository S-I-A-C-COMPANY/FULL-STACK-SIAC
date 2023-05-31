// LAYOUT
import { BannerUpdateProfile } from '../BannerUpdateProfile/BannerUpdateProfile';
import { FormUpdateProfile } from '../FormUpdateProfile/FormUpdateProfile';

export const ContentUpdateProfile = () => {
    return (
        <div className="contentUpdateProfile">
            <BannerUpdateProfile />
            <FormUpdateProfile />
        </div>
    )
}
