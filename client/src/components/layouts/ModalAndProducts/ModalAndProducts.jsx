import { useState , useEffect} from 'react'
// LAYOUT
import { FormCreateProducts } from '../FormCreateProducts/FormCreateProducts'

// UI
import { ImgUI } from '../../UI/ImgUI/ImgUI'
import { ButtonUI } from '../../UI/ButtonUI/ButtonUI'

// IMG
import orderExample from '../../../Images/order.png'
import axios from 'axios'


export const ModalAndProducts = () => {

    const [modalOpen, setModalOpen] = useState(false);

    // para pintar productos de la bd
    const [listProduct, setProduct] = useState([])

    const openModal = () => {
        setModalOpen(true);
    }

    const closeModal = () => {
        setModalOpen(false);
    }

    // traer productos bd
    useEffect(()=>{
        const getProductsList = async ()=>{
            
            try{
                const res = await axios.get("http://localhost:3000/api/products/all-product")
                setProduct(res.data);
                console.log(res.data)
            }catch(err){
                console.log(err)
            }
        }
        getProductsList()
    },[])

    return (
        <>
            <div className={`modalCreateProducts ${modalOpen ? 'open' : ''}`}>
                <ButtonUI onClicks={closeModal} style='btnCloseModal' text='x' />
                <FormCreateProducts />
            </div>

            <div className='containerCards'>
                <div className='cardCreateProduct'>
                    <ButtonUI onClicks={openModal} style='btnOpenModal' text='+' />
                </div>

                {
                    listProduct.map((producto) => (
                    
                        <div key={producto._id} className='cardOrder'>
                        
                        <ImgUI style='imgOrder' routeImg={orderExample} />

                        <div className='infoOrder'>
                            <h3 className='nameOrder'>Nombre: {producto.name}</h3>
                            <p className='priceOrder'>Precio: {producto.price}</p>
                            <p className='categoryProduct'>Categoria: {producto.category}</p>
                            <p className='amountProduct'>Cantidad: {producto.amount}</p>
                            <p className='descriptionOrder'>Descripcion: ?? </p>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}
