import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { ModalAndProductsContext } from '../ContainerProducts/ContainerProducts';

export const ContainerCategories = () => {
  const { setActiveCategory, listProduct,  setCategoryContent } = useContext(ModalAndProductsContext);
  const [activeLink, setActiveLink] = useState(0);

  const onClickLink = (i) => {
    setActiveLink(i);
  }
  const filterProductsByCategory = (category, i) => {
    setActiveLink(i);
    setActiveCategory(category);


    if (category.toLowerCase() === 'all') {
      setCategoryContent(true);
      listProduct.forEach((producto) => {
        console.log(producto.name);
      });
    } else {
      const filteredProducts = listProduct.filter((producto) => {
        return producto.category.toLowerCase() === category.toLowerCase();
      });

      if (filteredProducts.length === 0) {
        setCategoryContent(false);
        // console.log(`No hay productos en la categoría ${category}.`);
      } else {
        setCategoryContent(true);
      }
    }
  }
  return (
    <div className="containerCategories">
      <div onClick={() => filterProductsByCategory('All', 0)} className={activeLink === 0 ? 'active' : 'containerLinks'}>
        <Link onClick={() => onClickLink(0)} className={activeLink === 0 ? 'activeLink' : 'categories'} to="/products">
          All
        </Link>
      </div>
      <div onClick={() => filterProductsByCategory('Entrada', 1)} className={activeLink === 1 ? 'active' : 'containerLinks'}>
        <Link onClick={() => onClickLink(1)} className={activeLink === 1 ? 'activeLink' : 'categories'} to="/products">
          Entrada
        </Link>
      </div>
      <div onClick={() => filterProductsByCategory('Principio', 2)} className={activeLink === 2 ? 'active' : 'containerLinks'}>
        <Link onClick={() => onClickLink(2)} className={activeLink === 2 ? 'activeLink' : 'categories'} to="/products">
          Principio
        </Link>
      </div>
      <div onClick={() => filterProductsByCategory('Bebida', 3)} className={activeLink === 3 ? 'active' : 'containerLinks'}>
        <Link onClick={() => onClickLink(3)} className={activeLink === 3 ? 'activeLink' : 'categories'} to="/products">
          Bebida
        </Link>
      </div>
      <div onClick={() => filterProductsByCategory('Postre', 4)} className={activeLink === 4 ? 'active' : 'containerLinks'}>
        <Link onClick={() => onClickLink(4)} className={activeLink === 4 ? 'activeLink' : 'categories'} to="/products">
          Postre
        </Link>
      </div>
    </div>
  );
};