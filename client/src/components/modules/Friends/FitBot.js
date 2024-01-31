import React, { useState, useEffect, useRef } from "react";
import { get, post } from "../../../utilities";
import "./FitBot.css";

import Profile from "../../../public/default_profile.png";
import FitBot from "../../../public/fitbot.png";

/**
 */
const ChatComponent = (props) => {
  const [postText, setPostText] = useState("");
  const [fadingOutIndex, setFadingOutIndex] = useState(null);
  const messagesEndRef = useRef(null);
  const [runnable, setRunnable] = useState(true);
  const [suggestions, setSuggestions] = useState([
    "What are some exercises you'd recommend to a beginner?",
    "What are the best ways to increase endurance?",
    "How many times should I be lifting a week to build muscle?",
    "What are the essential stretches to do before starting a workout?",
    "How can I improve my balance and coordination through exercise?",
    "What is the most effective way to lose weight through cardio exercises?",
    "Can you suggest some low-impact exercises suitable for people with joint pain?",
    "What are the key nutritional considerations for someone starting a fitness routine?",
    "How often should I incorporate rest days into my exercise routine?",
    "What are some effective core strengthening exercises for beginners?",
    "How can I safely increase the intensity of my workouts over time?",
    "What are some tips for maintaining motivation and consistency in a workout plan?",
    "Can you recommend any beginner-friendly yoga poses for stress relief?",
    "What type of cardio exercises are best for heart health?",
    "How can I effectively target and strengthen my lower back muscles?",
    "What are some good exercises to improve posture?",
    "Could you recommend a beginner's guide to weightlifting?",
    "How long does it typically take to see results from a regular exercise routine?",
    "What are some safe exercises for pregnant women?",
    "Are there specific exercises that help with anxiety and stress reduction?",
    "How can I build a simple but effective home workout routine?",
    "What’s the best way to warm up before intense physical activity?",
    "How important is stretching after workouts, and what stretches do you recommend?",
    "Can you suggest a weekly exercise plan for someone with a busy schedule?",
    "What exercises are most effective for toning arms and legs?",
    "How can I increase my flexibility and range of motion?",
    "What are some common mistakes beginners make in their workout routines?",
    "Are there specific exercises that can help improve sleep quality?",
    "How can I track my fitness progress effectively?",
    "What’s the role of hydration in physical fitness?",
    "How do I choose the right type of running shoes?",
    "What are the benefits of high-intensity interval training (HIIT)?",
    "How can I prevent injury when starting a new exercise program?",
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    setSuggestions(shuffleArray(suggestions));
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [props.messages]); // Runs whenever the props.messages array changes

  const handleSend = () => {
    if (postText.trim()) {
      const newMessage = { id: Date.now(), text: postText, sender: "user" };
      const newPlaceholderMessage = { id: Date.now(), text: "Loading response...", sender: "bot" };
      props.setMessages([...props.messages, newMessage, newPlaceholderMessage]);
      sendMessageToBot(postText);
      setPostText("");
    }
  };

  const sendMessageToBot = (q) => {
    // Placeholder for sending message to RAG-based AI
    // This is where you would integrate with the AI service.
    // For now, we'll just mock a bot response.
    post("/api/query", { query: q })
      .then((res) => {
        const botResponse = {
          id: Date.now(),
          text: res.response,
          sender: "bot",
          imgSrc: FitBot,
        };
        props.setMessages((prevMessages) => prevMessages.slice(0, -1));
        props.setMessages((prevMessages) => [...prevMessages, botResponse]);
      })
      .catch((err) => {
        console.log(err);
        setTimeout(() => {}, 2000);
      });
  };

  const ChatBubble = ({ text, isUser }) => (
    <div className={`chat-message ${isUser ? "user" : "bot"}`}>
      <img
        src={isUser ? props.user.profile_picture : FitBot}
        alt="Profile"
        className="chat-bubble-image"
      />
      <div className="chat-bubble-container">
        <div className={`chat-bubble-username ${isUser ? "user" : "bot"}`}>
          {isUser ? props.user.name : "FitBot"}
        </div>
        <div className={`chat-bubble ${isUser ? "user" : "bot"}`}>{text}</div>
      </div>
    </div>
  );

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

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

  if (!runnable) {
    return <div className="fitbot-spinner-container"></div>;
  }
  return (
    <>
      <div className="fitbot-chat-container">
        {props.messages.length > 0 ? (
          <div className="fitbot-chat-messages">
            {props.messages.map((message) => (
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
