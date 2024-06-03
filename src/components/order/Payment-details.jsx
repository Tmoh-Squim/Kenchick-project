import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Server, Server_Url } from "../../server";
import { useNavigate } from "react-router-dom";
import Ratings from "../../utils/Rating";
import { AiOutlineClose } from "react-icons/ai";
import { removeFromCart } from "../../redux/cart";
import { Card, Steps } from "antd";
import axios from "axios";
import { toast } from "react-toastify";

const token = localStorage.getItem('token');
const PaymentDetails = () => {
  const { user } = useSelector((state) => state.user?.user);
  const { cartItem, cartTotalAmount } = useSelector((state) => state.cart);
  const [county, setCounty] = useState("");
  const [district, setDistrict] = useState("");
  const [location, setLocation] = useState("");
  const [error, setError] = useState(false);
  const [deliveryDetails, setDeliveryDetails] = useState({});

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleRemoveFromCart = (item) => {
    dispatch(removeFromCart(item));
  };
  const handleSubmit = async() => {
    try {
      if (!county || !district || !location) {
        return setError(true);
      } else {
        setDeliveryDetails({
          county: county,
          district: district,
          location: location,
        });
  
        const newOrder = {
          cart:cartItem,
          user:user,
          deliveryDetails:deliveryDetails,
          totalPrice:cartTotalAmount,
          paymentInfo:{
            type:'Mpesa',
            status:'success'
          }
        }

        if(deliveryDetails === ''){
          return toast.error('Delivery details are required!')
        }
        const response = await axios.post(`${Server_Url}/order/create-order`,newOrder,{
          headers:{
            'Authorization':token
          }
        })
  
        if(response.data.success){
          toast.success(response.data.message);
        }else{
          toast.error(response.data.message);
        }
  
      }
    } catch (error) {
      toast.error('Something went wrong! please try again later')
    }
  };

  return (
    <>
    <div className="800px:px-4 px-2 bg-slate-100 w-full h-screen">
      <div className="py-2">
        <h1 className="text-2xl text-black text-center">
          Hello <span className="text-black font-semibold">{user?.name} </span>
          fill in your delivery details to continue
        </h1>
      </div>

     <Card className="800px:w-[40%] w-full 800px:mx-auto">
     <Steps
      current={1} items={[
        {
          title:"Add to cart",
          description:''
        },
        {
          title:"Payment details",
          description:''
        },
        {
          title:"Payment",
          description:''
        }
      ]} />
     </Card>

      <div className="800px:flex block justify-center mt-4 items-center h-screen 800px:h-[80vh]">
        <div className="bg-white py-4 rounded-md px-2 800px:mx-4 block my-4 800px:w-[45%] 800px:h-[75vh] 800px:my-0">
          <div className="block py-2">
            <div>
              <label htmlFor="county">
                Enter Your County <span className="text-red-500">*</span>
              </label>
            </div>
            <input
              type="text"
              value={county}
              placeholder="Enter your county"
              className={`${
                error ? "outline-red-200" : ""
              } outline-none px-2 h-[2.5rem] my-2  w-full rounded-lg bg-slate-100`}
              onChange={(e) => {
                setCounty(e.target.value);
              }}
            />
          </div>

          <div className="block py-2">
            <div>
              <label htmlFor="county">
                Enter Your Subcounty/ District{" "}
                <span className="text-red-500">*</span>
              </label>
            </div>
            <input
              type="text"
              value={district}
              placeholder="Enter your district"
              className={`${
                error ? "outline-red-200" : ""
              } outline-none px-2 h-[2.5rem] my-2  w-full rounded-lg bg-slate-100`}
              onChange={(e) => {
                setDistrict(e.target.value);
              }}
            />
          </div>

          <div className="block py-2">
            <div>
              <label htmlFor="county">
                Enter Exact Location <span className="text-red-500">*</span>
              </label>
            </div>
            <input
              type="text"
              placeholder="Enter your exact location"
              value={location}
              className={`${
                error ? "outline-red-200" : ""
              } outline-none px-2 h-[2.5rem] my-2  w-full rounded-lg bg-slate-100`}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>

          <div
            className="bg-blue-500 px-4 mt-2 800px:mt-4 py-1.5 rounded-lg hover:bg-blue-300 cursor-pointer"
            onClick={handleSubmit}
          >
            <h1 className="text-center text-white text-[20px] font-semibold">
              Submit
            </h1>
          </div>
        </div>

        <div className="bg-white rounded-md relative py-2 px-2 800px:mx-4 800px:w-[33%] 800px:h-[75vh] overflow-y-scroll ">
          <div>
            <h1 className="text-xl text-black font-semibold mx-2">
              Cart summary
            </h1>
          </div>
          {cartItem.map((item, index) => (
            <div key={index} className="my-2 mb-3 px-2 ">
              <div className="flex items-center justify-between">
                <div className="flex">
                  <img
                    src={`${Server}/${item.image}`}
                    alt={item.name}
                    className="w-[110px] h-[110px] cursor-pointer"
                    onClick={() => {
                      navigate(`/product-details/${item._id}`, {
                        state: { product: item },
                      });
                    }}
                  />
                  <div
                    className="mx-2 block cursor-pointer"
                    onClick={() => {
                      navigate(`/product-details/${item._id}`, {
                        state: { product: item },
                      });
                    }}
                  >
                    <h1>{item.title}</h1>
                    <h1 className="my-">
                      Ksh {item.price} * {item.qty}
                    </h1>
                    <h1 className="my-0.5">
                      total: Ksh {item.price * item.qty}
                    </h1>

                    <Ratings rating={item.rating?.rate} />
                  </div>
                </div>

                <div
                  className="cursor-pointer hover:text-red-500"
                  onClick={() => handleRemoveFromCart(item)}
                >
                  <AiOutlineClose size={28} />
                </div>
              </div>
            </div>
          ))}
          <div className="800px:fixed 800px:bottom-[90px] 800px:right-[11rem] z-50 bottom-2 right-2 absolute">
            <h1 className="text-xl font-semibold">
              Total: Ksh {cartTotalAmount}
            </h1>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default PaymentDetails;
