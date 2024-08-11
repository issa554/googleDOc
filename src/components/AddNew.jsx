// AddNew.js
import React,{useContext} from 'react';
import { FaPlus } from 'react-icons/fa';
import './../App.css';
import {  useNavigate  } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
const AddNew = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const createNewDocument = async () => {
    if (user) {
      const response = await fetch(import.meta.env.VITE_STRAPI_API+'/documents', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({  
          data:{
            content:"",
            user: user.id
          }
        }),
      });
      if (response.ok) {
      const responseData = await response.json();
      
      const newDocumentId = responseData.data.id;
      navigate(`/documents/${newDocumentId}`);
      
    }
    } else {
      console.error('Failed to save content');
    }
  };
  return (
    <>
    <div className="add-new-container m-3">
    <button className="add-new" onClick={createNewDocument}>
      <FaPlus className="icon"  />
    </button>
      <p>Create Document</p>
    </div>
    </>
  );
};

export default AddNew;
