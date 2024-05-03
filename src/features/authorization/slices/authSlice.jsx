import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createUserAPI , checkUserAPI, signOutAPI} from "../api/authAPI";
import { updateUserAPI } from "../../user/api/userAPI";

const initialState = {
    loggedInUser:null,
    errors:null,
    status: 'idle',
    registeredUser:false,
};


export const createUserAsyncThunk = createAsyncThunk(
    'user/createUser',
    async(userData)=>{
        const response = await createUserAPI(userData);
        return response.data;
    }
);

export const checkUserAsyncThunk = createAsyncThunk(
    'user/checkUser',
    async(loginInfo)=>{
        const response = await checkUserAPI(loginInfo);
        return response.data;
    }
)

export const signOutAsyncThunk = createAsyncThunk(
    'user/signOut',
    async(loginInfo)=>{
        const response = await signOutAPI(loginInfo);
        return response.data;
    }
)

export const checkRegisteredUserAsyncThunk = createAsyncThunk(
    'user/checkRegisteredUserAPI',
    async(emailID)=> {
        const response = await checkRegisteredUserAPI(emailID);
        return response.data;
    }
)


export const authUserSlice = createSlice({
    name: 'userSlice_1',
    initialState,
    reducers:{},
    extraReducers: (builder) =>{
        builder
        .addCase(checkRegisteredUserAsyncThunk.fulfilled, (state, action) => {
            state.registeredUser = true;
            state.status = 'idle';
        })
        .addCase(checkRegisteredUserAsyncThunk.pending, (state, action) => {
            state.status = 'loading';
        })
        .addCase(checkRegisteredUserAsyncThunk.rejected, (state, action) => {
            state.registeredUser = false;
            state.status = 'idle';
        })
        .addCase(createUserAsyncThunk.fulfilled, (state, action) => {
            state.loggedInUser = action.payload;
            state.status = 'idle';
        })
        .addCase(createUserAsyncThunk.pending, (state, action) => {
            state.status = 'loading';
        })
        .addCase(createUserAsyncThunk.rejected, (state, action) => {
            state.status = 'failed';
        })
        .addCase(checkUserAsyncThunk.fulfilled, (state, action) => {
            state.loggedInUser = action.payload;
            state.status = 'idle';
        })
        .addCase(checkUserAsyncThunk.pending, (state, action) => {
            state.status = 'loading';
        })
        .addCase(checkUserAsyncThunk.rejected, (state, action) => {
            state.errors = action.error;
            state.status = 'idle';
        })
        .addCase(signOutAsyncThunk.fulfilled, (state, action) => {
            state.loggedInUser = null;
            state.registeredUser = false;
            state.status = 'idle';
        })
        .addCase(signOutAsyncThunk.pending, (state, action) => {
            state.status = 'loading';
        })
        .addCase(signOutAsyncThunk.rejected, (state, action) => {
            state.errors = action.error;
            state.status = 'idle';
        })
     
    }
})

export default authUserSlice;
export const selectLoggedInUser = (state) => state.authInStore.loggedInUser;
export const selectCheckUserRegistered = (state) => state.authInStore.registeredUser;
export const selectError = (state) => state.authInStore.errors;

