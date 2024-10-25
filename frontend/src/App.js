// frontend/src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MetaModelUploader from './components/MetaModelUploader';
import ChatInterface from './components/ChatInterface';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/upload-meta-model" element={<MetaModelUploader />} />
        <Route path="/" element={<ChatInterface />} />
      </Routes>
    </Router>
  );
}

export default App;
