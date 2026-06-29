export default function NewNoteButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-xl shadow-lg transition-colors"
    >
      + Add New Note
    </button>
  );
}