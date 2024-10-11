const { CognitoIdentityProviderClient, InitiateAuthCommand, GetUserCommand } = require('@aws-sdk/client-cognito-identity-provider');
const logger = require('../utils/logger');
const config = require('../config');
const cognitoClient = new CognitoIdentityProviderClient({ region: config.region });

const getUserFromToken = async (token) => {
    try {
        const user = await cognitoClient.send(new GetUserCommand({ AccessToken: token }));
        return user;
    } catch (error) {
        throw new Error('Invalid token: ' + error.message);
    }
};

const authenticateUser = async (username, password) => {
    logger.info('Initiating authentication for user: ' + username);

    const command = new InitiateAuthCommand({
        UserPoolId: config.userPoolId,
        ClientId: config.clientId,
        AuthFlow: 'USER_PASSWORD_AUTH',
        AuthParameters: {
            USERNAME: username,
            PASSWORD: password,
        },
    });
    logger.info('Command: ' + JSON.stringify(command));
    try {
        const response = await cognitoClient.send(command);
        logger.info('Login successful for user: ' + username);
        return {
            token: response.AuthenticationResult.AccessToken,
            refreshToken: response.AuthenticationResult.RefreshToken,
            idToken: response.AuthenticationResult.IdToken,
        };
    } catch (error) {
        logger.error('Login failed: ' + error.message);
        throw new Error('Invalid username or password');
    }
};

module.exports = { getUserFromToken, authenticateUser };
