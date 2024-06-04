import React from "react";
import Headerr from "../components/layout/Header";
import Footer from "../components/layout/Footer";

const AboutUs = () => {
  return (
    <div className="bg-slate-100">
      <Headerr />
      <div
        className="w-full 800px:h-screen h-[35vh] py-[4.5rem]"
        style={{
          backgroundImage: `url('https://www.kenchic.com/wp-content/uploads/2023/10/artboard-1-651fcb5931b6d.webp')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div>
          <h1 className="text-white text-5xl font-semibold text-center">
            Delivery Prosperity
          </h1>
        </div>
      </div>

      <div className="800px:flex">
        <div className="800px:w-[50%] w-full bg-white flex flex-col justify-center">
          <div className="block">
            <h1 className="text-2xl font-bold text-black text-center">
              Our Purpose
            </h1>
            <p className="text-center my-4">
              Our purpose is to enable shared prosperity through sustainable
              food production
            </p>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-black text-center">
              Our Vision
            </h1>
            <p className="text-center my-4">
              Our vision is to be the food partner of choice
            </p>
          </div>
        </div>
        <div className="800px:w-[50%] w-full">
          <img
            src="https://www.kenchic.com/wp-content/uploads/2023/12/food.webp"
            alt="food-"
            className="800px:h-[400px] h-[300px] w-full"
          />
        </div>
      </div>

      <div className="my-[2rem]">
        <h1 className="text-3xl text-black font-bold text-center">
          Our Core Values
        </h1>

        <p className="mt-[1.5rem] text-center text-black text-[19px]">
          At all levels of the company, we are driven by values that permeate
          every aspect of our working lives:
        </p>
      </div>

      <div className="800px:px-4 px-1 800px:flex flex-wrap justify-around">
        <div className="800px:w-[45%] my-2 800px:border-2 border-black p-4">
          <h1 className=" text-2xl font-bold">Team Players</h1>
          <ul className="my-3">
            <li className="text-[19px] text-black my-1">
              . We recognise our greatest asset is our people.
            </li>
            <li className="text-[19px] text-black my-1">
              . We listen, we plan, we act, and we hold each other accountable.
            </li>
            <li className="text-[19px] text-black my-1">
              . We work together, succeed together, celebrate together.
            </li>
          </ul>
        </div>
        <div className="800px:w-[45%] my-2 800px:border-2 border-yellow-300 p-4">
          <h1 className=" text-2xl font-bold">Excellence</h1>
          <ul className="my-3">
            <li className="text-[19px] text-black my-1">
              . We meet the highest safety and biosecurity standards
            </li>
            <li className="text-[19px] text-black my-1">
              . We ensure traceability through our Farm-to-Family value chain.
            </li>
            <li className="text-[19px] text-black my-1">
              . We are passionate about producing quality, healthy food
              products.
            </li>
          </ul>
        </div>
        <div className="800px:w-[45%] my-2 800px:border-2 border-blue-300 p-4">
          <h1 className=" text-2xl font-bold">Commitment</h1>
          <ul className="my-3">
            <li className="text-[19px] text-black my-1">
              . We are dedicated to excellent customer service. We always keep
              our <br />
              promise.
            </li>
            <li className="text-[19px] text-black my-1">
              . We strive to be the most trusted partner providing innovative
              products and <br />
              service solutions.
            </li>
            <li className="text-[19px] text-black my-1">
              . We constantly engage and work with the communities around us.
            </li>
          </ul>
        </div>
        <div className="800px:w-[45%] my-2 800px:border-2 border-red-300 p-4">
          <h1 className=" text-2xl font-bold">Responsibility</h1>

          <ul className="my-3">
            <li className="text-[19px] text-black my-1">
              . We are custodians of the environment under our care
            </li>
            <li className="text-[19px] text-black my-1">
              . We strive to be ethical and hold our partners accountable.
            </li>
            <li className="text-[19px] text-black my-1">
              . We live up to our civic and regulatory responsibilities.
            </li>
          </ul>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AboutUs;
