import { useNavigate } from "react-router-dom";
import NoteCard from "./NoteCard";

export default function NoteGrid({ notes, onDelete }) {
  const navigate = useNavigate();

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {notes.map((note) => (
        <NoteCard
          key={note.id}
          note={note}
          onDelete={onDelete}
          onClick={() => navigate(`/note/${note.id}`)}
        />
      ))}
    </div>
  );
}