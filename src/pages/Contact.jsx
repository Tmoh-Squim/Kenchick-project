import React from "react";
import Headerr from "../components/layout/Header";
import Footer from "../components/layout/Footer";

const Contact = () => {
  return (
    <div 
      className="w-full"
      style={{
        backgroundImage: `url('https://www.kenchic.com/wp-content/uploads/2023/07/shutterstock_1480667087.jpg')`,
      }}
    >
      <Headerr />

      <div className="flex justify-end 800px:px-2 px-1 items-center mt-[4rem]">
        <div className="800px:w-[37%] w-full 800px:p-5 p-2 rounded-xl bg-blue-200 my-2 800px:mx-[6rem]">
          <div className="bg-slate-50 p-2">
            <h1 className="800px:text-4xl text-xl text-blue-600 font-bold my-2 text-center">
              Share Your Feedback
            </h1>

            <div className="mt-[3rem]">
              <div className="800px:flex block justify-around">
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="First name"
                  className="outline-none border-b border-blue-500 w-full my-3 800px:my-0 800px:w-auto hover:border-yellow-400"
                />
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Lastname name"
                  className="outline-none border-b border-blue-500 w-full my-3 800px:my-0 800px:w-auto hover:border-yellow-400"
                />
              </div>
              <div className="800px:flex block justify-around my-[2rem]">
                <input
                  type="text"
                  name="email"
                  id="email"
                  placeholder="Email"
                  className="outline-none border-b border-blue-500 w-full my-3 800px:my-0 800px:w-auto hover:border-yellow-400"
                />
                <input
                  type="number"
                  name="phone"
                  id="phone"
                  placeholder="Phone number"
                  className="outline-none border-b border-blue-500 w-full my-3 800px:my-0 800px:w-auto hover:border-yellow-400"
                />
              </div>

              <div className="my-[3rem] w-full px-5">
                <textarea name="message" id="message" placeholder="Enter your message" cols="60" className="w-full outline-none border-b border-blue-500 hover:border-yellow-400"/>
              </div>

              <div className="my-[3rem] rounded-[20px] bg-yellow-400 flex justify-center items-center w-max px-6 py-2 mx-auto cursor-pointer hover:bg-yellow-200">
                <h1 className="text-slate-50 font-semibold text-center">
                    Submit
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;
