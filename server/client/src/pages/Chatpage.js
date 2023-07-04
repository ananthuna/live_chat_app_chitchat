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
  const [messages, setMessages] = useState([])
  const { chat } = useContext(ChatContext)
  const { user, setUser } = useContext(UserContext)
  const [name, setName] = useState('')

  useEffect(() => {
    const arr = messages
    arr.forEach((m) => {
      if (m.from !== name && m.to !== name) return setMessages([])
  })
}, [name,messages])

useEffect(() => {
  let User = JSON.parse(localStorage.getItem('user'))
  if (User) { setUser(User) }
  User && socket.emit('newUser', User)
}, [setUser])

useEffect(() => {
  socket.on(user.Name, (data) => {
    setMessages(m => [...m, data])
  })
}, [user])




return (
  <Box >
    <Stack direction="row" justifyContent="space-between">

      {chat ? (
        <Box sx={{ width: { xs: '100%', sm: '65%', md: "75%" }, display: { sm: 'none' } }} >
          <ChatHeader setMessages={setMessages} />
          <ChatBody messages={messages} setMessages={setMessages} name={name} />
          <ChatFooter />
        </Box>
      ) : (
        <Box sx={{ width: { xs: "100%", sm: '35%', md: "25%" }, display: { sm: 'none' } }}>
          <AdminNavbar user={user} />
          <SideBar setName={setName} setMessages={setMessages} name={name} />
        </Box>
      )}


      <Box sx={{ width: { xs: "100%", sm: '35%', md: "25%" }, display: { xs: 'none', sm: 'block' } }}>
        <AdminNavbar user={user} />
        <SideBar setName={setName}setMessages={setMessages} name={name} />
      </Box>

      <Box sx={{ width: { xs: '100%', sm: '65%', md: "75%" }, display: { xs: "none", sm: "block" } }} >
        <ChatHeader setMessages={setMessages} />
        <ChatBody messages={messages} setMessages={setMessages} name={name} />
        <ChatFooter />
      </Box>

    </Stack>
  </Box>
)
}

export default Chatpage
