import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from '../axios'
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';
import { useForm } from 'react-hook-form'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Tooltip } from 'reactstrap';
import { useState } from 'react';
import { baseUrl } from '../url'
import {useNavigate} from 'react-router-dom'
import { Backdrop, CircularProgress } from '@mui/material';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignUp() {

  const [email, setEmail] = useState()
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [open,setOpen]=useState(false)
  const toggle = () => setTooltipOpen(!tooltipOpen);
  const { register, handleSubmit, formState: { errors } } = useForm({ mode: "onBlur" });
  const navigate = useNavigate()

  const handleClose = () => {
    setOpen(false);
  };

  const handleSignup = (data) => {
    setOpen(!open);
    axios.post(`${baseUrl}/signup`, data, { withCredentials: true }).then((response) => {
      if (response.data.userCreated) {
        navigate('/')
      } else {
        setEmail(true)
      }
    })
  };
  const handleLogin = () => {
    navigate('/')
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <ForumOutlinedIcon />
            </Avatar>
            <Typography sx={{ component: "h1", variant: "h5", color: "secondary.main" }}>CHIT CHAT</Typography>
          </Box>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit(handleSignup)} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                {errors.firstName ? <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label={errors.firstName ? "Required" : "First Name"}
                  autoFocus
                  error
                  {...register('firstName', { required: true })}
                /> :
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label={errors.firstName ? "Required" : "First Name"}
                    autoFocus
                    {...register('firstName', { required: true })}
                  />}
              </Grid>

              <Grid item xs={12} sm={6}>
                {errors.lastName ? <TextField
                  required
                  fullWidth
                  id="lastName"
                  label={errors.lastName ? "Required" : "Last Name"}
                  name="lastName"
                  autoComplete="family-name"
                  error
                  {...register('lastName', { required: true })}
                /> : <TextField
                  required
                  fullWidth
                  id="lastName"
                  label={errors.lastName ? "Required" : "Last Name"}
                  name="lastName"
                  autoComplete="family-name"
                  {...register('lastName', { required: true })}
                />}
              </Grid>
              {email ? <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email already used"
                  name="email"
                  autoComplete="email"
                  error
                  {...register("email", { required: true, pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ })}
                />
              </Grid> : <><Grid item xs={12}>
                {errors.email ? <TextField
                  required
                  fullWidth
                  id="email"
                  label="Invalid email"
                  name="email"
                  autoComplete="email"
                  error
                  {...register("email", { required: true, pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ })}
                /> : <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"

                  {...register("email", { required: true, pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ })}
                />}
              </Grid></>}
              <Grid item xs={12}>
                {errors.password ? <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  error
                  {...register("password", { required: true, pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/ })}
                /> : <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  {...register("password", { required: true, pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/ })}
                />}
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link onClick={handleLogin} href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
          <Tooltip
            isOpen={tooltipOpen}
            target="password"
            toggle={toggle}
          >
            It contain min one number<br />one capital and small letter <br />legnth min 6 to max 15
          </Tooltip>
        </Box>
        <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}

