import React, { useState } from "react";
import axios from "axios";

const SymptomChecker = () => {
  const [messages, setMessages] = useState([{ sender: "bot", text: "Hi! Describe your symptoms." }]);
  const [input, setInput] = useState("");
  const API_KEY = "your-groq-api-key"; // Replace with your actual Groq API Key

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages([...messages, userMessage]);

    try {
      const response = await axios.post(
        "https://api.groq.com/v1/chat/completions", // Example Groq API endpoint
        {
          model: "llama3-8b-8192", // Use the correct Groq model (e.g., Mixtral, Llama3)
          messages: [{ role: "user", content: input }],
          max_tokens: 100,
        },
        {
          headers: { Authorization: `Bearer ${API_KEY}`, "Content-Type": "application/json" },
        }
      );

      const botResponse = { sender: "bot", text: response.data.choices[0].message.content };
      setMessages((prev) => [...prev, botResponse]);
    } catch (error) {
      console.error("Error fetching AI response:", error);
      setMessages((prev) => [...prev, { sender: "bot", text: "Sorry, something went wrong. Try again!" }]);
    }

    setInput("");
  };

  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="text-2xl font-bold mb-4">Symptom Checker AI</h1>
      <div className="w-full max-w-md border rounded-lg p-4 bg-gray-100">
        <div className="h-64 overflow-y-auto p-2 bg-white border rounded">
          {messages.map((msg, index) => (
            <div key={index} className={`p-2 my-1 rounded ${msg.sender === "user" ? "bg-blue-500 text-white self-end" : "bg-gray-200 text-black"}`}>
              {msg.text}
            </div>
          ))}
        </div>
        <div className="flex mt-2">
          <input
            className="flex-grow p-2 border rounded-l"
            type="text"
            placeholder="Describe your symptoms..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button className="bg-blue-500 text-white p-2 rounded-r" onClick={handleSendMessage}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default SymptomChecker;


