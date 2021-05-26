import { React, useState, useEffect } from "react";
import axios from "axios";

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

  return (
    <div>
      <h1>Home Page</h1>
      <ul>
        {loading ? (
          <div>Loading...</div>
        ) : hasError ? (
          <div>Error occured!</div>
        ) : (
          documents.map((doc) => <li key={doc}>{doc}</li>)
        )}
      </ul>
    </div>
  );
}
