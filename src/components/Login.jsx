// src/components/Login.js
import React, { useState, useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import { Link,Navigate } from "react-router-dom"
import Header from './Header';

const Login = () => {
  const { login ,user} = useContext(AuthContext);
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  if (user) {
      return <Navigate to="/" />;
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(identifier, password);
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
    <>
    <Header />
      <div className='m-2'>
    <form onSubmit={handleSubmit} className='rounded-3xl mt-12 m-auto border-black border-4 p-2 w-64 text-center'>
      <input
        type="text"
        value={identifier}
        onChange={(e) => setIdentifier(e.target.value)}
        placeholder="Username or Email"
        required
        />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button className='border-2 border-black p-1 rounded-lg font-bold' type="submit">Login</button>
    </form>
    <p className='text-center mt-10 font-semibold'>
      Don't have an account? <Link className='text-green-600' to="/register">Sign up</Link>
    </p>
    </div>
        </>
  );
};

export default Login;
