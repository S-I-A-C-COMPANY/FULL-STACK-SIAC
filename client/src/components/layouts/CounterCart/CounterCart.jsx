import { useEffect, useState } from 'react'
// UI
import { ButtonUI } from '../../UI/ButtonUI/ButtonUI';
import React from 'react';
export const CounterCart = ({ setData, updateQuantity, productId, price }) => {

    // Establecer el estado local "count" con el valor inicial proporcionado en "setData"
    const [count, setCount] = useState(setData);

    // Función para aumentar la cantidad
    const increment = () => {
        const newCount = count + 1; // Incrementar en 1
        setCount(newCount); // Actualizar el estado "count" con la nueva cantidad
        updateQuantity(productId, newCount, price); // Llamar a la función "updateQuantity" para actualizar la cantidad en el estado global y el precio total
    };

    // Funcion para disminuir la cantidad
    const decrement = () => {
        if (count > 1) { // Impedir que la cantidad no sea menor que 1
            const newCount = count - 1; // Decrementar en 1
            setCount(newCount); // Se actualiza el estado "count" con la nueva cantidad
            updateQuantity(productId, newCount, price); // Llamar a la función "updateQuantity" para actualizar la cantidad en el estado global y el precio total
        }
    };

    // Actualizar el estado "count" cuando el valor de "setData" cambie
    useEffect(() => {
        setCount(setData);
    }, [setData]);


    return (
        <div className="containerSubAndAdd">
            <ButtonUI onClicks={decrement} style='btnSubQuantity' text='-' />
            <p className="quantityProduct">{count}</p>
            <ButtonUI onClicks={increment} style='btnAddQuantity' text='+' />
        </div>
    )
}
