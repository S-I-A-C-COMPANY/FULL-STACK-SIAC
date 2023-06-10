import React, { createContext, useState } from 'react';
import { ContainerTittleMenu } from '../ContainerTittleMenu/ContainerTittleMenu';
import { ContainerCategories } from '../ContainerCategories/ContainerCategories';
import { ModalAndProducts } from '../ModalAndProducts/ModalAndProducts';

export const ModalAndProductsContext = createContext();

export const ContainerProducts = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [listProduct, setProduct] = useState([]);
  const [categoryContent, setcategoryContent] = useState(null);

  return (
    <div className="containerProducts">
      <ContainerTittleMenu />

      {/* Proveedor del contexto ModalAndProductsContext */}
      <ModalAndProductsContext.Provider value={{ activeCategory, setActiveCategory, listProduct, setProduct, categoryContent, setcategoryContent }}>
        <ContainerCategories />
        <ModalAndProducts />
      </ModalAndProductsContext.Provider>
    </div>
  );
};
