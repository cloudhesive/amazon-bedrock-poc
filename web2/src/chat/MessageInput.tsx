import { useContext, useState } from "react";
import { ChatContext, type ChatContextType } from "./chatProvider";

export const MessageInput = () => {
  const [message, setMessage] = useState("");
  const { sendMessage, chatDisabled, chatActiveId } = useContext(ChatContext) as ChatContextType;

  const handleSendMessage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    sendMessage(message, "me", chatActiveId);
    setMessage("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const mesg = e.currentTarget.value;
      sendMessage(mesg, "me", chatActiveId);
      setMessage("");
    }
  };

  return (
    <>
      <div className="w-full border-t bg-white px-4 py-3">
        <div className="grid grid-cols-6 md:grid-cols-12 gap-2">
          <input
            type="text"
            className={`w-full col-span-6 p-2 md:col-span-10 lg:col-span-10 xl:col-span-11 border  border-gray-300 text-black rounded-lg ${
              chatDisabled ? "opacity-50 cursor-not-allowed" : ""
            }`}
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={chatDisabled}
          />
          <button
            type="button"
            className={`bg-gray-800 col-span-2 col-end-7 md:col-span-2 lg:col-span-2 xl:col-span-1 text-white px-4 py-2 rounded-lg ${
              chatDisabled ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={handleSendMessage}
            onSubmit={handleSendMessage}
            disabled={chatDisabled}
          >
            Send
          </button>
        </div>
      </div>
    </>
  );
};
