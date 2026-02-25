import React from 'react';
import { useAuthStore } from '../store/useAuthStore';


function Dashboard({ logout }) {
  return (
    <div className="dashboard">
      <h2>Главная страница</h2>
      <button onClick={logout}>Выйти</button>
      <p>Здесь будут ваши заметки</p>
    </div>
  );
}

export default Dashboard;