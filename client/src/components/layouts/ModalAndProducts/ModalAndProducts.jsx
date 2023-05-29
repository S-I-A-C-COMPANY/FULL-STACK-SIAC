import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { deleteProducts } from '../../features/products/productSlice';
import io from 'socket.io-client';
import { ModalAndProductsContext } from '../ContainerProducts/ContainerProducts';
import { ImgUI } from '../../UI/ImgUI/ImgUI';
import { ButtonUI } from '../../UI/ButtonUI/ButtonUI';
import updateIcon from '../../../Images/updateIcon.png';
import deleteIcon from '../../../Images/deleteIcon.png';
// LAYOUT
import { FormCreateProducts } from '../FormCreateProducts/FormCreateProducts'

const socket = io('http://localhost:5000');
export const ModalAndProducts = () => {
    const { activeCategory } = useContext(ModalAndProductsContext);
    const [modalOpen, setModalOpen] = useState(false);
    const dispatch = useDispatch();
    const [listProduct, setProduct] = useState([]);

    const openModal = () => {
        setModalOpen(true);
    }

    const closeModal = () => {
        setModalOpen(false);
    }

    useEffect(() => {
        socket.on('productos', (listProduct) => {
            setProduct(listProduct);
        });
    
        socket.on('nuevoProducto', (producto) => {
            setProduct([...listProduct, producto]);
        });
    
        return () => {
            socket.disconnect();
        };
    
    }, [])

    useEffect(() => {
        const getProductsList = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/products/all/${activeCategory.toLowerCase()}`);
                setProduct(res.data);
                console.log(res.data);
            } catch (err) {
                console.log(err);
            }
        }

        getProductsList();
    }, [activeCategory]);

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

                {listProduct.map((producto) => (
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
                                <ButtonUI onClicks={() => dispatch(deleteProducts(producto._id))} style='btnDeleteProduct' text={<ImgUI style='iconDelete' routeImg={deleteIcon} />} />
                                <ButtonUI style='btnEditProduct' text={<ImgUI style='iconEdit' routeImg={updateIcon} />} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}
