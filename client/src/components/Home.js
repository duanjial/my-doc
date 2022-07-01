import { React, useState, useEffect, useContext } from "react";
import NewDocModal from "./NewDocModal";
import DeleteDocModal from "./DeleteDocModal";
import DocumentCard from "./DocumentCard";
import { GlobalContext } from "../context/GlobalState";

export default function Home() {
  const [docs, setDocs] = useState([]);
  const { 
    isLoading, 
    documents, 
    getDocuments, 
    fetchError, 
    showNewDocModal, 
    toggleNewDocModal,
    showDeleteDocModal,
   } =
    useContext(GlobalContext);

  useEffect(() => {
    getDocuments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setDocs(documents);
  }, [documents]);

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
                <DocumentCard doc_id={doc.doc_id} doc_name={doc.doc_name} />
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <h2>You don't have any documents. Click below to create!</h2>
      )}
      <button
        type="button"
        className="btn btn-outline-secondary"
        onClick={() => handleCreate()}
      >
        New Document
      </button>
      { showDeleteDocModal && <DeleteDocModal /> }
      { showNewDocModal && <NewDocModal />}
    </div>
  );
  
  return home;
}
