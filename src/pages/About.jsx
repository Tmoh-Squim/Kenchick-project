import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="800px:flex bg-slate-50 justify-around items-center w-full 800px:p-5 p-1 mt-[70px] 800px:mt-0">
      <div className="800px:w-[40%]  cursor-pointer">
        <img
          src="https://www.kenchic.com/wp-content/uploads/2023/07/Artboard-1-1-1536x864.jpg"
          alt="name"
          className=" w-[100%]"
        />
      </div>

      <div className="800px:w-[50%] block 800px:mx-4 ">
        <h1 className="800px:text-5xl text-2xl font-bold text-black">
          Enable Shared Prosperity Through Sustainable Food Production
        </h1>

        <div>
          <p className="text-black text-[20px]">
            We believe in using our products and services to help people live
            healthier, happier, and more fulfilling lives. We work to provide
            opportunities to create more wealth for everyone by producing food
            in a way that is safe, sustainable, and good for the environment.
          </p>
          <p className="my-4 text-black text-[20px]">
            Through the business we operate, and how we create and share the
            value we generate, we want to make sure that everyone has access to
            good, healthy food now, and in the future. And we work together to
            do this in a way that is fair and benefits everyone, including
            generations to come.
          </p>

          <div className="my-5 rounded-[17px] w-max px-4 py-2 bg-yellow-500 hover:bg-yellow-300 cursor-pointer flex justify-center items-center">
            <Link to={'/about-us'}>
            <h1 className="text-blue-500 font-semibold">About us</h1></Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
