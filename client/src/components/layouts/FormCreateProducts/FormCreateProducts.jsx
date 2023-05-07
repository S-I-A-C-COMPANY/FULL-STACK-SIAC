// UI
import { InputUI } from '../../UI/InputUI/InputUI'
import { ButtonUI } from '../../UI/ButtonUI/ButtonUI'

import axios from 'axios';
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';

import {createProducts} from '../../features/products/productSlice'



export const FormCreateProducts = () => {
    const [formData, setFormData] = useState({
        name: "",
        price: "",
        category: "",
        amount: "",
      });
    
      const {name, price, category, amount} = formData;

      const dispatch = useDispatch()

      const onSubmit = (e) => {
        e.preventDefault();
        
        dispatch(createProducts(formData));
        setFormData('')
      };

      const onChange = (e) => {
        setFormData((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value,
        }));
      };
    
      
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
            typeInpt='button' 
            style='inputProduct' 
            valueInpt='Inserte Imagen' 

            />

            <ButtonUI typeBtn="submit"  style='btnCreateProduct' text='Crear producto' />
        </form>
    )
}
