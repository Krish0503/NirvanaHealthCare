import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import '../styles/SymptomChecker.css';

const SymptomChecker = () => {
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Namaste! I'm Sathi, your AI health companion. I'm here to help you understand your symptoms and provide general health information. While I can offer guidance, please remember that I'm an AI and cannot replace professional medical advice. How may I assist you today?",
      timestamp: new Date().toISOString()
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [conversationContext, setConversationContext] = useState({
    patientName: null,
    age: null,
    gender: null,
    mainSymptoms: [],
    duration: null,
    severity: null,
    previousConditions: [],
    medications: []
  });
  const messagesEndRef = useRef(null);
  const API_KEY = process.env.REACT_APP_GROQ_API_KEY;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input, timestamp: new Date().toISOString() };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      if (!API_KEY) {
        throw new Error("API key not found. Please check your environment variables.");
      }

      // Prepare the conversation history for context
      const conversationHistory = messages.map(msg => ({
        role: msg.sender === "user" ? "user" : "assistant",
        content: msg.text
      }));

      // Add system message with context
      const systemMessage = {
        role: "system",
        content: `You are Sathi, a helpful and empathetic medical AI assistant. Provide general health information and suggest when to seek medical attention. 
        Current patient context: ${JSON.stringify(conversationContext)}.
        Always remind users that you are an AI and they should consult healthcare professionals for medical advice.
        Be conversational, friendly, and culturally sensitive while maintaining professionalism.
        Use a warm and caring tone, and occasionally use Hindi/Indian English phrases to make the conversation more relatable.`
      };

      const response = await axios.post(
        "https://api.groq.com/v1/chat/completions",
        {
          model: "mixtral-8x7b-32768",
          messages: [
            systemMessage,
            ...conversationHistory,
            { role: "user", content: input }
          ],
          max_tokens: 500,
          temperature: 0.7,
        },
        {
          headers: { 
            Authorization: `Bearer ${API_KEY}`, 
            "Content-Type": "application/json" 
          },
        }
      );

      const botResponse = { 
        sender: "bot", 
        text: response.data.choices[0].message.content,
        timestamp: new Date().toISOString()
      };

      // Update conversation context based on the interaction
      updateConversationContext(input, botResponse.text);

      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      console.error("Error fetching AI response:", error);
      setMessages(prev => [...prev, { 
        sender: "bot", 
        text: "I apologize, but I'm having trouble processing your request. Please try again or contact your healthcare provider for immediate assistance.",
        timestamp: new Date().toISOString()
      }]);
    } finally {
      setIsLoading(false);
      setInput("");
    }
  };

  const updateConversationContext = (userInput, botResponse) => {
    // Extract information from the conversation
    const newContext = { ...conversationContext };

    // Check for patient information
    if (!newContext.patientName && userInput.toLowerCase().includes("my name is")) {
      newContext.patientName = userInput.split("my name is")[1].trim();
    }

    // Check for age
    if (!newContext.age && /\b\d+\s*(?:years?|yrs?)\s*old\b/i.test(userInput)) {
      newContext.age = userInput.match(/\b\d+\b/)[0];
    }

    // Check for gender
    if (!newContext.gender && (userInput.toLowerCase().includes("i am a") || userInput.toLowerCase().includes("i'm a"))) {
      const genderMatch = userInput.match(/i am a (\w+)/i) || userInput.match(/i'm a (\w+)/i);
      if (genderMatch) {
        newContext.gender = genderMatch[1];
      }
    }

    // Check for symptoms
    const symptomKeywords = ["symptom", "feel", "pain", "ache", "fever", "headache", "cough", "sore"];
    if (symptomKeywords.some(keyword => userInput.toLowerCase().includes(keyword))) {
      const symptoms = userInput
        .toLowerCase()
        .split(/[,.]/)
        .filter(s => symptomKeywords.some(keyword => s.includes(keyword)))
        .map(s => s.trim());
      newContext.mainSymptoms = [...new Set([...newContext.mainSymptoms, ...symptoms])];
    }

    // Check for duration
    if (!newContext.duration && /\b\d+\s*(?:days?|weeks?|months?|years?)\b/i.test(userInput)) {
      newContext.duration = userInput.match(/\b\d+\s*(?:days?|weeks?|months?|years?)\b/i)[0];
    }

    // Check for severity
    if (!newContext.severity) {
      if (userInput.toLowerCase().includes("severe") || userInput.toLowerCase().includes("very bad")) {
        newContext.severity = "severe";
      } else if (userInput.toLowerCase().includes("mild") || userInput.toLowerCase().includes("slight")) {
        newContext.severity = "mild";
      } else if (userInput.toLowerCase().includes("moderate")) {
        newContext.severity = "moderate";
      }
    }

    setConversationContext(newContext);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="symptom-checker-container">
      <div className="chat-header">
        <h1>Sathi - Your Health Companion</h1>
        <p>Get personalized health guidance and information. Remember, this is not a replacement for professional medical advice.</p>
      </div>
      <div className="chat-container">
        <div className="messages-container">
          {messages.map((msg, index) => (
            <div 
              key={index} 
              className={`message ${msg.sender === "user" ? "user-message" : "bot-message"}`}
            >
              <div className="message-content">
                {msg.text}
                <div className="message-timestamp">
                  {new Date(msg.timestamp).toLocaleTimeString()}
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="message bot-message loading">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        <div className="input-container">
          <input
            type="text"
            placeholder="Describe your symptoms or ask a health question..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isLoading}
          />
          <button 
            onClick={handleSendMessage}
            disabled={isLoading || !input.trim()}
            className={isLoading || !input.trim() ? "disabled" : ""}
          >
            Send
          </button>
        </div>
      </div>
      <div className="disclaimer">
        <p>Note: This is an AI assistant providing general information only. Always consult healthcare professionals for medical advice.</p>
      </div>
    </div>
  );
};

export default SymptomChecker;


