import React from 'react'
import { useState, useEffect } from "react";
import personImg from '../../../Images/personIcon.png'
import { ImgUI } from '../../UI/ImgUI/ImgUI';
import axios from 'axios';
import { RadioButtonGroup } from '../RadioButtonGroup/RadioButtonGroup';


export const ContentUsers = () => {

  const [flippedCard, setFlippedCard] = useState(null);
  const [listUsers, setUsers] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({});

  useEffect(() => {
    const getProductsList = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/api/users/all`);
            setUsers(res.data);
            console.log(res.data);
        } catch (err) {
            console.log(err);
        }
    }

    getProductsList();
}, []);

    const handleCardFlip = (dni) => {
      setFlippedCard(dni);
    };
    
    const handleCardUnflip = () => {
      setFlippedCard(null);
    };

    const handleOptionChange = (dni, selectedValue) => {
      setSelectedOptions((prevSelectedOptions) => ({
        ...prevSelectedOptions,
        [dni]: selectedValue,
      }));
    };

  return (
    <div className='contentUsers'>
      <div className='containerCardsUsers'>
        {listUsers.map((usuario) => (
          <div
            className={`cardUser ${flippedCard === usuario.dni ? 'flipped' : ''}`}
            key={usuario.dni}
            onMouseEnter={() => handleCardFlip(usuario.dni)}
            onMouseLeave={handleCardUnflip}
          >
            <div className='cardInner'>
              <div className='cardFront'>
                <ImgUI routeImg={personImg} />
                <p>Nombre: {usuario.name}</p>
                <p>Rol: {selectedOptions[usuario.dni]}</p>
              </div>
              <div className='cardBack'>
                <p>DNI: {usuario.dni}</p>
                <p>Email: {usuario.email}</p>
                <p>Teléfono: {usuario.phone}</p>
                <p>Dirección: {usuario.address}</p>
                <RadioButtonGroup groupId={usuario.dni} onOptionChange={handleOptionChange} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
