import React,{useContext} from 'react'
import {  BrowserRouter as Router , Link }from "react-router-dom"
import { AuthContext } from './context/AuthContext';
import DocumentHeader from './DocumentHeader';

export default function Header() {
  const { user } = useContext(AuthContext);

    const links = [
        {
          name:"Home",
          url:"/"
        },
        user ? ( {
          name:user?.username,
          url:"/profile"
        }):( {
          name:"Login",
          url:"/login"
        })
      ]
      return (
        <nav className="bg-blue-400 text-black border-gray-200 ">
          <div className="max-w-screen-xl flex justify-between mx-auto p-4">
         
            <div className="block w-auto">
              <ul className="font-medium flex p-0 rounded-lg  flex-row space-x-8  mt-0 border-0  border-gray-700 ">
                {links.map((link)=>(
    
                <li key={link.name}>
                  <Link 
                    to={link.url}
                    className="tracking-[.25em] block  bg-transparent  px-3 text-gray-100 font-bold text-xl duration-300 ease-in-out hover:text-gray-900 hover:border-b border-double border-gray-900"
                  >
                    {link.name}
                  </Link>
                </li>
                ))}
             
               
              </ul>
            </div>
            {window.location.pathname.includes("/documents/") && (
          <div className="border-b-2 px-8">
            <DocumentHeader />
          </div>
        )}
          </div>
        </nav>

      );
    }