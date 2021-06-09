const express = require("express");
const router = express.Router();
const Document = require("../schemas/Document");
const { v4: uuidv4 } = require("uuid");

// Documents
router.get("/documents", async (req, res) => {
  const documents = await Document.find({ userId: req.user._id });
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
  var docId = uuidv4();
  CreateDocument(docId, req.user._id);
  return res.status(200).send({ doc_id: docId });
});

router.get("/getUser", (req, res) => {
  return res.status(200).send({ user: req.user });
});

async function CreateDocument(id, userId) {
  if (id == null) return;
  return await Document.create({ _id: id, data: "", userId: userId });
}

module.exports = router;
