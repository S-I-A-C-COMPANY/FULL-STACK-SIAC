import Swal from "sweetalert2";
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


export const MainShoppingCart = ({
    allProducts,
    setAllProducts,
    total,
    setTotal,
}) => {

    const onDeleteProduct = (producto) => {
        // Filtar los productos para eliminar el producto seleccionado
        const results = allProducts.filter(
            item => item._id !== producto._id
        );
        // Calcular el precio total del producto a eliminar y restarlo del total actual
        const productTotal = producto.price * producto.quantity
        setTotal(total - productTotal);

        // Mostrar mensaje de Sweet Alert para informar que el producto ha sido eliminado
        Swal.fire({
            icon: 'success',
            title: 'Producto eliminado',
            text: `${producto.name} ha sido eliminado del carrito.`,
            toast: true,
            position: 'top-right',
            showConfirmButton: false,
            timer: 1500,
        });

        // Actualizar la lista de productos eliminando el producto seleccionado
        setAllProducts(results);
    };

    const updateQuantity = (productId, newQuantity, price) => {
        const updatedProducts = allProducts.map(item => {
            if (item._id === productId) {
                // Calcular el nuevo precio total del producto multiplicando el nuevo precio por la nueva cantidad
                const productTotal = price * newQuantity;

                // Actualizar el total restando el precio total anterior del producto y sumando el nuevo precio total
                setTotal(total - (item.price * item.quantity) + productTotal);

                // Retornar un nuevo objeto con la cantidad actualizada para el producto correspondiente
                return { ...item, quantity: newQuantity };
            }
            return item;
        });
        setAllProducts(updatedProducts);
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

                                        <CounterCart
                                            setData={producto.quantity}
                                            updateQuantity={updateQuantity}
                                            productId={producto._id}
                                            price={producto.price}
                                        />
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
