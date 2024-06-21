import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "../../styles/styles";
import { useEffect } from "react";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { RxCross1 } from "react-icons/rx";
import { Server_Url } from "../../server";
import { Card, Steps } from "antd";


const token = localStorage.getItem("token");
const Payment = () => {
  const [orderData, setOrderData] = useState([]);
  const [open, setOpen] = useState(false);
  const [phoneError, setPhoneError] = useState("");
  const [loading,setLoading] = useState(false)
  const { cartItem, cartTotalAmount } = useSelector((state) => state.cart);
  const [Order_ID] = useState("123");
  const { user } = useSelector((state) => state.user.user);
  const location = useLocation()
  const newOrder = location.state;
  useEffect(()=>{
    setOrderData(newOrder)
  },[newOrder])
  let userPhoneNumber = user && user.phone;
  // Convert to string and remove leading '0' if present
if (userPhoneNumber && userPhoneNumber.toString().startsWith('0')) {
  userPhoneNumber = userPhoneNumber.toString().slice(1);
}
    const [phone, setPhoneNumber] = useState(String(254)+(userPhoneNumber));
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();

 

  const phoneRegex = /^254\d{9}$/;
  const handlePhoneChange = (e) => {
    const phoneNum = e.target.value;
    setPhoneNumber(phoneNum);

    if (phoneRegex.test(phoneNum)) {
      setPhoneError(""); // Clear the error message
    } else {
      setPhoneError("Enter num in 254 format... without a +");
    }
  };

  const createOrder = (data, actions) => {
    return actions.order
      .create({
        purchase_units: [
          {
            description: "Sunflower",
            amount: {
              currency_code: "KES",
              value: cartTotalAmount,
            },
          },
        ],
        // not needed if a shipping address is actually needed
        application_context: {
          shipping_preference: "NO_SHIPPING",
        },
      })
      .then((orderID) => {
        return orderID;
      });
  };

  const order = {
    cart: cartItem,
    shippingAddress: newOrder.deliveryDetails,
    user: user,
    totalPrice: cartTotalAmount,
  };

  const onApprove = async (data, actions) => {
    return actions.order.capture().then(function (details) {
      const { payer } = details;

      let paymentInfo = payer;

      if (paymentInfo !== undefined) {
        paypalPaymentHandler(paymentInfo);
      }
    });
  };

  const paypalPaymentHandler = async (paymentInfo) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    order.paymentInfo = {
      id: paymentInfo.payer_id,
      status: "succeeded",
      type: "Paypal",
    };

    await axios
      .post(`${Server_Url}/order/create-order`, order, config)
      .then((res) => {
        setOpen(false);
        navigate("/order/success");
        toast.success("Order successful!");
        localStorage.setItem("cartItems", JSON.stringify([]));
        localStorage.setItem("latestOrder", JSON.stringify([]));
        //window.location.reload();
      });
  };

  const paymentData = {
    amount: Math.round(cartTotalAmount * 100),
  };
  const Amount = cartTotalAmount;

  const paymentHandler = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        `${Server_Url}/payment/process`,
        paymentData,
        config
      );

      const client_secret = data.client_secret;

      if (!stripe || !elements) return;
      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
        },
      });

      if (result.error) {
        toast.error(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          order.paymnentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
            type: "Credit Card",
          };

          await axios
            .post(`${Server_Url}/order/create-order`, order, config)
            .then((res) => {
              setOpen(false);
              navigate("/order/success");
              toast.success("Order successful!");
              localStorage.setItem("cartItems", JSON.stringify([]));
              localStorage.setItem("latestOrder", JSON.stringify([]));
              //window.location.reload();
            });
        }
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const cashOnDeliveryHandler = async (e) => {
    e.preventDefault();

    newOrder.paymentInfo = {
      type: "Cash On Delivery",
    };

    await axios.post(
      `${Server_Url}/order/create-order`,
      newOrder,
      {
        headers: {
          Authorization: token,
        },
      }
    ).then((res) => {
        setOpen(false);
        toast.success("Order successful!");
        localStorage.removeItem("cart");
        navigate("/profile");
        window.location.reload();
      });
  };

  const handleMpesaPayment = async (e) => {
    e.preventDefault();
    if (phoneError) {
      return;
    } else {
      const config = { headers: { "Content-Type": "application/json" } };
  
      const jsonData = {
        phone: phone,
        amount: Amount,
        Order_ID: Order_ID,
      };
  
      order.paymentInfo = {
        type: "lipa na mpesa",
        status: "pending",
      };
  
      try {
        const response = await axios.post(
          `https://stk-push.onrender.com/api/stkPush`,
          jsonData,
          config
        );
        
  
        if (response.status === 200) {
          order.paymentInfo = {
            type: "lipa na mpesa",
            status: "pending", 
          };
          const CheckoutRequestID = response.data.CheckoutRequestID;

          setLoading(true)
        await new Promise(resolve => setTimeout(resolve, 15000));

          const confirmResponse = await axios.post(
            `https://stk-push.onrender.com/api/confirmPayment/${CheckoutRequestID}`
          );          
  
          if (confirmResponse.status === 200 && confirmResponse.data.ResultCode === "0") {
            newOrder.paymentInfo = {
              type: "lipa na mpesa",
              status: "succeeded",
            };
            await axios.post(
              `${Server_Url}/order/create-order`,
              newOrder,
              {
                headers: {
                  Authorization: token,
                },
              }
            )
            setOpen(false);
            toast.success("Order successful!");
            localStorage.removeItem("cart");
            navigate("/profile");
            window.location.reload();
          } else {
            setOpen(true);
            toast.success("Payment not confirmed. Try again later!");
          }
        } else {
          setOpen(true);
          toast.error("Payment could not be processed 😞");
        }
      } catch (error) {
        console.log(error);
      }finally{
        setLoading(false)
      }
    }
  };

  return (
    
    <div className="w-full flex flex-col items-center py-8">
        <Card className="800px:w-[40%] w-full 800px:mx-auto">
          <Steps
            current={2}
            items={[
              {
                title: "Add to cart",
                description: "",
              },
              {
                title: "Delivery details",
                description: "",
              },
              {
                title: "Payment",
                description: "",
              },
            ]}
          />
        </Card>
      <div className="w-[90%] 1000px:w-[70%] block 800px:flex">
        <div className="w-full 800px:w-[65%]">
          <PaymentInfo
            user={user}
            open={open}
            setOpen={setOpen}
            onApprove={onApprove}
            createOrder={createOrder}
            paymentHandler={paymentHandler}
            cashOnDeliveryHandler={cashOnDeliveryHandler}
            handlePhoneChange={handlePhoneChange}
            phone={phone}
            setPhoneNumber={setPhoneNumber}
            phoneError={phoneError}
            setPhoneError={setPhoneError}
            handleMpesaPayment={handleMpesaPayment}
            loading={loading}
            setLoading={setLoading}
          />
        </div>
        <div className="w-full 800px:w-[35%] 800px:mt-0 mt-8">
          <CartData orderData={orderData} cartTotalAmount={cartTotalAmount} />
        </div>
      </div>
    </div>
  );
};

