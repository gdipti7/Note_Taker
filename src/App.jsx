import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import NoteGrid from "./components/NoteGrid";
import SearchBar from "./components/SearchBar";
import NewNoteButton from "./components/NewNoteButton";
import AddNotePage from "./pages/AddNotePage";

const initialNotes = [
  { id: 1, title: "Meeting with Team", category: "Work", content: "Discuss project progress" },
  { id: 2, title: "Buy Groceries", category: "Personal", content: "Milk, Bread, Eggs" },
  { id: 3, title: "React Revision", category: "Study", content: "Hooks and Components" },
  { id: 4, title: "Workout Plan", category: "Health", content: "Gym at 6 PM" },
];

function Home({ notes, onDelete, searchTerm, setSearchTerm }) {
  const navigate = useNavigate();

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-900 p-6 md:p-10">
      <div className="max-w-6xl mx-auto">

        <header className="mb-10 border-b border-slate-700 pb-6">
          <h1 className="text-4xl font-extrabold text-emerald-400 tracking-tight">
            Note Taker
          </h1>
          <p className="text-slate-400 mt-2">Your ideas, neatly organized.</p>
        </header>

        <div className="flex flex-col md:flex-row items-center gap-4 justify-between mb-10">
          <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
          <NewNoteButton onClick={() => navigate("/add-note")} />
        </div>

        <NoteGrid notes={filteredNotes} onDelete={onDelete} />

      </div>
    </div>
  );
}

export default function App() {
  const [notes, setNotes] = useState(initialNotes);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    console.log("Note count:", notes.length);
  }, [notes]);

  function handleAddNote(newNote) {
    setNotes((prev) => [...prev, { id: Date.now(), ...newNote }]);
  }

  function handleDeleteNote(id) {
    const confirmed = window.confirm("Are you sure you want to delete this note?");
    if (confirmed) {
      setNotes((prev) => prev.filter((note) => note.id !== id));
    }
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              notes={notes}
              onDelete={handleDeleteNote}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />
          }
        />
        <Route
          path="/add-note"
          element={<AddNotePage onAddNote={handleAddNote} />}
        />
      </Routes>
    </BrowserRouter>
  );
}