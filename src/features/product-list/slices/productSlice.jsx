import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {fetchProductByIdAPI, fetchAllProductsAPI, fetchFilteredProductsAPI, createProductAPI} from './../api/productsApi';

const initialState = {
  productDetails: [],
  totalItems:0,
  status: 'idle',
  selectedProduct: null,
  allproductDetails:[]
};

export const fetchAllProductsThunk = createAsyncThunk(
  'products/fetchAllProducts',
  async () => {
        const response = await fetchAllProductsAPI();
        return response.data;
  }
);

export const fetchFilteredProductsThunk = createAsyncThunk(
    'products/fetchFilteredProducts',
    async ({filter, sort, pagination}) => {
        console.log('thunk filter sort' , filter, sort, pagination);
          const response = await fetchFilteredProductsAPI(filter, sort,pagination);
          return response.data;
    }
  );

  export const fetchProductByIdThunk = createAsyncThunk(
    'products/fetchProductById',
    async(id) => {
        const response = await fetchProductByIdAPI(id);
        return response.data;
    }
  )

  export const createProductAsyncThunk = createAsyncThunk(
    'products/createProduct',
    async(product) => {
        const response = await createProductAPI(product);
        return response.data;
    }
  )

export const productSlice = createSlice({
    name: 'productSlice_1', //name of the slice 
    initialState,
    reducers: { 
    },
    extraReducers: (builder) => {
        builder
         .addCase(fetchAllProductsThunk.fulfilled, (state, action) => {
                state.productDetails = action.payload;
                state.allproductDetails = action.payload;
                state.status = 'idle';
            })
         .addCase(fetchAllProductsThunk.pending, (state) => {
                state.status = 'loading';
            })
         .addCase(fetchAllProductsThunk.rejected, (state) => {
                state.status = 'failed';
            })
        .addCase(fetchFilteredProductsThunk.fulfilled, (state, action) => {
                state.productDetails = action.payload.products;
                state.totalItems = action.payload.totalItems;
                state.status = 'idle';
            })
         .addCase(fetchFilteredProductsThunk.pending, (state) => {
                state.status = 'loading';
            })
         .addCase(fetchFilteredProductsThunk.rejected, (state) => {
                state.status = 'failed';
            })
        .addCase(fetchProductByIdThunk.fulfilled, (state, action) => {
                state.selectedProduct = action.payload;
                state.status = 'idle';
            })
        .addCase(fetchProductByIdThunk.pending, (state) => {
                state.status = 'loading';
            })
        .addCase(fetchProductByIdThunk.rejected, (state) => {
                state.status = 'failed';
            })
        .addCase(createProductAsyncThunk.fulfilled, (state, action) => {
                state.productDetails.push(action.payload);
                state.status = 'idle';
            })
        .addCase(createProductAsyncThunk.pending, (state) => {
                state.status = 'loading';
            })
        .addCase(createProductAsyncThunk.rejected, (state) => {
                state.status = 'failed';
            })
    },

})

// export const { increment } = productSlice.actions;

// export default productSlice;

export const selectAllProducts = (state) => state.productInStore.productDetails // state.<default reducer initialized in store for this slice>.<state of this slice>
export const selectTotalItems = (state) => state.productInStore.totalItems
export const selectProductsById = (state) => state.productInStore.selectedProduct
export const selectProducts = (state) => state.productInStore.allproductDetails