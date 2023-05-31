
import React from 'react';

// Layout
import { ContainerImgForgotPass } from '../ContainerImgForgotPass/ContainerImgForgotPass'
import { ContainerHeadingForgotPass } from '../ContainerHeadingForgotPass/ContainerHeadingForgotPass'
import { ContainerFormForgotPass } from '../ContainerFormForgotPass/ContainerFormForgotPass'



export const ContentForgotPass = () => {
  return (
        <div className="content">
            <ContainerImgForgotPass />
            
            <ContainerHeadingForgotPass />

            <ContainerFormForgotPass />
        </div>
  )
}
