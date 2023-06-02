// UI
import { InputUI } from '../../UI/InputUI/InputUI'
import { ButtonUI } from '../../UI/ButtonUI/ButtonUI'

import axios from 'axios';
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';


import {createProducts} from '../../features/products/productSlice'
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

export const FormCreateProducts = () => {

  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    amount: "",
    image: ""
  });

  const dispatch = useDispatch();
  const navigate = useNavigate()

  const { name, price, category, amount } = formData;

  
  const { user, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

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

    // dispatch(reset());
  }, [user, isError, isSuccess, message, ]);


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

  const onSubmit = (e) => {
    e.preventDefault();
    // Verificar si la imagen se ha cargado antes de enviar el formulario
    if (imageLoaded) {
      dispatch(createProducts(formData));
      Swal.fire({
        title: "Exito!",
        text: "Enviado con exito",
        icon: "success",
        showConfirmButton: false,
        confirmButtonText: "Ok",
        timer: 2000,        
      }).then(() => {
        setFormData({
          name: "",
          price: "",
          category: "",
          amount: "",
          image: ""
        });
      navigate("/products");
    });
      
    } else {
      console.log("La imagen aún se está cargando");
    }
  };


  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  
  }
      
    return (
        <form className='formCreateProduct' onSubmit={onSubmit}>
          <InputUI 
          typeInpt='text' 
          style='inputProduct' 
          textInpt='Ingrese Nombre' 
          idInpt="name"
          nameInpt="name"
          valueInpt={name}
          eventInpt={onChange}
          />

          {/* <InputUI 
          typeInpt='text' 
          style='inputProduct' 
          textInpt='Ingrese detalis' 
          idInpt="detalis"
          nameInpt="detalis"
          valueInpt={detalis}
          eventInpt={onChange}
          /> */}

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

          <ButtonUI typeBtn="submit"  style='btnCreateProduct' text='Crear producto' />
        </form>
    )
}



