import Swal from "sweetalert2";
// Importo socket
import io from "socket.io-client";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";

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

export const MainShoppingCart = () => {

    // para pintar productos de la bd
    const [listProduct, setProduct] = useState([]);

    const notificationSelected = () => {
        Swal.fire({
          title: "Deseas tomar esta orden?",
          showDenyButton: true,
          confirmButtonText: "Si",
          denyButtonText: `No`,
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire("Orden tomada!", "", "success");
          }
          // else if (result.isDenied) {
          //   Swal.fire('Orden cancelada!', '', 'error')
          // }
        });
      };


    // traer productos bd
    useEffect(() => {
        // cuando el componente se monta, nos conectamos al servidor WebSocket y solicitamos la lista de productos
        socket.on("productos", (listProduct) => {
        setProduct(listProduct);
        });

        // cuando se agrega un nuevo producto, lo agregamos a la lista de productos
        socket.on("nuevoProducto", (producto) => {
        setProduct([...listProduct, producto]);
        });

        // cuando el componente se desmonta, desconectamos el socket
        return () => {
        socket.disconnect();
        };
    }, [listProduct]);

    const getProductsList = async () => {
        try {
        const res = await axios.get("http://localhost:5000/api/products/all/all");
        setProduct(res.data);
        // console.log(res.data)
        } catch (err) {
        console.log(err);
        }
    };
    getProductsList();


  return (
    <main className='mainShoppingCart'>
        <div className='contentShoppingCart'>

            <div className="containerTittleCart">
                <h2 className="titleShoppingCart">Su Orden</h2>
                <hr className="line" />
            </div>


            <div className='containerProductsShoppingCart'>
            {listProduct.map((producto) => (
                <div key={producto._id} className='containerProductCart' >
                    <div className="containerImageProduct">
                        <ImgUI style="img" routeImg={producto.image} />
                    </div>

                    <div className="infoProduct">
                        <p className="productName">{producto.name}</p>

                        <CounterCart />
                    </div>

                    <div className="containerButtonCart">
                        <ButtonUI style="btnDeleteCart" text={<ImgUI style="deleteToCar" routeImg={iconDeleteToCar}></ImgUI>}/>
                        <p className="priceProduct">${producto.price}</p>
                    </div>
                    
                </div>
            ))}
            </div>

            <div className="containerLine">
                <hr className="line" />
            </div>

            <div className="infoCart" onClick={() => alert('hola') }>
                <ImgUI style='imgPay' routeImg={iconTypeOfPay} />
                <h3 className="infoPay">Seleccionar metodo de pago</h3>
            </div>

            <div className="confirmAndTotal">
                <ButtonUI style="btnOrder" text='Ordenar' />
                <div className="totalPriceCart">
                    <p>TOTAL:</p><p className="priceTotal">$0.00</p>                
                </div>
            </div>

        </div>
    </main>
  )
}
