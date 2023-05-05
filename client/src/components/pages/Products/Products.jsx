import { Link } from 'react-router-dom'
import { useState } from 'react'

// UI
import { ImgUI } from '../../UI/ImgUI/ImgUI'

// IMG
import logoWhite from '../../../Images/whiteIcon.png'
import iconHome from '../../../Images/iconHome.png'
import iconNotifications from '../../../Images/iconNotifications.png'

import orderExample from '../../../Images/order.png'



export const Products = () => {

    const [activeLink, setActiveLink] = useState(0);


    const onClickLink = (i) => {
        setActiveLink(i)
    }


  return (
    <main className="mainProducts">

        <div className='sideBar'>
            <nav className="navBarInSideBar">
                <ul>
                    <li className="listLinks"><Link className="links" to=''><ImgUI style='imgIcon' routeImg={logoWhite}/></Link></li>
                    <li className="listLinks"><Link className="links" to=''><ImgUI style='iconHome' routeImg={iconHome}></ImgUI></Link></li>
                    <li className="listLinks"><Link className="links" to=''><ImgUI style='iconNotification' routeImg={iconNotifications}></ImgUI></Link></li>
                    <li className="listLinks"><Link className="links" to=''>➕</Link></li>
                </ul>
            </nav> 
        </div>

        <div className="containerProducts">

            <div className='modalCreateProducts'>
            
            </div>


            <div className="tittleMenu">
                <h1 className='tittle'>Productos</h1>
            </div>


            <h1 className='tittleCategories'>Categorias</h1>

{/* Contenedor de categorias */}
            <div className="containerCategories">
                <div onClick={()=> onClickLink(0)} className={activeLink === 0 ? 'active' : 'containerLinks'}>
                    <Link onClick={()=> onClickLink(0)} className={activeLink === 0 ? 'activeLink' : 'categories'} to="/products">
                        Entrada
                    </Link>
                </div>

                <div onClick={()=> onClickLink(1)} className={activeLink === 1 ? 'active' : 'containerLinks'}>
                    <Link onClick={()=> onClickLink(1)} className={activeLink === 1 ? 'activeLink' : 'categories'} to="/products">
                        Principio
                    </Link>
                </div>

                <div onClick={()=> onClickLink(2)} className={activeLink === 2 ? 'active' : 'containerLinks'}>
                    <Link onClick={()=> onClickLink(2)} className={activeLink === 2 ? 'activeLink' : 'categories'} to="/products">
                        Proteina
                    </Link>
                </div>

                <div onClick={()=> onClickLink(3)} className={activeLink === 3 ? 'active' : 'containerLinks'}>
                    <Link onClick={()=> onClickLink(3)} className={activeLink === 3 ? 'activeLink' : 'categories'} to="/products">
                        Bebida
                    </Link>
                </div>


            </div>


{/* Seccion de cartas */}

            <div className='containerCards'>

                <div className='cardOrder'>
                    <ImgUI style='imgOrder' routeImg={orderExample}/>
                    
                    <div className='infoOrder'>
                        <h3 className='nameOrder'>Nombre</h3>
                        <p className='priceOrder'>Precio</p>
                        <p className='descriptionOrder'>Descripccion</p>
                    </div>
                </div>

                <div className='cardOrder'>
                    <ImgUI style='imgOrder' routeImg={orderExample}/>
                    
                    <div className='infoOrder'>
                        <h3 className='nameOrder'>Nombre</h3>
                        <p className='priceOrder'>Precio</p>
                        <p className='descriptionOrder'>Descripccion</p>
                    </div>
                </div>

                <div className='cardOrder'>
                    <ImgUI style='imgOrder' routeImg={orderExample}/>
                    
                    <div className='infoOrder'>
                        <h3 className='nameOrder'>Nombre</h3>
                        <p className='priceOrder'>Precio</p>
                        <p className='descriptionOrder'>Descripccion</p>
                    </div>
                </div>

                <div className='cardOrder'>
                    <ImgUI style='imgOrder' routeImg={orderExample}/>
                    
                    <div className='infoOrder'>
                        <h3 className='nameOrder'>Nombre</h3>
                        <p className='priceOrder'>Precio</p>
                        <p className='descriptionOrder'>Descripccion</p>
                    </div>
                </div>

                <div className='cardOrder'>
                    <ImgUI style='imgOrder' routeImg={orderExample}/>
                    
                    <div className='infoOrder'>
                        <h3 className='nameOrder'>Nombre</h3>
                        <p className='priceOrder'>Precio</p>
                        <p className='descriptionOrder'>Descripccion</p>
                    </div>
                </div>

                <div className='cardOrder'>
                    <ImgUI style='imgOrder' routeImg={orderExample}/>
                    
                    <div className='infoOrder'>
                        <h3 className='nameOrder'>Nombre</h3>
                        <p className='priceOrder'>Precio</p>
                        <p className='descriptionOrder'>Descripccion</p>
                    </div>
                </div>

                <div className='cardOrder'>
                    <ImgUI style='imgOrder' routeImg={orderExample}/>
                    
                    <div className='infoOrder'>
                        <h3 className='nameOrder'>Nombre</h3>
                        <p className='priceOrder'>Precio</p>
                        <p className='descriptionOrder'>Descripccion</p>
                    </div>
                </div>

                <div className='cardOrder'>
                    <ImgUI style='imgOrder' routeImg={orderExample}/>
                    
                    <div className='infoOrder'>
                        <h3 className='nameOrder'>Nombre</h3>
                        <p className='priceOrder'>Precio</p>
                        <p className='descriptionOrder'>Descripccion</p>
                    </div>
                </div>

                <div className='cardOrder'>
                    <ImgUI style='imgOrder' routeImg={orderExample}/>
                    
                    <div className='infoOrder'>
                        <h3 className='nameOrder'>Nombre</h3>
                        <p className='priceOrder'>Precio</p>
                        <p className='descriptionOrder'>Descripccion</p>
                    </div>
                </div>

                <div className='cardOrder'>
                    <ImgUI style='imgOrder' routeImg={orderExample}/>
                    
                    <div className='infoOrder'>
                        <h3 className='nameOrder'>Nombre</h3>
                        <p className='priceOrder'>Precio</p>
                        <p className='descriptionOrder'>Descripccion</p>
                    </div>
                </div>

                <div className='cardOrder'>
                    <ImgUI style='imgOrder' routeImg={orderExample}/>
                    
                    <div className='infoOrder'>
                        <h3 className='nameOrder'>Nombre</h3>
                        <p className='priceOrder'>Precio</p>
                        <p className='descriptionOrder'>Descripccion</p>
                    </div>
                </div>

                <div className='cardOrder'>
                    <ImgUI style='imgOrder' routeImg={orderExample}/>
                    
                    <div className='infoOrder'>
                        <h3 className='nameOrder'>Nombre</h3>
                        <p className='priceOrder'>Precio</p>
                        <p className='descriptionOrder'>Descripccion</p>
                    </div>
                </div>
                

            </div>






            
        </div>
    </main>
  )
}