const PaymentInfo = ({
  user,
  open,
  setOpen,
  phone,
  setPhoneNumber,
  handlePhoneChange,
  phoneError,
  setPhoneError,
  onApprove,
  createOrder,
  paymentHandler,
  cashOnDeliveryHandler,
  handleMpesaPayment,
  loading,
  setLoading
}) => {
  const [select, setSelect] = useState(1);

  return (
    <div className="w-full 800px:w-[95%] bg-[#fff] rounded-md p-5 pb-8">
      {/* select buttons */}
      <div>
        <div className="flex w-full pb-5 border-b mb-2">
          <div
            className="w-[25px] h-[25px] rounded-full bg-transparent border-[3px] border-[#1d1a1ab4] relative flex items-center justify-center"
            onClick={() => setSelect(1)}
          >
            {select === 1 ? (
              <div className="w-[13px] h-[13px] bg-[#1d1a1acb] rounded-full" />
            ) : null}
          </div>
          <h4 className="text-[18px] pl-2 font-[600] text-[#000000b1]">
            Pay with Debit/credit card
          </h4>
        </div>

        {/* pay with card */}
        {select === 1 ? (
          <div className="w-full flex border-b">
            <form className="w-full" onSubmit={paymentHandler}>
              <div className="w-full flex pb-3">
                <div className="w-[50%]">
                  <label className="block pb-2">Name On Card</label>
                  <input
                    required
                    placeholder={user && user.name}
                    className={`${styles.input} !w-[95%] text-[#444]`}
                    value={user && user.name}
                  />
                </div>
                <div className="w-[50%]">
                  <label className="block pb-2">Exp Date</label>
                  <CardExpiryElement
                    className={`${styles.input}`}
                    options={{
                      style: {
                        base: {
                          fontSize: "19px",
                          lineHeight: 1.5,
                          color: "#444",
                        },
                        empty: {
                          color: "#3a120a",
                          backgroundColor: "transparent",
                          "::placeholder": {
                            color: "#444",
                          },
                        },
                      },
                    }}
                  />
                </div>
              </div>

              <div className="w-full flex pb-3">
                <div className="w-[50%]">
                  <label className="block pb-2">Card Number</label>
                  <CardNumberElement
                    className={`${styles.input} !h-[35px] !w-[95%]`}
                    options={{
                      style: {
                        base: {
                          fontSize: "19px",
                          lineHeight: 1.5,
                          color: "#444",
                        },
                        empty: {
                          color: "#3a120a",
                          backgroundColor: "transparent",
                          "::placeholder": {
                            color: "#444",
                          },
                        },
                      },
                    }}
                  />
                </div>
                <div className="w-[50%]">
                  <label className="block pb-2">CVV</label>
                  <CardCvcElement
                    className={`${styles.input} !h-[35px]`}
                    options={{
                      style: {
                        base: {
                          fontSize: "19px",
                          lineHeight: 1.5,
                          color: "#444",
                        },
                        empty: {
                          color: "#3a120a",
                          backgroundColor: "transparent",
                          "::placeholder": {
                            color: "#444",
                          },
                        },
                      },
                    }}
                  />
                </div>
              </div>
              <input
                type="submit"
                value="Submit"
                className={`${styles.button} !bg-[#f63b60] text-[#fff] h-[45px] rounded-[5px] cursor-pointer text-[18px] font-[600]`}
              />
            </form>
          </div>
        ) : null}
      </div>

      <br />
      {/* paypal payment */}
      <div>
        <div className="flex w-full pb-5 border-b mb-2">
          <div
            className="w-[25px] h-[25px] rounded-full bg-transparent border-[3px] border-[#1d1a1ab4] relative flex items-center justify-center"
            onClick={() => setSelect(2)}
          >
            {select === 2 ? (
              <div className="w-[13px] h-[13px] bg-[#1d1a1acb] rounded-full" />
            ) : null}
          </div>
          <h4 className="text-[18px] pl-2 font-[600] text-[#000000b1]">
            Pay with Paypal
          </h4>
        </div>

        {/* pay with payement */}
        {select === 2 ? (
          <div className="w-full flex border-b">
            <div
              className={`${styles.button} !bg-[#f63b60] text-white h-[45px] rounded-[5px] cursor-pointer text-[18px] font-[600]`}
              onClick={() => setOpen(true)}
            >
              Pay Now
            </div>
            {open && (
              <div className="w-full fixed top-0 left-0 bg-[#00000039] h-screen flex items-center justify-center z-[99999]">
                <div className="w-full 800px:w-[40%] h-screen 800px:h-[80vh] bg-white rounded-[5px] shadow flex flex-col justify-center p-8 relative overflow-y-scroll">
                  <div className="w-full flex justify-end p-3">
                    <RxCross1
                      size={30}
                      className="cursor-pointer absolute top-3 right-3"
                      onClick={() => setOpen(false)}
                    />
                  </div>
                  <PayPalScriptProvider
                    options={{
                      "client-id":
                        "Aczac4Ry9_QA1t4c7TKH9UusH3RTe6onyICPoCToHG10kjlNdI-qwobbW9JAHzaRQwFMn2-k660853jn",
                    }}
                  >
                    <PayPalButtons
                      style={{ layout: "vertical" }}
                      onApprove={onApprove}
                      createOrder={createOrder}
                    />
                  </PayPalScriptProvider>
                </div>
              </div>
            )}
          </div>
        ) : null}
      </div>

      <br />
      <div>
        <div className="flex w-full pb-5 border-b mb-2">
          <div
            className="w-[25px] h-[25px] rounded-full bg-transparent border-[3px] border-[#1d1a1ab4] relative flex items-center justify-center"
            onClick={() => setSelect(4)}
          >
            {select === 4 ? (
              <div className="w-[13px] h-[13px] bg-[#1d1a1acb] rounded-full" />
            ) : null}
          </div>
          <h4 className="text-[18px] pl-2 font-[600] text-[#000000b1]">
            Lipa na mpesa
          </h4>
        </div>

        {/* pay with mpesa payement */}
        {select === 4 ? (
          <div className="w-full block border-b">
            <form action="" onSubmit={handleMpesaPayment}>
              <div>
                <input
                  type="number"
                  name="phone"
                  required
                  value={phone}
                  className="appearance-none block w-[93%] px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  onChange={handlePhoneChange}
                  placeholder="2547******** or 2541********"
                  id="phone"
                />
                {phoneError && <p style={{ color: "red" }}>{phoneError}</p>}
              </div>

              <button type="submit">
                <div
                  className={`${styles.button} !bg-[#f63b60] text-white h-[45px] rounded-[5px] cursor-pointer text-[18px] font-[600]`}
                >
                  Pay Now
                </div>
              </button>
            </form>
          </div>
        ) : null}
      </div>
      <br />
      {/* cash on delivery */}
      <div>
        <div className="flex w-full pb-5 border-b mb-2">
          <div
            className="w-[25px] h-[25px] rounded-full bg-transparent border-[3px] border-[#1d1a1ab4] relative flex items-center justify-center"
            onClick={() => setSelect(3)}
          >
            {select === 3 ? (
              <div className="w-[13px] h-[13px] bg-[#1d1a1acb] rounded-full" />
            ) : null}
          </div>
          <h4 className="text-[18px] pl-2 font-[600] text-[#000000b1]">
            Cash on Delivery
          </h4>
        </div>

        {/* cash on delivery */}
        {select === 3 ? (
          <div className="w-full flex">
            <form className="w-full" onSubmit={cashOnDeliveryHandler}>
              <input
                type="submit"
                value="Confirm"
                className={`${styles.button} !bg-[#f63b60] text-[#fff] h-[45px] rounded-[5px] cursor-pointer text-[18px] font-[600]`}
              />
            </form>
          </div>
        ) : null}
      </div>
    </div>
  );
};

const CartData = ({ orderData,cartTotalAmount }) => {
  const shipping = orderData?.shipping?.toFixed(2);
  return (
    <div className="w-full bg-[#fff] rounded-md p-5 pb-8">
      <div className="flex justify-between">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">subtotal:</h3>
        <h5 className="text-[18px] font-[600]">
          Ksh{orderData?.subTotalPrice}
        </h5>
      </div>
      <br />
      <div className="flex justify-between">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">shipping:</h3>
        <h5 className="text-[18px] font-[600]">Ksh{shipping}</h5>
      </div>
      <br />
      <div className="flex justify-between border-b pb-3">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">Discount:</h3>
        <h5 className="text-[18px] font-[600]">
          {orderData?.discountPrice ? "Ksh" + orderData.discountPrice : "-"}
        </h5>
      </div>
      <h5 className="text-[18px] font-[600] text-end pt-3">
        Ksh{cartTotalAmount}
      </h5>
      <br />
    </div>
  );
};

export default Payment;
