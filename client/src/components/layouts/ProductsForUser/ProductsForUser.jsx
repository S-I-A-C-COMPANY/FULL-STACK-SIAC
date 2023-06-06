import React from 'react';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
// UI
import { ImgUI } from '../../UI/ImgUI/ImgUI';
import { ButtonUI } from '../../UI/ButtonUI/ButtonUI';

// LAYOUT
import { FormCreateProducts } from '../FormCreateProducts/FormCreateProducts';
import { FormUpdatedProducts } from '../FormUpdatedProducts/FormUpdatedProducts';
import { ProductsForUserContext } from '../ContainerProductsUser/ContainerProductsUser';

// IMG
import updateIcon from '../../../Images/updateIcon.png';
import deleteIcon from '../../../Images/deleteIcon.png';

import Swal from "sweetalert2";



const socket = io('http://localhost:5000');

export const ProductsUser = () => {

    const { activeCategory } = useContext(ProductsForUserContext);
  
    const [listProduct, setProduct] = useState([]);

    const addToCar = () => {
      Swal.fire({
        icon: 'success',
        title: 'Mensaje',
        text: 'Agregado al carrito',
        toast: true,
        position: 'top-right',
        showConfirmButton: false,
        timer: 2000,
      });
    }
  
  
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
      <div className='containerCards'>

        {listProduct.map((producto) => (
          <div key={producto._id} className='cardOrderUser'>
            <div className='containerImgOrder'>
              <ImgUI style='imgOrder' routeImg={producto.image} />
            </div>
            <div className='infoOrderUsers'>
              <h3 className='nameOrder'>Nombre: {producto.name}</h3>
              <p className='categoryProduct'>Categoria: {producto.category}</p>
              <div className='containerButtons'>
                <p className='priceOrderUser'>${producto.price}</p>
                <ButtonUI onClicks={() => addToCar()} style='btnAddToCar' text='+' />
              </div>

            </div>
          </div>
        ))}
      </div>
    </>
  );
};
