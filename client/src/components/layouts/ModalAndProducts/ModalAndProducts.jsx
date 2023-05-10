import { useState , useEffect} from 'react'
import axios from 'axios'
// Importo socket
import io from 'socket.io-client';

// LAYOUT
import { FormCreateProducts } from '../FormCreateProducts/FormCreateProducts'

// UI
import { ImgUI } from '../../UI/ImgUI/ImgUI'
import { ButtonUI } from '../../UI/ButtonUI/ButtonUI'

// IMG
import orderExample from '../../../Images/order.png'

// Se crea una instancia de socket
const socket = io('http://localhost:3000')

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
        // cuando el componente se monta, nos conectamos al servidor WebSocket y solicitamos la lista de productos
        socket.on('productos', (listProduct) => {
            setProduct(listProduct);
        });
    
        // cuando se agrega un nuevo producto, lo agregamos a la lista de productos
        socket.on('nuevoProducto', (producto) => {
            setProduct([...listProduct, producto]);
        });
    
        // cuando el componente se desmonta, desconectamos el socket
        return () => {
            socket.disconnect();
        };
    
    },[listProduct])


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
