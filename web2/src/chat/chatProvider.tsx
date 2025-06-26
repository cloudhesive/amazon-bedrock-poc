import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { getHistoryMessagesService, sendMessageService } from "./service/services";
import { AuthContext } from "../auth/authProvider";

export type ChatMessage = {
  sender: string;
  message: string;
};

export type Chat = {
  id: string;
  name: string;
  messages: ChatMessage[];
};

export type ChatContextType = {
  chats: Chat[];
  chatDisabled: boolean;
  chatActiveId: string;
  setChatActiveId: (id: string) => void;
  sendMessage: (message: string, sender: string, chatId?: string) => void;
  receiveMessage: (message: string, sender: string, chatId: string) => void;
  setChatDisabled: (disabled: boolean) => void;
};

export const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [chatActiveId, setChatActiveId] = useState<string>("");
  const [chatDisabled, setChatDisabled] = useState<boolean>(false);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const loadHistory = async () => {
      try {
        const history = await getHistoryMessagesService(token);
        // Suponiendo que history es un array de chats con formato Chat[]
        setChats(history);
      } catch (error) {
        console.error("Error al obtener historial de mensajes:", error);
      }
    };

    if (token) {
      loadHistory();
    }
  }, [token]);

  const sendMessage = async (message: string, sender: string, chatId?: string) => {
    setChatDisabled(true);
    const id = chatId || crypto.randomUUID();
    setChatActiveId(id);

    // Agregamos el mensaje propio al estado
    setChats((prevChats) => {
      const chatIndex = prevChats.findIndex((chat) => chat.id === id);
      if (chatIndex !== -1) {
        const chat = prevChats[chatIndex];
        const updatedChat = {
          ...chat,
          messages: [...chat.messages, { sender, message }],
        };
        const newChats = [...prevChats];
        newChats[chatIndex] = updatedChat;
        return newChats;
      }
      // Si el chat no existe, lo creamos
      return [...prevChats, { id, name: sender, messages: [{ sender, message }] }];
    });

    // Llamada al backend
    try {
      const data = await sendMessageService(message, token);
      receiveMessage(data.response, "assistant", id);
    } catch (error) {
      console.error("Error enviando mensaje al backend", error);
      // Podés manejar errores con un mensaje especial
      receiveMessage("Hubo un error al procesar tu mensaje.", "assistant", id);
    }
  };

  const receiveMessage = (message: string, sender: string, chatId: string) => {
    setChats((prevChats) => {
      const chatIndex = prevChats.findIndex((chat) => chat.id === chatId);
      if (chatIndex === -1) return prevChats;

      const chat = prevChats[chatIndex];

      // Evitar duplicados exactos (opcional pero recomendado)
      const alreadyExists = chat.messages.some((msg) => msg.message === message && msg.sender === sender);
      if (alreadyExists) return prevChats;

      const updatedChat = {
        ...chat,
        messages: [...chat.messages, { sender, message }],
      };
      const newChats = [...prevChats];
      newChats[chatIndex] = updatedChat;
      return newChats;
    });
  };

  console.log(chats);

  const value = { sendMessage, receiveMessage, chats, chatActiveId, setChatActiveId, chatDisabled, setChatDisabled };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};
