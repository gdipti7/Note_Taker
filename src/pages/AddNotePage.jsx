import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddNotePage({ onAddNote }) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Personal");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    onAddNote({ title, category, content });
    navigate("/");
  }

  return (
    <div className="min-h-screen bg-slate-900 p-6 md:p-10">
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl p-6">

        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-bold text-emerald-600">Add New Note</h2>
          <button
            onClick={() => navigate("/")}
            className="text-gray-400 hover:text-gray-700 text-2xl leading-none"
          >
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Note title"
              className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="Personal">Personal</option>
              <option value="Work">Work</option>
              <option value="Study">Study</option>
              <option value="Health">Health</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Content</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your note..."
              rows={4}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white font-semibold transition"
            >
              Add Note
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}