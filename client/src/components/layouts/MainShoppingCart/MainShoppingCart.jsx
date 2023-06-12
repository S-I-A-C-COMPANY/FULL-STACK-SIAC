import Swal from "sweetalert2";
// Importo socket
import io from "socket.io-client";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import React from 'react';
// Layout
import { CounterCart } from "../CounterCart/CounterCart";
// UI
import { ButtonUI } from "../../UI/ButtonUI/ButtonUI";
import { ImgUI } from "../../UI/ImgUI/ImgUI";

// IMG
import iconDeleteToCar from "../../../Images/deleteToCar.png";
import iconTypeOfPay from "../../../Images/typeOfPay.svg"


// const socket = io('https://backend-render-corp.onrender.com')
const socket = io("http://localhost:5000");


export const MainShoppingCart = ({ 
    allProducts,
    setAllProducts,
    total,
    setTotal,
}) => {

    const onDeleteProduct = (producto) => {

        const results = allProducts.filter(
            item => item._id !== producto._id 
        );

        setTotal(total - producto.price * producto.quantity)
        setAllProducts(results)
    };


    return (
        <main className='mainShoppingCart'>
            <div className='contentShoppingCart'>

                <div className="containerTittleCart">
                    <h2 className="titleShoppingCart">Su Orden</h2>
                    <hr className="line" />
                </div>

                <div className='containerProductsShoppingCart'>
                    {allProducts.length ? (
                        <>
                            {allProducts.map((producto) => (
                                <div key={producto._id} className='containerProductCart' >
                                    <div className="containerImageProduct">
                                        <ImgUI style="img" routeImg={producto.image} />
                                    </div>

                                    <div className="infoProduct">
                                        <p className="productName">{producto.name}</p>
                                        
                                        <CounterCart setData={producto.quantity} /> 
                                        {/* <CounterCart /> */}
                                    </div>

                                    <div className="containerButtonCart">
                                        <ButtonUI onClicks={() => onDeleteProduct(producto)} style="btnDeleteCart" text={<ImgUI style="deleteToCar" routeImg={iconDeleteToCar}></ImgUI>} />
                                        <p className="priceProduct">${producto.price}</p>
                                    </div>

                                </div>
                            ))}
                        </>
                    ) : (
                        <p className='cart-empty'>El carrito está vacío</p>
                    )}
                </div>

                <div className="containerLine">
                    <hr className="line" />
                </div>

                <div className="infoCart">
                    <div className="containerImgPay">
                        <ImgUI style='imgPay' routeImg={iconTypeOfPay} />
                    </div>

                    <div className="containerTextPay">
                        <h3 className="infoPay">Seleccionar Metodo De Pago</h3>
                    </div>
                </div>

                <div className="confirmAndTotal">
                    <ButtonUI style="btnOrder" text='Ordenar' />
                    <div className="totalPriceCart">
                        <p>TOTAL:</p><p className="priceTotal">${total}</p>
                    </div>
                </div>
            </div>
        </main>
    )
}
