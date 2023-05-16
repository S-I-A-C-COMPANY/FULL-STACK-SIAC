import { useState , useEffect} from 'react'
import axios from 'axios'
import {  useDispatch } from "react-redux";
import { deleteProducts } from '../../features/products/productSlice';

// Importo socket
import io from 'socket.io-client';

// LAYOUT
import { FormCreateProducts } from '../FormCreateProducts/FormCreateProducts'

// UI
import { ImgUI } from '../../UI/ImgUI/ImgUI'
import { ButtonUI } from '../../UI/ButtonUI/ButtonUI'

// IMG
import orderExample from '../../../Images/order.png'
import updateIcon from '../../../Images/updateIcon.png'
import deleteIcon from '../../../Images/deleteIcon.png'

// Se crea una instancia de socket
// const socket = io({
//     transports: ['websocket']
// })
const socket = io('http://localhost:5000')

export const ModalAndProducts = () => {
    
    const [modalOpen, setModalOpen] = useState(false);
    
    const dispatch = useDispatch();
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
            // console.log(res.data)
        }catch(err){
            console.log(err)
        }
    }
    getProductsList()

    // const deleteProduct =  async(id)=>{

    //     dispatch(deleteProducts(id));
        
    // }

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
                            <div className='containerImgOrder'>
                                <ImgUI style='imgOrder' routeImg={producto.image} />
                            </div>
                        

                        <div className='infoOrder'>
                            <h3 className='nameOrder'>Nombre: {producto.name}</h3>
                            <p className='priceOrder'>Precio: {producto.price}</p>
                            <p className='categoryProduct'>Categoria: {producto.category}</p>
                            <p className='amountProduct'>Cantidad: {producto.amount}</p>
                            <p className='descriptionOrder'>Descripcion: ?? </p>
                            
                            <div className='containerEdits'>
                                <ButtonUI onClicks={()=>dispatch(deleteProducts(producto._id))} style='btnDeleteProduct' text={<ImgUI style='iconDelete' routeImg={deleteIcon}></ImgUI>} />
                            
                                <ButtonUI style='btnEditProduct' text={<ImgUI style='iconEdit' routeImg={updateIcon}></ImgUI>} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}
