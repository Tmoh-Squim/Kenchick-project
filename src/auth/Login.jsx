import React, { useEffect, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import chick from "../assets/chick1.png";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { LoginUser } from "../redux/user";
import Loader from "../utils/Loader";
import { TypingEffect } from "../utils/Typing";

const Login = () => {
  const { user } = useSelector((state) => state.user);
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loading, success } = useSelector((state) => state.loginUser);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      const user = {
        email: email,
        password: password,
      };
      dispatch(LoginUser(user));
    } catch (error) {
      toast.error("Something went wrong! try again later");
    }
  };

  useEffect(() => {
    if (user?.user) {
      navigate("/profile");
    }
    //eslint-disable-next-line
  }, [user]);

  useEffect(() => {
    if (success === true) {
      navigate("/");
      window.location.reload();
    }
  }, [success]);

  return (
    <>
      {loading ? (
        <div className="w-full h-screen bg-white flex justify-center items-center">
          <Loader />
        </div>
      ) : (
        <div className=" w-full justify-between items-center 800px:px-4 flex bg-slate-200">
          <div className="w-full h-screen justify-center hidden px-2 800px:w-[40%] 800px:flex items-center bg-white">
            <div>
              <div>
                <h1 className="text-blue-500 text-3xl font-semibold">
                  <TypingEffect text={"Welcome to Kenchick"} />
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

          <div className="w-full 800px:h-screen 800px:w-[60%] h-screen flex justify-center items-center  bg-slate-200">
            <div className="p-4 w-full 800px:w-[80%] 800px:m-auto">
              <div className="my-5">
                <h1 className="text-3xl text-black text-center font-bold">
                  Welcome Back!
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
                    className="outline-none px-2 focus:outline-1 focus:outline-blue-500 h-[2.6rem] w-full 800px:w-[80%] rounded-lg bg-slate-300"
                    placeholder="Enter your email"
                    onChange={(e) => setEmail(e.target.value)}
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

              <div className="my-2">
                <h1>
                  Don't have an account?{" "}
                  <Link
                    to="/register"
                    className="text-blue-500 mx-1 font-semibold"
                  >
                    Register
                  </Link>
                </h1>
              </div>
              <div className="my-1">
                <h1>
                  Forgot Password?{" "}
                  <Link
                    to="/forgot-password"
                    className="text-blue-500 mx-1 font-semibold"
                  >
                    Reset
                  </Link>
                </h1>
              </div>

              <div
                className="px-6 py-2 mx-4 my-6 bg-blue-500 rounded-xl w-max cursor-pointer"
                onClick={handleLogin}
              >
                <h1 className="text-white text-xl">Login</h1>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
