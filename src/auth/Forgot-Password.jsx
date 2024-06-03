import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import chick from "../assets/chick1.png";
import { toast } from "react-toastify";
import {useDispatch, useSelector} from "react-redux"
import { ForgotPasswordi } from "../redux/user";
import Loader from "../utils/Loader";
const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error,setError] = useState(false);
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const {success,loading} = useSelector((state)=>state.forgotpassword);

  const handleLogin = async()=>{
    try {
      if(email.length >0){
        dispatch(ForgotPasswordi({email}));

      }else{
        setError(true)
      }
       
    } catch (error) {
      toast.error("Something went wrong! try again later")
    }
  }
  useEffect(()=>{
    if(success){
      navigate('/verify-otp',{state:{email:email}})
    }else{
      return
    }
  },[success])

  return (
   <>
   {
    loading ? (
      <div className="w-full h-screen bg-[#0000004b] flex justify-center items-center">
        <Loader />
      </div>
    ):(
      <div className="block w-full justify-between 800px:px-4 800px:flex">
      <div className="w-full 800px:h-screen h-max px-4 800px:w-[40%] flex items-center bg-white">
        <div>
          <div>
            <h1 className="text-blue-500 text-3xl font-semibold">
              Welcome to Kenchick
            </h1>
            <h1 className="text-xl my-4 ">
              Kenchic is Kenya's market leader in poultry. Passionate about
              growing tasty, healthy chicken for everyone to enjoy. We're
              chicken experts with nearly
            </h1>
          </div>
          <img src={chick} alt="imgg" width={500} height={500} />
        </div>
      </div>

      <div className="w-full 800px:h-screen 800px:w-[60%] flex justify-center items-center bg-slate-200">
        <div className="p-4 w-full 800px:w-[80%] 800px:m-auto">
          <div className="my-5">
            <h1 className="text-3xl text-black text-center font-bold">
              Reset Your Password!
            </h1>
          </div>
          <div className="block my-2">
            <div>
              <label
                htmlFor="email"
                className="text-[16px] font-semibold text-black py-2"
              >
                Enter your email
              </label>
            </div>
            <div className="mt-2">
              <input
                type="text"
                className={ `${error ? 'outline-red-300': ''} outline-none px-2 focus:outline-1 focus:outline-blue-500 h-[2.6rem] w-full 800px:w-[80%] rounded-lg bg-slate-300`}
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          {
            loading ? (
              <div
            className="px-6 py-2 mx-4 my-6 bg-blue-500 rounded-xl w-max cursor-pointer"
          >
            <h1 className="text-white text-xl">Waiting...</h1>
          </div>
            ):(
              <div
            className="px-6 py-2 mx-4 my-6 bg-blue-500 rounded-xl w-max cursor-pointer"
            onClick={handleLogin}
          >
            <h1 className="text-white text-xl">Reset</h1>
          </div>
            )
          }
        </div>
      </div>
    </div>
    )
   }
   </>
  );
};

export default ForgotPassword;
