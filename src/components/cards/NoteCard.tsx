import useNoteStore from "../../store/noteStore";
import { Note } from "../../types";
import { AiOutlineClose, AiOutlineEdit } from "react-icons/ai";
import { NoteUpdateModal } from "../modals/NoteUpdateModal";
import useModal from "../../hooks/useModal";

export const NoteCard = ({ note }: { note: Note }) => {
  const { deleteNote, updateNote } = useNoteStore();
  const {
    close: closeNoteModalUpdate,
    isOpen: isOpenNoteModalUpdate,
    open: openNoteModalUpdate,
  } = useModal();

  return (
    <>
      <article
        key={note.id}
        className="px-4 py-6 bg-white border border-gray-200 rounded-lg shadow  dark:bg-gray-800 dark:border-gray-700 "
      >
        <header className="flex flex-row  justify-between mb-4">
          <div className="flex flex-row items-center truncate w-11/12">
            <input
              id="default-checkbox"
              onClick={() =>
                updateNote(note.id, {
                  ...note,
                  isCompleted: !note.isCompleted,
                })
              }
              type="checkbox"
              defaultChecked={note.isCompleted}
              className="w-4 h-4 cursor-pointer text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="default-checkbox"
              className="ms-2 cursor-pointer text-lg truncate font-medium text-gray-900 dark:text-gray-300"
            >
              {note.title}
            </label>
          </div>
          <div className="text-gray-400 dark:text-gray-300 w-full flex flex-row justify-end">
            <button
              type="button"
              onClick={() => deleteNote(note.id)}
              className="text-white rounded-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-sm p-1 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              <AiOutlineClose className="w-5 h-4" />
            </button>
            <button
              type="button"
              onClick={openNoteModalUpdate}
              className="text-white rounded-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-sm p-1 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              <AiOutlineEdit className="w-5 h-4" />
            </button>
          </div>
        </header>
        <p className="text-gray-700 dark:text-gray-300">{note.description}</p>
      </article>
      {isOpenNoteModalUpdate && (
        <NoteUpdateModal note={note} close={closeNoteModalUpdate} />
      )}
    </>
  );
};
