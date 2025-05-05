// src/components/ChatMessage.jsx
export default function ChatMessage({ from, text }) {
    const isBot = from === "bot";
    return (
      <div className={`flex ${isBot ? "justify-start" : "justify-end"} mb-2`}>
        <div
          className={`max-w-xs rounded-2xl p-3 text-sm
            ${isBot ? "bg-gray-200 text-gray-800" : "bg-blue-500 text-white"}`}
        >
          {text}
        </div>
      </div>
    );
  }
  