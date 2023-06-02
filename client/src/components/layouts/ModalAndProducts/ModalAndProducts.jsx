
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { deleteProducts } from '../../features/products/productSlice';
import io from 'socket.io-client';
// UI
import { ImgUI } from '../../UI/ImgUI/ImgUI';
import { ButtonUI } from '../../UI/ButtonUI/ButtonUI';

// LAYOUT
import { FormCreateProducts } from '../FormCreateProducts/FormCreateProducts';
import { FormUpdatedProducts } from '../FormUpdatedProducts/FormUpdatedProducts';
import { ModalAndProductsContext } from '../ContainerProducts/ContainerProducts';

// IMG
import updateIcon from '../../../Images/updateIcon.png';
import deleteIcon from '../../../Images/deleteIcon.png';


const socket = io('http://localhost:5000');

export const ModalAndProducts = () => {
  const { activeCategory } = useContext(ModalAndProductsContext);

  // Modal de crear producto
  const [modalCreateProductOpen, setModalCreateProductOpen] = useState(false);
  const openModalCreateProduct = () => {
    setModalCreateProductOpen(true);
  };
  const closeModalCreateProduct = () => {
    setModalCreateProductOpen(false);
  };

  // Modal de actualizar producto
  const [modalUpdatedProductOpen, setModalUpdatedProductOpen] = useState(false);
  const openModalUpdatedProduct = () => {
    setModalUpdatedProductOpen(true);
  };
  const closeModalUpdatedProduct = () => {
    setModalUpdatedProductOpen(false);
  };

  const dispatch = useDispatch();
  const [listProduct, setProduct] = useState([]);


  useEffect(() => {
    const getProductsList = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/products/all/${activeCategory.toLowerCase()}`);
        setProduct(res.data);
        // console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    getProductsList();

    // Conexión inicial del socket
    socket.connect();

    // Manejar el evento de nuevos productos y actualización de productos
    socket.on('productos', (listProduct) => {
      setProduct(listProduct);
    });

    // Manejar el evento de nuevo producto emitido desde el servidor
    socket.on('nuevoProducto', (producto) => {
      setProduct((prevListProduct) => [...prevListProduct, producto]);
    });

    // Manejar el evento de producto eliminado emitido desde el servidor
    // socket.on('productoEliminado', (productoId) => {
    //   setProduct((prevListProduct) => prevListProduct.filter((producto) => producto._id !== productoId));
    // });


  }, [activeCategory,listProduct]);

  return (
    <>
      <div className={`modalCreateProducts ${modalCreateProductOpen ? 'open' : ''}`}>
        <ButtonUI onClicks={closeModalCreateProduct} style='btnCloseModal' text='x' />
        <FormCreateProducts />
      </div>

      <div className={`modalCreateProducts ${modalUpdatedProductOpen ? 'open' : ''}`}>
        <ButtonUI onClicks={closeModalUpdatedProduct} style='btnCloseModal' text='x' />
        <FormUpdatedProducts />
      </div>

      <div className='containerCards'>
        <div className='cardCreateProduct'>
          <ButtonUI onClicks={openModalCreateProduct} style='btnOpenModal' text='+' />
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

              <div className='containerEdits'>
                <ButtonUI onClicks={() => dispatch(deleteProducts(producto._id))} style='btnDeleteProduct' text={<ImgUI style='iconDelete' routeImg={deleteIcon} />} />
                <ButtonUI onClicks={() => openModalUpdatedProduct()} style='btnEditProduct' text={<ImgUI style='iconEdit' routeImg={updateIcon} />} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
