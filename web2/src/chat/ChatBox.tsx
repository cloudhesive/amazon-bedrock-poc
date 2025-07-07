import { useContext } from "react";
import { ChatContext, type ChatContextType } from "./chatProvider";
import { Message } from "./message";

export const ChatBox = () => {
  const { chats, chatActiveId } = useContext(ChatContext) as ChatContextType;
  console.log(chatActiveId);
  const activeChat = chats.find((chat) => chat.id === chatActiveId);
  console.log(activeChat);

  return (
    <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
      {activeChat?.messages.map((msg, i) => (
        <Message key={i} message={msg.message} sender={msg.sender} />
      ))}
    </div>
  );
};
