// Layout
import { MainProducts } from '../../layouts/MainProducts/MainProducts'

export const Products = () => {
    localStorage.removeItem("isReloaded");
    return (
        <MainProducts />
    )
}
