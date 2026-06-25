import NoteCard from "./components/NoteCard";
import SearchBar from "./components/SearchBar";
import NewNoteButton from "./components/NewNoteButton";

export default function App() {
  const notes = [
    {
      id: 1,
      title: "Meeting with Team",
      category: "Work",
      content: "Discuss project progress",
    },
    {
      id: 2,
      title: "Buy Groceries",
      category: "Personal",
      content: "Milk, Bread, Eggs",
    },
    {
      id: 3,
      title: "React Revision",
      category: "Study",
      content: "Hooks and Components",
    },
    {
      id: 4,
      title: "Workout Plan",
      category: "Health",
      content: "Gym at 6 PM",
    },
  ];

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
          <SearchBar />
          <NewNoteButton />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {notes.map((note) => (
            <NoteCard key={note.id} note={note} />
          ))}
        </div>

      </div>
    </div>
  );
}