import React, { useState, useEffect, useRef } from "react";
import "./JurisBot.css"; // Ensure this CSS file exists
import axios from "axios"; // For making API requests

const JurisBot = () => {
    const [chatMessages, setChatMessages] = useState([]);
    const [userInput, setUserInput] = useState("");
    const [isFirstMessageSent, setIsFirstMessageSent] = useState(false);
    const chatWindowRef = useRef(null); // Reference to chat window
    const lastMessageRef = useRef(null); // Reference to the last message
    const [isLoading, setIsLoading] = useState(false); // To show loading state

    const appendMessage = (content, sender) => {
        const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        setChatMessages((prevMessages) => [...prevMessages, { content, sender, timestamp }]);
        if (!isFirstMessageSent) setIsFirstMessageSent(true);
    };

    const getBotResponseFromServer = async (userMessage) => {
        setIsLoading(true);
        try {
            const response = await axios.post("http://localhost:5000/api/chatbot", { message: userMessage });
            setIsLoading(false);
            return response.data.response;
        } catch (error) {
            setIsLoading(false);
            console.error("❌ Error fetching bot response:", error);
            if (error.response && error.response.data && error.response.data.error) {
                return `Error: ${error.response.data.error}`;
            }
            return "Sorry, something went wrong while contacting the chatbot service.";
        }
    };

    const handleUserInput = async () => {
        if (!userInput.trim()) return;

        appendMessage(userInput, "user");
        const currentInput = userInput; // Store current input before clearing
        setUserInput("");

        const botResponse = await getBotResponseFromServer(currentInput);
        appendMessage(botResponse, "bot");
    };

    // Auto-scroll function
    useEffect(() => {
        if (lastMessageRef.current) {
            lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [chatMessages]);

    return (
        <div className="JurisBot">

            {!isFirstMessageSent && (
                <div className="hello-container">
                    <div className="hello">
                        <h1>Hello JurisBot</h1>
                        <p>Ask me any legal question, or describe a situation.</p>
                    </div>
                </div>
            )}
            <div className="chat-window" ref={chatWindowRef}>
                {chatMessages.map((msg, index) => (
                    <div
                        key={index}
                        className={`message ${msg.sender}-message`}
                        ref={index === chatMessages.length - 1 ? lastMessageRef : null}
                    >
                        <div className="message-bubble">
                            <div className="message-content" dangerouslySetInnerHTML={{ __html: msg.content }} />
                            <div className="message-timestamp">{msg.timestamp}</div>
                        </div>
                    </div>
                ))}
                {isLoading && (
                    <div className="message bot-message">
                        <div className="message-bubble">
                            <div className="message-content">JurisBot is typing...</div>
                        </div>
                    </div>
                )}
            </div>
            <div className="chat-input-container">
                <input
                    type="text"
                    className="chat-input"
                    placeholder="Ask Juris"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleUserInput()}
                />
                <button className="send-button" onClick={handleUserInput}>Send</button>
            </div>
        </div>
    );
};

export default JurisBot;
