const URL = import.meta.env.VITE_API_URL;
export const loginService = async (username: string, password: string) => {
  try {
    const response = await fetch(`${URL}/login`, {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: {
        "Content-Type": "application/json", // asegúrate de enviar esto
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        // Esto ya lo manejás vos como error de auth
        return null;
      }
      // Otras respuestas no OK pueden manejarse según sea necesario
      console.warn(`Login failed with status ${response.status}`);
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error("Login error:", error);
    return null;
  }
};
