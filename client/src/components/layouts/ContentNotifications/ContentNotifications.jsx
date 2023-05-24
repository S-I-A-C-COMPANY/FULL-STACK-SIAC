// Importo socket
import io from "socket.io-client";
// UI
import { ButtonUI } from "../../UI/ButtonUI/ButtonUI";
import { ImgUI } from "../../UI/ImgUI/ImgUI";

// IMG
import orderExample from "../../../Images/order.png";
import iconSelected from "../../../Images/selectOrder.png";
import Swal from "sweetalert2";

// const socket = io("http://localhost:5000");

export const ContentNotifications = () => {
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

  const productos = [
    { id: 1, nombre: "Sopa 1", precio: 5000, descripcion: "lorem ipsum" },
    { id: 2, nombre: "Sopa 2", precio: 2500, descripcion: "lorem ipsum" },
    { id: 3, nombre: "Sopa 3", precio: 3000, descripcion: "lorem ipsum" },
    { id: 4, nombre: "Sopa 4", precio: 5002, descripcion: "lorem ipsum" },
    { id: 5, nombre: "Sopa 5", precio: 1000, descripcion: "lorem ipsum" },
    { id: 6, nombre: "Sopa 6", precio: 5800, descripcion: "lorem ipsum" },
    { id: 7, nombre: "Sopa 7", precio: 9100, descripcion: "lorem ipsum" },
  ];

  return (
    <div className="contentNotifications">
      <div className="containerNotifications">
        {productos.map((producto) => (
          <div key={producto.id} className="containerNotification">
            <div className="containerImageOrder">
              <ImgUI style="img" routeImg={orderExample} />
            </div>

            <div className="infoO">
              <p className="nameNotification">Nombre: {producto.nombre}</p>
              <p className="priceNotification">Precio: {producto.precio}</p>
              <p className="descriptionNotification">
                Descripcion: {producto.descripcion}
              </p>
              <p className="descriptionNotification">
                Descripcion: {producto.descripcion}
              </p>
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
