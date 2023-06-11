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
  const { activeCategory, listProduct, setProduct, categoryContent, setCategoryContent } = useContext(
    ModalAndProductsContext
  );
  const [modalCreateProductOpen, setModalCreateProductOpen] = useState(false);
  const [modalUpdatedProductOpen, setModalUpdatedProductOpen] = useState(false);
  const [idProduct, setIdProduct] = useState('');
  const [resetFormKey, setResetFormKey] = useState(0);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const dispatch = useDispatch();

  const openModalCreateProduct = () => {
    setModalCreateProductOpen(true);
  };

  const closeModalCreateProduct = () => {
    setModalCreateProductOpen(false);
    setResetFormKey((prevKey) => prevKey + 1);
    fetchProductsList();
  };

  const openModalUpdatedProduct = (id) => {
    setModalUpdatedProductOpen(true);
    setIdProduct(id);
  };

  const closeModalUpdatedProduct = () => {
    setModalUpdatedProductOpen(false);
    setResetFormKey((prevKey) => prevKey + 1);
  };

  const fetchProductsList = async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));

      const res = await axios.get(`http://localhost:5000/api/products/all`);
      setProduct(res.data);

      const productsInActiveCategory = res.data.filter(
        (producto) => activeCategory === 'All' || producto.category.name.toLowerCase() === activeCategory.toLowerCase()
      );
      setCategoryContent(productsInActiveCategory.length > 0);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setLoadingProducts(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProductsList();

    return () => {
      socket.disconnect();
    };
  }, [listProduct]);

  useEffect(() => {
    socket.connect();

    socket.on('productos', (listProduct) => {
      setProduct(listProduct);
      setCategoryContent(listProduct.length > 0);
    });

    socket.on('nuevoProducto', (producto) => {
      setProduct((prevListProduct) => [...prevListProduct, producto]);
      if (producto.category.name.toLowerCase() === activeCategory.toLowerCase()) {
        setCategoryContent(true);
      }
    });

    socket.on('eliminarProducto', (productoId) => {
      setProduct((prevListProduct) => prevListProduct.filter((producto) => producto._id !== productoId));
      setCategoryContent((prevCategoryContent) =>
        prevCategoryContent &&
        prevCategoryContent.filter((producto) => producto._id !== productoId).length > 0
      );
    });
  }, [activeCategory]);

  const deleteProduct = async (productId) => {
    await dispatch(deleteProducts(productId));
    setProduct((prevListProduct) => prevListProduct.filter((producto) => producto._id !== productId));
    setCategoryContent((prevCategoryContent) => {
      if (Array.isArray(prevCategoryContent)) {
        return prevCategoryContent.filter((producto) => producto._id !== productId);
      }
      return [];
    });
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
          <ButtonUI onClicks={openModalCreateProduct} style='btnOpenModal'  text='+' />
        </div>

        {loadingProducts ? (
          <p className='emptyProducts'>Cargando productos...</p>
        ) : !categoryContent && activeCategory !== 'All' || listProduct.length === 0 ? (
          <p className='emptyProducts'>No hay productos en la categoría activa.</p>
        ) : (
          listProduct
            .filter(
              (producto) => activeCategory === 'All' || producto.category.name.toLowerCase() === activeCategory.toLowerCase()
            )
            .map((producto) => (
              <div key={producto._id} className='cardOrder'>
                <div className='containerImgOrder'>
                  <ImgUI style='imgOrder' routeImg={producto.image} />
                </div>
                <div className='infoOrder'>
                  <h3 className='nameOrder'>Nombre:  {producto.name}</h3>
                  <p className='priceOrder'>Precio: {producto.price}</p>
                  <p className='categoryProduct'>Categoria: {producto.category.name}</p>

                  <div className='containerEdits'>
                    <ButtonUI
                      onClicks={() => deleteProduct(producto._id)}
                      style='btnDeleteProduct'
                      text={<ImgUI style='iconDelete' routeImg={deleteIcon} />}
                    />
                    <ButtonUI
                      onClicks={() => openModalUpdatedProduct(producto._id)}
                      style='btnEditProduct'
                      text={<ImgUI style='iconEdit' routeImg={updateIcon} />}
                    />
                  </div>
                </div>
              </div>
            ))
        )}
      </div>
    </>
  );
};
