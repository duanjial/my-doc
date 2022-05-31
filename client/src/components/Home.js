import { React, useState, useEffect, useContext } from "react";
import NewDocModal from "./NewDocModal";
import { GlobalContext } from "../context/GlobalState";
import { Link } from "react-router-dom";

export default function Home() {
  const [docs, setDocs] = useState([]);
  const { isLoading, documents, getDocuments, fetchError, deleteDocument, showNewDocModal, toggleNewDocModal } =
    useContext(GlobalContext);

  useEffect(() => {
    getDocuments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setDocs(documents);
  }, [documents]);

  function handleDelete(id) {
    deleteDocument(id);
    setDocs(documents);
  }

  const handleCreate = () => {
    toggleNewDocModal();
  };

  const handleShare = (id) => {
    console.log(id);
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
            {docs.map((doc) => (
              <li className="li-doc" key={doc.doc_id}>
                <Link className="doc-link" to={`/documents/${doc.doc_id}`}>{doc.doc_name}</Link>
                <div className="options">
                  <button className="btn-option" onClick={() => handleDelete(doc.doc_id)}>
                    <i className="fa-solid fa-trash-can"></i>
                  </button>
                  <button className="btn-option" onClick={() => handleShare(doc.doc_id)}>
                    <i className="fa-solid fa-share-nodes"></i>
                  </button>
                </div>
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
      { showNewDocModal && <NewDocModal />}
    </div>
  );
  
  return home;
}
