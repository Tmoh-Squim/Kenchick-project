import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Server_Url } from "../server";
import { toast } from "react-toastify";

const token = localStorage.getItem("token");
export const getUser = createAsyncThunk("/user", async () => {
  const response = await axios.get(`${Server_Url}/auth/getUser`, {
    headers: {
      Authorization: token,
    },
  });
  return response.data;
});

export const getUsers = createAsyncThunk("/admin-user", async () => {
  const response = await axios.get(`${Server_Url}/auth/admin-users`,{
    headers:{
      'Authorization':token
    }
  });
  return response.data;
});

export const ForgotPasswordi = createAsyncThunk(
  "/forgot-password",
  async (email) => {
    const response = await axios.post(`${Server_Url}/auth/forgot-password`, {
      email: email,
    });
    return response.data;
  }
);

export const VerifyOtpi = createAsyncThunk("/verify-otp", async (email, otp) => {
  const response = await axios.post(`${Server_Url}/auth/verify-otp`, {
    email,
    otp
  });
  return response.data;
});
export const VerifyEmaili = createAsyncThunk("/verify-email", async (newUser) => {

const response = await axios.post(`${Server_Url}/auth/verify-email`, {
 newUser
});
return response.data;
});

export const ResetPasswordi = createAsyncThunk("/reset-password", async (email, otp,newPassword) => {
    const response = await axios.post(`${Server_Url}/auth/reset-password`, 
      email,
      otp,
      newPassword,
    );
    return response.data;
  });

const initialState = {
  user: `${localStorage.getItem("user") ? localStorage.getItem("user") : {}}`,
  isLoading: true,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const adminUserSlice = createSlice({
  name: "users",
  initialState:{
    users:[],
    isLoading:false,
    error:null
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.isLoading = false;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
}).reducer

export const ForgotPasswordSlice = createSlice({
    name: "forgotPassword",
    initialState:{
        loading:false,
        success:false,
        error:null
    },
    extraReducers: (builder) => {
      builder
        .addCase(ForgotPasswordi.pending, (state) => {
          state.loading = true;
        })
        .addCase(ForgotPasswordi.fulfilled, (state, action) => {
          state.success = action.payload.success;
          state.loading = false;
          if(state.success){
            toast.success(action.payload.message)
          }else{
            toast.error(action.payload.message)
          }
        })
        .addCase(ForgotPasswordi.rejected, (state, action) => {
          state.loading = false;
          state.success = false
          state.error = action.payload;
          toast.error(action.payload.message)
        });
    },
  }).reducer

export  const VerifyOtpSlice = createSlice({
    name: "verifyOtp",
    initialState:{
        loading:false,
        error:null,
        success:false
    },
    extraReducers: (builder) => {
      builder
        .addCase(VerifyOtpi.pending, (state) => {
          state.loading = true;
        })
        .addCase(VerifyOtpi.fulfilled, (state, action) => {
          state.success = action.payload.success;
          state.loading = false;
          if(state.success){
            toast.success(action.payload.message)
          }else{
            toast.error(action.payload.message)
          }
        })
        .addCase(VerifyOtpi.rejected, (state, action) => {
          state.loading = false;
          state.success = false;
          state.error = action.payload;
          toast.error(action.payload.message)
        });
    },
  }).reducer

  export  const VerifyEmailSlice = createSlice({
    name: "verifyEmail",
    initialState:{
        loading:false,
        error:null,
        success:false
    },
    extraReducers: (builder) => {
      builder
        .addCase(VerifyEmaili.pending, (state) => {
          state.loading = true;
        })
        .addCase(VerifyEmaili.fulfilled, (state, action) => {
          state.success = action.payload.success;
          state.loading = false;
          if(state.success){
            toast.success(action.payload.message)
          }else{
            toast.error(action.payload.message)
          }
        })
        .addCase(VerifyEmaili.rejected, (state, action) => {
          state.loading = false;
          state.success = false;
          state.error = action.payload;
          toast.error(action.payload.message)
        });
    },
  }).reducer

export  const ResetPasswordSlice = createSlice({
    name: "resetPassword",
    initialState:{
        loading:false,
        error:null,
        success:false
    },
    extraReducers: (builder) => {
      builder
        .addCase(ResetPasswordi.pending, (state) => {
          state.loading = true;
        })
        .addCase(ResetPasswordi.fulfilled, (state, action) => {
          state.success = action.payload.success;
          state.loading = false;
          if(state.success){
            toast.success(action.payload.message)
          }else{
            toast.error(action.payload.message)
          }
        })
        .addCase(ResetPasswordi.rejected, (state, action) => {
          state.loading = false;
          state.success = false
          state.error = action.payload;
          toast.error(action.payload.error);
        });
    },
  }).reducer

export default userSlice.reducer;
