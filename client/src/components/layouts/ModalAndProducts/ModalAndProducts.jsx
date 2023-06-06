import React, { useState, useEffect, useContext } from 'react';
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
  const dispatch = useDispatch();
  const [listProduct, setProduct] = useState([]);
  const [modalCreateProductOpen, setModalCreateProductOpen] = useState(false);
  const [modalUpdatedProductOpen, setModalUpdatedProductOpen] = useState(false);
  const [idProduct, setIdProduct] = useState('')

  const openModalCreateProduct = () => {
    setModalCreateProductOpen(true);
  };

  const closeModalCreateProduct = () => {
    setModalCreateProductOpen(false);
  };

  const openModalUpdatedProduct = () => {
    setModalUpdatedProductOpen(true);

  };

  const closeModalUpdatedProduct = () => {
    setModalUpdatedProductOpen(false);
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
  }, [activeCategory,listProduct]);

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
  }, [activeCategory]);

  return (
    <>
      <div className={`modalCreateProducts ${modalCreateProductOpen ? 'open' : ''}`}>
        <ButtonUI onClicks={closeModalCreateProduct} style='btnCloseModal' text='x' />
        <FormCreateProducts />
      </div>

      <div className={`modalCreateProducts ${modalUpdatedProductOpen ? 'open' : ''}`}>
        <ButtonUI onClicks={closeModalUpdatedProduct} style='btnCloseModal' text='x' />
        <FormUpdatedProducts idProduct={idProduct} />
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
                <ButtonUI onClicks={() => openModalUpdatedProduct(setIdProduct(producto._id))} style='btnEditProduct' text={<ImgUI style='iconEdit' routeImg={updateIcon} />} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
