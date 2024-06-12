import React, { useEffect, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useLocation, useNavigate } from "react-router-dom";
import chick from "../assets/chick1.png";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { ResetPasswordi } from "../redux/user";

const ChangePassword = () => {
  const [visible, setVisible] = useState(false);
  const [password, setPassword] = useState("");
  const [newPassword,setNewPassword] = useState("");
  const {loading,success} = useSelector((state)=>state.resetPassword);

  const dispatch = useDispatch();
  const location = useLocation();

  const email = location.state.email;
  const otp = location.state.otp;

  const navigate = useNavigate();

  const handleLogin = async()=>{
    try {
      if(password !== newPassword || newPassword.length <6){
        return toast.error('Password must match! and must be at least 6 char')
      }
      dispatch(ResetPasswordi({email:email,newPassword:newPassword,otp:otp}))
    } catch (error) {
      toast.error("Something went wrong! try again later")
    }
  }
  useEffect(()=>{
    if(success){
      navigate("/login")
     }else{
      return
    }
  },[success]);

  return (
    <div className="block w-full justify-between items-center 800px:px-4 800px:flex bg-slate-200">
      <div className="w-full 800px:h-screen h-max px-4 800px:w-[40%] hidden 800px:flex items-center bg-white">
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
              Change Password
            </h1>
          </div>

          <div className="block my-2">
            <div>
              <label
                htmlFor="email"
                className="text-[16px] font-semibold text-black py-2"
              >
                Enter your new password
              </label>
            </div>
            <div className="mt-2 relative">
              <input
                type={visible ? "text" : "password"}
                className="outline-none px-2 focus:outline-1 focus:outline-blue-500 h-[2.6rem] w-full 800px:w-[80%] rounded-lg bg-slate-300"
                placeholder="Enter new password"
                onChange={(e) => setNewPassword(e.target.value)}
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

          <div className="block my-2">
            <div>
              <label
                htmlFor="email"
                className="text-[16px] font-semibold text-black py-2"
              >
                Confirm your password
              </label>
            </div>
            <div className="mt-2 relative">
              <input
                type={visible ? "text" : "password"}
                className="outline-none px-2 focus:outline-1 focus:outline-blue-500 h-[2.6rem] w-full 800px:w-[80%] rounded-lg bg-slate-300"
                placeholder="Confirm your password"
                onChange={(e) => setPassword(e.target.value)}
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

          {
            loading ? (
              <div
            className="px-6 py-2 mx-4 my-6 bg-blue-500 rounded-xl w-max cursor-pointer"
          >
            <h1 className="text-white text-xl">Loading...</h1>
          </div>
            ):(
              <div
            className="px-6 py-2 mx-4 my-6 bg-blue-500 rounded-xl w-max cursor-pointer"
            onClick={handleLogin}
          >
            <h1 className="text-white text-xl">Submit</h1>
          </div>
            )
          }
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
