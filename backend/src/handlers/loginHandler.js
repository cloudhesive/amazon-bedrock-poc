const logger = require("../utils/logger");
const { authenticateUser } = require("../services/cognitoServices");

const loginHandler = async (event) => {
  logger.info("Received login request");

  const requestBody = JSON.parse(event.body);
  const { username, password } = requestBody;

  // Validar que se proporcionen las credenciales
  if (!username || !password) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Username and password are required" }),
    };
  }

  try {
    // Iniciar autenticación con el nombre de usuario y la contraseña
    const authResult = await authenticateUser(username, password);

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(authResult),
    };
  } catch (error) {
    logger.error("Login failed: " + error.message);
    return {
      statusCode: 401,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ error: error.message }),
    };
  }
};

module.exports = { loginHandler };
