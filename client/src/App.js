import './App.css';
import Login from './pages/Login'
import Signup from './pages/Sigup'
import Chatpage from './pages/Chatpage'
import VideoCall from './pages/VideoCall';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import socket from './socket'

function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Login socket={socket} />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/chatpage" element={<Chatpage socket={socket} />}></Route>
        <Route path="/video" element={<VideoCall socket={socket} />}></Route>
      </Routes>
    </BrowserRouter>


  );
}

export default App;
