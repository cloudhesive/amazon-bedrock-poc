const logger = require('../utils/logger');
const { processRequest } = require('../services/modelServices');
const { verifyToken } = require('../services/tokenServices');

const modelHandler = async (event) => {
    logger.info('Received event: ' + JSON.stringify(event));

    try {
        await verifyToken(event.headers.Authorization);
    } catch (error) {
        return {
            statusCode: 401,
            body: JSON.stringify({ error: error.message }),
        };
    }

    const requestBody = JSON.parse(event.body);

    try {
        const response = await processRequest(requestBody);

        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify(response),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message }),
        };
    }
};

module.exports = { modelHandler };
