// Layout
import { ContainerImgForgotPass } from '../ContainerImgForgotPass/ContainerImgForgotPass'
import { ContainerHedingForgotPass } from '../ContainerHeadingForgotPass/ContainerHeadingForgotPass'
import { ContainerFormForgotPass } from '../ContainerFormForgotPass/ContainerFormForgotPass'



export const ContentForgotPass = () => {
  return (
        <div className="content">
            <ContainerImgForgotPass />
            
            <ContainerHedingForgotPass />

            <ContainerFormForgotPass />
        </div>
  )
}
