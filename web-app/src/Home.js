import React, { useState, useRef } from 'react';
import { useAuth } from './AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
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
  const chatRef = useRef(null);

  const sendMessage = async (message) => {
    appendMessage(message, 'user');
    setInputMessage('');
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(apiUrl + '/message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ prompt: message }),
      });

      if (!response.ok) {
        throw new Error('Unauthorized access. Please log in to continue.'); // Update error message
      }

      const data = await response.json();
      appendMessage(data.response, 'bot');
    } catch (error) {
      console.error('Error sending message:', error);
      setError('Unable to access. Please log in first.'); // Update error state
    } finally {
      setIsLoading(false);
    }
  };

  const appendMessage = (message, sender) => {
    setMessages((prev) => [...prev, { message, sender }]);
    chatRef.current?.scrollTo(0, chatRef.current.scrollHeight);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && inputMessage.trim()) {
      sendMessage(inputMessage);
    }
  };

  const handleRedirect = () => {
    window.location.href = '/'; // Redirect to home
  };

  return (
    <div className="d-flex flex-column vh-100">
      <nav className="navbar navbar-expand-lg navbar-dark custom-navbar">
        <a className="navbar-brand" href="https://www.cloudhesivelatam.com/">
          <img src="https://www.cloudhesive.com/wp-content/uploads/2019/08/CH_Logo_Black.png" alt="Cloudhesive Logo" height="40" />
        </a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
      </nav>

      <div className="container flex-grow-1 d-flex flex-column">
        <div ref={chatRef} className="chat overflow-auto border rounded p-3 bg-light mb-3">
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
              <button className="btn btn-link" onClick={handleRedirect}>
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
          />
          <div className="input-group-append">
            <button className="btn btn-primary" onClick={() => inputMessage.trim() && sendMessage(inputMessage)}>
              <FontAwesomeIcon icon={faPaperPlane} />
            </button>
          </div>
        </div>
      </div>

      <footer className="text-center p-3 custom-navbar text-black">
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
  );
};

export default Home;
