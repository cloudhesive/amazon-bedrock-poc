import { useContext, useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ChatContext, type ChatContextType } from "../chatProvider";

export const MarkdownRenderer = ({ content }: { content: string }) => {
  const [displayedText, setDisplayedText] = useState("");
  const { setChatDisabled } = useContext(ChatContext) as ChatContextType;

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setDisplayedText(content.slice(0, index));
      index++;

      if (index > content.length) {
        clearInterval(interval);
        setChatDisabled(false);
      }
    }, 40); // velocidad en milisegundos por carácter

    return () => clearInterval(interval);
  }, [content]);

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        table: ({ children }) => (
          <table className="w-full border border-gray-300 rounded-md overflow-hidden text-sm mb-4">{children}</table>
        ),
        thead: ({ children }) => <thead className="bg-gray-100">{children}</thead>,
        th: ({ children }) => <th className="border border-gray-300 px-4 py-2 text-left font-semibold">{children}</th>,
        td: ({ children }) => <td className="border border-gray-300 px-4 py-2 text-left">{children}</td>,
        ul: ({ children }) => <ul className="list-disc list-inside text-sm">{children}</ul>,
        a: ({ href, children }) => (
          <a href={href} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline hover:text-blue-800">
            {children}
          </a>
        ),
        strong: ({ children }) => <strong className="font-bold">{children}</strong>,
        blockquote: ({ children }) => (
          <blockquote className="border-l-4 border-gray-400 pl-4 italic text-gray-600 my-2">{children}</blockquote>
        ),
      }}
    >
      {displayedText}
    </ReactMarkdown>
  );
};
