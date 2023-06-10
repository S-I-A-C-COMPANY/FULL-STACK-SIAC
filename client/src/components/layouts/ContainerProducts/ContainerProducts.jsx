import React, { createContext, useState } from 'react';
import { ContainerTittleMenu } from '../ContainerTittleMenu/ContainerTittleMenu';
import { ContainerCategories } from '../ContainerCategories/ContainerCategories';
import { ModalAndProducts } from '../ModalAndProducts/ModalAndProducts';

export const ModalAndProductsContext = createContext();

export const ContainerProducts = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [listProduct, setProduct] = useState([]);
  const [categoryContent, setCategoryContent] = useState([]);

  return (
    <div className="containerProducts">
      <ContainerTittleMenu />

      {/* Proveedor del contexto ModalAndProductsContext */}
      <ModalAndProductsContext.Provider
      value={{setActiveCategory, activeCategory, listProduct, setProduct, categoryContent, setCategoryContent }}
    >
      <ContainerCategories />
        <ModalAndProducts />
      </ModalAndProductsContext.Provider>
    </div>
  );
};
