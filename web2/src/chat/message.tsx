import { MarkdownRenderer } from "./component/MarkdownRenderer";

interface MessageProps {
  message: string;
  sender: string;
}

export const Message = ({ message, sender }: MessageProps) => {
  const isMe = sender === "me";

  return (
    <div className="flex flex-col gap-2 my-2">
      <div
        className={`rounded-lg p-3 whitespace-pre-wrap ${
          isMe ? "bg-gray-800 text-white self-end" : "bg-gray-100 text-gray-700 self-start"
        }`}
      >
        {sender === "me" ? <p className="text-sm">{message}</p> : <MarkdownRenderer content={message} />}

        <p className="text-xs text-gray-500 self-end text-end">{sender}</p>
      </div>
    </div>
  );
};
