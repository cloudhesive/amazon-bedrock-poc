const logger = require('../utils/logger');
const { invokeModel } = require('./bedrockServices');

const processRequest = async (requestBody) => {
    const prompt = requestBody.prompt;

    try {
        const completion = await invokeModel(prompt);
        return { prompt, response: completion };
    } catch (error) {
        logger.error(error.message);
        throw new Error('Failed to invoke model');
    }
};

module.exports = { processRequest };
