import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import NoteGrid from "./components/NoteGrid";
import SearchBar from "./components/SearchBar";
import NewNoteButton from "./components/NewNoteButton";
import AddNotePage from "./pages/AddNotePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import LandingPage from "./pages/LandingPage";
import ProtectedRoute from "./components/ProtectedRoute";
import { getAllNotes, createNote, deleteNote } from "./api/noteApi";

function Home({ notes, onDelete, searchTerm, setSearchTerm, loading, error }) {
  const navigate = useNavigate();

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-slate-900 p-6 md:p-10">
      <div className="max-w-6xl mx-auto">
        <header className="mb-10 border-b border-slate-700 pb-6 flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-extrabold text-emerald-400 tracking-tight">
              Note Taker
            </h1>
            <p className="text-slate-400 mt-2">Your ideas, neatly organized.</p>
          </div>
          <button
            onClick={handleLogout}
            className="text-slate-400 hover:text-red-400 text-sm font-medium"
          >
            Logout
          </button>
        </header>

        <div className="flex flex-col md:flex-row items-center gap-4 justify-between mb-10">
          <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
          <NewNoteButton onClick={() => navigate("/add-note")} />
        </div>

        {loading && (
          <p className="text-slate-400 text-center mt-10">Loading notes...</p>
        )}

        {error && (
          <p className="text-red-400 text-center mt-10">{error}</p>
        )}

        {!loading && !error && <NoteGrid notes={filteredNotes} onDelete={onDelete} />}
      </div>
    </div>
  );
}

export default function App() {
  const [notes, setNotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchNotes();
  }, []);

  async function fetchNotes() {
    setLoading(true);
    setError("");
    try {
      const data = await getAllNotes();
      setNotes(data);
    } catch (err) {
      setError("Failed to load notes. Please try again.");
      console.error("Error fetching notes:", err);
    } finally {
      setLoading(false);
    }
  }

  async function handleAddNote(newNote) {
    setError("");
    try {
      const savedNote = await createNote(newNote);
      setNotes((prev) => [...prev, savedNote]);
    } catch (err) {
      setError("Failed to add note. Please try again.");
      console.error("Error adding note:", err);
    } finally {
      
    }
  }

  async function handleDeleteNote(id) {
    const confirmed = window.confirm("Are you sure you want to delete this note?");
    if (!confirmed) return;

    setError("");
    try {
      await deleteNote(id);
      setNotes((prev) => prev.filter((note) => note._id !== id));
    } catch (err) {
      setError("Failed to delete note. Please try again.");
      console.error("Error deleting note:", err);
    } finally {
      
    }
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/notes"
          element={
            <ProtectedRoute>
              <Home
                notes={notes}
                onDelete={handleDeleteNote}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                loading={loading}
                error={error}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-note"
          element={
            <ProtectedRoute>
              <AddNotePage onAddNote={handleAddNote} />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}