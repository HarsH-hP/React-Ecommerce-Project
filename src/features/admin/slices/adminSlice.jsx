import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchLoggedInUserInfoAPI,fetchLoggedInUserOrdersAPI, updateUserAPI } from "../api/userAPI";

const initialState ={
    userInfo: null,
    userOrders:[],
    status: 'idle',
};

export const fetchLoggedInUserInfoAsyncThunk = createAsyncThunk(
    'cart/fetchLoggedInUserInfo',
    async(userID) => {
        const response = await fetchLoggedInUserInfoAPI(userID);
        return response.data;
    }
)

export const fetchLoggedInUserOrdersAsyncThunk = createAsyncThunk(
    'cart/fetchLoggedInUserOrders',
    async(userID) => {
        const response = await fetchLoggedInUserOrdersAPI(userID);
        return response.data;
    }
)

export const updateUserAsyncThunk = createAsyncThunk(
    'user/updateUser',
    async(userData)=>{
        const response = await updateUserAPI(userData);
        return response.data;
    }
);

export const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers:{    },
    extraReducers: (builder) =>{
        builder
        .addCase(fetchLoggedInUserInfoAsyncThunk.fulfilled, (state, action) => {
            state.userInfo = action.payload;
            state.status = 'idle';
        })
        .addCase(fetchLoggedInUserInfoAsyncThunk.pending, (state, action) => {
            state.status = 'loading';
        })
        .addCase(fetchLoggedInUserInfoAsyncThunk.rejected, (state, action) => {
            state.status = 'failed';
        })
        .addCase(fetchLoggedInUserOrdersAsyncThunk.fulfilled, (state, action) => {
            state.userOrders =
            action.payload;
            state.status = 'idle';
        })
        .addCase(fetchLoggedInUserOrdersAsyncThunk.pending, (state, action) => {
            state.status = 'loading';
        })
        .addCase(fetchLoggedInUserOrdersAsyncThunk.rejected, (state, action) => {
            state.status = 'failed';
        })
        .addCase(updateUserAsyncThunk.fulfilled, (state, action) => {
            state.userInfo = action.payload;
            state.status = 'idle';
        })
        .addCase(updateUserAsyncThunk.pending, (state, action) => {
            state.status = 'loading';
        })
        .addCase(updateUserAsyncThunk.rejected, (state, action) => {
            state.status = 'failed';
        })
        
    }
})

export default userSlice;
export const selectUserInfo = (state) => state.userDetailsInStore.userInfo;
export const selectUserOrders = (state) => state.userDetailsInStore.userOrders;
