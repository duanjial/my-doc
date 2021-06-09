const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const Document = require("../schemas/Document");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");

// Register
router.post("/register", async (req, res, next) => {
  passport.authenticate("register", { session: false }, (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(400).json({ message: info.message });
    }
    return res.status(200).json({
      message: "Register successful",
    });
  })(req, res, next);
});

// Login
router.post("/login", async (req, res, next) => {
  passport.authenticate("login", async (err, user, info) => {
    try {
      if (err) {
        return next(error);
      }
      if (!user) {
        return res.status(400).json({ message: info.message });
      }
      req.login(user, { session: false }, async (error) => {
        if (error) return next(error);

        const body = { _id: user._id, name: user.name, email: user.email };
        const token = jwt.sign({ user: body }, "TOP_SECRET");

        return res.status(200).send({ token });
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
});

// Documents
router.get("/documents", async (req, res) => {
  const documents = await Document.find({ userId: req.user.id });
  res.status(200).json({ documents: documents.map((doc) => doc._id) });
});

// Delete document
router.delete("/documents/:id", async (req, res) => {
  const documentId = req.params.id;
  await Document.findByIdAndDelete(documentId, (err) => {
    if (err) {
      return res.status(200).json({ msg: "Document deleted falied" });
    } else {
      return res.status(200).json({ msg: "Document deleted" });
    }
  });
});

// Create document
router.get("/document", (req, res) => {
  const { id, name } = req.user;
  var docId = uuidv4();
  CreateDocument(docId, id);
  return res.status(200).send({ doc_id: docId });
});

router.get("/logout", function (req, res) {
  req.logout();
  return res.status(200).send({ msg: "logout success" });
  // res.redirect('/');
});

router.get("/getUser", (req, res) => {
  return res.status(200).send({ user: req.user });
});

async function CreateDocument(id, userId) {
  if (id == null) return;
  return await Document.create({ _id: id, data: defaultValue, userId: userId });
}
module.exports = router;
