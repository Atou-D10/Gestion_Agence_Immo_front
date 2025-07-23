import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // 🔴 pour afficher l'erreur
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); // réinitialise l'erreur

    try {
      const res = await axios.post('http://localhost:8000/api/login', {
        email,
        password,
      });

      const { token, user } = res.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      if (user.role === 'Gestionnaire') {
        navigate('/dashboard-gestionnaire');
      } else {
        navigate('/dashboard-client');
      }

    } catch (err) {
      if (err.response && err.response.status === 401) {
        setError("Email ou mot de passe incorrect.");
      } else {
        setError("Erreur de connexion au serveur.");
      }
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '400px' }}>
      <h2 className="mb-4">Connexion</h2>
      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleLogin}>
        <div className="form-group mb-3">
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group mb-3">
          <input
            type="password"
            className="form-control"
            placeholder="Mot de passe"
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">Se connecter</button>
      </form>
    </div>
  );
}
