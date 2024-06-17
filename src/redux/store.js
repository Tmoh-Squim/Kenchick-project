import { configureStore } from "@reduxjs/toolkit";
import productReducer, { createProductSlice, deleteProductSlice, updateProductSlice } from "./product";
import userReducer, {
  ForgotPasswordSlice,
  ResetPasswordSlice,
  VerifyEmailSlice,
  VerifyOtpSlice,
  adminUserSlice,
  loginUserSlice,
  registerUserSlice,
} from "./user";
import cartReducer from "./cart";
import themeReducer from "./theme";
import adminOrderReducer, { userOrderSlice } from "./order";
import categorySlice, { deleteCategorySlice } from "./category";
import questionReducer from "./chatbot";

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
    loginUser: loginUserSlice,
    registerUser: registerUserSlice,
    deleteProduct: deleteProductSlice,
    createProduct: createProductSlice,
    updateProduct: updateProductSlice,
    categories: categorySlice,
    deleteCategory: deleteCategorySlice,
    question: questionReducer
  },
});

export default store;
