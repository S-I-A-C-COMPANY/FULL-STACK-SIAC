import React, { useState, useRef, useEffect } from 'react';
import { InputUI } from '../../UI/InputUI/InputUI';
import { ButtonUI } from '../../UI/ButtonUI/ButtonUI';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { updateProducts } from '../../features/products/productSlice';

export const FormUpdatedProducts = ({ idProduct, resetForm, onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: '',
    amount: '',
    image: '',
  });

  const { name, price, category, amount, image } = formData;

  const formRef = useRef(null);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const isEmptyFields = !name || !price || !category || !amount || !image;

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
    const productData = {
      name,
      price,
      category,
      amount,
      image,
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

  const uploadImage = async (e) => {
    try {
      const { files } = e.target;
      const fileName = files[0].name; // Obtener el nombre del archivo

      // Verificar si todos los campos del formulario han sido llenados

      const data = new FormData();
      data.append('file', files[0], fileName);
      data.append('upload_preset', 'imageProducts');

      const res = await axios.post('https://api.cloudinary.com/v1_1/duodkaexg/image/upload', data, {
        params: {
          public_id: fileName, // Utilizar el nombre como el ID público
        },
      });

      console.log(res.data.secure_url);
      setFormData((prevState) => ({
        ...prevState,
        image: res.data.secure_url,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (resetForm) {
      setFormData({
        name: '',
        price: '',
        category: '',
        amount: '',
        image: '',
      });
    }
  }, [resetForm]);

  return (
    <form className="formCreateProduct" onSubmit={onSubmit} ref={formRef}>
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

      <InputUI
        typeInpt="text"
        style="inputProduct"
        textInpt="Ingrese Categoria"
        idInpt="category"
        nameInpt="category"
        valueInpt={category}
        eventInpt={onChange}
      />

      <InputUI
        typeInpt="text"
        style="inputProduct"
        textInpt="Ingrese Cantidad"
        idInpt="amount"
        nameInpt="amount"
        valueInpt={amount}
        eventInpt={onChange}
      />

      <InputUI typeInpt="file" style="inputProduct" textInpt="Inserte Imagen" eventInpt={uploadImage} />

      <ButtonUI typeBtn="submit" style="btnCreateProduct" text="Actualizar producto" />
    </form>
  );
};
