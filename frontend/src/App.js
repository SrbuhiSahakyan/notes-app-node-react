import { useEffect, useState } from 'react';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Dashboard from './components/Dashboard';
import './App.css';
import { useAuthStore } from './store/useAuthStore';

function App() {
  const { token, userEmail, setUserEmail, logout } = useAuthStore();
  const [view, setView] = useState(token && userEmail ? 'dashboard' : 'login');

  useEffect(() => {
    const fetchUser = async () => {
      if (!token) return;
      try {
       const API_URL = process.env.REACT_APP_BACKEND;
        const res = await fetch(`${API_URL}/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (res.ok) {
          setUserEmail(data.email);
          setView('dashboard');
        } else {
          logout();
          setView('login');
        }
      } catch {
        logout();
        setView('login');
      }
    };

    fetchUser();
  }, [token, setUserEmail, logout]);

  const handleLogout = () => {
    logout();
    setView('login');
  };

  return (
    <div className="root">
      {view === 'login' && (
        <LoginForm switchToRegister={() => setView('register')} setView={setView} />
      )}
      {view === 'register' && (
        <RegisterForm switchToLogin={() => setView('login')} setView={setView} />
      )}
      {view === 'dashboard' && token && userEmail && (
        <Dashboard logout={handleLogout} />
      )}
    </div>
  );
}

export default App;