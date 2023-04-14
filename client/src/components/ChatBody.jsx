import { Box, Typography, Avatar } from '@mui/material'
import React, { useContext, useRef } from 'react'
import { ChatContext } from '../Context/ChatContext';
import { UserContext } from '../Context/Context';
import socket from '../socket';
import './background/bg.css'

function ChatBody({ messages }) {
  const { chat } = useContext(ChatContext)
  const { user } = useContext(UserContext)
  const [typingStatus, setTypingStatus] = React.useState('')
  const lastMessageRef = useRef(null);
  // const [messagess, setMessagess] = React.useState([])

  // React.useEffect(() => {
  //   messages.forEach((msg) => {
  //     if (msg.from === user.Name && msg.to === chat.Name) {
  //       setMessagess([...msg])
  //     }
  //   })
  // }, [messages, chat, user])



  React.useEffect(() => {
    // send typing status to backend using socket.io
    // console.log(`type${user.Name}`);
    socket.on(`type${user.Name}`, (data) => {
      // console.log(data);
      setTypingStatus(data.type)
    });
  });

  React.useEffect(() => {
    // 👇️ scroll to bottom every time messages change
    lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
    // console.log('ref')
  });



  return (

    <Box position='relative' zIndex={100} mt='4rem' bgcolor='#17191A'>
      <Box sx={{ 
        bgcolor: '#17191A', 
        width: '100%', 
        height: '42rem', 
        position: 'fixed', 
        zIndex: -100,
        mt:'-4rem'
        }}>

      </Box>
      <Box>
        <Box sx={{ overflowY: "scroll", overflow: 'hidden' }}>
          <Box>
            <Box sx={{ pb: 8, pt: 3 }}>
              {/* ////// */}
              {chat ? (messages.map((message, index) =>
                message.from === user.Name ? (
                  message.to === chat.Name && <Box
                    key={index}
                    display="inline-flex"
                    width='100%'
                    justifyContent="right"
                    sx={{ p: 2, gap: 2 }}>
                    <Box>
                      <Box display='flex' justifyContent='right' gap={2}>
                        <Typography fontSize='0.9rem' align='right' color='white'><b>You</b></Typography>
                        <Typography fontSize='0.9rem' align='right' color='#808080'>{message.time}</Typography>
                      </Box>
                      <Box sx={{ bgcolor: "#272930", Width: "50%", p: 2, borderRadius: '1rem 0 1rem 1rem', fontSize: "2rem" }}>
                        <Typography sx={{ color: 'white', fontSize: '0.9rem', lineHeight: '20px' }}>{message.message}</Typography>
                      </Box>
                    </Box>
                    <Avatar sx={{
                      height: 35,
                      width: 35
                    }} alt="img" src={user.imageURL} />
                  </Box>
                ) : (
                  message.from === chat.Name && <Box
                    key={index}
                    display="inline-flex"
                    width='100%'
                    justifyContent="left"
                    sx={{ p: 2, gap: 2 }}>
                    <Avatar sx={{
                      height: 35,
                      width: 35
                    }} alt="img" src={chat.imageURL} />
                    <Box>
                      <Box display='flex' justifyContent='left' gap={2}>
                        <Typography fontSize='0.9rem' align='right' color='white'><b>{message.from}</b></Typography>
                        <Typography fontSize='0.9rem' align='right' color='#808080'>{message.time}</Typography>
                      </Box>
                      {/* <Typography align='left'>{message.from}</Typography> */}
                      <Box sx={{ bgcolor: "#272930", Width: "50%", p: 2, borderRadius: '0rem 1rem 1rem 1rem' }}>
                        <Typography sx={{ color: 'white', fontSize: '0.9rem', lineHeight: '8px' }}>{message.message}</Typography>
                      </Box>
                    </Box>
                  </Box>
                )
              )) : (
                <Box sx={{
                  display: "flex",
                  justifyContent: "center",
                  pt: 20
                }}>
                  <Typography sx={{ color: 'white' }}>Chat is empty </Typography>
                </Box>
              )}
              <Box ref={lastMessageRef} />
            </Box>
            <Box sx={{
              position: "fixed",
              bottom: "13%",
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 1,
              ml: 2
            }}>
              {chat && typingStatus && <Avatar sx={{
                height: 35,
                width: 35
              }} alt="img" src={chat.imageURL} />}
              <Typography sx={{ color: 'white' }}>{typingStatus && chat && `${typingStatus} is typing...`}</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default ChatBody
