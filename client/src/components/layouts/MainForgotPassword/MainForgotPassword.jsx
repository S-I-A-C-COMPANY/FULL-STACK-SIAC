// Layout
import { ContentForgotPass } from '../ContentForgotPass/ContentForgotPass';
import { ContainerInfoForgotPass } from '../ContainerInfoForgotPass/ContainerInfoForgotPass';


export const MainForgotPassword = () => {
    return (
        <>
            <main className='mainForgotPassword'>

                <div className="card">
                    <ContentForgotPass />
                </div>
                

                <div className="messageContent">
                    <ContainerInfoForgotPass />
                </div>
            </main>
        </>
    )
}
