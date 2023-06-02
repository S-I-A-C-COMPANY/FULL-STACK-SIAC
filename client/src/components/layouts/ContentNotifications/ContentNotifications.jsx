import Swal from "sweetalert2";
// Importo socket
import io from "socket.io-client";
import { useState, useEffect } from "react";
import axios from "axios";
// UI
import { ButtonUI } from "../../UI/ButtonUI/ButtonUI";
import { ImgUI } from "../../UI/ImgUI/ImgUI";

// IMG
import iconSelected from "../../../Images/selectOrder.png";


// const socket = io('https://backend-render-corp.onrender.com')
const socket = io("http://localhost:5000");

export const ContentNotifications = () => {

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
    <div className="contentNotifications">
      <div className="containerNotifications">
        {listProduct.map((producto) => (
          <div key={producto._id} className="containerNotification">
            <div className="containerImageOrder">
              <ImgUI style="img" routeImg={producto.image} />
            </div>

            <div className="infoO">
              <p className="nameNotification">Nombre: {producto.name}</p>
              <p className="priceNotification">Precio: {producto.price}</p>
              <p className="descriptionNotification">Categoria: {producto.category}</p>
              <p className="descriptionNotification">Cantidad: {producto.amount}</p>
              <p className="descriptionNotification">Descripcion: ?? </p>
            </div>

            <div className="containerButton">
              <ButtonUI
                onClicks={notificationSelected}
                style="btnSelectOrder"
                text={
                  <ImgUI style="iconSelected" routeImg={iconSelected}></ImgUI>
                }
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
