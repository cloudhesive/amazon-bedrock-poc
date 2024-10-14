const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { PutCommand, ScanCommand } = require('@aws-sdk/lib-dynamodb');
const config = require('../config');

const dbClient = new DynamoDBClient();

const saveChatHistory = async (userMessages, botMessages) => {
    const chatId = `chat_${Date.now()}`;

    const putParams = {
        TableName: config.chatHistoryTable,
        Item: {
            chatId: chatId,
            userMessages: userMessages,
            botMessages: botMessages,
            timestamp: Date.now(),
        },
    };

    try {
        await dbClient.send(new PutCommand(putParams));
        return chatId;
    } catch (error) {
        console.error('Error saving chat history:', error);
        throw new Error('Error saving chat history');
    }
};

const getChatHistory = async () => {
    const scanParams = {
        TableName: config.chatHistoryTable,
    };

    try {
        const data = await dbClient.send(new ScanCommand(scanParams));
        return data.Items;
    } catch (error) {
        console.error('Error retrieving chat history:', error);
        throw new Error('Error retrieving chat history');
    }
};

module.exports = {
    saveChatHistory,
    getChatHistory,
};
