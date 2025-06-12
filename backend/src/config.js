const config = {
    region: process.env.REGION,
    userPoolId: process.env.USER_POOL_ID,
    clientId: process.env.USER_POOL_CLIENT_ID,
    chatHistoryTable: process.env.CHAT_HISTORY_TABLE,
    agentId: process.env.AGENT_ID,
    agentAliasId: process.env.AGENT_ALIAS_ID
};

module.exports = config;
