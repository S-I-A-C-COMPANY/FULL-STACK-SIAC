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
            const token = thunkAPI.getState().auth.user.token
            return await productService.createProducto(productData, token)
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
// delete  product

export const deleteProducts = createAsyncThunk(
    'auth/delete-products', async(productId, thunkAPI)=>{
    
        try {
            const token = thunkAPI.getState().auth.user.token
            return await productService.deleteProducto(productId,token)
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
        // create product
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
        .addCase(deleteProducts.pending, (state) => {
            state.isLoading = true
          })
          .addCase(deleteProducts.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.product = state.product.filter((product => product._id !== action.payload.id))
          })
          .addCase(deleteProducts.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload

          })

    }
})

export const {reset} = productSlice.actions
export default productSlice.reducer