import React,{useContext} from 'react'
import { AuthContext } from './context/AuthContext';
import { Navigate } from 'react-router-dom';
import Header from './Header';

export default function Profile() {
    const { user ,logout} = useContext(AuthContext);
    if (!user) {
      return <Navigate to="/login" />;
  }
  const logouta = (e) => {
    logout()
        return <Navigate to="/login" />;

  };
  return (
    <>
    <Header />
    <div className='m-4'>
        <h1 className='font-semibold text-2xl'>Profile Page</h1>
        <p className='font text-xl'>Welcome, <span className='font-bold text-green-700'> {user?.username}!</span></p>
        <button className='p-2 rounded-xl text-white font-bold bg-rose-600 ' onClick={logouta}>Logout</button>
      <p>This is the profile page. It shows the current user's information.</p>
    </div>
    </>
  )
}
