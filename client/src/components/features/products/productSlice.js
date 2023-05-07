import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import productService from './productService'

const initialState = {
    product: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

// create new product

export const createProducts = createAsyncThunk(
    'auth/register-products', async(productData, thunkAPI)=>{
    
        try {
            // const token = thunkAPI.getState().auth.user.token
            return await productService.createProducto(productData)
            // return await productService.
        } catch (error) {
            const message =
        (error.response &&
            error.response.data &&
            error.response.data.message) ||
            error.message ||
            error.toString()
            return thunkAPI.rejectWithValue(message)
   
        }
    })



export const productSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
      reset: (state) => {
          state.isLoading = false
          state.isSuccess = false
          state.isError = false
          state.message = ''
      }
    },
    extraReducers: (builder) => {
        builder
        .addCase(createProducts.pending, (state) => {
            state.isLoading = true
          })
          .addCase(createProducts.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.product.push(action.payload)
          })
          .addCase(createProducts.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            state.product.push(action.payload)
          })

        // create product
    }
})

export const {reset} = productSlice.actions
export default productSlice.reducer