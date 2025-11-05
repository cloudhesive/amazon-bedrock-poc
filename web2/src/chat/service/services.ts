const apiUrl = import.meta.env.VITE_API_URL;

export const sendMessageService = async (message: string, token: string) => {
  try {
    const response = await fetch(`${apiUrl}/message`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ prompt: message }),
    });
    if (!response.ok) {
      if (response.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/";
        throw new Error("Token inválido");
      }
      throw new Error("Error al enviar el mensaje");
    }
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error al enviar el mensaje:", error);
    throw error;
  }
};

export const setHistoryMessagesService = async (
  token: string,
  userMessages: Array<string>,
  botMessages: Array<string>,
  chatId: string | undefined = undefined,
) => {
  const response = await fetch(`${apiUrl}/chat/history`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ userMessages, botMessages, chatId }),
  });
  const data = await response.json();
  return data;
};

export const getHistoryMessagesService = async (token: string) => {
  const response = await fetch(`${apiUrl}/chat/history`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data;
};
