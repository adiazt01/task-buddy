import { useForm, SubmitHandler } from "react-hook-form";
import { Note } from "../../types";
import useNoteStore from "../../store/noteStore";
import { v4 as uuidv4 } from "uuid";

export const NoteCreateModal = ({ close }: { close: () => void }) => {
  const { createNote } = useNoteStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Note>();

  const onSubmit: SubmitHandler<Note> = (data) => {
    if (!data.title || !data.description) {
      return;
    }
    close();
    data.id = uuidv4();
    createNote(data);
  };

  return (
    <div className="flex flex-col overflow-y-auto overflow-x-hidden fixed bg-gray-900 bg-opacity-25  top-0 right-0 left-0 z-50 justify-center items-center w-full h-[calc(100%-1rem)] min-h-screen">
      <div className="z-50 shadow-xl py-4 px-6 bg-white dark:bg-gray-800 md:w-1/3 w-11/12 mx-auto rounded-lg">
        <header className="flex items-center justify-between gap-2">
          <h2 className="text-2xl text-zinc-300">Create a new note</h2>
          <button
            onClick={() => close()}
            className="text-4xl transition hover:text-red-500 dark:text-zinc-300 dark:hover:text-red-500"
          >
            &times;
          </button>
        </header>

        <hr className="my-4 dark:border-slate-700" />
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-6 mt-4"
        >
          <div>
            <label
              htmlFor="title"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              className="bg-gray-50 border transition border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="My new pc"
              {...register("title", { required: true })}
            />
            {errors.title && (
              <span className="text-red-500">Title field is required</span>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="description"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Description
            </label>
            <textarea
              id="description"
              className="bg-gray-50 border transition border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="I need a new pc to work better..."
              {...register("description", { required: true })}
            ></textarea>
            {errors.description && (
              <span className="text-red-500">
                Description field is required
              </span>
            )}
          </div>
          <button
            type="submit"
            data-modal-toggle="create-note-modal"
            className="bg-blue-500 w-1/2 mb-4 mt-4 ml-auto md:mx-auto hover:bg-blue-700 transition shadow text-white font-bold py-2 px-4 rounded"
          >
            Create
          </button>
        </form>
      </div>
    </div>
  );
};
