import React, { useState, useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import { Link,Navigate } from "react-router-dom"
import Header from './Header';

const Register = () => {
  const { register ,user} = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  if (user) {
      return <Navigate to="/" />;
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(username ,email, password);
    } catch (error) {
      console.error('Register failed', error);
    }
  };

  return (
    <>
    <Header />
      <div className='m-2'>
    <form onSubmit={handleSubmit} className='rounded-3xl mt-12 m-auto border-black border-4 p-2 w-64 text-center'>
      <input
            className='m-2 p-2'
            
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required
            />
      <input
      className='m-2 p-2'
      type="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      placeholder="Email"
      required
      />
      <input
            className='m-2 p-2'
            
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
        />
      <button className='border-2 border-black p-1 rounded-lg font-bold' type="submit">Register</button>
    </form>
    <p className='text-center mt-10 font-semibold'>
      Already have an account? <Link className='text-green-600' to="/login">Login</Link>
    </p>
    </div>
        </>
  );
};

export default Register;
