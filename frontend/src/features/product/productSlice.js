
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import productService from './productService'

const initialState = {
    products: [],
    product: {},
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}
// Get user tickets
export const getProducts = createAsyncThunk(
  'products/getAll',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await productService.getProducts(token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()

      return thunkAPI.rejectWithValue(message)
    }
  }
)
// Get All Devices 
// export const getAllDevices = createAsyncThunk(
//   'devices/getAll',
//   async (_, thunkAPI) => {
//     try {
//       const token = thunkAPI.getState()
//       return await deviceService.getAllDevices(token).auth.user.token
//     } catch (error) {
//       const message =
//         (error.response &&
//           error.response.data &&
//           error.response.data.message) ||
//         error.message ||
//         error.toString()

//       return thunkAPI.rejectWithValue(message)
//     }
//   }
// )


// Get user ticket
export const getProduct = createAsyncThunk(
  'products/get',
  async (deviceId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await productService.getProduct(deviceId, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()

      return thunkAPI.rejectWithValue(message)
    }
  }
)

// close  device
export const closeProduct = createAsyncThunk(
  'products/close',
  async (productId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await productService.closeProduct(productId, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()

      return thunkAPI.rejectWithValue(message)
    }
  }
)



// Create new ticket
export const createProduct = createAsyncThunk(
    'products/create',
    async (productData, thunkAPI) => {
      try {
        const token = thunkAPI.getState().auth.user.token
        return await productService.createProduct(productData, token)
      } catch (error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString()
  
        return thunkAPI.rejectWithValue(message)
      }
    }
  )

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers:(builder) => {
        builder
        .addCase(createProduct.pending, (state) => {
            state.isLoading = true
        })
        .addCase(createProduct.fulfilled, (state) => {
            state.isLoading = false
            state.isSuccess = true
        })
        .addCase(createProduct.rejected, (state, action) => {
            state.isLoading = false
            state.isLoading = false
            state.message = action.payload

        })

        .addCase(getProducts.pending, (state) => {
          state.isLoading = true
      })
      .addCase(getProducts.fulfilled, (state, action) => {
          state.isLoading = false
          state.isSuccess = true
          state.devices = action.payload
      })
      .addCase(getProducts.rejected, (state, action) => {
          state.isLoading = false
          state.isLoading = false
          state.message = action.payload

      })
      .addCase(getProduct.pending, (state) => {
        state.isLoading = true
    })
    .addCase(getProduct.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.device = action.payload
    })
    .addCase(getProduct.rejected, (state, action) => {
        state.isLoading = false
        state.isLoading = false
        state.message = action.payload

    })
    .addCase(closeProduct.fulfilled, (state, action) => {
      state.isLoading = false
      state.devices.map((device) =>
          device._id === action.payload._id
            ? (device.status = 'closed')
            : device
        )

  })


    }
})

export const {reset} = productSlice.actions
export default productSlice.reducer