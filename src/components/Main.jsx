import React, { useContext, useState, useEffect } from 'react';
import AddNew from "./AddNew";
import { AuthContext } from './context/AuthContext';
import { Link,Navigate  } from 'react-router-dom';
import Header from './Header';

export default function Main() {
    const {user} = useContext(AuthContext);
    if (!user) {
        return <Navigate to="/login" />;
    }
    const [dataa, setData] = useState();
   
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(import.meta.env.VITE_STRAPI_API+'/document/'+user.id  , {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });

                if (!response.ok) {
                    throw new Error('Login failed');
                }

                const dataa = await response.json();
                setData(dataa.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [user]);
  
    return (
        <>
        <Header />
        <div className='flex'>
            <AddNew />
            {dataa && dataa.map((doc,index) => (
                
                <div className="add-new-container m-3" key={index}>
                  <button className="add-new">
                  </button>
                  <Link className='text-green-600' to={`/documents/${doc.id}`}>Open Document</Link>
                  </div>
            ))}
        </div>
            </>
    );
}
