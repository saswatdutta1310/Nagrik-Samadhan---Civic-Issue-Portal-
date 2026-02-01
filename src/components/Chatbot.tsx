import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface Message {
    id: string;
    text: string;
    sender: "user" | "bot";
    timestamp: Date;
}

export function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);
    const { t, language } = useLanguage();

    // Knowledge base for the chatbot
    const knowledgeBase = {
        en: {
            greetings: ["hello", "hi", "hey", "namaste"],
            help: ["help", "support", "assist"],
            report: ["report", "issue", "problem", "complaint"],
            status: ["status", "track", "check"],
            rewards: ["reward", "points", "wallet", "money"],
            aadhaar: ["aadhaar", "verification", "verify"],
        },
        hi: {
            greetings: ["नमस्ते", "हेलो", "हाय"],
            help: ["मदद", "सहायता"],
            report: ["रिपोर्ट", "समस्या", "शिकायत"],
            status: ["स्थिति", "ट्रैक", "जांच"],
            rewards: ["इनाम", "अंक", "वॉलेट", "पैसा"],
            aadhaar: ["आधार", "सत्यापन"],
        },
    };

    const responses = {
        en: {
            greeting: "Hello! I'm your Nagrik Samadhan assistant. How can I help you today?",
            help: "I can help you with:\n• Reporting civic issues\n• Tracking issue status\n• Understanding the reward system\n• Aadhaar verification\n• General platform guidance\n\nWhat would you like to know?",
            report: "To report an issue:\n1. Click 'Report Issue' in the navigation\n2. Select the issue category\n3. Fill in details and location\n4. Upload evidence (photos/videos)\n5. Submit!\n\nYour identity will be protected and you'll earn rewards when the issue is resolved.",
            status: "You can track your issues by:\n1. Going to 'My Issues' in the navigation\n2. Viewing all your reported issues\n3. Checking real-time status updates\n\nYou'll also receive notifications when status changes!",
            rewards: "Our reward system:\n• Report an issue: 10 points\n• Issue gets verified: 50 points\n• Issue gets resolved: 100 points\n• Community upvotes: 5 points each\n\nPoints can be redeemed for rewards in your wallet!",
            aadhaar: "Aadhaar verification ensures:\n• Authentic users only\n• Prevents fraud and spam\n• Maintains platform integrity\n• Your Aadhaar details remain anonymous to authorities\n\nVerify during signup or in your profile settings.",
            default: "I'm here to help! You can ask me about:\n• Reporting issues\n• Tracking status\n• Rewards and points\n• Aadhaar verification\n• How to use the platform",
        },
        hi: {
            greeting: "नमस्ते! मैं आपका नागरिक समाधान सहायक हूं। मैं आज आपकी कैसे मदद कर सकता हूं?",
            help: "मैं आपकी मदद कर सकता हूं:\n• नागरिक समस्याओं की रिपोर्ट करना\n• समस्या की स्थिति ट्रैक करना\n• इनाम प्रणाली को समझना\n• आधार सत्यापन\n• सामान्य प्लेटफॉर्म मार्गदर्शन\n\nआप क्या जानना चाहेंगे?",
            report: "समस्या रिपोर्ट करने के लिए:\n1. नेविगेशन में 'समस्या रिपोर्ट करें' पर क्लिक करें\n2. समस्या श्रेणी चुनें\n3. विवरण और स्थान भरें\n4. सबूत अपलोड करें (फोटो/वीडियो)\n5. जमा करें!\n\nआपकी पहचान सुरक्षित रहेगी और समस्या हल होने पर आपको इनाम मिलेगा।",
            status: "आप अपनी समस्याओं को ट्रैक कर सकते हैं:\n1. नेविगेशन में 'मेरी समस्याएं' पर जाएं\n2. अपनी सभी रिपोर्ट की गई समस्याएं देखें\n3. रीयल-टाइम स्थिति अपडेट जांचें\n\nस्थिति बदलने पर आपको सूचनाएं भी मिलेंगी!",
            rewards: "हमारी इनाम प्रणाली:\n• समस्या रिपोर्ट करें: 10 अंक\n• समस्या सत्यापित हो: 50 अंक\n• समस्या हल हो: 100 अंक\n• सामुदायिक अपवोट: प्रत्येक 5 अंक\n\nअंकों को आपके वॉलेट में इनाम के लिए भुनाया जा सकता है!",
            aadhaar: "आधार सत्यापन सुनिश्चित करता है:\n• केवल प्रामाणिक उपयोगकर्ता\n• धोखाधड़ी और स्पैम को रोकता है\n• प्लेटफॉर्म की अखंडता बनाए रखता है\n• आपका आधार विवरण अधिकारियों के लिए गुमनाम रहता है\n\nसाइनअप के दौरान या अपनी प्रोफ़ाइल सेटिंग में सत्यापित करें।",
            default: "मैं मदद के लिए यहां हूं! आप मुझसे पूछ सकते हैं:\n• समस्याओं की रिपोर्ट करना\n• स्थिति ट्रैक करना\n• इनाम और अंक\n• आधार सत्यापन\n• प्लेटफॉर्म का उपयोग कैसे करें",
        },
    };

    useEffect(() => {
        if (isOpen && messages.length === 0) {
            // Send welcome message
            addBotMessage(responses[language].greeting);
        }
    }, [isOpen]);

    useEffect(() => {
        // Scroll to bottom when new messages arrive
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const addBotMessage = (text: string) => {
        const message: Message = {
            id: Date.now().toString(),
            text,
            sender: "bot",
            timestamp: new Date(),
        };
        setMessages((prev) => [...prev, message]);
    };

    const addUserMessage = (text: string) => {
        const message: Message = {
            id: Date.now().toString(),
            text,
            sender: "user",
            timestamp: new Date(),
        };
        setMessages((prev) => [...prev, message]);
    };

    const getBotResponse = (userInput: string): string => {
        const input = userInput.toLowerCase();
        const kb = knowledgeBase[language];
        const resp = responses[language];

        // Check for greetings
        if (kb.greetings.some((word) => input.includes(word))) {
            return resp.greeting;
        }

        // Check for help
        if (kb.help.some((word) => input.includes(word))) {
            return resp.help;
        }

        // Check for report
        if (kb.report.some((word) => input.includes(word))) {
            return resp.report;
        }

        // Check for status
        if (kb.status.some((word) => input.includes(word))) {
            return resp.status;
        }

        // Check for rewards
        if (kb.rewards.some((word) => input.includes(word))) {
            return resp.rewards;
        }

        // Check for aadhaar
        if (kb.aadhaar.some((word) => input.includes(word))) {
            return resp.aadhaar;
        }

        // Default response
        return resp.default;
    };

    const handleSend = () => {
        if (!input.trim()) return;

        // Add user message
        addUserMessage(input);
        setInput("");

        // Simulate typing
        setIsTyping(true);
        setTimeout(() => {
            const response = getBotResponse(input);
            addBotMessage(response);
            setIsTyping(false);
        }, 1000);
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <>
            {/* Chatbot Toggle Button */}
            {!isOpen && (
                <Button
                    onClick={() => setIsOpen(true)}
                    className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg z-50"
                    size="icon"
                >
                    <MessageCircle className="h-6 w-6" />
                </Button>
            )}

            {/* Chatbot Window */}
            {isOpen && (
                <Card className="fixed bottom-6 right-6 w-96 h-[500px] shadow-2xl z-50 flex flex-col">
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 border-b bg-primary text-primary-foreground rounded-t-lg">
                        <div className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                                <Bot className="h-5 w-5" />
                            </div>
                            <div>
                                <h3 className="font-semibold">{t("chatbot.title")}</h3>
                                <p className="text-xs opacity-90">Online</p>
                            </div>
                        </div>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setIsOpen(false)}
                            className="h-8 w-8 text-primary-foreground hover:bg-primary-foreground/20"
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    </div>

                    {/* Messages */}
                    <ScrollArea className="flex-1 p-4" ref={scrollRef}>
                        <div className="space-y-4">
                            {messages.map((message) => (
                                <div
                                    key={message.id}
                                    className={`flex gap-2 ${message.sender === "user" ? "justify-end" : "justify-start"
                                        }`}
                                >
                                    {message.sender === "bot" && (
                                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                            <Bot className="h-4 w-4 text-primary" />
                                        </div>
                                    )}
                                    <div
                                        className={`max-w-[75%] rounded-lg p-3 ${message.sender === "user"
                                                ? "bg-primary text-primary-foreground"
                                                : "bg-muted"
                                            }`}
                                    >
                                        <p className="text-sm whitespace-pre-line">{message.text}</p>
                                        <p className="text-xs opacity-70 mt-1">
                                            {message.timestamp.toLocaleTimeString(language === "hi" ? "hi-IN" : "en-US", {
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            })}
                                        </p>
                                    </div>
                                    {message.sender === "user" && (
                                        <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                                            <User className="h-4 w-4 text-primary-foreground" />
                                        </div>
                                    )}
                                </div>
                            ))}
                            {isTyping && (
                                <div className="flex gap-2 justify-start">
                                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                                        <Bot className="h-4 w-4 text-primary" />
                                    </div>
                                    <div className="bg-muted rounded-lg p-3">
                                        <div className="flex gap-1">
                                            <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" />
                                            <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce delay-100" />
                                            <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce delay-200" />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </ScrollArea>

                    {/* Input */}
                    <div className="p-4 border-t">
                        <div className="flex gap-2">
                            <Input
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder={t("chatbot.placeholder")}
                                className="flex-1"
                            />
                            <Button onClick={handleSend} size="icon" disabled={!input.trim()}>
                                <Send className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </Card>
            )}
        </>
    );
}
 
