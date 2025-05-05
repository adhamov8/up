// src/components/ChatInput.jsx
import { useState } from "react";

export default function ChatInput({ onSend }) {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value.trim()) return;
    onSend(value.trim());
    setValue("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 p-4 border-t">
      <input
        className="flex-1 rounded-lg border px-3 py-2 outline-none"
        placeholder="Введите сообщение…"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button
        type="submit"
        className="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
      >
        Отправить
      </button>
    </form>
  );
}
