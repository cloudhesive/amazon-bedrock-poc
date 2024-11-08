const config = {
    region: process.env.REGION || 'us-east-1',
    modelId: process.env.MODEL_ID || 'anthropic.claude-v2',
    maxTokens: parseInt(process.env.MAX_TOKENS, 10) || 300, // Limita la longitud de la respuesta.
    temperature: parseFloat(process.env.TEMPERATURE) || 0.1, // Controla la aleatoriedad de las respuestas. 
    topP: parseFloat(process.env.TOP_P) || 0.9, // Restringe las opciones de respuesta basadas en probabilidades acumulativas.
    userPoolId: process.env.USER_POOL_ID,
    clientId: process.env.USER_POOL_CLIENT_ID,
    chatHistoryTable: process.env.CHAT_HISTORY_TABLE,
    agentId: process.env.AGENT_ID,
    agentAliasId: process.env.AGENT_ALIAS_ID
};

module.exports = config;
