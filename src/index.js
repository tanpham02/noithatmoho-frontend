import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { BrowserRouter as Router } from 'react-router-dom'
import './i18n/i18n.js'
import App from './App';
import reportWebVitals from './reportWebVitals';
import { GoogleOAuthProvider } from '@react-oauth/google';
import ProviderTheme from './context/ProviderTheme/ProviderTheme';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <GoogleOAuthProvider clientId='273310959546-ih5nf3j8me1j68112tuk6ummroecml7s.apps.googleusercontent.com'>
    <ProviderTheme>
      <Router>
        <App /> 
      </Router>
    </ProviderTheme>
  </GoogleOAuthProvider>
  // </React.StrictMode>   
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
