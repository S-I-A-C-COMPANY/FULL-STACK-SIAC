import axios from "axios";

// const API_URL = 'https://backend-render-corp.onrender.com/api/products'
const API_URL = '/api/products'

const createProducto = async (productData, token)=>{

    const response = await axios.post(API_URL + '/register-products',  productData)
    console.log(productData)
    return response.data
}
const updateProducts = async (productData, token)=>{

    const response = await axios.post(API_URL + '/update-product',  productData)
    console.log(productData)
    return response.data
}


const deleteProducto = async (productId)=>{
    const response = await axios.delete(API_URL + '/delete-products/' + productId)
    console.log(response.data.status);
    return response.data
}

const productService = {
    createProducto,
    deleteProducto,
    updateProducts
}

export default productService
