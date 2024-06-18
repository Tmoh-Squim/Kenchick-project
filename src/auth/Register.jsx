import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import chick from "../assets/chick1.png";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { RegisterUser } from "../redux/user";
import Loader from "../utils/Loader";
import { TypingEffect } from "../utils/Typing";
import { RxAvatar } from "react-icons/rx";

const Register = () => {
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [id, setId] = useState("");
  const [avatar, setAvatar] = useState(null);

  const { loading, success } = useSelector((state) => state.registerUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+")){3,}@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const handleSignup = async () => {
    try {
      if (!/^[a-zA-Z\s]+$/.test(name) || name.length < 3) {
        return toast.error("Invalid name");
      }
      if (!email.match(validRegex)) {
        return toast.error("Invalid email address");
      }
      if (
        isNaN(phone) ||
        phone.length < 10 ||
        phone.length > 12 ||
        phone.length === 11
      ) {
        return toast.error("Invalid phone number");
      }
      if (isNaN(id) || id.length < 7 || id.length > 9) {
        return toast.error("Invalid id number");
      }
      if (avatar === null) {
        return toast.error("Avatar is required!");
      }
      if (password.length < 6) {
        return toast.error("Password must be at least 6 characters");
      }
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("idNumber", id);
      formData.append("password", password);
      formData.append("avatar", avatar);

      dispatch(RegisterUser(formData));
    } catch (error) {
      toast.error("Something went wrong! Try again later");
    }
  };

  useEffect(() => {
    if (success) {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("idNumber", id);
      formData.append("password", password);
      formData.append("avatar", avatar);
      navigate("/verify-email", { state: { formData: formData } });
    }
    // eslint-disable-next-line
  }, [success]);

  const handleAvatar = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file);
    }
  };

  return (
    <>
      {loading ? (
        <div className="w-full h-screen bg-white flex justify-center items-center">
          <Loader />
        </div>
      ) : (
        <div className="block w-full 800px:justify-between items-center 800px:px-4 800px:flex bg-white">
          <div className="w-full px-2 h-screen mt-0  800px:w-[40%] hidden 800px:flex items-center bg-white">
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

          <div className="w-full  800px:w-[60%] flex justify-center items-center bg-slate-200">
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
                    onChange={(e) => setName(e.target.value)}
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
                    onChange={(e) => setEmail(e.target.value)}
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
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>
              <div className="block my-2">
                <div>
                  <label
                    htmlFor="phone"
                    className="text-[16px] font-semibold text-black py-2"
                  >
                    Enter your id number
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    type="number"
                    className="outline-none px-2 focus:outline-1 focus:outline-blue-500 h-[2.6rem] w-full 800px:w-[80%] rounded-lg bg-slate-300"
                    placeholder="Enter your id number"
                    onChange={(e) => setId(e.target.value)}
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
                <div className="cursor-pointer flex gap-3 my-2">
                  {avatar ? (
                    <div className="w-[45px] h-[45px] object-contain rounded-full">
                      <img
                        src={URL.createObjectURL(avatar)}
                        alt="avatar"
                        className="w-full h-full rounded-full"
                      />
                    </div>
                  ) : (
                    <RxAvatar size={35} />
                  )}
                  <input
                    type="file"
                    name="avatar"
                    id="avatar"
                    className="hidden"
                    onChange={(e) => handleAvatar(e)}
                  />
                  <div className="w-max px-4 py-0 bg-blue-500 text-center flex justify-center items-center rounded-xl cursor-pointer">
                    <label
                      htmlFor="avatar"
                      className="cursor-pointer text-white font-semibold"
                    >
                      Upload
                    </label>
                    <input
                      type="file"
                      name="avatar"
                      id="avatar"
                      className="hidden"
                      onChange={(e) => handleAvatar(e)}
                    />
                  </div>
                </div>
              </div>

              <div className="my-2">
                <h1>
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="text-blue-500 font-semibold mx-1"
                  >
                    Login
                  </Link>
                </h1>
              </div>

              <div
                className="px-6 py-1 mx-4 my-6 bg-blue-500 rounded-xl w-max cursor-pointer"
                onClick={handleSignup}
              >
                <h1 className="text-white text-xl">Register</h1>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Register;
