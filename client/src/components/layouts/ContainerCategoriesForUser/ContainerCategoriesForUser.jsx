import React from 'react';
import { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ProductsForUserContext } from '../ContainerProductsUser/ContainerProductsUser';

export const ContainerCategoriesForUser = () => {
  const { setActiveCategory, listProduct, setCategoryContent } = useContext(ProductsForUserContext);
  const [activeLink, setActiveLink] = useState(0);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/products/categories');
      setCategories(response.data);
    } catch (error) {
      console.log('Error al obtener las categorías', error);
    }
  };

  const onClickLink = (i) => {
    setActiveLink(i);
  };

  const filterProductsByCategory = (category, i) => {
    setActiveLink(i);
    setActiveCategory(category);

    if (category.toLowerCase() === 'all') {
      setCategoryContent(true);
    } else {
      const filteredProducts = listProduct.filter((producto) => {
        console.log(producto.category.name);
        return producto.category.name.toLowerCase() === category.toLowerCase();
      });

      if (filteredProducts.length === 0) {
        setCategoryContent(false);
      } else {
        setCategoryContent(true);
      }
    }
  };

  return (
    <div className="containerCategoriesUser">

      {categories.map((category, index) => (
        <div
          onClick={() => filterProductsByCategory(category.name, index)}
          key={index}
          className={activeLink === index ? 'activeUsers' : 'containerLinksUsers'}
        >
          <Link
            onClick={() => onClickLink(index)}
            className={activeLink === index ? 'activeLinkUsers' : 'categoriesUsers'}
            to="/products-user"
          >
            {category.name}
          </Link>
        </div>
      ))}

    </div>
  )
}
