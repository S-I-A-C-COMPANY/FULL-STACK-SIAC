import { useState } from 'react'

// LAYOUT
import { FormCreateProducts } from '../FormCreateProducts/FormCreateProducts'

// UI
import { ImgUI } from '../../UI/ImgUI/ImgUI'
import { ButtonUI } from '../../UI/ButtonUI/ButtonUI'

// IMG
import orderExample from '../../../Images/order.png'


export const ModalAndProducts = () => {

    const [modalOpen, setModalOpen] = useState(false);

    const openModal = () => {
        setModalOpen(true);
    }

    const closeModal = () => {
        setModalOpen(false);
    }

    const productos = [
        { id: 1, nombre: "Sopa 1", precio: 5000, descripcion: 'lorem ipsum' },
        { id: 2, nombre: "Sopa 2", precio: 2500, descripcion: 'lorem ipsum' },
        { id: 3, nombre: "Sopa 3", precio: 3000, descripcion: 'lorem ipsum' },
        { id: 4, nombre: "Sopa 4", precio: 5002, descripcion: 'lorem ipsum' },
        { id: 5, nombre: "Sopa 5", precio: 1000, descripcion: 'lorem ipsum' },
        { id: 6, nombre: "Sopa 6", precio: 5800, descripcion: 'lorem ipsum' },
        { id: 7, nombre: "Sopa 7", precio: 9100, descripcion: 'lorem ipsum' },

        { id: 8, nombre: "Sopa 8", precio: 5000, descripcion: 'lorem ipsum' },
        { id: 9, nombre: "Sopa 9", precio: 2500, descripcion: 'lorem ipsum' },
        { id: 10, nombre: "Sopa 10", precio: 3000, descripcion: 'lorem ipsum' },
        { id: 11, nombre: "Sopa 11", precio: 5002, descripcion: 'lorem ipsum' },
        { id: 12, nombre: "Sopa 12", precio: 1000, descripcion: 'lorem ipsum' },
        { id: 13, nombre: "Sopa 13", precio: 5800, descripcion: 'lorem ipsum' },
        { id: 14, nombre: "Sopa 14", precio: 9100, descripcion: 'lorem ipsum' },
        { id: 15, nombre: "Sopa 15", precio: 9100, descripcion: 'lorem ipsum' },
    ]

    return (
        <>
            <div className={`modalCreateProducts ${modalOpen ? 'open' : ''}`}>
                <ButtonUI onClicks={closeModal} style='btnCloseModal' text='x' />
                <FormCreateProducts />
            </div>

            <div className='containerCards'>
                <div className='cardCreateProduct'>
                    <ButtonUI onClicks={openModal} style='btnOpenModal' text='+' />
                </div>

                {productos.map((producto) => (
                    <div key={producto.id} className='cardOrder'>
                        <ImgUI style='imgOrder' routeImg={orderExample} />

                        <div className='infoOrder'>
                            <h3 className='nameOrder'>Nombre: {producto.nombre}</h3>
                            <p className='priceOrder'>Precio: {producto.precio}</p>
                            <p className='descriptionOrder'>Descripcion: {producto.descripcion}</p>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}
