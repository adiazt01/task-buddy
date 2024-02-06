import { IoMdAdd } from "react-icons/io";
import { NoteDashboardContainer } from "../components/containers/TaskDashboardContainer";
import { NoteCreateModal } from "../components/modals/NoteCreateModal";
import useModal from "../hooks/useModal";
import useNoteStore from "../store/noteStore";
import { NoteCard } from "../components/cards/NoteCard";

export const Notes = () => {
  const {
    isOpen: isOpenCreateNoteModal,
    open: openNoteCreateModal,
    close: closeCreateNoteModal,
  } = useModal();
  const { notes } = useNoteStore();

  const notesCompleted = notes.filter((note) => note.isCompleted);
  const notesUncompleted = notes.filter((note) => !note.isCompleted);

  return (
    <main className="px-4 container d-flex flex-col">
      <header className="flex items-center justify-between mb-4">
        <h2 className="text-2xl dark:text-zinc-300 font-medium">Mis notas</h2>
        <div className="inline-flex rounded-md shadow-sm">
          <button
            type="button"
            onClick={openNoteCreateModal}
            className="inline-flex items-center px-4 py-2 text-sm rounded-lg font-medium text-gray-900 bg-white border border-gray-20 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white transition"
          >
            <IoMdAdd className="w-3 h-3 me-2" />
            Add note
          </button>
        </div>
      </header>
      <hr className="mb-8 dark:border-slate-700 bt-4" />

      <section className="mb-8">
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {notesUncompleted.map((note) => (
            <NoteCard key={note.id} note={note} />
          ))}
        </ul>
          {notesUncompleted.length === 0 && (
            <p className="text-center border-dashed dark:border-slate-700 py-20 border-2 text-gray-500 dark:text-gray-400">
            Ups! No tienes notas pendientes. Crea una nueva nota para comenzar. 😎
          </p>
          )}
      </section>
      <section>
        <h2 className="text-2xl dark:text-zinc-300 font-medium">Mis notas completadas</h2>
        <hr className="mb-8 mt-4 dark:border-slate-700 bt-4" />

        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {notesCompleted.map((note) => (
            <NoteCard key={note.id} note={note} />
          ))}
        </ul>
          {notesCompleted.length === 0 && (
              <p className="text-center border-dashed dark:border-slate-700 py-20 border-2 text-gray-500 dark:text-gray-400">
              No hay notas archivadas 😎
            </p>
          )}
      </section>
      {isOpenCreateNoteModal && (
        <NoteCreateModal close={closeCreateNoteModal} />
      )}
    </main>
  );
};
