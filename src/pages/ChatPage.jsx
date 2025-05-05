import { useEffect, useRef, useState } from "react";
import ChatMessage from "../components/ChatMessage";
import ChatInput from "../components/ChatInput";
import HeaderMenu from "../components/HeaderMenu";

const botQuestions = [
  "Привет! Как тебя зовут?",
  "Отлично, из какого ты города?",
  "Чем увлекаешься?",
  "Спасибо за ответы! Хорошего дня! 🌟",
];

export default function ChatPage() {
  const [messages, setMessages] = useState([
    { from: "bot", text: botQuestions[0] },
  ]);
  const [step, setStep] = useState(0);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = (userText) => {
    setMessages((m) => [...m, { from: "user", text: userText }]);

    if (step < botQuestions.length - 1) {
      const nextStep = step + 1;
      setStep(nextStep);
      setTimeout(() => {
        setMessages((m) => [...m, { from: "bot", text: botQuestions[nextStep] }]);
      }, 400);
    }
  };

  return (
    <div className="flex h-screen flex-col">
      {/* Header with dropdown */}
      <header className="flex items-center justify-between bg-gray-100 px-6 py-4">
        <h1 className="text-lg font-semibold">Чат</h1>
        <HeaderMenu />
      </header>

      {/* Messages */}
      <main className="flex-1 overflow-y-auto bg-gray-50 p-4">
        {messages.map((m, i) => (
          <ChatMessage key={i} {...m} />
        ))}
        <div ref={bottomRef} />
      </main>

      {/* Input field */}
      <ChatInput onSend={handleSend} />
    </div>
  );
}