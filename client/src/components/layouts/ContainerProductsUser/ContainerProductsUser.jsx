import { createContext, useState } from 'react';
import { ContainerCategoriesForUser } from '../ContainerCategoriesForUser/ContainerCategoriesForUser';
import { ContainerTittleMenuUser } from '../ContainerTittleMenuUser/ContainerTittleMenuUser';

import { ProductsUser } from '../ProductsForUser/ProductsForUser';
export const ProductsForUserContext = createContext();

export const ContainerProductsUser = () => {

  const [activeCategory, setActiveCategory] = useState('All');

  return (
    <div className="containerProductsUser">
      <ContainerTittleMenuUser />

      {/* Proveedor del contexto ProductsForUserContext */}
      <ProductsForUserContext.Provider value={{activeCategory, setActiveCategory}}>
        <ContainerCategoriesForUser />
        <ProductsUser />
      </ProductsForUserContext.Provider>
    </div>
  )
}
