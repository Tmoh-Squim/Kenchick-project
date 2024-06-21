import "./App.css";
import { Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Layout from "./components/layout/Layout";
import { useEffect, useState } from "react";
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
import Track from "./components/user/Track";
import SearchPage from "./pages/SearchPage";
import Products from "./components/products/Products";
import Contact from "./pages/Contact";
import AboutUs from "./pages/AboutUs";
import OrderDetails from "./components/user/UpdateOrder";
import UpdateProduct from "./components/admin/UpdateProduct";
import AdminUpdateOrder from "./components/admin/UpdateOrder";
import DayOld from "./pages/DayOld";
import Food from "./pages/Food";
import VerifyEmail from "./auth/Verify-email";
import AdminDashboard from "./components/admin/Admin-Profile";
import { getCategories } from "./redux/category";
import Payment from "./components/order/Payment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { Server_Url } from "./server";
function App() {
  const {cart} = useSelector((state)=>state.cart);
  const [stripeApikey, setStripeApiKey] = useState("");

  async function getStripeApikey() {
    const { data } = await axios.get(`${Server_Url}/payment/stripeapikey`);
    setStripeApiKey(data.stripeApikey);
  }

  useEffect(() => {
    store.dispatch(getProducts());
    store.dispatch(getUser());
    store.dispatch(getCategories());
    //eslint-disable-next-line
  }, [store]);
  useEffect(()=>{
    getStripeApikey();
  },[])

  useEffect(() => {
    store.dispatch(getTotal());
  }, [cart]);

  return (
    <>
    <ToastContainer />
    {stripeApikey ? (
      <Elements stripe={loadStripe(stripeApikey)}>
        <Routes>
          <Route
            path="/payment"
            element={
              <ProtectedRoute>
                <Payment />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Elements>
    ) : null}
  
    <Routes>
      <Route path="/" element={<Layout />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/product-details/:id" element={<ProductDetails />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/verify-otp" element={<VerifyOtp />} />
      <Route path="/verify-email" element={<VerifyEmail />} />
      <Route path="/change-password" element={<ChangePassword />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/products" element={<Products />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/about-us" element={<AboutUs />} />
      <Route path="/day-old-chicks/:category" element={<DayOld />} />
      <Route path="/food" element={<Food />} />
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
            <AdminUpdateOrder />
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
