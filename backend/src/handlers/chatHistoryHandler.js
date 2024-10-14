const { saveChatHistory, getChatHistory } = require('../services/dynamodbServices');

exports.handler = async (event) => {
    switch (event.httpMethod) {
        case 'POST':
            const body = JSON.parse(event.body);
            const { userMessages, botMessages } = body;
            try {
                const chatId = await saveChatHistory(userMessages, botMessages);
                return {
                    statusCode: 200,
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                    },
                    body: JSON.stringify({ chatId }),
                };
            } catch (error) {
                return {
                    statusCode: 500,
                    body: JSON.stringify({ error: error.message }),
                };
            }
        case 'GET':
            try {
                const items = await getChatHistory();
                return {
                    statusCode: 200,
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                    },
                    body: JSON.stringify(items),
                };
            } catch (error) {
                return {
                    statusCode: 500,
                    body: JSON.stringify({ error: error.message }),
                };
            }
        default:
            return {
                statusCode: 405,
                body: JSON.stringify({ error: 'Method not allowed' }),
            };
    }
};
