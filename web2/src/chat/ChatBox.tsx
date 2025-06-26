import { useContext, useEffect } from "react";
import { ChatContext, type ChatContextType } from "./chatProvider";
import { Message } from "./message";

export const ChatBox = () => {
  const { chats, chatActiveId, setChatActiveId } = useContext(ChatContext) as ChatContextType;
  const activeChat = chats.find((chat) => chat.id === chatActiveId);

  useEffect(() => {
    if (!chatActiveId) {
      setChatActiveId(crypto.randomUUID());
    }
  }, []);

  console.log(chatActiveId);

  return (
    <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
      {activeChat?.messages.map((msg, i) => (
        <Message key={i} message={msg.message} sender={msg.sender} />
      ))}
    </div>
  );
};
