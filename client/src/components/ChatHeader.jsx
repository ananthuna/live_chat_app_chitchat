import { Avatar, IconButton, Menu, MenuItem, Typography } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import React, { useContext, useState } from 'react'
import { Box } from '@mui/system';
import { ChatContext } from '../Context/ChatContext'
import SearchIcon from '@mui/icons-material/Search';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ChatProfile from '../components/ChatProfile'
import CloseIcon from '@mui/icons-material/Close';



function ChatHeader({ setMessages }) {
    const [open, setOpen] = useState(false)
    const { chat, setChat } = useContext(ChatContext)
    const [profile, setProfile] = useState(false)

    const handleLeave = () => {
        setChat('')
        setOpen(false)
        setMessages([])
        console.log('chathead');
    }

    return (
        <Box position="fixed" zIndex={1000} sx={{
            // bgcolor: '#17191A',
            backgroundColor: "rgba(43, 42, 42, 0.658)",
            backdropFilter: "blur(5px)",
            width: { xs: '100%', sm: "65%", md: '75%' }
        }} >
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                height: '5.8rem',
                pl: '1rem',
                pr: '1rem',
                mb: '-2rem',

            }} variant="dense" >
                <Box sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2
                }}>
                    <Box sx={{
                        display: "flex",
                        alignItems: "center"
                    }}>
                        {chat && <IconButton onClick={handleLeave} ><ArrowBackIcon sx={{ color: 'white' }} variant='plain' /></IconButton>}
                    </Box>
                    {chat && <Avatar sx={{
                        height: 55,
                        width: 55
                    }} alt="img" src={chat.imageURL} />}
                    <Box>
                        <Typography sx={{ color: 'white', fontSize: '1.4rem', lineHeight: '25px' }}><b>{chat && chat.Name}</b></Typography>
                        <Typography sx={{ fontSize: '0.9rem', color: '#808080', lineHeight: '13px' }}  ><b>{chat && 'online'}</b></Typography>
                    </Box>
                </Box>
                <Box>
                    {chat && <>
                        <IconButton >
                            <SearchIcon sx={{ fontSize: 30, color: '#808080' }} />
                        </IconButton>
                        <IconButton onClick={e => setOpen(true)}>
                            <MoreVertIcon sx={{ fontSize: 30, color: '#808080' }} />
                        </IconButton>
                    </>}

                </Box>
            </Box>
            <hr />
            <Menu

                id="menu-appbar"
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={open}
                onClose={e => setOpen(false)}
            >
                <MenuItem onClick={() => {
                    setProfile(true)
                    setOpen(false)
                }}>
                    <Typography textAlign="center">View profile</Typography>
                </MenuItem>
                <MenuItem onClick={() => {
                    setMessages([])
                    setOpen(false)
                }}>
                    <Typography textAlign="center">Clear chat</Typography>
                </MenuItem>
                <MenuItem onClick={handleLeave}>
                    <Typography textAlign="center">Leave chat</Typography>
                </MenuItem>
            </Menu>

            <Menu
                id="menu-appbar"
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={profile}
                onClose={e => setProfile(false)}
                sx={{
                    "& .MuiPaper-root": {
                        backgroundColor: "rgba(43, 42, 42, 0.658)",
                        backdropFilter: "blur(5px)"
                    }
                }}
            >
                <CloseIcon sx={{ ml: '90%', mt: '1rem', color: "white" }} onClick={() => setProfile(false)}></CloseIcon>
                {chat && <ChatProfile user={chat} />}

            </Menu>

        </Box>



    )
}

export default ChatHeader