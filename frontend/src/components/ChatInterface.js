// frontend/src/components/ChatInterface.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ChatBubble from './ChatBubble';
import Summary from './Summary';
import './chatInterface.css'

function ChatInterface() {
  const [messages, setMessages] = useState([]);
  const [metaModel, setMetaModel] = useState(null);
  const [userInput, setUserInput] = useState('');
  const [conversationOver, setConversationOver] = useState(false);
  const [summary, setSummary] = useState('');
  const [metaModelsList, setMetaModelsList] = useState([]);
  const [validResponses, setValidResponses] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/meta-model/list')
      .then((res) => {
        const metaModels = res.data.metaModels;
        setMetaModelsList(metaModels);

        const initialMessage = `Hello! Please select a meta-model to start: ${metaModels.join(', ')}`;
        setMessages([{ sender: 'bot', text: initialMessage }]);
      })
      .catch((err) => {
        console.error('Error fetching meta-model list:', err);
        setMessages([{ sender: 'bot', text: 'Error: Could not fetch meta-model list. Please try again later.' }]);
      });
  }, []);

  const startConversation = (selectedMetaModel) => {
    axios
      .post('http://localhost:5000/api/conversation/start', { metaModel: selectedMetaModel })
      .then((res) => {
        if (!res.data.metaModel) {
          throw new Error('MetaModel data is null or undefined');
        }
        setMetaModel(res.data.metaModel);
        const initialQuestion = `Hello! What type of report do you need? Here are the options: ${res.data.metaModel.report_types.map(rt => rt.label).join(', ')}.`;
        setMessages((prev) => [...prev, { sender: 'bot', text: initialQuestion }]);
      })
      .catch((err) => {
        console.error('Error starting conversation:', err);
        setMessages((prev) => [...prev, { sender: 'bot', text: 'Error: Could not start the conversation. Please try again.' }]);
      });
  };

  const handleUserInput = (e) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    const newMessages = [...messages, { sender: 'user', text: userInput }];
    setMessages(newMessages);

    processUserResponse(userInput, newMessages);
    setUserInput('');
  };

  const processUserResponse = (input, updatedMessages) => {
    const step = updatedMessages.filter((msg) => msg.sender === 'bot' && !msg.text.startsWith('Invalid input')).length;

    if (step === 1) {
      if (!metaModelsList.includes(input)) {
        setMessages((prev) => [
          ...prev,
          { sender: 'bot', text: 'Invalid meta-model selected. Please choose from the available options.' },
        ]);
        return;
      }
      startConversation(input);
      return;
    }

    let botResponse = '';
    let validOptions = [];
    let isValid = true;

    switch (step) {
      case 2:
        validOptions = metaModel?.report_types || [];
        botResponse = `Great choice! What visualization type would you prefer? Options: ${metaModel.visualization_types.map(vt => vt.label).join(', ')}.`;
        break;
      case 3:
        validOptions = metaModel?.visualization_types || [];
        botResponse = 'Do you need any filters applied? (e.g., date range, departments).';
        break;
      case 4:
        if (input.toLowerCase() !== 'yes' && input.toLowerCase() !== 'no') {
          setMessages((prev) => [
            ...prev,
            { sender: 'bot', text: 'Invalid input. Please respond with "Yes" or "No".' },
          ]);
          isValid = false;
        } else {
          botResponse = `Any sub-reports needed? Options: ${metaModel.sub_reports.map(sr => sr.label).join(', ')}.`;
        }
        break;
      case 5:
        validOptions = metaModel?.sub_reports || [];
        botResponse = `What data fields do you require? Options: ${metaModel.data_fields.map(df => df.label).join(', ')}.`;
        break;
      case 6:
        validOptions = metaModel?.data_fields || [];
        botResponse = `In which format would you like the report delivered? Options: ${metaModel.delivery_formats.map(df => df.label).join(', ')}.`;
        break;
      case 7:
        validOptions = metaModel?.delivery_formats || [];
        botResponse = `How frequently do you need this report? Options: ${metaModel.frequency.map(f => f.label).join(', ')}.`;
        break;
      case 8:
        validOptions = metaModel?.frequency || [];
        botResponse = 'Thank you! Type anything in the chat to generate a Summary.';
        break;
      case 9:
        if (isValid) {
          setValidResponses((prev) => [...prev, input]);
        }
        setMessages((prev) => [...prev, { sender: 'bot', text: botResponse }]);
        generateSummary();
        setConversationOver(true);
        return;
      default:
        botResponse = 'Invalid input.';
        isValid = false;
    }

    if (!conversationOver && validOptions.length > 0) {
      const validLabels = validOptions.map(option => option.label);
      if (!validLabels.includes(input)) {
        setMessages((prev) => [
          ...prev,
          { sender: 'bot', text: 'Invalid input. Please choose from the available options.' },
        ]);
        isValid = false;
      }
    }

    if (isValid) {
      setValidResponses((prev) => [...prev, input]);
    }

    if (!conversationOver && isValid) {
      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: 'bot', text: botResponse },
        ]);
      }, 500);
    }
  };

  const generateSummary = () => {
    const summaryText = `
    Report Type: ${validResponses[0] || 'N/A'}
    Visualization: ${validResponses[1] || 'N/A'}
    Filters: ${validResponses[2]?.toLowerCase() === 'yes' ? 'Yes' : 'No'}
    Sub-Reports: ${validResponses[3] || 'N/A'}
    Data Fields: ${validResponses[4] || 'N/A'}
    Delivery Format: ${validResponses[5] || 'N/A'}
    Frequency: ${validResponses[6] || 'N/A'}
    `;

    setSummary(summaryText);

    axios
      .post('http://localhost:5000/api/conversation/save', {
        userResponses: validResponses,
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
