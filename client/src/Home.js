import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { v4 as uuidV4 } from "uuid";

export default function Home() {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      await axios
        .get("http://localhost:3001/documents")
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

  function handleClick(id) {
    axios
      .delete(`http://localhost:3001/documents/${id}`)
      .then((res) => {
        console.log(res);
        setDocuments(documents.filter((document) => document !== id));
      })
      .catch((err) => console.log(err));
  }

  return (
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
              <button onClick={() => handleClick(doc)}>Delete</button>
            </li>
          ))
        )}
      </ul>
      <Link to={`/documents/${uuidV4()}`}>New Document</Link>
    </div>
  );
}
