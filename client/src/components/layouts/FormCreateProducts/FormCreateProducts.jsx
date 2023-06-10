import React, { useState, useRef, useEffect } from 'react';
import Select from 'react-select';
import { InputUI } from '../../UI/InputUI/InputUI';
import { ButtonUI } from '../../UI/ButtonUI/ButtonUI';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { createProducts } from '../../features/products/productSlice';
import { useSelector, useDispatch } from 'react-redux';
export const FormCreateProducts = ({ resetForm, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: '',
    image: '',
  });

  const [isUploading, setIsUploading] = useState(false);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { name, price } = formData;

  const { isError, isSuccess, message } = useSelector((state) => state.auth);

  useEffect(() => {
    loadCategoryOptions();
  }, [onClose]);

  useEffect(() => {
    if (isError) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: message,
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
      });
    }
  }, [isError, isSuccess, message]);

  const loadCategoryOptions = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/products/categories');
      const formattedOptions = response.data.map((category) => ({
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

      setIsUploading(true);

      const data = new FormData();
      const uniqueFileName = `${Date.now()}_${name}`;
      data.append('file', files[0], uniqueFileName);
      data.append('upload_preset', 'imageProducts');

      const res = await axios.post('https://api.cloudinary.com/v1_1/duodkaexg/image/upload', data, {
        params: {
          public_id: uniqueFileName,
        },
      });

      setFormData((prevState) => ({
        ...prevState,
        image: res.data.secure_url,
      }));

      setIsUploading(false);
    } catch (error) {
      console.log(error);
      setIsUploading(false);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (!name || !price || !selectedCategory) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Debe llenar todos los campos antes de enviar el formulario',
        showConfirmButton: false,
        timer: 3000,
      });
      return;
    }

    if (formData.image !== '') {
      dispatch(createProducts(formData));

      Swal.fire({
        icon: 'success',
        title: 'Éxito',
        text: 'Enviado con éxito',
        showConfirmButton: false,
        timer: 2000,
      }).then(() => {
        setFormData({
          name: '',
          price: '',
          category: '',
          image: '',
        });
        navigate('/products');
        onClose();
      });
    } else {
      console.log('La imagen aún se está cargando');
    }
  };

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCategoryChange = (selectedOption) => {
    setSelectedCategory(selectedOption);
    setFormData((prevState) => ({
      ...prevState,
      category: selectedOption ? selectedOption.value : '',
    }));
  };

  return (
    <form className='formCreateProduct' onSubmit={onSubmit} >
      <InputUI
        typeInpt='text'
        style='inputProduct'
        textInpt='Ingrese Nombre'
        idInpt='name'
        nameInpt='name'
        valueInpt={name}
        eventInpt={onChange}
      />

      <InputUI
        typeInpt='number'
        style='inputProduct'
        textInpt='Ingrese Precio'
        idInpt='price'
        nameInpt='price'
        valueInpt={price}
        eventInpt={onChange}
      />

      <div className='inputProduct'>
        <label htmlFor='category'>Seleccione Categoría</label>
        <Select
          options={categoryOptions}
          value={selectedCategory}
          onChange={handleCategoryChange}
        />
      </div>

      <InputUI typeInpt='file' style='inputProduct' textInpt='Inserte Imagen' eventInpt={uploadImage} />

      {isUploading ? (
        <div className='loader'></div>
      ) : (
        <ButtonUI typeBtn='submit' style='btnCreateProduct' text='Crear producto' />
      )}
    </form>
  );
};
