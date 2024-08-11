//AuthContext.js
import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetch(import.meta.env.VITE_STRAPI_API+'/users/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setUser(data);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (identifier, password) => {
    try {
      const response = await fetch(import.meta.env.VITE_STRAPI_API+'/auth/local', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          identifier,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      localStorage.setItem('token', data.jwt);
      setUser(data.user);
    } catch (error) {
      throw new Error('Login failed');
    }
  };
  const register = async (username,email, password) => {
    try {
      const response = await fetch(import.meta.env.VITE_STRAPI_API+'/auth/local/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
          email
        }),
      });
      if (!response.ok) {
        throw new Error('Register failed');
      }

      const data = await response.json();
      localStorage.setItem('token', data.jwt);
      setUser(data.user);
    } catch (error) {
      throw new Error('Register failed');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading ,register }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
