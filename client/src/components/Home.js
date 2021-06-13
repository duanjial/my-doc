import { React, useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";

export default function Home() {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [created, setCreated] = useState(false);
  const [docId, setDocId] = useState("");

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      await axios
        .get("http://localhost:3001/documents", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          setDocuments(res.data.documents);
          setLoading(false);
        })
        .catch((err) => {
          setHasError(true);
          setLoading(false);
        });
    };
    fetchData();
  }, []);

  function handleDelete(id) {
    axios
      .delete(`http://localhost:3001/documents/${id}`)
      .then((res) => {
        console.log(res);
        setDocuments(documents.filter((document) => document !== id));
      })
      .catch((err) => console.log(err));
  }

  const handleCreate = () => {
    console.log("creating document");
    axios
      .get("http://localhost:3001/document")
      .then((res) => {
        setDocId(res.data.doc_id);
        setCreated(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  var home;
  if (created) {
    home = <Redirect to={`/documents/${docId}`} />;
  } else {
    home = (
      <div>
        <h2>Here are all your documents</h2>
        <ul>
          {loading ? (
            <div>Loading...</div>
          ) : hasError ? (
            <div>Error occured!</div>
          ) : (
            documents.map((doc) => (
              <li key={doc}>
                <Link to={`/documents/${doc}`}>{doc}</Link>
                <button
                  type="button"
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(doc)}
                >
                  Delete
                </button>
              </li>
            ))
          )}
        </ul>
        <button
          type="button"
          className="btn btn-success"
          onClick={() => handleCreate()}
        >
          New Document
        </button>
      </div>
    );
  }
  return home;
}
