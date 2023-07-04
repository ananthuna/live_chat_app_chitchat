import { Avatar, Typography } from '@mui/material';
import { Box } from '@mui/system';
import * as React from 'react';
import PersonIcon from '@mui/icons-material/Person';
import MailIcon from '@mui/icons-material/Mail';
import './style.css'


export default function BasicMenu({ user }) {

    return (
        <>
            <Box sx={{
                width: { xs: '23rem', sm: '30rem' },
                mb: '1rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',

            }}>
                <Typography textAlign="center" color='white'>Profile page</Typography>
                <Avatar sx={{ mt: '1.5rem', width: '10rem', height: '10rem' }} src={user.imageURL} />


                {/* user Name */}
                <Box sx={{ display: 'flex', m: '2rem' }}>
                    <PersonIcon pt={1} sx={{ color: 'white' }} />
                    <Box sx={{ pl: '3%' }}>
                        <Typography variant="subtitle2" color="#808080">Name</Typography>
                        <Box display="flex" justifyContent="space-between">
                            <Typography color="white"><b>{user ? user.Name : 'Name'}</b></Typography>
                        </Box>
                        <Typography variant="subtitle2" color="#808080">This is not your username or pin. This name will be visible to your WhatsApp contacts.</Typography>
                    </Box>
                </Box>

                {/* user enail id */}
                <Box sx={{ display: 'flex', ml: { xs: '2rem', sm: '-1.5rem' }, mt: '-5%' }}>
                    <MailIcon pt={1} sx={{ color: 'white' }} />
                    <Box sx={{ pl: '3%' }}>
                        <Typography variant="subtitle2" color="#808080">Email</Typography>
                        <Box display="flex" gap="12.2rem">
                            <Typography color='white'>*********@gmail.com</Typography>

                        </Box>
                        <Typography variant="subtitle2" color="#808080">This is your username and it will not be visilble to the users</Typography>
                    </Box>
                </Box>
            </Box>


        </>
    );
}
