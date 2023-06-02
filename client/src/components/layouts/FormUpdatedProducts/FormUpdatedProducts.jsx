import React from 'react';
// UI
import { InputUI } from '../../UI/InputUI/InputUI'
import { ButtonUI } from '../../UI/ButtonUI/ButtonUI'

import axios from 'axios';
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';


// import {createProducts} from '../../features/products/productSlice'
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { updateProducts } from '../../features/products/productSlice';

export const FormUpdatedProducts = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [image, setImage] = useState("");
    const [loading, setLoading] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false)
    
    const initialFormData = {
      name: "",
      price: "",
      category: "",
      amount: "",
      image: ""
  };

    const [formData, setFormData] = useState(initialFormData);

    const { name, price, category, amount } = formData;
  
    const onChange = (e) => {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    };

    const onSubmit = async (e) => {
      e.preventDefault();
    
      const isEmptyFields = !name || !price || !category || !amount || !image 
    
      if (isEmptyFields) {
        const confirmResult = await Swal.fire({
          title: "¿Está seguro?",
          text: "Hay campos vacíos en el formulario. ¿Desea continuar?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Sí, enviar",
          cancelButtonText: "Cancelar",
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
        image
      };
    
      // Filtrar propiedades vacías
      const nonEmptyproductData = {
          ...(productData.name !== "" && { name: productData.name }),
          ...(productData.price !== "" && { price: productData.price }),
          ...(productData.category !== "" && { category: productData.category }),
          ...(productData.amount !== "" && { amount: productData.amount }),
          ...(productData.image !== "" && { image: productData.image }),
        };
  
    try {
      await dispatch(updateProducts(nonEmptyproductData));
      Swal.fire({
        title: "Éxito",
        text: "Actualización exitosa",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      }).then(() => {
          setFormData(initialFormData)
        navigate("/products");
      });
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "No se pudo actualizar la información",
        icon: "error",
        timer: 2000,
        showConfirmButton: false,
      });
    }
  };
  
    const uploadImage = async (e) => {
      try {
        const { files } = e.target;
        const { name } = formData;
    
        // Verificar si todos los campos del formulario han sido llenados
        if (!name || !formData.price || !formData.category || !formData.amount) {
          console.log('Debe llenar todos los campos antes de cargar la imagen');
          setImage('')
          return;
        }
    
        setLoading(true);
        const data = new FormData();
        data.append("file", files[0], `${name}.jpg`);
        data.append("upload_preset", "imageProducts");
  
        const res = await axios.post(
          "https://api.cloudinary.com/v1_1/duodkaexg/image/upload",
          data,
          {
            params: {
              public_id: `${name}`
            }
          }
        );
        console.log(res.data.secure_url);
        setImage(res.data.secure_url);
        setLoading(false);
  
        // Actualizar el objeto formData con la URL de la imagen
        setFormData((prevState) => ({
          ...prevState,
          image: res.data.secure_url
        }))
  
        // Establecer la variable de estado imageLoaded en true después de cargar la imagen
        setImageLoaded(true);
      } catch (error) {
        console.log(error);
        setLoading(false);
       
      }
    };
  

  return (
        <form className='formCreateProduct'>
          onSubmit={onSubmit}
          <InputUI 
          typeInpt='text' 
          style='inputProduct' 
          textInpt='Ingrese Nombre' 
          idInpt="name"
          nameInpt="name"
          valueInpt={name}
          eventInpt={onChange}
          />

      

          <InputUI 
          typeInpt='number' 
          style='inputProduct' 
          textInpt='Ingrese Precio' 
          idInpt="price"
          nameInpt="price"
          valueInpt={price}
          eventInpt={onChange}
          />

            
          <InputUI 
          typeInpt='text' 
          style='inputProduct' 
          textInpt='Ingrese Categoria' 
          idInpt="category"
          nameInpt="category"
          valueInpt={category}
          eventInpt={onChange}
          
          />
          <InputUI 
          typeInpt='text' 
          style='inputProduct' 
          textInpt='Ingrese Cantidad' 
          idInpt="amount"
          nameInpt="amount"
          valueInpt={amount}
          eventInpt={onChange}
          
          />
          <InputUI 
            typeInpt="file"
            style='inputProduct' 
            textInpt='Inserte Imagen'
            eventInpt={uploadImage}
            
          />

          <ButtonUI typeBtn="submit"  style='btnCreateProduct' text='Actualizar producto' />
        </form>
  )
}

