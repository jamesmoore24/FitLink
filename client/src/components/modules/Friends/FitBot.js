import React, { useState, useEffect, useRef } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { get, post } from "../../../utilities";
import "./FitBot.css";

import Profile from "../../../public/default_profile.png";
import FitBot from "../../../public/fitbot.png";

const ChatComponent = () => {
  const [messages, setMessages] = useState([]);
  const [postText, setPostText] = useState("");
  const [fadingOutIndex, setFadingOutIndex] = useState(null);
  const [user, setUser] = useState(undefined);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]); // Runs whenever the messages array changes

  const [suggestions, setSuggestions] = useState([
    "Hello",
    "How can I help you?",
    "What is your query?",
    "Please type your question",
  ]);

  useEffect(() => {
    get("/api/whoami").then((user) => {
      setUser(user);
    });
  }, []);

  const handleSend = () => {
    if (postText.trim()) {
      const newMessage = { id: Date.now(), text: postText, sender: "user" };
      setMessages([...messages, newMessage]);
      sendMessageToBot(postText);
      setPostText("");
    }
  };

  const ChatBubble = ({ text, isUser, imgSrc }) => (
    <div className={`chat-message ${isUser ? "user" : "bot"}`}>
      <img
        src={isUser ? user.profile_picture : FitBot}
        alt="Profile"
        className="chat-bubble-image"
      />
      <div className="chat-bubble-container">
        <div className={`chat-bubble-username ${isUser ? "user" : "bot"}`}>
          {isUser ? user.name : "FitBot"}
        </div>
        <div className={`chat-bubble ${isUser ? "user" : "bot"}`}>{text}</div>
      </div>
    </div>
  );

  const sendMessageToBot = (userMessage) => {
    // Placeholder for sending message to RAG-based AI
    // This is where you would integrate with the AI service.
    // For now, we'll just mock a bot response.
    const botResponse = {
      id: Date.now(),
      text: "I'm a placeholder bot response.I'm a placeholder bot response.",
      sender: "bot",
      imgSrc: FitBot,
    };

    // Simulate bot response delay
    setTimeout(() => {
      setMessages((prevMessages) => [...prevMessages, botResponse]);
    }, 1000);
  };

  const removeSuggestion = (indexToRemove) => {
    // Mark the suggestion as fading out
    setFadingOutIndex(indexToRemove);

    setPostText(suggestions[indexToRemove]);

    // Then, after a delay, remove the suggestion from the list
    setTimeout(() => {
      setSuggestions((currentSuggestions) =>
        currentSuggestions.filter((_, index) => index !== indexToRemove)
      );
      // Reset the fadingOutIndex since the item is now removed
      setFadingOutIndex(null);
    }, 500); // The timeout duration should match your CSS transition-duration
  };

  return (
    <>
      <div className="fitbot-chat-container">
        {messages.length > 0 ? (
          <div className="fitbot-chat-messages">
            {messages.map((message) => (
              <ChatBubble key={message.id} text={message.text} isUser={message.sender === "user"} />
            ))}
            <div ref={messagesEndRef} /> {/* Invisible element at the end of the messages */}
          </div>
        ) : (
          <div className="fitbot-chat-container">
            <div className="fitbot-chat-empty-text">Try asking a fitness-related question!</div>
          </div>
        )}
      </div>
      <div className="fitbot-chatSuggestion-container">
        {suggestions.map((suggestion, index) => (
          <div
            key={index}
            className={`fitbot-chatSuggestion ${fadingOutIndex === index ? "fading-out" : ""}`}
            onClick={() => removeSuggestion(index)}
          >
            {suggestion}
          </div>
        ))}
      </div>
      <div className="fitbot-addCommentBox">
        <input
          className="fitbot-addCommentInput"
          placeholder="Ask a question.."
          value={postText} // Bind the input value to the state variable
          onChange={(e) => {
            setPostText(e.target.value);
          }} // Handle input changes
        />
        <button className="fitbot-addCommentPost" onClick={handleSend}>
          Post
        </button>
      </div>
    </>
  );
};

export default ChatComponent;
