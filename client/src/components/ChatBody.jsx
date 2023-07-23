import { Box, Typography, Avatar } from '@mui/material'
import React, { useContext, useEffect, useRef } from 'react'
import { ChatContext } from '../Context/ChatContext';
import { UserContext } from '../Context/Context';
import './background/bg.css'

function ChatBody({  notification }) {
  const { chat } = useContext(ChatContext)
  const { user } = useContext(UserContext)
  const lastMessageRef = useRef(null);

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
  });
  

  return (

    <Box position='relative' zIndex={100} mt='4rem' bgcolor='#17191A'>
      <Box sx={{
        bgcolor: '#17191A',
        width: '100%',
        height: '42rem',
        position: 'fixed',
        zIndex: -100,
        mt: '-4rem'
      }}>

      </Box>
      <Box>
        <Box sx={{ overflowY: "scroll", overflow: 'hidden' }}>
          <Box>
            <Box sx={{ pb: 8, pt: 3 }}>
              {/* ////// */}
              {chat ? (notification[chat.Name]?.map((message, index) =>
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
                      <Box sx={{ bgcolor: "#272930", Width: "50%", p: 2, borderRadius: '1rem 0 1rem 1rem' }}>
                        <Typography sx={{ color: 'white', fontSize: '0.9rem', lineHeight: '0px' }}>{message.message}</Typography>
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
                      <Box sx={{ bgcolor: "#272930", Width: "50%", p: 2, borderRadius: '0rem 1rem 1rem 1rem' }}>
                        <Typography sx={{ color: 'white', fontSize: '0.9rem', lineHeight: '0px' }}>{message.message}</Typography>
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
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default ChatBody
