import { configureStore } from "@reduxjs/toolkit";
import { productSlice } from "./features/product-list/slices/productSlice"; //Importing the slice created in the productSlice.jsx file 
import {authUserSlice} from './features/authorization/slices/authSlice';
import {cartSlice} from './features/cart-details/slices/cartSlice';
import { orderSlice } from './features/orders/slices/orderSlice';
import userSlice from "./features/user/slices/userSlice";

export const store = configureStore({
    reducer:{
        productInStore: productSlice.reducer, // Making a default reducer having all the reducers of the productSlice which present in the productSlice.jsx file. 
        //This default reducer here in store is named "product" which has all the reducers of the productSlice which present in the productSlice.jsx file 
        authInStore: authUserSlice.reducer,
        cartInStore: cartSlice.reducer,
        orderInStore: orderSlice.reducer,
        userDetailsInStore: userSlice.reducer,
    },
})