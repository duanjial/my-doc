require("dotenv").config();
const mongoose = require("mongoose");
const Document = require("./Document");
const MongoClient = require("mongodb").MongoClient;
const cors = require("cors");

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.hy6km.mongodb.net/google-docs?retryWrites=true&w=majority`;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const app = require("express")();
app.use(cors());
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

app.get("/api", (req, res) => {
  res.json({ msg: "hello from home page" });
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
