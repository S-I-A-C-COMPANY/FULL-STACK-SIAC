import React from 'react'
import { useState, useEffect } from "react";
import personImg from '../../../Images/personIcon.png'
import { ImgUI } from '../../UI/ImgUI/ImgUI';
import axios from 'axios';


export const ContentUsers = () => {
  
  const [flippedCard, setFlippedCard] = useState(null);
  const [listUsers, setUsers] = useState([]);
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
              </div>
              <div className='cardBack'>
                <p>DNI: {usuario.dni}</p>
                <p>Email: {usuario.email}</p>
                <p>Teléfono: {usuario.phone}</p>
                <p>Dirección: {usuario.address}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
