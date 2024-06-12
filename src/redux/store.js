import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./product";
import userReducer, {
  ForgotPasswordSlice,
  ResetPasswordSlice,
  VerifyEmailSlice,
  VerifyOtpSlice,
  adminUserSlice,
} from "./user";
import cartReducer from "./cart";
import themeReducer from "./theme";
import adminOrderReducer, { userOrderSlice } from "./order";
const store = configureStore({
  reducer: {
    products: productReducer,
    user: userReducer,
    cart: cartReducer,
    forgotpassword: ForgotPasswordSlice,
    verifyOtp: VerifyOtpSlice,
    verifyEmail: VerifyEmailSlice,
    resetPassword: ResetPasswordSlice,
    theme: themeReducer,
    users: adminUserSlice,
    adminOrders: adminOrderReducer,
    userOrders: userOrderSlice,
  },
});

export default store;
