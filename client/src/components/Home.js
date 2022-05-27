import { React, useState, useEffect, useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import { Link, useHistory } from "react-router-dom";

export default function Home() {
  const [doc, setDoc] = useState([]);
  const { isLoading, documents, getDocuments, fetchError, deleteDocument, createDocument } =
    useContext(GlobalContext);
  const history = useHistory();

  useEffect(() => {
    getDocuments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setDoc(documents);
  }, [documents]);

  function handleDelete(id) {
    deleteDocument(id);
    setDoc(documents);
  }

  const handleCreate = () => {
    createDocument(history);
  };

  var home;
  home = (
    <div className="container-docs">
      {isLoading ? (
        <div>Loading...</div>
      ) : fetchError ? (
        <div>Error occured! </div>
      ) : documents && documents.length ? (
        <div>
          <h2>Here are all your documents</h2>
          <ul>
            {doc.map((doc) => (
              <li className="li-doc" key={doc}>
                <Link to={`/documents/${doc}`}>{doc}</Link>
                <button
                  type="button"
                  className="btn btn-danger btn-sm btn-delete"
                  onClick={() => handleDelete(doc)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <h2>You don't have any documents. Click below to create!</h2>
      )}
      <button
        type="button"
        className="btn btn-success btn-new"
        onClick={() => handleCreate()}
      >
        New Document
      </button>
    </div>
  );
  
  return home;
}
