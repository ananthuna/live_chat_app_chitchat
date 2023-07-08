import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import UserContext from './Context/Context'
import ChatContext from './Context/ChatContext'
import ChatIDContext from './Context/ChatIDContext'



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ChatIDContext>
      <ChatContext>
        <UserContext>
          <App />
        </UserContext>
      </ChatContext>
    </ChatIDContext>
  </React.StrictMode>
);