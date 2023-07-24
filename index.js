const express = require("express");
const app = express();
const path = require("path");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const fs = require("fs");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const { checkFileType } = require("./controllers/fileCheck");
const { userImageUpdate } = require("./controllers/userImageUpdate");
const port = 3000;
const option = {
  origin: "http://localhost:3000",
  credentials: true,
  methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
};

app.use(cors(option));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, "/client/build")));
app.use("/public", express.static(path.join(__dirname, "public")));

const server = http.createServer(app);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  },
});

//socket connection
const io = new Server(server, { cors: { origin: "*" } });

let activeUser = [
  {
    Name: "Manu",
    Genter: "male",
    imageURL:
      "public/male.jpeg",
  },
  {
    Name: "Lakshmi",
    Genter: "male",
    imageURL:
      "public/female2.jpg",
  },
  {
    Name: "Rose",
    Genter: "male",
    imageURL:
      "public/female3.jpeg",
  },
];
let login = false;

//routers
app.post("/login", async (req, res) => {
  console.log(req.body);

  console.log("login...");
  const user = activeUser.find((item) => item.Name === req.body.Name);
  if (user) return res.send({ msg: "Name is already used!" });
  login = true;
  res.send(req.body);
});

app.post("/logout", async (req, res) => {
  console.log("/logout");
  console.log(req.body);
  const array = activeUser.filter((item) => item.Name !== req.body.Name);
  activeUser = [...array];
  console.log(activeUser);

  res.send({ logoutGranted: true });
});

app.post("/imageUpdate", upload.single("file"), (req, res) => {
  console.log("image uploading");
  if (req.file) {
    // console.log(JSON.parse(req.body.user) );
    const user = userImageUpdate(JSON.parse(req.body.user), req.file.path);
    res.status(200).send(user);
  } else {
    res.status(400).send("Please upload a valid image");
  }
  // await upload(req, res, async (err) => {
  //   if (err) {
  //     res.sendStatus(500);
  //   }
  //   // activeUser.forEach((each, i) => {
  //   //     if(each.)
  //   // })

  //   if (fs.existsSync(doc.imageUrl)) {
  //     console.log("file exist");
  //     fs.unlinkSync(doc.imageUrl);
  //   }
  //   res.send({ imageURL: req.file.path });
  // });
});

// app.post('/nameUpdate', async (req, res) => {
//     console.log('/nameUpdate');
//     await collectionUser.findOneAndUpdate({ _id: req.session.user._id }, { $set: { firstName: req.body.name } }).
//         then((doc) => {
//             console.log(doc)

//         })
//     console.log('activeuser');
//     await collectionActiveUsers.findOneAndUpdate({ userId: req.session.user._id }, { $set: { userName: req.body.name } }).then((doc) => {
//         console.log(doc);
//     })

// })

// app.get('/delete', async (req, res) => {
//     console.log('/delete');
//     await collectionUser.findOneAndDelete({ _id: req.session.user._id }).then(async (doc) => {
//         await collectionActiveUsers.findOneAndDelete({ userId: req.session.user._id }).then((doc) => {

//             res.send({ deleteGranted: req.session.loginAuth })

//         })
//     })
// })

app.get("/chatpage", (req, res) => {
  res.sendFile(path.join(__dirname, "/client/build/index.html"), (err) => {
    if (err) {
      res.status(500).send(err);
    }
  });
});

//socket connection
io.on("connection", async (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);

  socket.on("private message", (Data) => {
    const data = { ...Data, id: uuidv4() };
    io.emit(data.from, data);
    io.emit(data.to, data);
  });

  socket.on("typing", ({ type, to }) => {
    io.emit(`type${to}`, { type });
  });

  socket.on("newUser", (data) => {
    if (data) {
      let Data = { ...data, socketID: socket.id };
      const oldUser = activeUser.find((item) => item.Name === data.Name);
      if (!oldUser) activeUser.push(Data);
    }
    io.emit("activeUser", activeUser);
  });

  socket.on("newMsg", (data) => console.log(data));

  socket.on("disconnect", async () => {
    console.log("🔥: A user disconnected");
    const array = activeUser.filter((item) => item.socketID !== socket.id);
    activeUser = [...array];
    socket.disconnect();
  });
});

//server
server.listen(port, () => {
  console.log(`server is running on port ${port}......`);
});
