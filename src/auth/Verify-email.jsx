import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import chick from "../assets/chick1.png";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { ForgotPasswordi, VerifyEmaili } from "../redux/user";

const VerifyEmail = () => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState(false);

  const { loading, success } = useSelector((state) => state.verifyEmail);

  const location = useLocation();
  const dispatch = useDispatch();

  const { user } = location.state;
  const email = user?.email;
  const name = user?.name;
  const phone = user?.phone;
  const password = user?.password;

  const navigate = useNavigate();
 const newUser = {
    email: email,
    otp: otp,
    password: password,
    name: name,
    phone: phone,
  }
  const handleLogin = async () => {
    try {
      if (otp.length === 6) {
        dispatch(
          VerifyEmaili(newUser)
        );
      } else if(otp.length < 6 || otp?.length > 6){
      return  setError(true)
      }
      else {
       return setError(true);
      }
    } catch (error) {
      toast.error("Something went wrong! try again later");
    }
  };

  useEffect(() => {
    if (success) {
      navigate("/login");
    } else {
      return;
    }
  }, [success]);

  const handleOtpResend = () => {
    try {
      dispatch(ForgotPasswordi({ email: email }));
    } catch (error) {
      toast.error("Something went wrong! Please try again later");
    }
  };

  return (
    <div className="w-full 800px:justify-between items-center 800px:px-4 flex bg-slate-200">
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
              Enter six digit otp sent to your email
            </h1>
          </div>
          <div className="block my-2">
            <div>
              <label
                htmlFor="email"
                className="text-[16px] font-semibold text-black py-2"
              >
                Enter Your Otp
              </label>
            </div>
            <div className="mt-2">
              <input
                type="text"
                className={`${
                  error ? "outline-red-300" : ""
                } outline-none px-2 focus:outline-1 focus:outline-blue-500 h-[2.6rem] w-full 800px:w-[80%] rounded-lg bg-slate-300`}
                placeholder="Enter your otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </div>

            <div className="my-2">
              <div>
                <h1>
                  Didn't receive the code?{" "}
                  <span
                    className="text-blue-500 mx-1 font-semibold cursor-pointer"
                    onClick={handleOtpResend}
                  >
                    Resend
                  </span>
                </h1>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="px-6 py-2 mx-4 my-6 bg-blue-500 rounded-xl w-max cursor-pointer">
              <h1 className="text-white text-xl">Waiting...</h1>
            </div>
          ) : (
            <div
              className="px-6 py-2 mx-4 my-6 bg-blue-500 rounded-xl w-max cursor-pointer"
              onClick={() => handleLogin()}
            >
              <h1 className="text-white text-xl">Verify</h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
