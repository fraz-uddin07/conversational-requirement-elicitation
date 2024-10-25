// frontend/src/components/ChatBubble.js
import React from 'react';

function ChatBubble({ message }) {
  return (
    <div className={`chat-bubble ${message.sender}`}>
      <p>{message.text}</p>
    </div>
  );
}

export default ChatBubble;
