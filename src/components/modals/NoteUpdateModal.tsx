import { Note } from "../../types";
import useNoteStore from "../../store/noteStore";
import { useForm } from "react-hook-form";

export const NoteUpdateModal = ({
  close,
  note,
}: {
  close: () => void;
  note: Note;
}) => {
  const { register, handleSubmit } = useForm<Note>({ defaultValues: note });
  const { updateNote } = useNoteStore();
  const { id } = note;

  const onSubmit = (data: Note) => {
    updateNote(id, data);
    close();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg w-96">
        <header className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl text-zinc-300">Update a note</h2>
          <button
            onClick={() => close()}
            className="text-4xl transition hover:text-red-500 dark:text-zinc-300 dark:hover:text-red-500"
          >
            &times;
          </button>
        </header>
        <form onSubmit={handleSubmit(onSubmit)} className="p-4 space-y-4">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Título
            </label>
            <input
              type="text"
              id="title"
              {...register("title")}
              className="bg-gray-50 border transition border-gray-300 mt-2 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Descripción
            </label>
            <textarea
              id="description"
              {...register("description")}
              className="bg-gray-50 mt-2 border transition border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              data-modal-toggle="create-note-modal"
              className="bg-blue-500 w-1/2 mb-4 mt-4 ml-auto md:mx-auto hover:bg-blue-700 transition shadow text-white font-bold py-2 px-4 rounded"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
