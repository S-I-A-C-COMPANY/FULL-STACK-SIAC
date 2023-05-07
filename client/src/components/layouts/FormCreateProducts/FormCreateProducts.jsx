// UI
import { InputUI } from '../../UI/InputUI/InputUI'
import { ButtonUI } from '../../UI/ButtonUI/ButtonUI'

export const FormCreateProducts = () => {
    return (
        <form className='formCreateProduct' action="">
            <InputUI typeInpt='text' style='inputProduct' textInpt='Ingrese Nombre' />
            <InputUI typeInpt='number' style='inputProduct' textInpt='Ingrese Precio' />
            <InputUI typeInpt='text' style='inputProduct' textInpt='Ingrese Descripcion' />

            <InputUI typeInpt='button' style='inputProduct' valueInpt='Inserte Imagen' />

            <ButtonUI style='btnCreateProduct' text='Crear producto' />
        </form>
    )
}
