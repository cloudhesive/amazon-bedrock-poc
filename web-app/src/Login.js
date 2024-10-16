import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faSignInAlt } from '@fortawesome/free-solid-svg-icons';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #000000, #2c2c2c);
`;

const Form = styled.form`
  background: rgba(255, 255, 255, 0.3);
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  width: 320px;
  backdrop-filter: blur(10px);
  text-align: center;
`;

const Logo = styled.img`
  width: 200px;
  margin-bottom: 1rem;
`;

const InputContainer = styled.div`
  position: relative;
  width: 100%;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.8rem;
  margin: 0.5rem 0;
  border: 2px solid #555;
  border-radius: 4px;
  font-size: 1rem;
  background: rgba(0, 0, 0, 0.3);
  color: white;

  &:focus {
    border-color: #daa520;
    outline: none;
    box-shadow: 0 0 5px rgba(218, 165, 32, 0.5);
  }
`;

const TogglePasswordIcon = styled.button`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
  color: #daa520;

  &:hover {
    color: #b8860b;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 0.8rem;
  background-color: #007bff; /* Color azul elegante */
  color: white;
  border: none;
  border-radius: 25px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;

  &:hover {
    background-color: #0056b3; /* Azul más oscuro */
    transform: translateY(-3px) scale(1.02);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.4);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.5);
  }

  .icon {
    margin-right: 0.5rem;
  }
`;

const ErrorMessage = styled.div`
  color: #ff6347;
  margin: 0.5rem 0;
  font-size: 0.9rem;
`;

const apiUrl = process.env.REACT_APP_API_URL;

const Login = () => {
  const { setToken } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch(apiUrl + '/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      setToken(data.token);
      navigate('/home');

    } catch (error) {
      setError('Invalid username or password. Please try again.');
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Logo src="https://www.cloudhesive.com/wp-content/uploads/2019/08/CH_Logo_Black.png" alt="Logo" />
        <Input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <InputContainer>
          <Input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <TogglePasswordIcon type="button" onClick={() => setShowPassword(!showPassword)}>
            <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
          </TogglePasswordIcon>
        </InputContainer>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Button type="submit">
          <FontAwesomeIcon icon={faSignInAlt} className="icon" />
          Enter
        </Button>
      </Form>
    </Container>
  );
};

export default Login;
