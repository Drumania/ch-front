import { useState } from "react";
import "./App.css";
import Layout from "./components/Layout";
import { Client } from "appwrite";

function App() {
  const client = new Client();
  client.setProject("66e24eba003d137710bb");
  
  return (
    <>
      <Layout />
    </>
  );
}

export default App;
