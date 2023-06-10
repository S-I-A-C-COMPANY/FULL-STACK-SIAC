import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
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
import { deleteProducts } from '../../features/products/productSlice';

const socket = io('http://localhost:5000');

export const ModalAndProducts = () => {
  const { activeCategory, listProduct, setProduct, categoryContent } = useContext(ModalAndProductsContext);
  const [modalCreateProductOpen, setModalCreateProductOpen] = useState(false);
  const [modalUpdatedProductOpen, setModalUpdatedProductOpen] = useState(false);
  const [idProduct, setIdProduct] = useState('');
  const [resetFormKey, setResetFormKey] = useState(0);
  const [shouldReloadApi, setShouldReloadApi] = useState(false);
  const dispatch = useDispatch();

  const openModalCreateProduct = () => {
    setModalCreateProductOpen(true);
    
  };

  const closeModalCreateProduct = () => {
    setModalCreateProductOpen(false);
    setResetFormKey((prevKey) => prevKey + 1);
     setShouldReloadApi(true);
  };

  const openModalUpdatedProduct = (id) => {
    setModalUpdatedProductOpen(true);
    setIdProduct(id);
  };

  const closeModalUpdatedProduct = () => {
    setModalUpdatedProductOpen(false);
    setResetFormKey((prevKey) => prevKey + 1); // Incrementar la clave para reiniciar el formulario
  };

  useEffect(() => {
    const getProductsList = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/products/all/${activeCategory.toLowerCase()}`);
        setProduct(res.data);
        
      } catch (err) {
        console.log(err);
      }
    };

    getProductsList();

    return () => {
      socket.disconnect();
    };
  }, [activeCategory, listProduct,shouldReloadApi]);

  useEffect(() => {
    socket.connect();

    socket.on('productos', (listProduct) => {
      setProduct(listProduct);
    });

    socket.on('nuevoProducto', (producto) => {
      if (producto.category.toLowerCase() === activeCategory.toLowerCase()) {
        setProduct((prevListProduct) => [...prevListProduct, producto]);
        
      }
    });

    socket.on('eliminarProducto', () => {
      setProduct((prevListProduct) => prevListProduct.slice(0, -1));
      
    });
  }, [activeCategory]);

  const deleteLastProduct = async () => {
    if (listProduct.length > 0) {
      const lastProductId = listProduct[listProduct.length - 1]._id;

      // Eliminar el producto del backend
      await dispatch(deleteProducts(lastProductId));

      // Eliminar el producto del frontend
      setProduct((prevListProduct) => prevListProduct.slice(0, -1));

     
    }
  };

  return (
    <>
      <div className={`modalCreateProducts ${modalCreateProductOpen ? 'open' : ''}`}>
        <ButtonUI onClicks={closeModalCreateProduct} style='btnCloseModal' text='x' />
        <FormCreateProducts key={resetFormKey} onClose={closeModalCreateProduct} />
      </div>

      <div className={`modalCreateProducts ${modalUpdatedProductOpen ? 'open' : ''}`}>
        <ButtonUI onClicks={closeModalUpdatedProduct} style='btnCloseModal' text='x' />
        <FormUpdatedProducts key={resetFormKey} idProduct={idProduct} onClose={closeModalUpdatedProduct} />
      </div>

      <div className='containerCards'>
        <div className='cardCreateProduct'>
          <ButtonUI onClicks={openModalCreateProduct} style='btnOpenModal' text='+' />
        </div>

        {categoryContent==false ? (
          <p className='emptyProducts'>No hay productos en la categoría activa.</p>
        ) : (
          listProduct.map((producto) => (
          <div key={producto._id} className='cardOrder'>
            <div className='containerImgOrder'>
              <ImgUI style='imgOrder' routeImg={producto.image} />
            </div>
            <div className='infoOrder'>
              <h3 className='nameOrder'>Nombre: {producto.name}</h3>
              <p className='priceOrder'>Precio: {producto.price}</p>
              <p className='categoryProduct'>Categoria: {producto.category}</p>

              <div className='containerEdits'>
                <ButtonUI onClicks={() => deleteLastProduct()} style='btnDeleteProduct' text={<ImgUI style='iconDelete' routeImg={deleteIcon} />} />
                <ButtonUI onClicks={() => openModalUpdatedProduct(producto._id)} style='btnEditProduct' text={<ImgUI style='iconEdit' routeImg={updateIcon} />} />
              </div>
            </div>
          </div>
        )))}
      </div>
    </>
  );
};
