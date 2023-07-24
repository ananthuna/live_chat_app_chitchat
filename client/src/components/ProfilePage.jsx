import { Avatar, Badge, createTheme, Menu, Typography, MenuItem } from '@mui/material';
import { Box } from '@mui/system';
import * as React from 'react';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import EditIcon from '@mui/icons-material/Edit';
import PersonIcon from '@mui/icons-material/Person';
import UploadAndDisplayImage from './UploadAndSelectimage';
import MailIcon from '@mui/icons-material/Mail';
import EditName from './NameEditPage';
import { UserContext } from '../Context/Context';
import { useContext } from 'react';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { red } from '@mui/material/colors';
import './style.css';
import axios from 'axios';
import { baseUrl } from '../url';

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1200,
      xl: 1536,
    },
  },
});

export default function BasicMenu({ user }) {
  const { nameEdit, setNameEdit, setUser } = useContext(UserContext)
  const { profilePhoto, setProfilePhoto } = useContext(UserContext)

  const upload = (event) => {
    // setImages(event.target.files[0]);
    const data = new FormData();
    data.append('file', event.target.files[0]);
    data.append('user', JSON.stringify(user))
    // console.log(user);
    axios.post(`${baseUrl}/imageUpdate`, data, { withCredentials: true }).then((doc) => {
      console.log('imageupdate');
      console.log(doc.data);
      setUser(doc.data)
      localStorage.setItem('user', JSON.stringify(doc.data))
    })
  }

  const handleDelete = () => {
    // if (window.confirm("Delete your account.")) {
    //   axios.get(`${baseUrl}/delete`, { withCredentials: true }).then((response) => {
    //     if (response.data.deleteGranted) {
    //       navigate('/')
    //     }
    //   })
    // }

  }


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
        <Badge
          overlap="circular"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          badgeContent={
            <label >
              {/* <i class="ion-images"></i> */}
              <Avatar sx={{ width: '4rem', height: '4rem', bgcolor: 'blue' }}><CameraAltIcon /></Avatar>
              <input onChange={upload} type="file" id="file" style={{ display: "none" }} name="file" accept="image/gif,image/jpeg,image/jpg,image/png" multiple="" data-original-title="upload photos" />
            </label>

          } >
          <Avatar sx={{ mt: '1.5rem', width: '10rem', height: '10rem' }} src={baseUrl + '/' + user.imageURL} />
        </Badge>


        {/* user Name */}
        <Box sx={{ display: 'flex', m: '2rem' }}>
          <PersonIcon pt={1} sx={{ color: 'white' }} />
          <Box sx={{ pl: '3%' }}>
            <Typography variant="subtitle2" color="#808080">Name</Typography>
            <Box display="flex" justifyContent="space-between">
              <Typography color="white"><b>{user ? user.Name : 'Name'}</b></Typography>
              <EditIcon onClick={e => setNameEdit(true)} sx={{ color: '#808080' }} />
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

        {/* Delete account */}
        <Box sx={{ display: 'flex', width: '23rem', ml: { xs: '4.1rem', sm: '1.4rem' }, mt: '3%', mr: { xs: '2.5rem', sm: '0.1rem' } }}>
          <Box>
            <Box sx={{ display: "flex", gap: '12rem' }}>
              <Typography color="red">Delete account </Typography>
              <DeleteForeverIcon onClick={handleDelete} sx={{ color: red[500], ml: 5 }} />
            </Box>
            <Typography variant="subtitle2" color="#808080">Delete your account permanentily.</Typography>
          </Box>
        </Box>


        {/* profile photo edit */}
        <Menu
          sx={{
            mt: '45px',
            [theme.breakpoints.up('sm')]: {
              ml: "-66%",
              mt: "10%"
            },

            [theme.breakpoints.down('sm')]: {
              ml: "-12%",
              mt: "30%"
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
          open={profilePhoto}
          onClose={e => setProfilePhoto(false)}
        >
          <MenuItem display='flex'>
            <UploadAndDisplayImage user={user} />
          </MenuItem>
        </Menu>



        {/* name edit */}

        <Menu
          sx={{
            mt: '45px',
            [theme.breakpoints.up('sm')]: {
              ml: "-66%",
              mt: "10%"
            },

            [theme.breakpoints.down('sm')]: {
              ml: "-12%",
              mt: "30%"
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
          open={nameEdit}
          onClose={e => setNameEdit(false)}
        >
          <MenuItem display='flex'>
            <EditName />
          </MenuItem>
        </Menu>
      </Box>


    </>
  );
}
