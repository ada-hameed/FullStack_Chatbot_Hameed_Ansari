import { useEffect, useRef, useState, type FormEvent } from "react";
import EnquiryForm from "./EnquiryForm";

type Message =
    | {
          type: "text";
          from: "bot" | "user";
          text: string;
      }
    | {
          type: "enquiry";
          from: "bot";
      };

const initialMessages: Message[] = [
    {
        type: "text",
        from: "bot",
        text: "Hi! I'm the DroneTV Support Assistant. How can I help you today?",
    },
];

const API_URL = "http://localhost:5000/api/chat";

export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>(initialMessages);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const messagesRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = messagesRef.current;

        if (container) {
            container.scrollTop = container.scrollHeight;
        }
    }, [messages, isLoading]);

    const addMessage = (message: Message) => {
        setMessages((currentMessages) => [
            ...currentMessages,
            message,
        ]);
    };

    const openEnquiryForm = () => {
        addMessage({
            type: "text",
            from: "bot",
            text: "Sure! Please fill in the enquiry details below, and our team will get back to you.",
        });

        addMessage({
            type: "enquiry",
            from: "bot",
        });
    };

    const sendMessage = async (text: string = input) => {
        const message = text.trim();

        if (!message || isLoading) {
            return;
        }

        const enquiryKeywords = [
            "register",
            "registration",
            "enquiry",
            "inquiry",
            "interested",
            "speak to someone",
            "talk to someone",
            "contact someone",
            "contact team",
        ];

        const wantsEnquiry = enquiryKeywords.some((keyword) =>
            message.toLowerCase().includes(keyword)
        );

        // User message
        addMessage({
            type: "text",
            from: "user",
            text: message,
        });

        setInput("");

        // Show enquiry form
        if (wantsEnquiry) {
            addMessage({
                type: "text",
                from: "bot",
                text: "Absolutely! Please fill in the enquiry form below.",
            });

            addMessage({
                type: "enquiry",
                from: "bot",
            });

            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    message,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Something went wrong."
                );
            }

            addMessage({
                type: "text",
                from: "bot",
                text: data.reply,
            });
        } catch (error) {
            console.error("Chatbot error:", error);

            addMessage({
                type: "text",
                from: "bot",
                text: "Sorry, I'm unable to connect to the DroneTV support service right now. Please try again.",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        sendMessage();
    };

    const handleEnquirySuccess = (index: number) => {
        // Remove the form from the conversation
        setMessages((currentMessages) =>
            currentMessages.filter((_, messageIndex) => messageIndex !== index)
        );

        // Add success message at the end
        addMessage({
            type: "text",
            from: "bot",
            text: "Thank you! Your enquiry has been submitted successfully. Our team will get back to you soon.",
        });
    };

    const resetChat = () => {
        setMessages(initialMessages);
        setInput("");
        setIsLoading(false);
    };

    return (
        <>
            {/* Chat Launcher */}
            <button
                type="button"
                className="dronetv-chat-launcher"
                onClick={() => setIsOpen((open) => !open)}
                aria-label={isOpen ? "Close chat" : "Open chat"}
            >
                {isOpen ? "×" : "✦"}
            </button>

            {/* Chat Panel */}
            {isOpen && (
                <div className="dronetv-chat-panel">

                    {/* Header */}
                    <div className="dronetv-chat-header">
                        <div>
                            <strong>DroneTV Support</strong>
                            <small>Online • Quick answers</small>
                        </div>

                        <button
                            type="button"
                            onClick={resetChat}
                            aria-label="Reset chat"
                            title="Reset chat"
                        >
                            ↻
                        </button>
                    </div>

                    {/* Messages */}
                    <div
                        className="dronetv-chat-messages"
                        ref={messagesRef}
                    >
                        {messages.map((message, index) => {

                            // Enquiry form message
                            if (message.type === "enquiry") {
                                return (
                                    <div
                                        key={`enquiry-${index}`}
                                        className="dronetv-chat-enquiry"
                                    >
                                        <EnquiryForm
                                            onSuccess={() =>
                                                handleEnquirySuccess(index)
                                            }
                                        />
                                    </div>
                                );
                            }

                            // Normal chat message
                            return (
                                <div
                                    key={`${message.from}-${index}`}
                                    className={`dronetv-message ${message.from}`}
                                >
                                    {message.text}
                                </div>
                            );
                        })}

                        {/* Loading */}
                        {isLoading && (
                            <div className="dronetv-message bot dronetv-typing">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        )}
                    </div>

                    {/* Quick Questions */}
                    <div className="dronetv-chat-quick">

                        <button
                            type="button"
                            onClick={() => sendMessage("Our services")}
                            disabled={isLoading}
                        >
                            Our services
                        </button>

                        <button
                            type="button"
                            onClick={() => sendMessage("Courses")}
                            disabled={isLoading}
                        >
                            Courses
                        </button>

                        <button
                            type="button"
                            onClick={() => sendMessage("Contact")}
                            disabled={isLoading}
                        >
                            Contact
                        </button>

                        <button
                            type="button"
                            onClick={openEnquiryForm}
                            disabled={isLoading}
                        >
                            Make an Enquiry
                        </button>

                    </div>

                    {/* Input */}
                    <form
                        className="dronetv-chat-input"
                        onSubmit={handleSubmit}
                    >
                        <input
                            type="text"
                            value={input}
                            onChange={(event) =>
                                setInput(event.target.value)
                            }
                            placeholder={
                                isLoading
                                    ? "Waiting for response..."
                                    : "Type your question..."
                            }
                            aria-label="Type your question"
                            disabled={isLoading}
                        />

                        <button
                            type="submit"
                            aria-label="Send message"
                            disabled={isLoading}
                        >
                            <svg
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M21.5 3.5L10.2 14.8"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />

                                <path
                                    d="M21.5 3.5L15.2 21L10.2 14.8L3 9.5L21.5 3.5Z"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </button>
                    </form>
                </div>
            )}
        </>
    );
}