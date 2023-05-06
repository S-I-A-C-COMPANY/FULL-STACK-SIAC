import React from 'react'
import { ContentResetPass } from '../ContenResetPass/ContentResetPass'
import { ContainerInfoResetPass } from '../ContainerInfoResetPass/ContainerInfoResetPass'


export const MainResetPassword = () => {
  
  return (
    <>
        <main className='mainResetPassword'>

                <div className='card'>
                    <ContentResetPass />
                </div>

                <div className='messageContent'>
                    <ContainerInfoResetPass />
                </div>

        </main>
    </>
  )
}
