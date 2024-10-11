// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './AuthContext'; // Importa el AuthProvider
import Login from './Login';
import Home from './Home';

const App = () => {
  return (
    <AuthProvider> {/* Envuelve las rutas con el AuthProvider */}
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
