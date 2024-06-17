import {createAsyncThunk,createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import { Server_Url } from "../server";
import {toast} from "react-toastify";

export const getAnswer = createAsyncThunk('/get-answer',async(ddd)=>{
    try {
        const response = await axios.post(`${Server_Url}/chatbot/question`,ddd);

        return response.data
    } catch (error) {
        console.log('err',error)
        }
})

const initialState = {
    loading:false,
    error:null,
    answer:''
}

const questionSlice = createSlice({
    name:'question',
    initialState,
    extraReducers:(builder)=>{
        builder
        .addCase(getAnswer.pending,(state)=>{
            state.loading = true
        })
        .addCase(getAnswer.fulfilled,(state,action)=>{
            state.loading = false
            state.answer = action.payload
        })
        .addCase(getAnswer.rejected,(state,action)=>{
            state.loading = false
            state.error = action.payload
        })
    }
})

export default questionSlice.reducer;