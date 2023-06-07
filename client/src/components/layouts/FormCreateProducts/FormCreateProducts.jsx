import React, { useState, useRef, useEffect } from 'react';
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

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { name, price, category } = formData;

  const { isError, isSuccess, message } = useSelector((state) => state.auth);
  const formRef = useRef(null);

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

  const uploadImage = async (e) => {
    try {
      const { files } = e.target;

      setIsUploading(true);

      const data = new FormData();
      const uniqueFileName = `${Date.now()}_${name}`;
      data.append('file', files[0], uniqueFileName);
      data.append('upload_preset', 'imageProducts');

      const res = await axios.post(
        'https://api.cloudinary.com/v1_1/duodkaexg/image/upload',
        data,
        {
          params: {
            public_id: uniqueFileName,
          },
        }
      );

      console.log(res.data.secure_url);
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

    // Verificar si todos los campos del formulario han sido llenados
    if (!name || !price || !category) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Debe llenar todos los campos antes de enviar el formulario',
        // toast: true,
        // position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
      });
      return;
    }

    // Verificar si la imagen se ha cargado antes de enviar el formulario
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
        formRef.current.reset();
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

  useEffect(() => {
    if (resetForm) {
      setFormData({
        name: '',
        price: '',
        category: '',
        image: '',
      });
    }
  }, [resetForm]);

  return (
    <form className='formCreateProduct' onSubmit={onSubmit} ref={formRef}>
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

      <InputUI
        typeInpt='text'
        style='inputProduct'
        textInpt='Ingrese Categoria'
        idInpt='category'
        nameInpt='category'
        valueInpt={category}
        eventInpt={onChange}
      />

      <InputUI typeInpt='file' style='inputProduct' textInpt='Inserte Imagen' eventInpt={uploadImage} />

      {isUploading ? (
        <div className='loader'></div>
      ) : (
        <ButtonUI typeBtn='submit' style='btnCreateProduct' text='Crear producto' />
      )}
    </form>
  );
};
