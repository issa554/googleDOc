import React from 'react'
import { useSelector } from 'react-redux';

export default function DocumentHeader() {
    const users = useSelector((state) => state.document.users);
    const colors = [
        'bg-red-400', 'bg-black', 'bg-rose-400',
        'bg-yellow-400', 'bg-purple-400', 'bg-pink-400',
        'bg-indigo-400', 'bg-teal-400', 'bg-orange-400'
      ];
      function getRandomColor() {
        return colors[Math.floor(Math.random() * colors.length)];
      }
  return (
          <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
{users.map((user)=>(

<div key={user} className={`w-12 h-12 p-1 mx-2 bg-slate-500 border-2 shadow-md hover:cursor-pointer hover:bg-slate-600 shadow-black rounded-full text-center font-bold text-white flex items-center justify-center`} >
{user.length > 6 ? <>{user.charAt(0).toUpperCase()}</>:<>{user}</>}
    
</div>
))}    
          </div>
  )
}
// ${getRandomColor()} 