import axios from "axios";

const API_URL = '/api/products'

const createProducto = async (productData, token)=>{

    const response = await axios.post(API_URL + '/register-products',  productData)
    console.log(productData)
    return response.data
}

const productService = {
    createProducto
}

export default productService