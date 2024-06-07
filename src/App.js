import "./App.css";
import { Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Layout from "./components/layout/Layout";
import { useEffect } from "react";
import store from "./redux/store";
import { getProducts } from "./redux/product";
import ProductDetails from "./components/products/Product-details";
import { getUser } from "./redux/user";
import UserProfile from "./components/user/User-Profile";
import { getTotal } from "./redux/cart";
import { useSelector } from "react-redux";
import ForgotPassword from "./auth/Forgot-Password";
import VerifyOtp from "./auth/Verify-Otp";
import ChangePassword from "./auth/Change-Password";
import PaymentDetails from "./components/order/Payment-details";
import ProtectedRoute, { AdminRoute } from "./middleware/auth";
import { getOrdersUser } from "./redux/order";
import UpdateOrder from "./components/user/UpdateOrder";
import Track from "./components/user/Track";
import SearchPage from "./pages/SearchPage";
import Products from "./components/products/Products";
import Contact from "./pages/Contact";
import AboutUs from "./pages/AboutUs";
import AdminDashboard from "./components/admin/User-Profile";
import OrderDetails from "./components/user/UpdateOrder";
import UpdateProduct from "./components/admin/UpdateProduct";
function App() {
  const cart = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user?.user);
  useEffect(() => {
    store.dispatch(getProducts());
    store.dispatch(getUser());

    //eslint-disable-next-line
  }, [store]);

  useEffect(() => {
    store.dispatch(getTotal());
    store.dispatch(getOrdersUser(user?._id));
  }, [cart, user]);

  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/product-details/:id" element={<ProductDetails />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/products" element={<Products />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route
          path="/payment-details"
          element={
            <ProtectedRoute>
              <PaymentDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/update-product/:id"
          element={
            <ProtectedRoute>
              <UpdateProduct />
            </ProtectedRoute>
          }
        />
        <Route
          path="/update-order/:id"
          element={
            <AdminRoute>
              <UpdateOrder />
            </AdminRoute>
          }
        />
         <Route
          path="/track-order/:id"
          element={
            <ProtectedRoute>
              <Track />
            </ProtectedRoute>
          }
        />
        <Route
          path="/order/:id"
          element={
            <ProtectedRoute>
              <OrderDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-dashboard"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />

      </Routes>
    </>
  );
}

export default App;
