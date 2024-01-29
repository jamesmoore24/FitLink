import React, { useState } from "react";

const ChatComponent = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleSend = () => {
    if (userInput.trim()) {
      const newMessage = { id: Date.now(), text: userInput, sender: "user" };
      setMessages([...messages, newMessage]);
      sendMessageToBot(userInput);
      setUserInput("");
    }
  };

  const sendMessageToBot = (userMessage) => {
    // Placeholder for sending message to RAG-based AI
    // This is where you would integrate with the AI service.
    // For now, we'll just mock a bot response.
    const botResponse = {
      id: Date.now(),
      text: "I'm a placeholder bot response.",
      sender: "bot",
    };

    // Simulate bot response delay
    setTimeout(() => {
      setMessages((prevMessages) => [...prevMessages, botResponse]);
    }, 1000);
  };

  return (
    <div className="fitbot-chat-container">
      <div className="fitbot-chat-messages">
        {messages.map((message) => (
          <div key={message.id} className={`message ${message.sender}`}>
            {message.text}
          </div>
        ))}
      </div>
      <div className="fitbot-chat-input">
        <input
          type="text"
          value={userInput}
          onChange={handleInputChange}
          placeholder="Type a message..."
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default ChatComponent;
