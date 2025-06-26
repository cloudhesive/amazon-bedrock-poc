import { ChatBox } from "./ChatBox";
import { MessageInput } from "./MessageInput";

export const Chat = () => {
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
