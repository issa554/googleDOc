import TextEditor from './TextEditor'
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Profile from './components/Profile';
import Register from './components/Register';
import Main from './components/Main';



function App() {

  return (

      <Routes>
        <Route path="/" element={
         <Main />
          } />
        <Route path="/login" element={
             <Login />
          } />
        <Route path="/register" element={
             <Register />
          } />
        <Route path="/profile" element={
             <Profile />
          } />
        <Route path="/documents/:id" element={<TextEditor />} />
        <Route path="*" element={<h1>Not Found Page</h1>} />
      </Routes>
         
  )
}

export default App
