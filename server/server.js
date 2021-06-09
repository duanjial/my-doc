require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const Document = require("./schemas/Document");
const bcrypt = require("bcryptjs");
const cookie = require("cookie-parser");
const User = require("./schemas/User");
const cors = require("cors");
const flash = require("connect-flash");
var session = require("express-session");
var passport = require("passport");
const { v4: uuidv4 } = require("uuid");
const routes = require("./routes/routes");

// passport config
require("./auth/passport")(passport);

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.hy6km.mongodb.net/google-docs?retryWrites=true&w=majority`;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const app = require("express")();

// cors middleware
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// Express body parser
app.use(express.json());

// Connect flash
app.use(flash());

// Express session
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(cookie("secret"));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use("/", routes);

const httpServer = require("http").createServer(app);

const io = require("socket.io")(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

const defaultValue = "";

io.on("connection", (socket) => {
  socket.on("get-document", async (documentId) => {
    const document = await findOrCreateDocument(documentId);
    socket.join(documentId);
    socket.emit("load-document", document.data);

    socket.on("send-changes", (delta) => {
      socket.broadcast.to(documentId).emit("receive-changes", delta);
    });

    socket.on("save-document", async (data) => {
      await Document.findByIdAndUpdate(documentId, { data });
    });
  });
});

app.get("/documents", async (req, res) => {
  const documents = await Document.find({ userId: req.user.id });
  res.status(200).json({ documents: documents.map((doc) => doc._id) });
});

app.delete("/documents/:id", async (req, res) => {
  const documentId = req.params.id;
  await Document.findByIdAndDelete(documentId, (err) => {
    if (err) {
      return res.status(200).json({ msg: "Document deleted falied" });
    } else {
      return res.status(200).json({ msg: "Document deleted" });
    }
  });
});

app.get("/logout", function (req, res) {
  req.logout();
  return res.status(200).send({ msg: "logout success" });
  // res.redirect('/');
});

app.get("/getUser", (req, res) => {
  return res.status(200).send({ user: req.user });
});

// create document
app.get("/document", (req, res) => {
  const { id, name } = req.user;
  var docId = uuidv4();
  CreateDocument(docId, id);
  return res.status(200).send({ doc_id: docId });
});

httpServer.listen(3001, () => {
  console.log("Listening on port 3001");
});

async function findOrCreateDocument(id) {
  if (id == null) return;
  const document = await Document.findById(id);
  if (document) return document;
  return await Document.create({ _id: id, data: defaultValue });
}

async function CreateDocument(id, userId) {
  if (id == null) return;
  return await Document.create({ _id: id, data: defaultValue, userId: userId });
}
