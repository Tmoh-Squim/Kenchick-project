import React, { useEffect} from "react";
import {
  AiOutlineClose,
  AiOutlineDelete,
  AiOutlineMinus,
  AiOutlinePlus,
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import  { decrement, getTotal, increment, removeFromCart } from "../../redux/cart";
import { Server } from "../../server";

const Cart = ({ setOpen }) => {
  const { cartItem, cartTotalAmount } = useSelector((state) => state.cart);
  const cart = useSelector((state)=>state.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleNavigate = (item) => {
    navigate(`/product-details/${item._id}`, {
      state: { product: item },
    });
  };

  const handleRemoveFromCart = (item) => {
    dispatch(removeFromCart(item));
  };

  const handleIncrement = (item) => {
    dispatch(increment(item));
  };
  const handleDecrement = (item) => {
    dispatch(decrement(item));
  };
  useEffect(()=>{
    dispatch(getTotal())
  },[cart,dispatch])
  return (
    <div className="relative w-full h-screen">
      <div className="800px:w-[30%] w-full  fixed  right-0 h-screen overflow-y-scroll z-50 bg-slate-200">
        <div
          className="cursor-pointer absolute flex w-full justify-end right-2 top-2"
          onClick={() => setOpen(false)}
        >
          <AiOutlineClose size={28} />
        </div>

        {cartItem?.length > 0 ? (
          <div className="mt-9 px-2 mb-[52px]">
            {cartItem?.map((item, index) => {
              return (
                <div key={index} className="mt-2  flex items-center">
                  <div className="flex flex-col justify-between mx-2">
                    <div
                      className="w-[20px] h-[20px] rounded-full  bg-white cursor-pointer justify-center flex items-center"
                      onClick={() => handleIncrement(item)}
                    >
                      <AiOutlinePlus size={16} />
                    </div>
                    <div className="w-[20px] h-[20px] rounded-full my-2  bg-white  flex justify-center items-center">
                      <h1 className="mt-1.5">{item.qty}</h1>
                    </div>
                    <div
                      className="w-[20px] h-[20px] rounded-full  bg-white cursor-pointer flex items-center justify-center"
                      onClick={() => handleDecrement(item)}
                    >
                      <AiOutlineMinus size={15} />
                    </div>
                  </div>
                  <div className="flex">
                    <img
                      src={`${Server}/${item.image}`}
                      alt={item.title}
                      className="w-[100px] h-[100px] cursor-pointer"
                      onClick={() => handleNavigate(item)}
                    />

                    <div className="flex items-center justify-between">
                      <div
                        className="block mx-2 cursor-pointer"
                        onClick={() => handleNavigate(item)}
                      >
                        <h1>
                          {item.title.length > 25
                            ? item.title.slice(0, 25) + "..."
                            : item.title}
                        </h1>

                        <h1 className="text-red-500 font-[20px]">
                          Ksh {item.price} * {item.qty}
                        </h1>

                        <h1>Ksh {item.price * item.qty}</h1>
                      </div>

                      <div
                        className="cursor-pointer"
                        onClick={() => handleRemoveFromCart(item)}
                      >
                        <AiOutlineDelete size={28} color="red" />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex h-full w-full justify-center items-center">
            <h1>Your Cart Is Empty! Continue to shopping</h1>
          </div>
        )}
      </div>

      <div
        className="fixed bottom-2 z-50  right-7 cursor-pointer 800px:w-[25%] w-[80%] mx-auto py-1.5 bg-blue-600 rounded-lg px-4 hover:bg-blue-500"
        onClick={() => {
          navigate("/payment-details");
        }}
      >
        <h1 className="text-white font-semibold text-center">
          Checkout Now Ksh {cartTotalAmount}
        </h1>
      </div>
    </div>
  );
};

export default Cart;
