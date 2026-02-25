import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  token: localStorage.getItem('token') || '',
  userEmail: '',
  errors: {},
  setToken: (token) => {
    localStorage.setItem('token', token);
    set({ token });
  },
  setUserEmail: (email) => set({ userEmail: email }),
  setErrors: (errors) => set({ errors }),
  logout: () => {
    localStorage.removeItem('token');
    set({ token: '', userEmail: '', errors: {} });
  },
}));