import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faChevronLeft, faChevronRight, faPlus } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './Home.css';

const apiUrl = process.env.REACT_APP_API_URL;

const Home = () => {
  const { token } = useAuth();
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [history, setHistory] = useState([]);
  const [isHistoryVisible, setIsHistoryVisible] = useState(true);
  const chatRef = useRef(null);
  const [isReadOnly, setIsReadOnly] = useState(false);

  const fetchFromApi = async (url, options = {}) => {
    try {
      const response = await fetch(url, options);
      if (!response.ok) throw new Error(response.statusText);
      return await response.json();
    } catch (err) {
      console.error(err);
      setError(err.message);
      throw err;
    }
  };

  const loadChatHistory = useCallback(async () => {
    const options = {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${token}` },
    };
    const data = await fetchFromApi(`${apiUrl}/chat/history`, options);
    setHistory(data);
  }, [token]);

  useEffect(() => {
    loadChatHistory();
  }, [loadChatHistory]);

  const sendMessage = async (message) => {
    appendMessage(message, 'user');
    setInputMessage('');
    setIsLoading(true);
    setError(null);

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ prompt: message }),
    };

    try {
      const data = await fetchFromApi(`${apiUrl}/message`, options);
      appendMessage(data.response, 'bot');
    } catch (err) {
      setError('Error sending message.');
    } finally {
      setIsLoading(false);
    }
  };

  const appendMessage = (message, sender) => {
    setMessages((prev) => [...prev, { message, sender }]);
  };

  useEffect(() => {
    chatRef.current?.scrollTo(0, chatRef.current.scrollHeight);
  }, [messages]);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && inputMessage.trim()) {
      sendMessage(inputMessage);
    }
  };

  const loadChatFromHistory = (chat) => {
    const combinedMessages = [
      ...chat.userMessages.map(msg => ({ message: msg, sender: 'user' })),
      ...chat.botMessages.map(msg => ({ message: msg, sender: 'bot' })),
    ];
    setMessages(combinedMessages);
    setIsReadOnly(true);
  };

  const toggleHistoryVisibility = () => {
    setIsHistoryVisible((prev) => !prev);
  };

  const startNewChat = async () => {
    if (!isReadOnly && messages.length > 0) {
      await saveChatHistory(messages);
    }
    setMessages([]);
    setInputMessage('');
    setIsReadOnly(false);
    loadChatHistory();
  };

  const saveChatHistory = async (messagesToSave) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        userMessages: messagesToSave.filter(m => m.sender === 'user').map(m => m.message),
        botMessages: messagesToSave.filter(m => m.sender === 'bot').map(m => m.message),
      }),
    };
    await fetchFromApi(`${apiUrl}/chat/history`, options);
  };

  return (
    <div className="d-flex flex-row vh-100">
      {isHistoryVisible && (
        <div className="bg-light border-right p-3" style={{ width: '250px' }}>
          <button className="btn btn-outline-secondary btn-sm w-100 mb-2" onClick={startNewChat}>
            <FontAwesomeIcon icon={faPlus} /> New Chat
          </button>
          <div className="d-flex flex-column">
            {history.map((conv, index) => (
              <button
                key={index}
                className="btn btn-outline-secondary mb-2 text-left"
                onClick={() => loadChatFromHistory(conv)}
              >
                Chat {index + 1}
              </button>
            ))}
          </div>
        </div>
      )}
      <div className="flex-grow-1 d-flex flex-column">
        <nav className="navbar navbar-expand-lg navbar-light custom-navbar">
          <a className="navbar-brand" href="https://www.cloudhesivelatam.com/">
            <img src="https://www.cloudhesive.com/wp-content/uploads/2019/08/CH_Logo_Black.png" alt="Cloudhesive Logo"/>
          </a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <button className="btn btn-outline-secondary ml-auto" onClick={toggleHistoryVisibility}>
            <FontAwesomeIcon icon={isHistoryVisible ? faChevronLeft : faChevronRight} />
          </button>
        </nav>

        <div className="container flex-grow-1 d-flex flex-column">
          <div ref={chatRef} className="chat overflow-auto mb-3">
            {messages.map((msg, index) => (
              <div key={index} className={`${msg.sender}-message`}>
                <div className="message">{msg.message}</div>
              </div>
            ))}
            {isLoading && (
              <div className="bot-message">
                <div className="message bot-loading">Amazon Bedrock is responding...</div>
              </div>
            )}
            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
                <button className="btn btn-link" onClick={() => window.location.href = '/'}>
                  Go to Homepage
                </button>
              </div>
            )}
          </div>

          <div className="input-group mb-3">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              className="form-control"
              placeholder="Type your message..."
              aria-label="Message"
              disabled={isReadOnly}
            />
            <div className="input-group-append">
              <button
                className="btn btn-primary"
                onClick={() => inputMessage.trim() && sendMessage(inputMessage)}
                disabled={isReadOnly || !inputMessage.trim()}
              >
                <FontAwesomeIcon icon={faPaperPlane} />
              </button>
            </div>
          </div>
        </div>

        <footer className="footer text-center">
          <p className="m-0" style={{ fontSize: '16px' }}>
            &copy; Created by Santiago Labatut |
            <img
              src="https://www.cloudhesive.com/wp-content/uploads/2019/08/CH_Logo_Black.png"
              alt="Cloudhesive Logo"
              style={{ height: '1.5em', verticalAlign: 'middle', marginLeft: '5px' }}
            />
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Home;
