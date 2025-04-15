import React, { useState, useEffect, useRef } from "react";
import "./JurisBot.css"; // Ensure this CSS file exists

const JurisBot = () => {
    const [chatMessages, setChatMessages] = useState([]);
    const [userInput, setUserInput] = useState("");
    const [legalDataset, setLegalDataset] = useState({ questions: [] });
    const [isFirstMessageSent, setIsFirstMessageSent] = useState(false);
    const chatWindowRef = useRef(null);
    const lastMessageRef = useRef(null);

    useEffect(() => {
        const loadQuestions = async () => {
            try {
                const response = await fetch("/legalDataset.json");
                if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
                const data = await response.json();
                console.log("✅ JSON Loaded:", data);
                setLegalDataset(data);
            } catch (error) {
                console.error("❌ Failed to load JSON:", error);
            }
        };

        loadQuestions();
    }, []);

    const appendMessage = (content, sender) => {
        setChatMessages((prevMessages) => [...prevMessages, { content, sender }]);
        if (!isFirstMessageSent) setIsFirstMessageSent(true);
    };

    const getBotResponse = (userMessage) => {
        const lowerCaseMessage = userMessage.trim().toLowerCase();

        // Direct match
        let response = legalDataset.questions.find((q) =>
            q.question.toLowerCase().includes(lowerCaseMessage)
        );

        // Keyword-based search if no direct match
        if (!response) {
            const words = lowerCaseMessage.split(" ");
            response = legalDataset.questions.find((q) =>
                words.some(word => q.question.toLowerCase().includes(word))
            );
        }

        if (!response) return "Sorry, I couldn't find an answer to your question.";

        let botReply = response.answer;

        if (response.laws?.length) {
            botReply += `<br><strong>Relevant Laws:</strong> ${response.laws.join(", ")}`;
        }

        if (response.scenarios?.length) {
            botReply += `<br><strong>Example Cases:</strong><br> - ${response.scenarios.join("<br> - ")}`;
        }

        return botReply;
    };

    const handleUserInput = () => {
        if (!userInput.trim()) return;

        appendMessage(userInput, "user");
        setUserInput("");

        setTimeout(() => {
            const botResponse = getBotResponse(userInput);
            appendMessage(botResponse, "bot");
        }, 500);
    };

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
                        <div className="message-content" dangerouslySetInnerHTML={{ __html: msg.content }} />
                    </div>
                ))}
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
