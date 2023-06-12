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
import { CounterContext, MainShoppingCart } from '../MainShoppingCart/MainShoppingCart';


// IMG
import updateIcon from '../../../Images/updateIcon.png';
import deleteIcon from '../../../Images/deleteIcon.png';

import Swal from "sweetalert2";



// const socket = io('https://backend-render-corp.onrender.com')
const socket = io("http://localhost:5000");

export const ProductsUser = ({ allProducts, setAllProducts, total, setTotal }) => {

  const { activeCategory, listProduct, setProduct, categoryContent, setCategoryContent } = useContext(ProductsForUserContext);
  const [loadingProducts, setLoadingProducts] = useState(true);


  const onAddProduct = (producto) => {

    // Se verifica si el producto ya existe en el carrito utilizando el ID del producto
    if (allProducts.find(item => item._id === producto._id)) {
      const products = allProducts.map(item =>
        item._id === producto._id
          ? { ...item, quantity: item.quantity + 1 } // Si el producto existe, se actualiza la cantidad sumando 1
          : item
      );

      // Se actualiza el estado "total" sumando el precio del producto multiplicado por la cantidad del producto
      setTotal(total + producto.price * producto.quantity);

      // Se actualiza el estado "allProducts" con la lista de productos actualizada
      return setAllProducts([...products]);
    }

    Swal.fire({
      icon: 'success',
      title: 'Mensaje',
      text: 'Agregado al carrito',
      toast: true,
      position: 'top-right',
      showConfirmButton: false,
      timer: 1500,
    });

    // Se actualiza el estado "total" sumando el precio del producto multiplicado por la cantidad del producto
    setTotal(total + producto.price * producto.quantity)

    // Se agrega el producto al carrito concatenando el producto al estado "allProducts"
    setAllProducts([...allProducts, producto])
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
  }, [activeCategory]);



  return (
    <>
      <div className='containerOrdersUsers'>

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
              <div key={producto._id} className='cardOrderUser'>
                <div className='containerImgOrderUsers'>
                  <ImgUI style='imgOrder' routeImg={producto.image} />
                </div>
                <div className='infoOrderUsers'>
                  <h3 className='nameOrder'>Nombre: {producto.name}</h3>
                  <p className='categoryProduct'>Categoria: {producto.category ? producto.category.name : 'Sin categoría'}</p>
                  <div className='containerButtons'>
                    <p className='priceOrderUser'>${producto.price}</p>
                    <ButtonUI onClicks={() => onAddProduct(producto)}
                      style='btnAddToCar' text='+'
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
