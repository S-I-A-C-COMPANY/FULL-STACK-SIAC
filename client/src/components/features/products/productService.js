import axios from "axios";

const API_URL = 'http://localhost:5000/api/products';

const createProducto = async (productData, token) => {
  try {
    const response = await axios.post(`${API_URL}/register-products`, productData);
    return response.data;
  } catch (error) {
    console.log('Error al crear el producto:', error);
    throw error;
  }
};

const updateProduct = async (idProduct, productData) => {
  try {
    const response = await axios.put(`${API_URL}/update-products/${idProduct}`, productData);
    console.log(response);
    return response.data;

  } catch (error) {
    console.log('Error al actualizar el producto:' , API_URL);
    throw error;
  }
};

const deleteProduct = async (productId) => {
  try {
    const response = await axios.delete(`${API_URL}/delete-products/${productId}`);
    return response.data;
  } catch (error) {
    console.log('Error al eliminar el producto:', error);
    throw error;
  }
};

const productService = {
  createProducto,
  updateProduct,
  deleteProduct
};

export default productService;
