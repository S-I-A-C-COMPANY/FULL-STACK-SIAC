import React, { useState, useRef, useEffect } from 'react';
import { InputUI } from '../../UI/InputUI/InputUI';
import { ButtonUI } from '../../UI/ButtonUI/ButtonUI';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { updateProducts } from '../../features/products/productSlice';
import Select from 'react-select';



export const FormUpdatedProducts = ({ idProduct, resetForm, onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: '',
    image: '',
    quantity: 1,
  });

  const [isUploading, setIsUploading] = useState(false);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const { name, price, category, image, quantity } = formData;

  const formRef = useRef(null);

  useEffect(() => {
    loadCategoryOptions();
  }, [onClose]);


  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const isEmptyFields = !name || !price || !category  || !image  || !quantity;

    if (isEmptyFields) {
      const confirmResult = await Swal.fire({
        title: '¿Está seguro?',
        text: 'Hay campos vacíos en el formulario. ¿Desea continuar?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, enviar',
        cancelButtonText: 'Cancelar',
      });

      if (confirmResult.isConfirmed) {
        await sendForm();
      }
    } else {
      await sendForm();
    }
  };

  const sendForm = async () => {
    console.log(category);
    const productData = {
      name,
      price,
      category,
      image,
      quantity,
    };

    // Filtrar propiedades vacías
    const nonEmptyProductData = Object.fromEntries(
      Object.entries(productData).filter(([_, value]) => value !== '')
    );

    try {
      dispatch(updateProducts({ idProduct, productData: nonEmptyProductData }));
      Swal.fire({
        title: 'Éxito',
        text: 'Actualización exitosa',
        icon: 'success',
        timer: 2000,
        showConfirmButton: false,
      }).then(() => {
        formRef.current.reset(); // Restablecer el formulario
        navigate('/products');
        onClose(); // Cerrar la modal
      });
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: 'No se pudo actualizar la información',
        icon: 'error',
        timer: 2000,
        showConfirmButton: false,
      });
    }
  };

  const loadCategoryOptions = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/products/categories');
      const formattedOptions = response.data.map((category) => (
        {
        
        value: category.name,
        label: category.name,
      }));

      setCategoryOptions(formattedOptions);
    } catch (error) {
      console.log(error);
    }
  };


  const uploadImage = async (e) => {
    try {
      const { files } = e.target;
      const fileName = files[0].name; // Obtener el nombre del archivo

      setIsUploading(true); // Activar la animación de carga

      const data = new FormData();
      data.append('file', files[0], fileName);
      data.append('upload_preset', 'imageProducts');

      const res = await axios.post(
        'https://api.cloudinary.com/v1_1/duodkaexg/image/upload',
        data,
        {
          params: {
            public_id: fileName, // Utilizar el nombre como el ID público
          },
        }
      );

      console.log(res.data.secure_url);
      setFormData((prevState) => ({
        ...prevState,
        image: res.data.secure_url,
      }));
    } catch (error) {
      console.log(error);
    } finally {
      setIsUploading(false); // Desactivar la animación de carga
    }
  };

  useEffect(() => {
    if (resetForm) {
      setFormData({
        name: '',
        price: '',
        category: '',
        image: '',
        quantity: 1,
      });
    }
  }, [resetForm]);

  const handleCategoryChange = (selectedOption) => {
    setSelectedCategory(selectedOption);
    setFormData((prevState) => ({
      ...prevState,
      category: selectedOption ? selectedOption.value : '',
    }));
  };

  return (
    <form className="formCreateProduct" onSubmit={onSubmit} ref={formRef}>
      <h1>Actualizar Producto</h1>
      <InputUI
        typeInpt="text"
        style="inputProduct"
        textInpt="Ingrese Nombre"
        idInpt="name"
        nameInpt="name"
        valueInpt={name}
        eventInpt={onChange}
      />

      <InputUI
        typeInpt="number"
        style="inputProduct"
        textInpt="Ingrese Precio"
        idInpt="price"
        nameInpt="price"
        valueInpt={price}
        eventInpt={onChange}
      />

    <div className="inputProducts">
        <label className="inputProductLabel" htmlFor="inputProducts">
          Seleccione Categoría
        </label>
        <div className="inputProductSelect">
          <Select
            options={categoryOptions}
            value={selectedCategory}
            placeholder="Categorias"
            onChange={handleCategoryChange}
            classNamePrefix="custom-select"
            className="custom-select"
          />
        </div>
      </div>


      <InputUI typeInpt="file" style="inputProduct" textInpt="Inserte Imagen" eventInpt={uploadImage} />

      {isUploading ? (
        <div className="loader"></div>
      ) : (
        <ButtonUI typeBtn="submit" style="btnCreateProduct" text="Actualizar producto" />
      )}
    </form>
  );
};