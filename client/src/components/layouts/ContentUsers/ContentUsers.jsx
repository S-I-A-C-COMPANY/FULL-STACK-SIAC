import React, { useState, useEffect } from 'react';
import personImg from '../../../Images/personIcon.png';
import { ImgUI } from '../../UI/ImgUI/ImgUI';
import axios from 'axios';
import io from 'socket.io-client';
import { RadioButtonGroup } from '../RadioButtonGroup/RadioButtonGroup';
const socket = io('http://localhost:5000')
export const ContentUsers = () => {
  const [flippedCard, setFlippedCard] = useState(null);
  const [listUsers, setUsers] = useState([]);

    useEffect(() => {
    const getInfoUser = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/users/all`);
        setUsers(res.data);
        
      } catch (err) {
        console.log(err);
      }
    };

    getInfoUser();
    return () => {
      socket.disconnect();
    };
  }, [listUsers]);

  const handleCardFlip = (dni) => {
    setFlippedCard(dni);
  };

  const handleCardUnflip = () => {
    setFlippedCard(null);
  };

  const handleOptionChange = async (iD, selectedValue) => {
    const userData = { userId: iD, roles: selectedValue };

    try {
      const res = await axios.put('http://localhost:5000/api/users/update-role', userData);
      console.log(res);
      // Actualizar la lista de usuarios con los roles actualizados desde el backend si es necesario
      // ...
    } catch (err) {
      console.log(err);
    }
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
                <p>Rol: {usuario.roles.name}</p>
              </div>
              <div className='cardBack'>
                <p>DNI: {usuario.dni}</p>
                <p>Email: {usuario.email}</p>
                <p>Teléfono: {usuario.phone}</p>
                <p>Dirección: {usuario.address}</p>
                <RadioButtonGroup
                  groupId={usuario._id}
                  onOptionChange={handleOptionChange}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
