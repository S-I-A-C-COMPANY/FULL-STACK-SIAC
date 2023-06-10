import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ModalAndProductsContext } from '../ContainerProducts/ContainerProducts';
import axios from 'axios';
import Swal from 'sweetalert2';

export const ContainerCategories = () => {
  const { setActiveCategory, listProduct, setCategoryContent } = useContext(ModalAndProductsContext);
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
      listProduct.forEach((producto) => {
        console.log(producto.name);
      });
    } else {
      const filteredProducts = listProduct.filter((producto) => {
        return producto.category.toLowerCase() === category.toLowerCase();
      });

      if (filteredProducts.length === 0) {
        setCategoryContent(false);
      } else {
        setCategoryContent(true);
      }
    }
  };

  const createCategory = async () => {
    const categoryName = prompt('Ingrese el nombre de la categoría');
    if (categoryName) {
      const capitalizedCategoryName = categoryName.charAt(0).toUpperCase() + categoryName.slice(1).toLowerCase();
      try {
        const response = await axios.post('http://localhost:5000/api/products/uploadCategory', { name: capitalizedCategoryName });

        if (response.status === 200) {
          Swal.fire({
            icon: 'success',
            title: 'Categoría creada',
            text: 'La categoría se ha creado exitosamente',
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 2000,
          });
          fetchCategories(); // Actualizar la lista de categorías después de crear una nueva categoría
        }else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error al crear la categoría',
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
          });
        }
      } catch (error) {
        if (error.request.status === 409) {
          Swal.fire({
            icon: 'warning',
            title: 'Categoría existente',
            text: 'La categoría ingresada ya existe',
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
          });
        }
         
      }
    }
  };

  const deleteCategory = async (categoryId) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/products/delCategories/${categoryId}`);

      
      if (response.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Categoría creada',
          text: 'La categoría se ha creado exitosamente',
        });
        fetchCategories(); // Actualizar la lista de categorías después de crear una nueva categoría
      } else if (response.status === 409) {
        Swal.fire({
          icon: 'warning',
          title: 'Categoría existente',
          text: 'La categoría ingresada ya existe',
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error al crear la categoría',
        });
      }
    } catch (error) {
      if (error.status === 409) {
        Swal.fire({
          icon: 'warning',
          title: 'Categoría existente',
          text: 'La categoría ingresada ya existe',
        });
      }
    }
  };

  return (
    <div className="containerCategories">
      <div onClick={() => createCategory()} className={activeLink === -1 ? 'active' : 'containerLinks'}>
        <Link onClick={() => onClickLink(-1)} className={activeLink === -1 ? 'activeLink' : 'categories'} to="/products">
          +
        </Link>
      </div>
      
      {categories.map((category, index) => (
        <div
          onClick={() => filterProductsByCategory(category.name, index)}
          key={index}
          className={activeLink === index ? 'active' : 'containerLinks'}
        >
          <Link
            onClick={() => onClickLink(index)}
            className={activeLink === index ? 'activeLink' : 'categories'}
            to="/products"
          >
            {category.name}
          </Link>

          {category.name !== 'All' && (
            <button
              className="closeButton"
              onClick={() => deleteCategory(category._id)}
            >
              X
            </button>
          )}
        </div>
      ))}
    </div>
  );
};
