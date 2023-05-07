// UI
import { ImgUI } from "../../UI/ImgUI/ImgUI";
import { InputUI } from "../../UI/InputUI/InputUI";
import { ButtonUI } from "../../UI/ButtonUI/ButtonUI";

//IMG
import imgUser from '../../../Images/imgUser.png'

export const FormUpdateProfile = () => {
    return (
        <form className="formProfile" action="">
            <div className="containInputs">
                <ImgUI style='imgUser' routeImg={imgUser} />
                <InputUI style='inputs' textInpt='Nombre Completo' />
            </div>

            <div className="containInputs">
                <ImgUI style='imgUser' routeImg={imgUser} />
                <InputUI style='inputs' textInpt='Example@gmail.com' />
            </div>

            <div className="containInputs">
                <ImgUI style='imgUser' routeImg={imgUser} />
                <InputUI style='inputs' textInpt='Celular' />
            </div>

            <div className="containInputs">
                <ImgUI style='imgUser' routeImg={imgUser} />
                <InputUI style='inputs' textInpt='Direccion' />
            </div>

            <div className="containInputs">
                <ImgUI style='imgUser' routeImg={imgUser} />
                <InputUI style='inputs' textInpt='Contraseña' />
            </div>

            <div className="containInputs">
                <ImgUI style='imgUser' routeImg={imgUser} />
                <InputUI style='inputs' textInpt='Contraseña' />
            </div>

            <ButtonUI typeBtn='submit' style='btnUpdate' text='Actualizar' />
        </form>
    )
}
