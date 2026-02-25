import React, { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';

export default function RegisterForm({ switchToLogin }) {
  const { setErrors } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setLocalErrors] = useState({});

  const handleRegister = async () => {
    const newErrors = {};
    if (!email) newErrors.email = 'Email обязателен';
    if (!password) newErrors.password = 'Пароль обязателен';
    if (!confirmPassword) newErrors.confirmPassword = 'Подтверждение пароля обязательно';
    if (password && confirmPassword && password !== confirmPassword) {
      newErrors.confirmPassword = 'Пароли не совпадают';
    }

    if (Object.keys(newErrors).length > 0) {
      setLocalErrors(newErrors);
      return;
    }

    setLocalErrors({});
    try {
      const API_URL = process.env.REACT_APP_BACKEND;
      const res = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, confirmPassword }),
      });
      const data = await res.json();

      if (res.ok) switchToLogin();
      else setLocalErrors(data.errors || { general: data.error });
    } catch {
      setLocalErrors({ general: 'Ошибка сервера' });
    }
  };

  return (
    <div className="form-container">
      <h1 className="form-header">Регистрация</h1>
      {errors.general && <p className="general-error">{errors.general}</p>}
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="input-field" />
      {errors.email && <p className="error">{errors.email}</p>}
      <input placeholder="Пароль" type="password" value={password} onChange={e => setPassword(e.target.value)} className="input-field" />
      {errors.password && <p className="error">{errors.password}</p>}
      <input placeholder="Подтвердите пароль" type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} className="input-field" />
      {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
      <button onClick={handleRegister} className="button">Регистрация</button>
      <p className="switch-text">
        Есть аккаунт?{' '}
        <span className="link-text" onClick={switchToLogin}>Войти</span>
      </p>
    </div>
  );
}