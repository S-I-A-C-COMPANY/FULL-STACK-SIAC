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

  // carrito etc
  const [allProducts, setAllProducts] = useState([]);
  const [total, setTotal] = useState(0);

  return (
    <div className="containerProductsUser">

      {/* Proveedor del contexto ProductsForUserContext */}
      <ProductsForUserContext.Provider
        value={{ setActiveCategory, activeCategory, listProduct, setProduct, categoryContent, setCategoryContent }}
      >
        <div className='containerCartAndMenu'>
          <ContainerTittleMenuUser />
          <ContainerCategoriesForUser />
          <ProductsUser
            allProducts={allProducts}
            setAllProducts={setAllProducts}
            total={total}
            setTotal={setTotal}
          />
        </div>

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
