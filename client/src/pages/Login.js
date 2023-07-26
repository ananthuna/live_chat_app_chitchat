import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import ForumOutlinedIcon from "@mui/icons-material/ForumOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "../axios";
import "../components/background/bg.css";
import { baseUrl } from "../url";
import { useNavigate } from "react-router-dom";
import { Backdrop, CircularProgress } from "@mui/material";
import "animate.css";
import "./style.css";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function SignIn({ socket }) {
  const navigate = useNavigate();
  const [genter, setGenter] = useState("");
  const [borderF, setBorderF] = useState(0);
  const [borderM, setBorderM] = useState(0);
  const [url, setUrl] = useState("");
  const [message, setMessage] = useState("");
  const [gen, setGen] = useState(true);
  const [open, setOpen] = useState(false);
  const male = "public/male.jpeg";
  const female = "public/female.jpg";

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    let user = localStorage.getItem("user");
    if (user) return navigate("/chatpage");
  }, [navigate]);

  const handleLogin = (event) => {
    event.preventDefault();
    setOpen(!open);
    const data = new FormData(event.currentTarget);
    const loginData = {
      Name: data.get("name"),
      Genter: genter,
      imageURL: url,
    };
    if (!loginData.Name) return setMessage("User name required!");
    if (!genter) return setGen(false);
    console.log(baseUrl);

    axios
      .post(`${baseUrl}/login`, loginData, { withCredentials: true })
      .then((res) => {
        console.log(res.data);
        if (res.data.msg) return setMessage(res.data.msg);
        localStorage.setItem("user", JSON.stringify(res.data));
        if (res.data) navigate("/chatpage");
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            position: "fixed",
            bgcolor: "rgba(43, 42, 42, 0.658)",
            width: "88rem",
            height: "100%",
            ml: "-32rem",
            mt: "-7.5rem",
            zIndex: -100,
            backgroundImage: `url('https://wallpaper-mania.com/wp-content/uploads/2018/09/High_resolution_wallpaper_background_ID_77701416268.jpg')`,
          }}
        ></Box>
        <Box
          className="menu"
          sx={{
            marginTop: 15,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Avatar sx={{ m: 1, bgcolor: "#808080" }}>
              <ForumOutlinedIcon />
            </Avatar>
            <Typography
              className="animate__zoomIn"
              sx={{ component: "h1", variant: "h5", color: "white" }}
            >
              <b>CHIT CHAT</b>
            </Typography>
          </Box>
          <Box
            component="form"
            onSubmit={handleLogin}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="User Name"
              name="name"
              autoComplete="off"
              autoFocus
              sx={{
                "& label.Mui-focused": {
                  color: "white",
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "white",
                  },
                  "&:hover fieldset": {
                    borderColor: "white",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "white",
                  },
                },
                "& .MuiInputBase-root": {
                  color: "white",
                },
              }}
              onChange={() => setMessage("")}
            />
            {message && (
              <Typography sx={{ color: "red" }}>{message}</Typography>
            )}
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "1rem",
                mt: "1rem",
              }}
            >
              <Avatar
                alt="Remy Sharp"
                src={baseUrl + "/" + female}
                variant="rounded"
                onClick={() => {
                  setGen(true);
                  setGenter("female");
                  setUrl(female);
                  setBorderF(2);
                  setBorderM(0);
                }}
                sx={{ width: 100, height: 100, border: borderF }}
              />
              <Avatar
                alt="Remy Sharp"
                src={baseUrl + "/" + male}
                variant="rounded"
                onClick={() => {
                  setGen(true);
                  setGenter("male");
                  setUrl(male);
                  setBorderF(0);
                  setBorderM(2);
                }}
                sx={{ width: 100, height: 100, border: borderM }}
              />
            </Box>
            <Box sx={{ mt: "1rem" }}>
              {!gen && (
                <Typography sx={{ color: "red" }}>
                  Select your genter!
                </Typography>
              )}
            </Box>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              LOGIN
            </Button>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Box>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
          onClick={handleClose}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </Container>
    </ThemeProvider>
  );
}
