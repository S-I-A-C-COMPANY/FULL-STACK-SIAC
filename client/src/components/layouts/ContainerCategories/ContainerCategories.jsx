import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { ModalAndProductsContext } from '../ContainerProducts/ContainerProducts';

export const ContainerCategories = () => {
  const { setActiveCategory, listProduct, categoryContent, setcategoryContent } = useContext(ModalAndProductsContext);
  const [activeLink, setActiveLink] = useState(0);

  const onClickLink = (i) => {
    setActiveLink(i);
  }

  const filterProductsByCategory = (category) => {
    setActiveCategory(category);

    if (category.toLowerCase() === 'all') {
      setcategoryContent(true);
      listProduct.forEach((producto) => {
        console.log(producto.name);
      });
    } else {
      const filteredProducts = listProduct.filter((producto) => {
        return producto.category.toLowerCase() === category.toLowerCase();
      });

      if (filteredProducts.length === 0) {
        setcategoryContent(false);
        // console.log(`No hay productos en la categoría ${category}.`);
      } else {
        setcategoryContent(true);
      }
    }
  }

  return (
    <div className="containerCategories">
      <div onClick={() => filterProductsByCategory('All')} className={activeLink === 0 ? 'active' : 'containerLinks'}>
        <Link onClick={() => onClickLink(0)} className={activeLink === 0 ? 'activeLink' : 'categories'} to="/products">
          All
        </Link>
      </div>
      <div onClick={() => filterProductsByCategory('Entrada')} className={activeLink === 1 ? 'active' : 'containerLinks'}>
        <Link onClick={() => onClickLink(1)} className={activeLink === 1 ? 'activeLink' : 'categories'} to="/products">
          Entrada
        </Link>
      </div>
      <div onClick={() => filterProductsByCategory('Principio')} className={activeLink === 2 ? 'active' : 'containerLinks'}>
        <Link onClick={() => onClickLink(2)} className={activeLink === 2 ? 'activeLink' : 'categories'} to="/products">
          Principio
        </Link>
      </div>
      <div onClick={() => filterProductsByCategory('Bebida')} className={activeLink === 3 ? 'active' : 'containerLinks'}>
        <Link onClick={() => onClickLink(3)} className={activeLink === 3 ? 'activeLink' : 'categories'} to="/products">
          Bebida
        </Link>
      </div>
      <div onClick={() => filterProductsByCategory('Postre')} className={activeLink === 4 ? 'active' : 'containerLinks'}>
        <Link onClick={() => onClickLink(4)} className={activeLink === 4 ? 'activeLink' : 'categories'} to="/products">
          Postre
        </Link>
      </div>
    </div>
  );
};
