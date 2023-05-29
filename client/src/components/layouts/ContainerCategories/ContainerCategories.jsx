import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ModalAndProductsContext } from '../ContainerProducts/ContainerProducts';

export const ContainerCategories = () => {
  const { setActiveCategory } = useContext(ModalAndProductsContext);
  const [activeLink, setActiveLink] = useState(0);
  const [listProduct, setProduct] = useState([]);

  const onClickLink = (i) => {
    setActiveLink(i);
  }

  const isEntrada = () => {
    setActiveCategory('Entrada');
    listProduct.filter((producto) => {
      if (producto.category === 'Entrada' || producto.category === 'entrada') {
        console.log(producto.name);
      }
    });
  }
  const isAll = () => {
    setActiveCategory('All');
    listProduct.filter((producto) => {
      if (producto.category === 'All' || producto.category === 'all') {
        console.log(producto.name);
      }
    });
  }

  const isPrincipio = () => {
    setActiveCategory('Principio');
    listProduct.filter((producto) => {
      if (producto.category === 'Principio' || producto.category === 'principio') {
        console.log(producto.name);
      }
    });
  }

  const isBebida = () => {
    setActiveCategory('Bebida');
    listProduct.filter((producto) => {
      if (producto.category === 'Bebida' || producto.category === 'bebida') {
        console.log(producto.name);
      }
    });
  }

  const isPostre = () => {
    setActiveCategory('Postre');
    listProduct.filter((producto) => {
      if (producto.category === 'Postre' || producto.category === 'postre') {
        console.log(producto.name);
      }
    });
  }

  
  return (
    <div className="containerCategories">
      
      <div onClick={isAll} className={activeLink === 0 ? 'active' : 'containerLinks'}>
        <Link onClick={() => onClickLink(0)} className={activeLink === 0 ? 'activeLink' : 'categories'} to="/products">
          All
        </Link>
      </div>
      <div onClick={isEntrada} className={activeLink === 1 ? 'active' : 'containerLinks'}>
        <Link onClick={() => onClickLink(1)} className={activeLink === 1 ? 'activeLink' : 'categories'} to="/products">
          Entrada
        </Link>
      </div>

      <div onClick={isPrincipio} className={activeLink === 2 ? 'active' : 'containerLinks'}>
        <Link onClick={() => onClickLink(2)} className={activeLink === 2 ? 'activeLink' : 'categories'} to="/products">
          Principio
        </Link>
      </div>

      <div onClick={isBebida} className={activeLink === 3 ? 'active' : 'containerLinks'}>
        <Link onClick={() => onClickLink(3)} className={activeLink === 3 ? 'activeLink' : 'categories'} to="/products">
          Bebida
        </Link>
      </div>

      <div onClick={isPostre} className={activeLink === 4 ? 'active' : 'containerLinks'}>
        <Link onClick={() => onClickLink(4)} className={activeLink === 4 ? 'activeLink' : 'categories'} to="/products">
          Postre
        </Link>
      </div>
    </div>
  );
};
