import React, { useEffect, useState } from "react";
import { AiOutlineClose, AiOutlineSend } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { getAnswer } from "../../redux/chatbot";
import { TypingEffect } from "../../utils/Typing";

const ChatBot = ({ setOpen }) => {
  const { user } = useSelector((state) => state.user?.user);
  const [chats, setChats] = useState([]);
  const [data,setData] = useState(chats);
  const [chat, setChat] = useState("");
  const [active,setActive] = useState(false);
  const [currentAnswer,setCurrentAnswer] = useState("");
  const {answer,loading} = useSelector((state)=>state.question);
  const dispatch = useDispatch();

  useEffect(()=>{
    if(chat.length >0){
        setActive(true)
    }else{
        setActive(false)
    }
  },[chat]);
  useEffect(()=>{
    setCurrentAnswer(answer?.answer)
  },[answer,dispatch])

  const ddd = {
    question:chat
  }

  const handleChat = () =>{
    dispatch(getAnswer(ddd))
  }
  return (
    <div className=" w-[80%] z-50 800px:w-[25%] h-[60vh] rounded-t-lg bg-white fixed bottom-0  right-0 px-2">

<div className="overflow-y-scroll h-[60vh] pb-[2.6rem]">
        <div>
        <div
        className="cursor-pointer absolute right-2 top-2"
        onClick={() => setOpen(false)}
      >
        <AiOutlineClose size={28} />
      </div>

      <div className="mt-[40px]">
        <div>
          <h1>
            Hello <span className="font-semibold">{user?.name},</span> how can i
            assist you today ?
          </h1>
        </div>

       {
        loading === true ? (
          <h1>
            thinking...
          </h1>
        ) :(
          <TypingEffect text={currentAnswer} />
        )
       }

        {
            data?.map((chat)=>{
                return (
                    <div className="my-1.5 px-2" >
                        <div className="w-[65%] bg-gray-500 text-white px-2 rounded-2xl py-2">
                        <p className="text-[14px]">
                            {chat.chat}
                        </p>
                        </div>
                        <div className=" w-[65%] ml-auto bg-green-500 text-white px-2 my-1 rounded-2xl py-2">
                        <p className="text-[14px]">
                            {chat.answer.map((answer)=>(
                                answer.answer
                            ))}
                        </p>
                        </div>
                    </div>
                )
            })
        }
      </div>

        </div>
    </div>

      <div className="absolute bottom-3 800px:bottom-1 w-[95%]">
        <input
          type="text"
          placeholder="Type here..."
          className="h-[2.5rem] rounded-lg w-full px-2 bg-slate-200 outline-none"
          onChange={(e) => setChat(e.target.value)}
        />

       {
        active && (
            <div className="absolute right-2 top-2 cursor-pointer" onClick={handleChat}>
            <AiOutlineSend size={18} color="gray" />
          </div>
        )
       }
      </div>

    </div>
  );
};

export default ChatBot;
