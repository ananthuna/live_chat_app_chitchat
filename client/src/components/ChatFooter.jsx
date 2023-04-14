import { Input, IconButton, Avatar } from '@mui/material'
import { Box } from '@mui/system'
import React, { useState, useContext } from 'react'
import SendIcon from '@mui/icons-material/Send';
import { ChatContext } from '../Context/ChatContext';
import socket from '../socket';
import { UserContext } from '../Context/Context';

function ChatFooter() {

    const [message, setMessage] = useState('');
    const { chat } = useContext(ChatContext)
    const { user } = useContext(UserContext)

    const handleSendMessage = (e) => {
        e.preventDefault();
        const date = new Date()
        const H = date.getHours()
        const M = date.getMinutes()
        const time = `${H}:${M}`
        socket.emit('typing', { type: '', to: chat.Name })
        if (message.trim() && chat) {
            console.log('sended');
            socket.emit('private message', {
                message: message,
                from: user.Name,
                to: chat.Name,
                time:time
            })
        }
        setMessage('');

    };
    const handleTyping = () => {
        socket.emit('typing', { type: user.Name, to: chat.Name })
    }

    return (
        <Box sx={{ position: "fixed", zIndex: 1000, bottom: "2%", width: { xs: "100%", sm: "75%", } }}>
            <hr />
            <Box sx={{ ml: '1rem', mr: '1rem' }}>
                <Box alignItems='center' component="form" onSubmit={handleSendMessage}
                    sx={{
                        display: 'flex',
                        bgcolor: '#272930',
                        borderRadius: 5,
                        pl: 2
                    }}>
                    <Avatar sx={{
                        width: 35,
                        height: 35,
                    }}
                        alt="Remy Sharp" src={user.imageURL} />
                    <Input sx={{
                        bgcolor: '#272930',
                        width: { xs: '100%', sm: '85%', md: '100%' },
                        height: '3.5rem',
                        color: 'white',
                        borderRadius: 5,
                        pl: '2rem'
                    }}
                        placeholder="Write somthing....."
                        disableUnderline={true}
                        value={message}
                        name="text"
                        type='text'
                        autoComplete='off'
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={handleTyping}
                    />
                    <IconButton type="submit" color='primary' sx={{ ml: '-2.5rem' }}>
                        <SendIcon sx={{ fontSize: 30 }} />
                    </IconButton>

                </Box>
            </Box>
        </Box>
    )
}

export default ChatFooter
