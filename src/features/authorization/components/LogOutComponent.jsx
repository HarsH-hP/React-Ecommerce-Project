import { useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux';
import { selectLoggedInUser, signOutAsyncThunk } from "../slices/authSlice";
import { Navigate } from "react-router-dom";

export default function LogOutComponent(){
    const dispatch = useDispatch()
    const user = useSelector(selectLoggedInUser);
    useEffect(() =>{
        dispatch(signOutAsyncThunk());
    },[])
    return(
        <>
        {!user && <Navigate to='/' replace={true}></Navigate>}
        </>
    )
}