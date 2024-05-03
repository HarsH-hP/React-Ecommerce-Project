import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createOrderAPI } from "../api/orderAPI";

const initialState ={
    orders: [],
    status: 'idle',
    currentOrder: null
};

export const createOrderAsyncThunk = createAsyncThunk(
    'cart/createOrder',
    async(order) => {
        const response = await createOrderAPI(order);
        return response.data;
    }
)


export const orderSlice = createSlice({
    name: 'orderSlice',
    initialState,
    reducers:{
        resetOrder: (state) => {
            state.currentOrder = null;
        },
    },
    extraReducers: (builder) =>{
        builder
        .addCase(createOrderAsyncThunk.fulfilled, (state, action) => {
            state.orders.push(action.payload);
            state.currentOrder = action.payload;
            state.status = 'idle';
        })
        .addCase(createOrderAsyncThunk.pending, (state, action) => {
            state.status = 'loading';
        })
        .addCase(createOrderAsyncThunk.rejected, (state, action) => {
            state.status = 'failed';
        })
        
    }
})

export default orderSlice;
export const {resetOrder} = orderSlice.actions;
export const selectUserOrdersInProfile = (state) => state.orderInStore.orders;
export const selectCurrentOrder = (state) => state.orderInStore.currentOrder;