const { BedrockRuntimeClient, InvokeModelCommand } = require('@aws-sdk/client-bedrock-runtime');
const config = require('../config');
const createPromptConfig = require('../prompt/instructions'); // Importa el archivo de configuración
const promptConfig = createPromptConfig(config.maxTokens);
const logger = require('../utils/logger');

const client = new BedrockRuntimeClient({ region: config.region });

const invokeModel = async (userPrompt) => {
    if (typeof userPrompt !== 'string' || !userPrompt.trim()) {
        throw new Error('Invalid prompt: must be a non-empty string.');
    }

    // Combine the default and additional instructions
    const instructions = `(${[
        promptConfig.defaultInstructions,
        promptConfig.additionalInstructions.brevity,
        promptConfig.additionalInstructions.politeness,
        promptConfig.additionalInstructions.relevance,
    ].join(' ')})`;

    const requestBody = {
        prompt: `\n\nHuman: ${userPrompt} ${instructions}\n\nAssistant:`,
        max_tokens_to_sample: config.maxTokens,
        temperature: config.temperature,
        top_p: config.topP,
    };

    logger.info('Request body: ' + JSON.stringify(requestBody));

    const command = new InvokeModelCommand({
        modelId: config.modelId,
        body: JSON.stringify(requestBody),
        accept: '*/*',
        contentType: 'application/json',
    });

    try {
        const response = await client.send(command);
        const completion = JSON.parse(Buffer.from(response.body).toString('utf-8')).completion;

        // Optional: Log the successful response for debugging
        console.log('Model invoked successfully:', completion);

        return completion;
    } catch (error) {
        // Log the error with context for easier debugging
        console.error(`Error invoking model with prompt "${userPrompt}":`, error);
        throw new Error(`Failed to invoke model: ${error.message}`);
    }
};

module.exports = { invokeModel };
