// frontend/src/components/MetaModelUploader.js
import React, { useState } from 'react';
import axios from 'axios';

function MetaModelUploader() {
  const [fileContent, setFileContent] = useState('');

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
      .post('http://localhost:5000/api/meta-model/upload', fileContent)
      .then((res) => alert(res.data.message))
      .catch((err) => alert(err.response.data.error));
  };

  return (
    <div className="meta-model-uploader">
      <h2>Upload Meta-Model</h2>
      <input
        type="file"
        accept=".json"
        onChange={(e) => handleFileChosen(e.target.files[0])}
      />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}

export default MetaModelUploader;
