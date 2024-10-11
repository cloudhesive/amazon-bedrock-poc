const createPromptConfig = (charLimit) => {
    return {
        defaultInstructions: `Do not exceed ${charLimit} characters.`,
        additionalInstructions: {
            brevity: 'Be brief and concise.',
            politeness: 'Maintain a polite and friendly tone.',
            relevance: 'Ensure that the response is relevant to the question.',
            // You can add more instructions here
        },
    };
};

module.exports = createPromptConfig;
