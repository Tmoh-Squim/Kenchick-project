import {createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import axios from "axios"
import { Server_Url } from "../server";
import {toast} from "react-toastify"
export const getProducts = createAsyncThunk("/products",async()=>{
    const res = await axios.get(`${Server_Url}/chick/get-products`);

    return res.data.products
})

export const deleteProducti = createAsyncThunk("/delete-product",async(id,dispatch)=>{
    const res = await axios.delete(`${Server_Url}/chick/delete-product/${id}`);

    if(res.data.success){
        toast.success(res.data.message);
        dispatch(getProducts())
    }else{
        toast.error(res.data.message);
    }
})

const initialState ={
    products:[],
    loading:true,
    error:null
}
const productSlice = createSlice({
    name:"products",
    initialState,
    extraReducers:(builder)=>{
        builder
        .addCase(getProducts.pending,(state)=>{
            state.loading = true
        })
        .addCase(getProducts.fulfilled,(state,action)=>{
            state.products = action.payload;
            state.loading = false;
        })
        .addCase(getProducts.rejected,(state,action)=>{
            state.error= action.payload;
            state.loading = false
        })
    }
})


export default productSlice.reducer