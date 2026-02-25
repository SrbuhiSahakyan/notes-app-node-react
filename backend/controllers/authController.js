import { registerUser, loginUser } from '../services/authService.js';

export const register = async (req, res) => {
  const { email, password, confirmPassword } = req.body;
  const errors = {};

  if (!email) errors.email = 'Эл. почта обязателен';
  if (!password) errors.password = 'Пароль обязателен';
  if (!confirmPassword) errors.confirmPassword = 'Подтверждение пароля обязательно';
  if (password && confirmPassword && password !== confirmPassword) {
    errors.confirmPassword = 'Пароли не совпадают';
  }

  if (Object.keys(errors).length > 0) return res.status(400).json({ errors });

  try {
    const user = await registerUser({ email, password });
    res.status(201).json({ message: 'Пользователь создан', userId: user.id });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ errors: { email: 'Пользователь с таким эл. почта уже существует' } });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const errors = {};

  if (!email) errors.email = 'Эл. почта обязателен';
  if (!password) errors.password = 'Пароль обязателен';
  if (Object.keys(errors).length > 0) return res.status(400).json({ errors });

  try {
    const token = await loginUser({ email, password });
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(401).json({ errors: { general: err.message } });
  }
};