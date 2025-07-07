import { useEffect } from "react";
import { ChatBox } from "./ChatBox";
import { MessageInput } from "./MessageInput";
import { ChatContext } from "./chatProvider";
import { useContext } from "react";
import { type ChatContextType } from "./chatProvider";
import { useParams } from "react-router-dom";

export const Chat = () => {
  console.log("Chat aca");
  const { chatActiveId, setChatActiveId, setLoadingChat } = useContext(ChatContext) as ChatContextType;
  const { chatId } = useParams();
  console.log(chatId);

  useEffect(() => {
    console.log("useEffect");
    console.log(chatActiveId);
    console.log(chatId);
    if (chatId !== chatActiveId) {
      if (chatId) {
        setChatActiveId(chatId);
        setLoadingChat(true);
      } else {
        setChatActiveId(crypto.randomUUID());
      }
    }
  }, [chatId]);

  return (
    <div className="grid grid-rows-6 md:grid-rows-12 shadow-lg h-full mb-1 bg-white rounded-lg">
      <div className="row-span-6 md:row-span-11 overflow-y-auto">
        <ChatBox />
      </div>

      <div className="row-span-1 md:row-span-1 border-t border-gray-300 px-4 ">
        <MessageInput />
      </div>
    </div>
  );
};
