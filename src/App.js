import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Chatbot from "./components/Chatbot";


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<h1>Hello World</h1>} />
      </Routes>
      <Chatbot />
    </Router>
  );
};

export default App;
