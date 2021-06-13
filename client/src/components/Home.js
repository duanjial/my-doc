import { React, useState, useEffect, useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";

export default function Home() {
  const [created, setCreated] = useState(false);
  const [docId, setDocId] = useState("");
  const { documents, getDocuments, fetchError } = useContext(GlobalContext);

  useEffect(() => {
    getDocuments();
  }, []);

  function handleDelete(id) {
    axios
      .delete(`http://localhost:3001/documents/${id}`)
      .then((res) => {
        console.log(res);
        // setDocuments(documents.filter((document) => document !== id));
      })
      .catch((err) => console.log(err));
  }

  const handleCreate = () => {
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
        {fetchError ? (
          <div>Error occured! </div>
        ) : documents && documents.length ? (
          <h2>Here are all your documents</h2>
        ) : (
          <h2>You don't have any documents. Click below to create!</h2>
        )}
        <ul>
          {documents.map((doc) => (
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
          ))}
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
