const { modelHandler } = require('./src/handlers/modelHandler');
const { loginHandler } = require('./src/handlers/loginHandler');
const { handler: chatHistoryHandler } = require('./src/handlers/chatHistoryHandler');

module.exports = {
    modelHandler,
    loginHandler,
    chatHistoryHandler
};
