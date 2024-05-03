import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addToCartAPI, fetchUserCartItemsAPI, updateCartItemsAPI, deleteCartItemsAPI, resetCartAPI } from "../api/cartAPI";

const initialState ={
    cartItems: [],
    status: 'idle',
};

export const addToCartAsyncThunk = createAsyncThunk(
    'cart/addToCart',
    async(item) => {
        console.log("addToCartAsyncThunk item:", item);
        const response = await addToCartAPI(item);
        return response.data;
    }
)

export const fetchUserCartItemsAsyncThunk = createAsyncThunk(
    'cart/fetchUserCartItems',
    async(user_id) => {
        const response = await fetchUserCartItemsAPI(user_id);
        return response.data;
    }
)

export const updateCartItemsAsyncThunk = createAsyncThunk(
    'cart/updateCartItems',
    async(item) => {
        const response = await updateCartItemsAPI(item);
        return response.data;
    }
)

export const deleteCartItemsAsyncThunk = createAsyncThunk(
    'cart/deleteCartItems',
    async(itemID) => {
        const response = await deleteCartItemsAPI(itemID);
        return response.data;
    }
)

export const resetCartItemsAsyncThunk = createAsyncThunk(
    'cart/resetCartItems',
    async(user_id) => {
        const response = await resetCartAPI(user_id);
        return response.data;
    }
)

export const cartSlice = createSlice({
    name: 'cartSlice',
    initialState,
    reducers:{},
    extraReducers: (builder) =>{
        builder
        .addCase(addToCartAsyncThunk.fulfilled, (state, action) => {
            const indx = state.cartItems.findIndex(item => item.id === action.payload.id)
            if(indx !== -1) {
                state.cartItems[indx].quantity += action.payload.quantity;
            }else{
            state.cartItems.push(action.payload);
            }
            state.status = 'idle';
        })
        .addCase(addToCartAsyncThunk.pending, (state, action) => {
            state.status = 'loading';
        })
        .addCase(addToCartAsyncThunk.rejected, (state, action) => {
            state.status = 'failed';
        })
        .addCase(fetchUserCartItemsAsyncThunk.fulfilled, (state, action) => {
            state.cartItems = action.payload;
            state.status = 'idle';
        })
        .addCase(fetchUserCartItemsAsyncThunk.pending, (state, action) => {
            state.status = 'loading';
        })
        .addCase(fetchUserCartItemsAsyncThunk.rejected, (state, action) => {
            state.status = 'failed';
        })
        .addCase(updateCartItemsAsyncThunk.fulfilled, (state, action) => {
            const indx = state.cartItems.findIndex(item => item.id === action.payload.id)
            state.cartItems[indx] = action.payload;
            state.status = 'idle';
        })
        .addCase(updateCartItemsAsyncThunk.pending, (state, action) => {
            state.status = 'loading';
        })
        .addCase(updateCartItemsAsyncThunk.rejected, (state, action) => {
            state.status = 'failed';
        })
        .addCase(deleteCartItemsAsyncThunk.fulfilled, (state, action) => {
            const indx = state.cartItems.findIndex(item => item.id === action.payload.id)
            state.cartItems.splice(indx,1);
            // state.cartItems = cartItems.filter(item => item.id !== action.payload);
            state.status = 'idle';
        })
        .addCase(deleteCartItemsAsyncThunk.pending, (state, action) => {
            state.status = 'loading';
        })
        .addCase(deleteCartItemsAsyncThunk.rejected, (state, action) => {
            state.status = 'failed';
        })
        .addCase(resetCartItemsAsyncThunk.fulfilled, (state, action) => {
            state.cartItems = [];
            state.status = 'idle';
        })
        .addCase(resetCartItemsAsyncThunk.pending, (state, action) => {
            state.status = 'loading';
        })
        .addCase(resetCartItemsAsyncThunk.rejected, (state, action) => {
            state.status = 'failed';
        })
    }
})

export default cartSlice;
export const selectedCartItems = (state) => state.cartInStore.cartItems;