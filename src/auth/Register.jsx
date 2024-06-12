import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import chick from "../assets/chick1.png";
import {toast} from "react-toastify";
import { Server_Url } from "../server";
const Register = () => {
  const [visible, setVisible] = useState(false);
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [name,setName] = useState("");
  const [phone,setPhone] = useState("");

  const navigate = useNavigate();
  var validRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+")){3,}@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const handleSignup = async()=>{
    try {
      const user = {
        name:name,
        email:email,
        phone:phone,
        password:password
      }
      if (!/^[a-zA-Z\s]+$/.test(name) || name.length < 3) {
        return toast.error("Invalid name");
      }if (!email.match(validRegex)) {
        return toast.error("Invalid email address");
      }if (isNaN(phone) || phone.length < 10 || phone.length > 12) {
        return toast.error("Invalid phone number");
      }
      if (password.length <6){
        return toast.error("Password must be at least 6 char")
      }
      const response = await axios.post(`${Server_Url}/auth/create-user`,user);

      if(response.data.success){
       toast.success(response.data.message);
       navigate("/verify-email",{state:{user:user}});
      }
      else{
       return toast.error(response.data.message)
      }
    } catch (error) {
      toast('Something went wrong! try again later')
    }
  }
  
  return (
    <div className="block w-full 800px:justify-between items-center 800px:px-4 800px:flex bg-slate-200">
      <div className="w-full px-2 800px:h-screen 800px:w-[40%] hidden 800px:flex items-center bg-white">
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
              Register as a new user
            </h1>
          </div>
          <div className="block my-2">
            <div>
              <label
                htmlFor="name"
                className="text-[16px] font-semibold text-black py-2"
              >
                Enter Your Full Name
              </label>
            </div>
            <div className="mt-2">
              <input
                type="text"
                className="outline-none px-2 focus:outline-1 focus:outline-blue-500 h-[2.6rem] w-full 800px:w-[80%] rounded-lg bg-slate-300"
                placeholder="Enter your full name"
                onChange={(e)=>setName(e.target.value)}
              />
            </div>
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
                type="email"
                className="outline-none px-2 focus:outline-1 focus:outline-blue-500 h-[2.6rem] w-full 800px:w-[80%] rounded-lg bg-slate-300"
                placeholder="Enter your email"
                onChange={(e)=>setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="block my-2">
            <div>
              <label
                htmlFor="phone"
                className="text-[16px] font-semibold text-black py-2"
              >
                Enter your phone number
              </label>
            </div>
            <div className="mt-2">
              <input
                type="number"
                className="outline-none px-2 focus:outline-1 focus:outline-blue-500 h-[2.6rem] w-full 800px:w-[80%] rounded-lg bg-slate-300"
                placeholder="Enter your phone"
                onChange={(e)=>setPhone(e.target.value)}
              />
            </div>
          </div>

          <div className="block my-2">
            <div>
              <label
                htmlFor="email"
                className="text-[16px] font-semibold text-black py-2"
              >
                Enter your password
              </label>
            </div>
            <div className="mt-2 relative">
              <input
                type={visible ? "text" : "password"}
                className="outline-none px-2 focus:outline-1 focus:outline-blue-500 h-[2.6rem] w-full 800px:w-[80%] rounded-lg bg-slate-300"
                placeholder="Enter your password"
                onChange={(e)=>setPassword(e.target.value)}
              />
              <div className="absolute 800px:right-[21%] right-2 top-2">
                {visible ? (
                  <AiOutlineEyeInvisible
                    size={25}
                    onClick={() => setVisible(false)}
                    className="cursor-pointer"
                  />
                ) : (
                  <AiOutlineEye
                    size={25}
                    onClick={() => setVisible(true)}
                    className="cursor-pointer"
                  />
                )}
              </div>
            </div>
          </div>

          <div className="my-2">
            <h1>
              Already have an account?{" "}
              <Link to="/login" className="text-blue-500 font-semibold mx-1">
                Login
              </Link>
            </h1>
          </div>

          <div className="px-6 py-2 mx-4 my-6 bg-blue-500 rounded-xl w-max cursor-pointer" onClick={handleSignup}>
            <h1 className="text-white text-xl">Register</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
