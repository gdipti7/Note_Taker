export default function NoteCard({ note, onDelete }) {

  const badgeColor = {
    Work: "bg-blue-100 text-blue-700",
    Personal: "bg-green-100 text-green-700",
    Study: "bg-yellow-100 text-yellow-700",
    Health: "bg-red-100 text-red-700",
  };

  return (
    <div className="bg-white p-5 rounded-2xl shadow-lg hover:scale-105 transition relative">

      <button
        onClick={() => onDelete(note.id)}
        className="absolute top-5 right-5 text-red-500 hover:text-red-700 text-sm font-medium transition"
      >
        Delete
      </button>

      <h2 className="text-xl font-bold mb-3 pr-16">
        {note.title}
      </h2>

      <p className="text-gray-600 mb-4">
        {note.content}
      </p>

      <span
        className={`px-3 py-1 rounded-full text-sm font-medium ${badgeColor[note.category]}`}
      >
        {note.category}
      </span>

    </div>
  );
}