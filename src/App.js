import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Chatbot from "./components/Chatbot";


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<></>} />
      </Routes>
      <Chatbot />
    </Router>
  );
};

export default App;
