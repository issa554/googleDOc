//Editor.jsx
import React, {  useEffect ,useContext} from 'react';
import { useParams  } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { editDocument, openDocument ,closeDocument } from './components/document/documentSlice';
import { AuthContext } from './components/context/AuthContext';
import Header from './components/Header';

const EditorComponent = () => {
  const {user} = useContext(AuthContext);  
  const dispatch = useDispatch();
  const content = useSelector((state) => state.document.content);
  
  const { id : docID} = useParams();


  useEffect(() => {


    dispatch({ type: 'document/initiateSocket' });
    return () => {
      dispatch(closeDocument());
    };
  }, [dispatch]);


  useEffect(() => {
    const fetchDocument = async () => {
      try {
        const response = await fetch(import.meta.env.VITE_STRAPI_API+"/documents/"+docID);
        const data = await response.json();
        dispatch(openDocument({id:docID,data : data.data.attributes?.content,username:user?.username})); 
      } catch (error) {
        console.error('Failed to fetch document:', error);
      }
    };
    if(user){

      fetchDocument();
    }
  },[user]);

  const handleChange = (e)=>{
    dispatch(editDocument({id:docID,data:e.target.value}))
  }
  return(
    <>
    <Header />
  <div className=' flex flex-col justify-center items-center bg-gradient-to-b  from-blue-400 from-5% via-blue-200 via-30%	to-white to-100%'>
 
   <textarea
    className='my-4 w-2/4 h-dvh p-4 border-2 border-gray-300 rounded-lg shadow-md bg-white focus:outline-none focus:ring-2 focus:ring-black resize-none text-gray-800 placeholder-gray-500 text-lg'
   onChange={handleChange}
   value={content}
   rows={20}
   cols={100}
   ></textarea>
  </div>
    </>
  )
};

export default EditorComponent;

