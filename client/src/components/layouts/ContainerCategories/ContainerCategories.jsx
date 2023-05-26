import { useState } from 'react';

import { Link } from 'react-router-dom'
import axios from 'axios'


export const ContainerCategories = () => {

    const [activeLink, setActiveLink] = useState(0);
        // para pintar productos de la bd
    const [listProduct, setProduct] = useState([])


    const onClickLink = (i) => {
        setActiveLink(i);
    }

    const isEntrada = () => {
        listProduct.filter((producto) => {
            if (producto.category == 'Entrada' || producto.category == 'entrada') {
                console.log(producto.name);
            } 
        })
    }
    const isPrincipio = () => {
        listProduct.filter((producto) => {
            if (producto.category == 'Principio' || producto.category == 'principio') {
                console.log(producto.name);
            } 
        })
    }
    const isBebida = () => {
        listProduct.filter((producto) => {
            if (producto.category == 'Bebida' || producto.category == 'bebida') {
                console.log(producto.name);
            } 
        })
    }
    const isPostre = () => {
        listProduct.filter((producto) => {
            if (producto.category == 'Postre' || producto.category == 'postre') {
                console.log(producto.name);
            } 
        })
    }


    const getProductsList = async ()=>{
            
        try{
            const res = await axios.get("http://localhost:5000/api/products/all-product")
            setProduct(res.data);
        }catch(err){
            console.log(err)
        }
    }
    getProductsList()


    return (
        <div className="containerCategories" >
            <div onClick={() => isEntrada()}  className={activeLink === 0 ? 'active' : 'containerLinks'}>
                <Link onClick={() => onClickLink(0)} className={activeLink === 0 ? 'activeLink' : 'categories'} to="/products">
                    Entrada
                </Link>
            </div>

            <div onClick={() => isPrincipio()} className={activeLink === 1 ? 'active' : 'containerLinks'}>
                <Link onClick={() => onClickLink(1)} className={activeLink === 1 ? 'activeLink' : 'categories'} to="/products">
                    Principio
                </Link>
            </div>

            <div onClick={() => isBebida()} className={activeLink === 2 ? 'active' : 'containerLinks'}>
                <Link onClick={() => onClickLink(2)} className={activeLink === 2 ? 'activeLink' : 'categories'} to="/products">
                    Bebida
                </Link>
            </div>

            <div onClick={() => isPostre()} className={activeLink === 3 ? 'active' : 'containerLinks'}>
                <Link onClick={() => onClickLink(3)} className={activeLink === 3 ? 'activeLink' : 'categories'} to="/products">
                    Postre
                </Link>
            </div>
        </div >
    )
}

