import { Link } from "react-router-dom";
import { Note } from "../../types";
import { NoteCard } from "../cards/NoteCard";

export const NoteDashboardContainer = ({ notes }: { notes: Note[] }) => {
  const pendingNotes = notes.filter((note) => !note.isCompleted);
  const completedNotes = notes.filter((note) => note.isCompleted);

  if (pendingNotes.length > 0) {
    return (
      <>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {pendingNotes.slice(0, 3).map((note) => (
            <NoteCard key={note.id} note={note} />
          ))}
          {pendingNotes.length > 3 && (
            <p className="dark:text-zinc-400">
              Showing{" "}
              {pendingNotes.length > 3
                ? `3 of ${pendingNotes.length} pending notes`
                : ""}
            </p>
          )}
        </div>
        {completedNotes.length > 0 && (
          <Link
            to="/app/notes"
            className="block w-full text-left text-blue-700 hover:underline"
          >
            Ver notas completadas
          </Link>
        )}
      </>
    );
  }

  return (
    <>
      <p className="text-center border-dashed dark:border-slate-700 py-20 border-2 text-gray-500 dark:text-gray-400">
        Ups! No tienes notas pendientes. Crea una nueva nota para comenzar. 😎
      </p>
      {completedNotes.length > 0 && (
    <Link
    to="/app/notes"
    className="block w-full text-left text-blue-700 hover:underline"
  >
    Ver notas completadas
  </Link>

      )}
    </>
  );
};
