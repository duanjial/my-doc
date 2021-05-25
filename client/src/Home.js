import React from "react";
import { useEffect } from "react";
import fetchHome from "./utils";

export default function Home() {
  useEffect(() => {
    fetchHome();
  }, []);
  return <div>Home Page</div>;
}
