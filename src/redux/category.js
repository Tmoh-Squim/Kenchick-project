import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Server_Url } from "../server";
import { toast } from "react-toastify";

export const getCategories = createAsyncThunk("/categories",async()=>{
    const res = await axios.get(`${Server_Url}/category/categories`);

    return res.data.categories;
})

const token = localStorage.getItem('token');
export const createCategori = createAsyncThunk("/create-category",async(category)=>{
    const response = await axios.post(
        `${Server_Url}/category/create-category`,
         category,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      return response.data;
})
export const deleteCategori = createAsyncThunk("/delete-product",async(id)=>{
    const res = await axios.delete(`${Server_Url}/category/delete-category/${id}`,{
        headers:{
            'Authorization':token
        }
    });
    return res.data
})


const initialState ={
    categories:[],
    loading:false,
    error:null
}
const categorySlice = createSlice({
    name:"categories",
    initialState,
    extraReducers:(builder)=>{
        builder
        .addCase(getCategories.pending,(state)=>{
            state.loading = true
        })
        .addCase(getCategories.fulfilled,(state,action)=>{
            state.categories = action.payload;
            state.loading = false;
        })
        .addCase(getCategories.rejected,(state,action)=>{
            state.error= action.payload;
            state.loading = false
        })
    }
})

export const deleteCategorySlice = createSlice({
    name:"deleteCategory",
    initialState:{
        loading:false,
        error:null,
        success:false
    },
    extraReducers:(builder)=>{
        builder
        .addCase(deleteCategori.pending,(state)=>{
            state.loading = true;
        })
        .addCase(deleteCategori.fulfilled,(state,action)=>{
            state.success = action.payload.success;
            state.loading = false;
            if (state.success) {
              toast.success(action.payload.message);
            } else {
              toast.error(action.payload.message);
            }
        })
        .addCase(deleteCategori.rejected, (state, action) => {
            state.loading = false;
            state.success = false;
            state.error = action.payload.message;
            toast.error(action.payload.error);
          });
    }
}).reducer

export default categorySlice.reducer;