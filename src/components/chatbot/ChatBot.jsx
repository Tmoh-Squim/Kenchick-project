import React, { useEffect, useState } from "react";
import { AiOutlineClose, AiOutlineSend } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { getAnswer } from "../../redux/chatbot";
import { TypingEffect } from "../../utils/Typing";

const ChatBot = ({ setOpen }) => {
  const { user } = useSelector((state) => state.user?.user);
  const [chats, setChats] = useState([]);
  const [chat, setChat] = useState("");
  const [active, setActive] = useState(false);
  const { answer, loading } = useSelector((state) => state.question);
  const dispatch = useDispatch();

  useEffect(() => {
    if (chat.length > 0) {
      setActive(true);
    } else {
      setActive(false);
    }
  }, [chat]);

  useEffect(() => {
    if (answer && !loading) {
      setChats([...chats, { question: chat, answer }]);
      setChat("");
    }
  }, [answer, loading]);

  const handleChat = () => {
    dispatch(getAnswer({ question: chat }));
  };

  return (
    <div className="w-[80%] z-50 800px:w-[25%] h-[60vh] rounded-t-lg bg-[#0f0e0fe1] text-white fixed bottom-0 right-0 px-1">
      <div className="overflow-y-scroll h-[60vh] pb-[2.6rem]">
        <div>
          <div
            className="cursor-pointer absolute right-4 top-2"
            onClick={() => setOpen(false)}
          >
            <AiOutlineClose size={28} />
          </div>

          <div className="mt-[40px]">
            <div>
              <h1>
                Hello <span className="font-semibold">{user?.name},</span> how
                can I assist you today?
              </h1>
            </div>

            {chats.map((chat, index) => (
              <div key={index} className="my-1.5 flex flex-col">
                <div className="w-[70%] 800px:w-[65%] bg-gray-500 text-white px-2 rounded-xl py-2 self-start">
                  <p className="text-[14px]">{chat.question}</p>
                </div>
                <div className="w-[70%] 800px:w-[65%] bg-blue-500 text-white px-2 my-1 rounded-xl py-2 self-end">
                  <TypingEffect text={chat.answer} />
                </div>
              </div>
            ))}

            {loading && (
              <div className="my-1.5 flex flex-col">
                <div className="w-[70%] 800px:w-[65%] bg-gray-500 text-white px-2 rounded-xl py-2 self-start">
                  <p className="text-[14px]">{chat}</p>
                </div>
                <div className="w-[70%] 800px:w-[65%] bg-blue-500 text-white px-2 my-1 rounded-xl py-2 self-end">
                  <p className="text-[14px]">thinking...</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 w-[95%]">
        <input
          type="text"
          placeholder="Type here..."
          className="h-[2.5rem] rounded-lg w-[98%] px-2 bg-slate-200 outline-none"
          value={chat}
          style={{color:'black'}}
          onChange={(e) => setChat(e.target.value)}
        />

        {active && (
          <div
            className="absolute right-2 top-2 cursor-pointer"
            onClick={handleChat}
          >
            <AiOutlineSend size={18} color="gray" />
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatBot;
