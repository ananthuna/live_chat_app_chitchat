import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useState, useContext } from 'react'
import Avatar from '@mui/material/Avatar';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import { ChatContext } from '../Context/ChatContext';
import { UserContext } from '../Context/Context';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import socket from '../socket';
import './background/bg.css'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';

const StyledBox = styled(Box)({
    display: "flex",
    gap: 2,
    width: 380,
    alignItems: "center",
    borderRadius: 4,
})

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: '0.5rem',
    backgroundColor: 'white',
    '&:hover': {
        backgroundColor: 'white',
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        backgroundColor: '#44b700',
        color: '#44b700',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: 'ripple 1.2s infinite ease-in-out',
            border: '1px solid currentColor',
            content: '""',
        },
    },
    '@keyframes ripple': {
        '0%': {
            transform: 'scale(.8)',
            opacity: 1,
        },
        '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
        },
    },
}));



function SideBar({ setName, setNotification, notification }) {
    const [users, setUsers] = useState([])
    const { user } = useContext(UserContext)
    const { setChat, chat } = useContext(ChatContext)


    const getMessageNotification = (user, message) => {
        const from = user !== message.from ? message.from : message.to
        let messages = notification
        let lastMessage = messages[from]
        if (lastMessage?.includes(message)) {
            return message
        }
        if (lastMessage) {
            messages[from] = [...lastMessage, message]
        } else {
            messages[from] = [message]
        }
        setNotification({ ...messages })
    }


    const getSavedMesseges = (user) => {
        const savedMessages = JSON.parse(localStorage.getItem(user.Name))
        if (savedMessages) {
            setNotification({ ...savedMessages })
        }
    }

    useEffect(() => {
        getSavedMesseges(user.Name)
        window.onbeforeunload = () => {
            
            return alert('save')
        }
    })


    useEffect(() => {
        socket.on('activeUser', (data) => {
            setUsers([...data.filter(item => item.Name !== user.Name)])
        })
    })

    useEffect(() => {
        socket.on(user.Name, (data) => {
            getMessageNotification(user.Name, data)
        })
    })




    const handleChat = (User) => {
        setChat(User)
        setName(User.Name)

    }


    return (

        <Box pt={13} >
            <Box sx={{
                width: { xs: "100%", sm: '35%', md: "25%" },
                height: "100%",
                bgcolor: "#17191A",
                position: "fixed",
                mt: -1,
            }}>
                <Box sx={{
                    overflowY: "scroll",
                    overflow: 'hidden',
                    mt: -1,
                    height: '100%',
                    borderRight: '2px solid',
                    borderColor: 'grey.500',
                }}>
                    <Box>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            pr: '2.6%'
                        }}>
                            {/* users search */}
                            <Search sx={{
                                ml: '0.5rem',
                                mt: '1rem',
                                bgcolor: '#272930',
                                "&:hover": {
                                    bgcolor: '#272930'
                                }
                            }}>
                                <SearchIconWrapper>
                                    <SearchIcon sx={{ color: '#5B5E67' }} />
                                </SearchIconWrapper>
                                <StyledInputBase
                                    placeholder="Search…"
                                    inputProps={{ 'aria-label': 'search' }}
                                    sx={{ color: '#5B5E67' }}
                                />
                            </Search>
                            <Box sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                            }}>
                                {/* count of users with new message */}
                                <Box display='flex'>
                                    <Typography variant="h8" sx={{
                                        fontWeight: "500",
                                        fontSize: '1.4rem',
                                        fontFamily: 'sans-serif',
                                        color: 'white'
                                    }} mt={2} ml={4}><b>Messages </b></Typography>
                                    <Typography variant="h8" sx={{
                                        fontWeight: "400",
                                        fontSize: '1.3rem',
                                        fontFamily: 'sans-serif',
                                        color: '#548EF1'
                                    }} mt={2} ml={1}><b>({Object.keys(notification).length})</b></Typography>
                                </Box>

                                <ChatBubbleOutlineIcon sx={{
                                    color: '#484A4C',
                                    mt: '20px',
                                    ml: 16
                                }} />
                            </Box>
                        </Box>

                        {users.map((User, index) => (
                            <Box key={index}>
                                <StyledBox
                                    key={index}
                                    height={70}
                                    sx={{
                                        '&:hover': {
                                            backgroundColor: '#272930',
                                        }
                                    }}
                                    pl={4}
                                    onClick={() => handleChat(User)}
                                >

                                    {/* user dp */}
                                    <StyledBadge
                                        overlap="circular"
                                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                        variant="dot"
                                    >
                                        <Avatar sx={{
                                            width: 55,
                                            height: 55
                                        }}
                                            alt="Remy Sharp" src={User.imageURL} />
                                    </StyledBadge>

                                    <Box ml={2} >
                                        {/* user name and last message time */}
                                        <Box sx={{
                                            display: 'flex',
                                            justifyContent: 'space-between'
                                        }}>
                                            <Typography level='body1' sx={{
                                                color: 'white',
                                                fontFamily: 'sans-serif',
                                                fontWeight: "400",
                                                fontSize: '1.2rem'
                                            }}><b>{User.Name}</b></Typography>
                                            <Typography sx={{
                                                color: '#424446',
                                                ml: { xs: 15, sm: 15 }
                                            }}>
                                                {!chat?.Name && notification[User?.Name]?.filter((item, index) => notification[User.Name].length - 1 === index)[0]?.time}
                                            </Typography>
                                        </Box>

                                        {/* new message or last message and total count */}
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <Typography key={index} sx={{ fontSize: '0.9rem', color: 'white', fontFamily: 'sans-serif', }}  >
                                                {notification[User?.Name]?.filter((item, index) => notification[User.Name].length - 1 === index)[0]?.message}
                                            </Typography>
                                            {!chat?.Name && <Badge badgeContent={notification[User?.Name]?.length} color='error'
                                                sx={{
                                                    mr: 1.5,
                                                    mt: 1
                                                }} />}
                                        </Box>
                                    </Box>
                                </StyledBox>
                            </Box>
                        ))}
                    </Box>
                </Box>
            </Box>
        </Box>

    )
}

export default SideBar