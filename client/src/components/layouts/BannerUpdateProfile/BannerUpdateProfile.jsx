import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';


// UI
import { ImgUI } from '../../UI/ImgUI/ImgUI';
import { ButtonUI } from '../../UI/ButtonUI/ButtonUI';
import { InputUI } from '../../UI/InputUI/InputUI';

// IMG
import imageBanner from '../../../Images/iconUser.png';

const localHost = 'http://localhost:5000';

export const BannerUpdateProfile = () => {

  const [formData, setFormData] = useState({
    name: '',
    image: '',
  });
  const [isUploading, setIsUploading] = useState(false);
  const { name, image } = formData;
  const [datUser, setDatUser] = useState([]);

  useEffect(() => {
    const getInfoUser = async () => {
      try {
        const res = await axios.get(`${localHost}/api/users/me`);
        setDatUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getInfoUser();
  }, []);

  const handleFileChange = (e) => {
    const { files } = e.target;
    if (files.length > 0) {
      const fileName = files[0].name;
      setFormData((prevState) => ({
        ...prevState,
        name: fileName,
      }));
    }
  };

  const uploadImage = async (e) => {
    try {
      const { files } = e.target;
      if (files.length > 0) {
        setIsUploading(true);

        const data = new FormData();
        data.append('file', files[0]);

        const res = await axios.post(`${localHost}/api/users/upload`, data);
        console.log(res);
        // Verifica si la respuesta contiene la URL de la imagen
        if (res.data.imageUrl) {
          const imageUrl = res.data.imageUrl;
          setFormData((prevState) => ({
            ...prevState,
            image: imageUrl,
          }));
          setDatUser((prevState) => ({
            ...prevState,
            image: imageUrl,
          }));
          onSubmit(imageUrl);
          console.log('URL de la imagen:', imageUrl); // Muestra la URL de la imagen en la consola
        }
      }

      setIsUploading(false);
    } catch (error) {
      console.log(error);
      setIsUploading(false);
    }
  };

  const onSubmit = async (imageUrl) => {
    try {
     
        const updatedData = {
          image: imageUrl,
        }

        const response = await axios.put(`${localHost}/api/users/update-profile`, updatedData);
        console.log(response.data);
      // Aquí puedes realizar cualquier otra lógica adicional después de enviar los datos

      Swal.fire({
        icon: 'success',
        title: 'Éxito',
        text: 'Se cargó la imagen',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const formattedName =
  datUser.name && datUser.name.charAt(0).toUpperCase() + datUser.name.slice(1);
const formattedRole =
  datUser.roles && datUser.roles.charAt(0).toUpperCase() + datUser.roles.slice(1);


  return (
    <div className="banner">
      <p className="roleProfileUpdate">{formattedRole}</p>
      <ImgUI style="imgUpdatedProfile" routeImg={image || imageBanner} />

      {isUploading ? (
        <div className="loaderUpdate"></div>
      ) : (
        <InputUI typeInpt="file" style="inputUpload" eventInpt={uploadImage} onChange={handleFileChange} />
      )}

      <div className="groupText">
        <p className="nameUpdatedProfile">{formattedName}</p>
        <p className="emailUpdatedProfile">{datUser.email}</p>
      </div>
    </div>
  );
};
