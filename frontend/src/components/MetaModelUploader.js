// frontend/src/components/MetaModelUploader.js
import React, { useState } from 'react';
import axios from 'axios';
import './uploader.css'

function MetaModelUploader() {
  const [fileContent, setFileContent] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleFileRead = (e) => {
    const content = e.target.result;
    setFileContent(JSON.parse(content));
  };

  const handleFileChosen = (file) => {
    let fileReader = new FileReader();
    fileReader.onloadend = handleFileRead;
    fileReader.readAsText(file);
  };

  const handleUpload = () => {
    axios
      .post('http://localhost:5000/api/meta-model/upload', {
        fileContent,
        email,
        password,
      })
      .then((res) => alert(res.data.message))
      .catch((err) => alert(err.response.data.error));
  };

  // return (
  //   <div className="meta-model-uploader">
  //     <h2>Upload Meta-Model</h2>
  //     <input
  //       type="text"
  //       placeholder="Email"
  //       value={email}
  //       onChange={(e) => setEmail(e.target.value)}
  //     />
  //     <input
  //       type="password"
  //       placeholder="Password"
  //       value={password}
  //       onChange={(e) => setPassword(e.target.value)} 
  //     />
  //     <input
  //       type="file"
  //       accept=".json"
  //       onChange={(e) => handleFileChosen(e.target.files[0])}
  //     />
  //     <button onClick={handleUpload}>Upload</button>
  //   </div>
  // );

  return (
    <div className="uploader-container">
      {/* Left Section */}
      <div className="left-section">
        <h1>Upload Meta Model</h1>
      </div>

      {/* Right Section (Login Form) */}
      <div className="right-section">
        <div className="meta-model-uploader">
          <h2>Login to Upload</h2>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="file"
            accept=".json"
            onChange={(e) => handleFileChosen(e.target.files[0])}
          />
          <button onClick={handleUpload}>Upload</button>
        </div>
      </div>
    </div>
  );
}

export default MetaModelUploader;
