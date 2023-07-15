import React, { useContext, useEffect, useState } from 'react'
import { Box, Stack } from '@mui/system'
import AdminNavbar from '../components/AdminHeader'
import ChatHeader from '../components/ChatHeader'
import SideBar from '../components/SideBar'
import ChatBody from '../components/ChatBody'
import ChatFooter from '../components/ChatFooter'
import { UserContext } from '../Context/Context'
import { ChatContext } from '../Context/ChatContext';
import socket from '../socket'


function Chatpage() {
  const { chat } = useContext(ChatContext)
  const { user, setUser } = useContext(UserContext)
  const [name, setName] = useState('')
  const [notification, setNotification] = useState({
     Manu: [{ from: 'Manu', to: 'guppy', message: 'Hai', time: '16:20',id: '6abff0e2-1852-4765-adec-2d5f3d684dg' }],
     Lakshmi: [{ from: 'Lakshmi', to: 'guppy', message: 'How are you?', time: '15:20',id: '6abff0e2-1852-4765-adec-2d5f3d684sw' }],
     Rose: [{ from: 'Rose', to: 'guppy', message: 'Where?', time: '11:20',id: '6abff0e2-1852-4765-adec-2d5f3d684fa' }]
    })


useEffect(() => {
  let User = JSON.parse(localStorage.getItem('user'))
  if (User) { setUser(User) }
  User && socket.emit('newUser', User)
}, [setUser])




return (
  <Box >
    <Stack direction="row" justifyContent="space-between">

      {chat ? (
        <Box sx={{ width: { xs: '100%', sm: '65%', md: "75%" }, display: { sm: 'none' } }} >
          <ChatHeader notification={notification} setNotification={setNotification}/>
          <ChatBody name={name} notification={notification} setNotification={setNotification}/>
          <ChatFooter />
        </Box>
      ) : (
        <Box sx={{ width: { xs: "100%", sm: '35%', md: "25%" }, display: { sm: 'none' } }}>
          <AdminNavbar user={user} />
          <SideBar setName={setName} name={name} notification={notification} setNotification={setNotification}/>
        </Box>
      )}


      <Box sx={{ width: { xs: "100%", sm: '35%', md: "25%" }, display: { xs: 'none', sm: 'block' } }}>
        <AdminNavbar user={user} />
        <SideBar setName={setName} name={name} notification={notification} setNotification={setNotification}/>
      </Box>

      <Box sx={{ width: { xs: '100%', sm: '65%', md: "75%" }, display: { xs: "none", sm: "block" } }} >
        <ChatHeader notification={notification} setNotification={setNotification}/>
        <ChatBody  name={name} notification={notification} setNotification={setNotification}/>
        <ChatFooter />
      </Box>

    </Stack>
  </Box>
)
}

export default Chatpage
