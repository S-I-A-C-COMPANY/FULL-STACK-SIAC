import { useState } from 'react';
import { Link } from 'react-router-dom'

export const ContainerCategories = () => {

    const [activeLink, setActiveLink] = useState(0);

    const onClickLink = (i) => {
        setActiveLink(i);
    }

    return (
        <div className="containerCategories" >
            <div onClick={() => onClickLink(0)} className={activeLink === 0 ? 'active' : 'containerLinks'}>
                <Link onClick={() => onClickLink(0)} className={activeLink === 0 ? 'activeLink' : 'categories'} to="/products">
                    Entrada
                </Link>
            </div>

            <div onClick={() => onClickLink(1)} className={activeLink === 1 ? 'active' : 'containerLinks'}>
                <Link onClick={() => onClickLink(1)} className={activeLink === 1 ? 'activeLink' : 'categories'} to="/products">
                    Principio
                </Link>
            </div>

            <div onClick={() => onClickLink(2)} className={activeLink === 2 ? 'active' : 'containerLinks'}>
                <Link onClick={() => onClickLink(2)} className={activeLink === 2 ? 'activeLink' : 'categories'} to="/products">
                    Proteina
                </Link>
            </div>

            <div onClick={() => onClickLink(3)} className={activeLink === 3 ? 'active' : 'containerLinks'}>
                <Link onClick={() => onClickLink(3)} className={activeLink === 3 ? 'activeLink' : 'categories'} to="/products">
                    Bebida
                </Link>
            </div>
        </div >
    )
}
