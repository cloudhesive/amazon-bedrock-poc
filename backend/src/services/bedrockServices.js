const { BedrockAgentRuntimeClient, InvokeAgentCommand } = require('@aws-sdk/client-bedrock-agent-runtime');
const config = require('../config');

const client = new BedrockAgentRuntimeClient({ region: config.region });

const invokeModel = async (userPrompt, token) => {
    if (typeof userPrompt !== 'string' || !userPrompt.trim()) {
        throw new Error('Invalid prompt: must be a non-empty string.');
    }

    const command = new InvokeAgentCommand({
        agentId: config.agentId,
        agentAliasId: config.agentAliasId,
        sessionId: token.slice(-10),
        inputText: userPrompt
    });

    try {
        let completion = "";
        const response = await client.send(command);

        if (response.completion === undefined) {
            throw new Error("Completion is undefined");
        }

        for await (const chunkEvent of response.completion) {
            const chunk = chunkEvent.chunk;
            console.log(chunk);
            const decodedResponse = new TextDecoder("utf-8").decode(chunk.bytes);
            completion += decodedResponse;
        }
        console.log('Completion: ', completion)
        return completion
    } catch (err) {
        console.error(err);
    }
};

module.exports = { invokeModel };