// frontend/src/components/ChatInterface.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ChatBubble from './ChatBubble';
import Summary from './Summary';

function ChatInterface() {
  const [messages, setMessages] = useState([]);
  const [metaModel, setMetaModel] = useState(null);
  const [userInput, setUserInput] = useState('');
  const [conversationOver, setConversationOver] = useState(false);
  const [summary, setSummary] = useState('');

  useEffect(() => {
    axios
      .post('http://localhost:5000/api/conversation/start')
      .then((res) => {
        setMetaModel(res.data.metaModel);
        startConversation(res.data.metaModel);
      })
      .catch((err) => alert(err.response.data.error));
  }, []);

  const startConversation = (metaModel) => {
    const initialQuestion = `Hello! What type of report do you need? Here are the options: ${metaModel.report_types.join(
      ', '
    )}`;
    setMessages([{ sender: 'bot', text: initialQuestion }]);
  };

  const handleUserInput = (e) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    const newMessages = [...messages, { sender: 'user', text: userInput }];
    setMessages(newMessages);

    processUserResponse(userInput, newMessages);
    setUserInput('');
  };

  const processUserResponse = (input, messageHistory) => {
    // Simple state machine logic based on messageHistory length
    const step = messageHistory.filter((msg) => msg.sender === 'user').length;

    // Implement conversation logic based on step
    let botResponse = '';
    switch (step) {
      case 1:
        botResponse = `Great choice! What visualization type would you prefer? Options: ${metaModel.visualization_types.join(
          ', '
        )}`;
        break;
      case 2:
        botResponse = `Do you need any filters applied? (e.g., date range, departments)`;
        break;
      case 3:
        botResponse = `Any sub-reports needed? Options: ${metaModel.sub_reports.join(
          ', '
        )}`;
        break;
      case 4:
        botResponse = `What data fields do you require? Options: ${metaModel.data_fields.join(
          ', '
        )}`;
        break;
      case 5:
        botResponse = `In which format would you like the report delivered? Options: ${metaModel.delivery_formats.join(
          ', '
        )}`;
        break;
      case 6:
        botResponse = `How frequently do you need this report? Options: ${metaModel.frequency.join(
          ', '
        )}`;
        break;
      default:
        botResponse = `Thank you! Here is a summary of your report request.`;
        generateSummary();
        setConversationOver(true);
        break;
    }

    if (!conversationOver) {
      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: 'bot', text: botResponse },
        ]);
      }, 500);
    }
  };

  const generateSummary = () => {
    const userResponses = messages
      .filter((msg) => msg.sender === 'user')
      .map((msg) => msg.text);

    const summaryText = `
    Report Type: ${userResponses[0]}
    Visualization: ${userResponses[1]}
    Filters: ${userResponses[2]}
    Sub-Reports: ${userResponses[3]}
    Data Fields: ${userResponses[4]}
    Delivery Format: ${userResponses[5]}
    Frequency: ${userResponses[6]}
    `;

    setSummary(summaryText);

    // Save conversation
    axios
      .post('http://localhost:5000/api/conversation/save', {
        userResponses: userResponses,
        summary: summaryText,
      })
      .then((res) => console.log(res.data.message))
      .catch((err) => console.error(err));
  };

  return (
    <div className="chat-interface">
      <h2>Report Requirement Chat</h2>
      <div className="chat-window">
        {messages.map((msg, index) => (
          <ChatBubble key={index} message={msg} />
        ))}
      </div>
      {!conversationOver ? (
        <form onSubmit={handleUserInput} className="chat-input">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Type your response..."
          />
          <button type="submit">Send</button>
        </form>
      ) : (
        <Summary summary={summary} />
      )}
    </div>
  );
}

export default ChatInterface;
