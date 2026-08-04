import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { summariseNote } from "../api/aiApi";
import { createNote } from "../api/noteApi";

export default function AskAIPage() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [savingIdx, setSavingIdx] = useState(null);

  async function handleSend() {
    if (!input.trim()) return;

    const userMessage = { role: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const result = await summariseNote(input);
      const aiMessage = { role: "ai", text: result.data };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      const errorMessage = {
        role: "ai",
        text: "Sorry, I couldn't generate a response. Please try again.",
      };
      setMessages((prev) => [...prev, errorMessage]);
      console.error("AI chat error:", err);
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  async function handleSaveAsNote(aiText, idx) {
    const titleMatch = aiText.match(/Title:\s*(.*)/i);
    const categoryMatch = aiText.match(/Category:\s*(.*)/i);
    const contentMatch = aiText.match(/Content:\s*([\s\S]*)/i);

    const validCategories = ["Work", "Personal", "Study", "Health"];
    const category = categoryMatch && validCategories.includes(categoryMatch[1].trim())
      ? categoryMatch[1].trim()
      : "Personal";

    const noteData = {
      title: titleMatch ? titleMatch[1].trim() : "Untitled Note",
      category,
      content: contentMatch ? contentMatch[1].trim() : aiText,
    };

    setSavingIdx(idx);
    try {
      await createNote(noteData);
      navigate("/notes");
    } catch (err) {
      console.error("Error saving note:", err);
    } finally {
      setSavingIdx(null);
    }
  }

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center p-6">
      <div className="w-full max-w-2xl flex flex-col h-[80vh]">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-extrabold text-emerald-400">Ask AI</h1>
          <button
            onClick={() => navigate("/notes")}
            className="text-slate-400 hover:text-white text-sm font-medium"
          >
            &larr; Back to Notes
          </button>
        </div>

        {/* Chat box */}
        <div className="flex-1 bg-slate-800 rounded-2xl border border-slate-700 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.length === 0 && (
              <p className="text-slate-400 text-sm text-center mt-16">
                Ask me to help you write a note. e.g. "meeting notes about
                project deadline"
              </p>
            )}

            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-xl px-4 py-2.5 text-sm whitespace-pre-wrap ${
                    msg.role === "user"
                      ? "bg-emerald-500 text-white"
                      : "bg-slate-700 text-slate-100"
                  }`}
                >
                  {msg.text}
                  {msg.role === "ai" && (
                    <div className="mt-2">
                      <button
                        onClick={() => handleSaveAsNote(msg.text, idx)}
                        disabled={savingIdx === idx}
                        className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 underline disabled:opacity-50"
                      >
                        {savingIdx === idx ? "Saving..." : "Save as Note"}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="bg-slate-700 text-slate-300 rounded-xl px-4 py-2.5 text-sm">
                  Thinking...
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-slate-700 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask something..."
              className="flex-1 px-3 py-2 rounded-lg bg-slate-900 border border-slate-600 text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <button
              onClick={handleSend}
              disabled={loading}
              className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold transition disabled:opacity-60"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}