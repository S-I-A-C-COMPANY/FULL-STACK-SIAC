// LAYOUT
import { ContainerTittleMenu } from '../ContainerTittleMenu/ContainerTittleMenu'
import { ContainerCategories } from '../ContainerCategories/ContainerCategories'
import { ModalAndProducts } from '../ModalAndProducts/ModalAndProducts'

export const ContainerProducts = () => {
    return (
        <div className="containerProducts">
            <ContainerTittleMenu />
            <ContainerCategories />
            <ModalAndProducts />
        </div>
    )
}