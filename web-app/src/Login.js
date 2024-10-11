import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faUserPlus } from '@fortawesome/free-solid-svg-icons';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #003366, #004080, #0056b3);
`;

const Form = styled.form`
  background: rgba(255, 255, 255, 0.9);
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  width: 320px;
  backdrop-filter: blur(10px);
  text-align: center;
`;

const Logo = styled.img`
  width: 200px; 
  height: auto;
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
  border: 2px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;

  &:focus {
    border-color: #007bff;
    outline: none;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
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
  color: #007bff;

  &:hover {
    color: #0056b3;
  }
`;

const Button = styled.button`
  width: 50%;
  padding: 0.8rem;
  background-color: #4a90e2; /* Color azul moderno */
  color: white;
  border: none;
  border-radius: 25px; /* Bordes más suaves */
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease; /* Transición suave para todos los efectos */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2); /* Sombra sutil */

  display: flex; /* Usar flex para centrar el ícono y el texto */
  align-items: center; /* Centrar verticalmente */
  justify-content: center; /* Centrar horizontalmente */

  /* Añadir margin para centrar el botón */
  margin: 0 auto;

  &:hover {
    background-color: #357abd; /* Color más oscuro al pasar el mouse */
    transform: translateY(-2px) scale(1.02); /* Efecto de elevación y escalado */
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3); /* Aumentar sombra al pasar el mouse */
  }

  &:active {
    transform: translateY(0); /* Eliminar elevación al hacer clic */
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2); /* Volver a la sombra original */
  }

  &:focus {
    outline: none; /* Sin contorno */
    box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.5); /* Sombra de enfoque */
  }

  .icon {
    margin-right: 0.5rem; /* Espacio entre el ícono y el texto */
  }
`;

const ErrorMessage = styled.div`
  color: red;
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
    setError(''); // Reset error message

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
          <FontAwesomeIcon icon={faUserPlus} className="icon" /> Join
        </Button>
      </Form>
    </Container>
  );
};

export default Login;
