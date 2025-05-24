import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import "@fortawesome/fontawesome-free/css/all.min.css";

import "../App.css";

const Chatbot: React.FC = () => {
    const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
    const [input, setInput] = useState("");
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
    const ai = new GoogleGenerativeAI(API_KEY);

    const toggleChat = () => setIsChatOpen((prev) => !prev);

    const sendMessage = async () => {
        if (!input.trim() || isLoading) return;

        setMessages((prev) => [...prev, { sender: "user", text: input }]);
        setInput("");
        setIsLoading(true);

        try {
            const model = ai.getGenerativeModel({ model: "gemini-1.5-pro-latest" });
            const result = await model.generateContentStream([input]);

            let botResponse = "";
            for await (const chunk of result.stream) {
                botResponse += chunk.text();
            }

            setMessages((prev) => [...prev, { sender: "bot", text: botResponse || "Sorry, I didn't understand that." }]);
        } catch (error: any) {
            console.error("API Error:", error);
            setMessages((prev) => [...prev, { sender: "bot", text: "Error: Unable to connect to chatbot service." }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {/* Chat Icon with Hover Effect */}
            <div className="chat-icon" onClick={toggleChat}>
                <i className="fas fa-comments"></i>
            </div>

            {isChatOpen && (
                <div className="chat-popup">
                    <div className="chat-header">
                        <h3>Chat with us!</h3>
                        <button className="close-btn" onClick={toggleChat}>✖</button>
                    </div>
                    <div className="chat-box">
                        {messages.map((msg, index) => (
                            <div key={index} className={msg.sender === "user" ? "user-message" : "bot-message"}>
                                {msg.text}
                            </div>
                        ))}
                        {isLoading && <div className="loading-indicator">...</div>}
                    </div>
                    <div className="chat-input">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Type your message..."
                            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                            disabled={isLoading}
                        />
                        <button onClick={sendMessage} disabled={isLoading}>
                            {isLoading ? "Sending..." : "Send"}
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default Chatbot;
