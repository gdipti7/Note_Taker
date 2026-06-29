export default function SearchBar({ searchTerm, onSearchChange }) {
  return (
    <input
      type="text"
      value={searchTerm}
      onChange={(e) => onSearchChange(e.target.value)}
      placeholder="  Search notes..."
      className="w-full md:w-96 px-4 py-3 rounded-xl border border-purple-300 shadow bg-white"
    />
  );
}