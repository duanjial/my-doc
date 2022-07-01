import { useCallback, useEffect, useState, useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import React from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { io } from "socket.io-client";
import { useParams } from "react-router-dom";
import Dashboard from "./Dashboard";

const TOOLBAR_OPTIONS = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ font: [] }],
  [{ list: "ordered" }, { list: "bullet" }],
  ["bold", "italic", "underline"],
  [{ color: [] }, { background: [] }],
  [{ script: "sub" }, { script: "super" }],
  [{ align: ["justify", "center", "right", false] }],
  ["image", "blockquote", "code-block"],
  ["clean"],
];

const SAVE_INTERVAL_MS = 2000;

export default function TextEditor() {
  const { id: documentId } = useParams();
  const [socket, setSocket] = useState();
  const [quill, setQuill] = useState();
  const { updateUserList, users } = useContext(GlobalContext);

  const token = localStorage.getItem("token");
  const user_name = localStorage.getItem("userName");

  useEffect(() => {
    const s = io(`http://carlo.local:3001`);
    setSocket(s);
    return () => {
      s.emit("custom-disconnect", {"doc_id": documentId, "user_name": user_name});
      s.disconnect();
      updateUserList([]);
    };
  }, []);

  useEffect(() => {
    if (socket == null || quill == null) return;
    const handler = (delta, oldDelta, source) => {
      if (source !== "user") return;
      socket.emit("send-changes", {"doc_id": documentId, "delta": delta});
    };

    quill.on("text-change", handler);
    return () => {
      quill.off("text-change", handler);
    };
  }, [socket, quill, documentId]);

  useEffect(() => {
    if (socket == null || quill == null) return;
    const handler = (delta, oldDelta, source) => {
      quill.updateContents(delta);
    };
    socket.on("receive-changes", handler);
    return () => {
      quill.off("receive-changes", handler);
    };
  }, [socket, quill]);

  useEffect(() => {
    if (socket == null || quill == null) return;
    socket.on("update-user-list", (users) => {
      updateUserList(users);
    })
  }, [socket, quill, updateUserList]);

  useEffect(() => {
    if (socket == null || quill == null) return;

    socket.once("load-document", (document) => {
      quill.setContents(document);
      quill.enable();
    });
    socket.emit("get-document", {"doc_id": documentId, "user_name": user_name});
  }, [socket, quill, documentId, user_name]);

  useEffect(() => {
    if (socket == null || quill == null) return;
    const interval = setInterval(() => {
      socket.emit("save-document", {"doc_id": documentId, "content": quill.getContents()});
    }, SAVE_INTERVAL_MS);

    return () => {
      clearInterval(interval);
    };
  }, [socket, quill, documentId]);

  const wrapperRef = useCallback((wrapper) => {
    if (wrapper == null) return;
    wrapper.innerHTML = "";
    const editor = document.createElement("div");
    wrapper.append(editor);

    const q = new Quill(editor, {
      theme: "snow",
      modules: { toolbar: TOOLBAR_OPTIONS },
    });
    q.disable();
    q.setText("Loading...");
    setQuill(q);
  }, []);

  if (!token) {
    return <Dashboard />
  }
  return (
    <React.Fragment>
      <div>
        <ul className="ul-user">
          {users.map((user) => (
            <li className="li-user" key={user}>
              <p>{user}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className="container" ref={wrapperRef}></div>
    </React.Fragment>
  )
}
