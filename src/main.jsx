import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Header from './components/Header.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './components/context/AuthContext';
import { Provider } from 'react-redux';
import store from './app/store';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <AuthProvider>
    <BrowserRouter>
    <Provider store={store}>

    <App />
    </Provider>
    </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>,
)
