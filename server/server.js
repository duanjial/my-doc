require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const Document = require("./Document");
const bcrypt = require("bcryptjs");
const User = require("./User");
const cors = require("cors");

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.hy6km.mongodb.net/google-docs?retryWrites=true&w=majority`;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const app = require("express")();

// cors middleware
app.use(cors());

// Express body parser
app.use(express.json());

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
  const documents = await Document.find();
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

app.post("/register", (req, res) => {
  const { name, email, password, password2 } = req.body;
  let errors = [];

  if (!name || !email || !password || !password2) {
    errors.push({ msg: "Please enter all fields" });
  }

  if (password != password2) {
    errors.push({ msg: "Passwords do not match" });
  }

  if (password.length < 6) {
    errors.push({ msg: "Password must be at least 6 characters" });
  }

  if (errors.length > 0) {
    // res.render('register', {
    //   errors,
    //   name,
    //   email,
    //   password,
    //   password2
    // });
    console.log(errors);
  } else {
    User.findOne({ email: email }).then((user) => {
      if (user) {
        errors.push({ msg: "Email already exists" });
        // res.render("register", {
        //   errors,
        //   name,
        //   email,
        //   password,
        //   password2,
        // });
        console.log(errors);
      } else {
        const newUser = new User({
          name,
          email,
          password,
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then((user) => {
                // req.flash(
                //   "success_msg",
                //   "You are now registered and can log in"
                // );
                // res.redirect("/users/login");
                console.log(user);
              })
              .catch((err) => console.log(err));
          });
        });
      }
    });
  }
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
