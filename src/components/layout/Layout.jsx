import React, { useState } from "react";
import Headerr from "./Header";
import HomePage from "../../pages/HomePage";
import Footer from "./Footer";
import { SiChatbot } from "react-icons/si";
import { motion } from "framer-motion";
import ChatBot from "../chatbot/ChatBot";
import { AiOutlineClose } from "react-icons/ai";
import About from "../../pages/About";
import Slider from "../../utils/Slider";
import { useSelector } from "react-redux";

const Layout = () => {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(false);
  const { user } = useSelector((state) => state.user?.user);

  return (
    <div>
      <motion.div
        className={`${
          open ? "hidden" : ""
        } fixed bottom-5 z-50 cursor-pointer right-5 h-[50px] w-[50px] bg-green-500 rounded-xl flex justify-center items-center`}
        animate={{ scale: 1.2 }}
        transition={{
          duration: 7,
          yoyo: Infinity,
        }}
        onClick={() => {
          setOpen(true);
        }}
      >
        <SiChatbot size={28} color="white" />
      </motion.div>
      <Headerr />
      {!user && (
        <>
          <Slider />
         
        </>
      )}
       <About />
      <HomePage />
      <Footer />

      {open && <ChatBot setOpen={setOpen} />}
      {active && (
        <div className="w-[200px] h-[200px] z-50 bg-white absolute top-[50px] px-2 left-[50px]">
          <div
            className="absolute top-2 right-2 cursor-pointer"
            onClick={() => setActive(false)}
          >
            <AiOutlineClose size={28} />
          </div>
          <div className="mt-[30px]">
            <h1>Hi Welcome to Kenchick! Happy to shop with us</h1>
          </div>
        </div>
      )}
    </div>
  );
};
export default Layout;
