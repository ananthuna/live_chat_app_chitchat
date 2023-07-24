import { Avatar, createTheme, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Box } from '@mui/system';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import axios from '../axios';
import { baseUrl } from '../url';
import { useNavigate } from 'react-router-dom';
import ProfilePage from '../components/ProfilePage'
import CloseIcon from '@mui/icons-material/Close';
import { ThemeProvider } from '@mui/material/styles';
import './style.css'


const theme = createTheme({

    palette: {
        primary: {
            // Purple and green play nicely together.
            main: '#17191A',
        },
        secondary: {
            // This is green.A700 as hex.
            main: '#17191A',
        },
    }
});


function Admin_header({ user }) {
    const navigate = useNavigate()
    const [open, setOpen] = useState(false)
    const [profile, setProfile] = useState(false)
    const [image, setImage] = useState(false)


    const Logout = () => {
        setOpen(false)
        console.log('logout');
        axios.post(`${baseUrl}/logout`, user, { withCredentials: true }).then((response) => {

            localStorage.removeItem('user')
            console.log('out');
            navigate('/')
        })
    }

    const handelprofile = () => {
        setOpen(false)
        setProfile(true)
    }

    const handleClose = () => {
        setProfile(false)
    }





    return (
        <ThemeProvider theme={theme}>
            <Box position='fixed' sx={{

                bgcolor: '#17191A', width: { xs: '100%', sm: '35%', md: '25%' }
            }} zIndex={1} height='6rem' bgcolor='#f7f7f8'>
                <Box sx={{
                    pl: { xs: '8%', sm: '8%' },
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    pt: { xs: '2%', sm: '5%' }
                }}>
                    <Box display='flex' alignItems='center' height='4rem'>
                        {/* user profile pic */}
                        <Avatar sx={{
                            height: 60,
                            width: 60
                        }}
                            onClick={e => {
                                setOpen(false)
                                setImage(true)
                            }}
                            alt="img" src={baseUrl + '/' + user.imageURL} />
                        {/* user name */}
                        <Box sx={{ pl: '1rem' }}>
                            <Typography level='body1' sx={{
                                color: 'white',
                                fontFamily: 'sans-serif',
                                fontWeight: "400",
                                fontSize: '1.2rem'
                            }}><b>{user.Name}</b></Typography>
                            <Typography color='#808080'>about</Typography>
                        </Box>
                    </Box>
                    {/* account settings button */}
                    <Box sx={{
                        pr: '1.5rem'
                    }}>
                        <IconButton onClick={e => setOpen(true)}>
                            <MoreVertIcon sx={{ fontSize: 30, color: 'white' }} />
                        </IconButton>
                    </Box>
                </Box>

                {/* main menu */}
                <Menu
                    sx={{
                        mt: '45px',
                        [theme.breakpoints.up('sm')]: {
                            ml: "-75%"
                        },

                        [theme.breakpoints.down('sm')]: {
                            ml: "none"
                        },

                    }}
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
                    <MenuItem onClick={handelprofile} bgcolor='black'>
                        <Typography textAlign="center">Profile</Typography>
                    </MenuItem>
                    <MenuItem onClick={Logout} bgcolor='black'>
                        <Typography textAlign="center">Logout</Typography>
                    </MenuItem>
                </Menu>

                {/* profile image upload menu */}
                <Menu
                    sx={{
                        mt: '45px',
                        [theme.breakpoints.up('sm')]: {
                            ml: "-60%"
                        },

                        [theme.breakpoints.down('sm')]: {
                            ml: "none"
                        },

                    }}
                    id="menu-appbar"
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    open={image}
                    onClose={e => setImage(false)}
                >
                    <MenuItem display='flex'>
                        <img alt="not fount" width={"250px"} height={"250px"} src={user.imageURL} />
                    </MenuItem>
                </Menu>


                {/* profile page using menu */}

                <Menu
                    id="menu-appbar"
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: "left",
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
                    <CloseIcon sx={{ ml: '90%', mt: '1rem', color: "white" }} onClick={handleClose}></CloseIcon>
                    <ProfilePage user={user} />
                </Menu>

            </Box>
        </ThemeProvider>
    )
}

export default Admin_header
