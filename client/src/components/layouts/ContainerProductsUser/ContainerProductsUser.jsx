import React, { createContext, useState } from 'react';
import { ContainerCategoriesForUser } from '../ContainerCategoriesForUser/ContainerCategoriesForUser';
import { ContainerTittleMenuUser } from '../ContainerTittleMenuUser/ContainerTittleMenuUser';
import { ProductsUser } from '../ProductsForUser/ProductsForUser';
import { MainShoppingCart } from '../MainShoppingCart/MainShoppingCart';


export const ProductsForUserContext = createContext();

export const ContainerProductsUser = () => {

  const [activeCategory, setActiveCategory] = useState('All');
  const [listProduct, setProduct] = useState([]);
  const [categoryContent, setCategoryContent] = useState([]);

  // Cart & Products
  const [allProducts, setAllProducts] = useState([]); //  Almacenar los productos en el carrito
  const [total, setTotal] = useState(0); // Almacenar el valor total del carrito

  return (
    <div className="containerProductsUser">

      {/* Proveedor del contexto ProductsForUserContext */}
      <ProductsForUserContext.Provider
        value={{ setActiveCategory, activeCategory, listProduct, setProduct, categoryContent, setCategoryContent }}
      >
        <div className='containerCartAndMenu'>
          <ContainerTittleMenuUser />
          <ContainerCategoriesForUser />

          {/* Componente para mostrar los productos disponibles 
          para el usuario y permitir agregarlos al carrito */}
          <ProductsUser
            allProducts={allProducts}
            setAllProducts={setAllProducts}
            total={total}
            setTotal={setTotal}
          />
        </div>

        {/* Componente para mostrar el carrito de compras y realizar 
        acciones como eliminar productos y realizar el pago */}
        <MainShoppingCart
          allProducts={allProducts}
          setAllProducts={setAllProducts}
          total={total}
          setTotal={setTotal}
        />

      </ProductsForUserContext.Provider>
    </div>
  )
}
