// frontend/src/components/Summary.js
import React from 'react';

function Summary({ summary }) {
  const handleSendToUser = () => {
    alert('Summary sent to Priyamwada!');
  };

  return (
    <div className="summary">
      <h3>Report Request Summary</h3>
      <pre>{summary}</pre>
      <button onClick={handleSendToUser}>Send to Priyamwada</button>
    </div>
  );
}

export default Summary;