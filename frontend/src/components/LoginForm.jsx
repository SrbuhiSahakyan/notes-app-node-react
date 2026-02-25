import React, { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';

export default function LoginForm({ switchToRegister }) {
  const { setToken, setErrors } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setLocalErrors] = useState({});

  const handleLogin = async () => {
    const newErrors = {};
    if (!email) newErrors.email = 'Email обязателен';
    if (!password) newErrors.password = 'Пароль обязателен';

    if (Object.keys(newErrors).length > 0) {
      setLocalErrors(newErrors);
      return;
    }

    setLocalErrors({});
    try {
    const API_URL = process.env.REACT_APP_BACKEND;
    const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
    });
      const data = await res.json();

      if (res.ok) {
        setToken(data.token);
      } else {
        setLocalErrors(data.errors || { general: data.error });
      }
    } catch {
      setLocalErrors({ general: 'Ошибка сервера' });
    }
  };

  return (
    <div className="form-container">
      <h1 className="form-header">Войти</h1>
      {errors.general && <p className="general-error">{errors.general}</p>}
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="input-field" />
      {errors.email && <p className="error">{errors.email}</p>}
      <input placeholder="Пароль" type="password" value={password} onChange={e => setPassword(e.target.value)} className="input-field" />
      {errors.password && <p className="error">{errors.password}</p>}
      <button onClick={handleLogin} className="button">Войти</button>
      <p className="switch-text">
        Нет аккаунта?{' '}
        <span className="link-text" onClick={switchToRegister}>Регистрация</span>
      </p>
    </div>
  );
}