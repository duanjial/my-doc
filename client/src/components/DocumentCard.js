import { React, useContext } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../context/GlobalState";

export default function DocumentCard(props) {
    const { 
        toggleDeleteDocModal,
        toggleShareDocModal,
       } =
        useContext(GlobalContext);
    const { doc_id, doc_name } = props;

    function handleDelete(doc_id, doc_name) {
       toggleDeleteDocModal(doc_id, doc_name);
    };

    const handleShare = (doc_id, doc_name) => {
        console.log(doc_id);
        toggleShareDocModal(doc_id, doc_name);
    };
    
    return (
        <div className="card doc-card">
            <div className="card-body">
                <h3 className="card-title">
                    <i className="fa-solid fa-file-lines doc-icon"></i>
                    <Link className="card-title doc-link" to={`/documents/${doc_id}`}>{doc_name}</Link>
                </h3>
                <h6 className="card-subtitle mb-2 text-muted">Opened 1 hour ago</h6>
                <p className="card-text">Preview of content ...</p>
                <div className="options">
                  <button className="btn-option" onClick={() => handleDelete(doc_id, doc_name)}>
                    <i className="fa-solid fa-trash-can"></i>
                  </button>
                  <button className="btn-option" onClick={() => handleShare(doc_id, doc_name)}>
                    <i className="fa-solid fa-share-nodes"></i>
                  </button>
                </div>
            </div>
        </div>
    )
}
