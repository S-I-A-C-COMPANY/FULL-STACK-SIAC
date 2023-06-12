import { useState } from 'react'
// UI
import { ButtonUI } from '../../UI/ButtonUI/ButtonUI';
import React from 'react';
export const CounterCart = ({ setData }) => {

    // para sumar o restar en el contador
    const [count, setCount] = useState(0);

    const increment = () => {
        setCount(prevCount => prevCount + 1)
    }

    const decrement = () => {
        if (count > 1) {
            setCount(prevCount => prevCount - 1)
        }
    };


    return (
        <div className="containerSubAndAdd">
            <ButtonUI onClicks={decrement} style='btnSubQuantity' text='-' />
            <p className="quantityProduct">{setData}</p>
            <ButtonUI onClicks={increment} style='btnAddQuantity' text='+' />
        </div>
    )
}
