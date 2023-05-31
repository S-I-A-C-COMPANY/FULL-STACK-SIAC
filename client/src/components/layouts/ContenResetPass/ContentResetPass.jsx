
import React from 'react';
// Layout
import { ContainerImgResetPass } from '../ContainerImgResetPass/ContainerImgResetPass'
import { ContainerHeadingResetPass } from '../ContainerHeadingResetPass/ContainerHeadingResetPass'
import { ContainerFormResetPass } from '../ContainerFormResetPass/ContainerFormResetPass'

export const ContentResetPass = () => {
  return (
        <div className="content">
            <ContainerImgResetPass />

            <ContainerHeadingResetPass />

            <ContainerFormResetPass />
        </div>
  )
}
