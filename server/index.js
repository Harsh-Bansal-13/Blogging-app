const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const path = require("path");
const UserModel = require("./models/UserModel");
const PostModel = require("./models/PostModel");

const app = express();
mongoose.connect(
  "mongodb+srv://harshbansal:8571079766@cluster0.0euymhf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
);
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.static("public"));

const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json("The token is missing");
  } else {
    jwt.verify(token, "jwt-secret-key", (err, decoded) => {
      if (err) {
        return res.json("The token is wrong");
      } else {
        req.email = decoded.email;
        req.username = decoded.username;
        next();
      }
    });
  }
};

app.get("/status", verifyUser, (req, res) => {
  return res.json({ email: req.email, username: req.username });
});

app.post("/register", (req, res) => {
  const { username, email, password } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => {
      UserModel.create({ username, email, password: hash })
        .then((user) => res.json(user))
        .catch((err) => res.json(err));
    })
    .catch((err) => console.log(err));
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  console.log(email);
  UserModel.findOne({ email: email }).then((user) => {
    if (user) {
      bcrypt.compare(password, user.password, (err, response) => {
        if (response) {
          const token = jwt.sign(
            { email: user.email, username: user.username },
            "jwt-secret-key",
            { expiresIn: "1d" }
          );
          res.cookie("token", token);
          console.log("success");
          return res.json("Success");
        } else {
          console.log("Password is incorrect");
          return res.json("Password is incorrect");
        }
      });
    } else {
      console.log("User not exist");
      return res.json("User not exist");
    }
  });
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Public/Images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
});

app.post("/create", verifyUser, upload.single("file"), (req, res) => {
  console.log(req);
  PostModel.create({
    title: req.body.title,
    category: req.body.category,
    description: req.body.description,
    image: req.body.imageAsset,
    email: req.body.email,
  })
    .then((result) => res.json("Success"))
    .catch((err) => res.json(err));
});

app.get("/getposts", (req, res) => {
  PostModel.find()
    .then((posts) => res.json(posts))
    .catch((err) => res.json(err));
});

app.get("/getpostbyid/:id", (req, res) => {
  const id = req.params.id;
  PostModel.findById({ _id: id })
    .then((post) => res.json(post))
    .catch((err) => console.log(err));
});
app.get("/userposts/:email", async (req, res) => {
  try {
    const { email } = req.params;
    console.log("HArsh", email);
    const count = await PostModel.countDocuments({ email });
    console.log("harsh", count);
    res.json({ count });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});
app.put("/editpost/:id", (req, res) => {
  const id = req.params.id;
  PostModel.findByIdAndUpdate(
    { _id: id },
    {
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      image: req.body.imageAsset,
    }
  )
    .then((result) => res.json("Success"))
    .catch((err) => res.json(err));
});

app.delete("/deletepost/:id", (req, res) => {
  PostModel.findByIdAndDelete({ _id: req.params.id })
    .then((result) => res.json("Success"))
    .catch((err) => res.json(err));
});

app.get("/logout", (req, res) => {
  res.clearCookie("token");
  return res.json("Success");
});

app.listen(3001, () => {
  console.log("Server is Running");
});