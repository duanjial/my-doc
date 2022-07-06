import { React, useState, useEffect, useContext } from "react";
import NewDocModal from "./NewDocModal";
import ShareDocModal from "./ShareDocModal";
import DeleteDocModal from "./DeleteDocModal";
import SharedDocCard from "./SharedDocCard";
import DocumentCard from "./DocumentCard";
import { io } from "socket.io-client";
import { GlobalContext } from "../context/GlobalState";

export default function Home() {
  const [docs, setDocs] = useState([]);
  const [user, setUser] = useState();
  const { 
    isLoading, 
    userName,
    documents, 
    getDocuments, 
    fetchError, 
    socket,
    setSocket,
    showNewDocModal, 
    toggleNewDocModal,
    showDeleteDocModal,
    showShareDocModal,
   } =
    useContext(GlobalContext);

  useEffect(() => {
    if (socket == null) {
      setSocket(io(`http://carlo.local:3001`));
    }
    getDocuments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token) {
      setUser({"user_id": localStorage.getItem("userId"), "user_name": localStorage.getItem("userName")});
    }else {
      setUser();
    }
  }, [userName, token]);

  useEffect(() => {
    socket?.emit("new-user", localStorage.getItem("userId"));
  }, [socket, user]);

  useEffect(() => {
    setDocs(documents);
  }, [documents]);

  const handleCreate = () => {
    toggleNewDocModal();
  };

  var home;
  home = (
    <div className="dashboard">
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
          className="btn btn-outline-secondary btn-new-doc"
          onClick={() => handleCreate()}
        >
          New Document
        </button>
      </div>
      <div className="shared-doc">
        <h2>Documents shared with you</h2>
        <SharedDocCard />
      </div>
      { showDeleteDocModal && <DeleteDocModal /> }
      { showNewDocModal && <NewDocModal />}
      { showShareDocModal && <ShareDocModal /> }
    </div>
  );
  
  return home;
}
