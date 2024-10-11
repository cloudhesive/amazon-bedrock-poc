const logger = require('../utils/logger');
const { getUserFromToken } = require('./cognitoServices');

const verifyToken = async (authHeader) => {
    if (!authHeader) {
        throw new Error('Authorization header missing');
    }

    const token = authHeader.split(' ')[1]; // "Bearer <token>"
    try {
        await getUserFromToken(token); // Solo verificamos el token
    } catch (error) {
        logger.error('Authentication failed: ' + error.message);
        throw new Error('Invalid token');
    }
};

module.exports = { verifyToken };
