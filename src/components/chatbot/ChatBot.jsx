import React, { useEffect, useState } from "react";
import { AiOutlineClose, AiOutlineSend } from "react-icons/ai";
import { useSelector } from "react-redux";
import { messages } from "../../utils/Chats";

const ChatBot = ({ setOpen }) => {
  const { user } = useSelector((state) => state.user?.user);
  const [chats, setChats] = useState([]);
  const [data,setData] = useState(chats);
  const [chat, setChat] = useState("");
  const [active,setActive] = useState(false);

  useEffect(()=>{
    if(chat.length >0){
        setActive(true)
    }else{
        setActive(false)
    }
  },[chat]);

  const handleChat = () =>{
    const result = messages.filter((messag)=>messag.message.toLowerCase().includes(chat.toLowerCase()));

    chats.push(...chats,{
        chat:chat,
        answer:result
    })
    setData(chats)
  }
  return (
    <div className="w-[80%] z-50 800px:w-[20%] h-screen bg-white fixed top-0 overflow-y-scroll right-0 px-2">
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
            data?.map((chat)=>{
                return (
                    <div className="my-1.5" >
                        <div className="w-[70%] bg-gray-500 text-white px-2 rounded-2xl py-2">
                        <p className="text-[14px]">
                            {chat.chat}
                        </p>
                        </div>
                        <div className=" w-[70%] ml-auto bg-green-500 text-white px-2 my-1 rounded-2xl py-2">
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

      <div className="absolute bottom-1 w-[95%]">
        <input
          type="text"
          placeholder="Type here..."
          className="h-[2rem] rounded-lg w-full px-2 bg-slate-200 outline-none"
          onChange={(e) => setChat(e.target.value)}
        />

       {
        active && (
            <div className="absolute right-2 top-1 cursor-pointer" onClick={handleChat}>
            <AiOutlineSend size={18} color="gray" />
          </div>
        )
       }
      </div>

        </div>
    </div>
  );
};

export default ChatBot;
