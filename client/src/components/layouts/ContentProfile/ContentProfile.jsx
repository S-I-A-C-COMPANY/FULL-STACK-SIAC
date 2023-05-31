
import React from 'react';
// LAYOUT
import { BannerAndUserProfile } from '../BannerAndUserProfile/BannerAndUserProfile';
import { FormUpdateProfile } from '../FormUpdateProfile/FormUpdateProfile';

export const ContentProfile = () => {
    return (
        <div className="contentProfile">
            <BannerAndUserProfile />
            <FormUpdateProfile />
        </div>
    )
}
