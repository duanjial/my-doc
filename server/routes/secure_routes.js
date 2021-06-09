const express = require("express");
const router = express.Router();

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

router.get("/profile", (req, res, next) => {
  res.json({
    message: "You made it to the secure route",
    user: req.user,
    token: req.query.secret_token,
  });
});

router.get("/getUser", (req, res) => {
  return res.status(200).send({ user: req.user });
});

async function CreateDocument(id, userId) {
  if (id == null) return;
  return await Document.create({ _id: id, data: defaultValue, userId: userId });
}

module.exports = router;
