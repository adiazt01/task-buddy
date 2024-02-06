import { SubmitHandler, useForm } from "react-hook-form";
import useProjectStore from "../../store/projectStore";
import { Task } from "../../types";

export const ProjectTaskUpdateModal = ({
  close,
  task,
  idProject,
  idTask,
}: {
  close: () => void;
  task: Task;
  idProject: string;
  idTask: string;
}) => {
  const { updateTask } = useProjectStore();
  const { register, handleSubmit } = useForm<Task>({ defaultValues: task });

  const onSubmit: SubmitHandler<Task> = (data) => {
    if (!data.name || !data.description) {
      return;
    }
    updateTask(idProject, idTask, data);
    close();
  };
  return (
    <div className="flex flex-col overflow-y-auto bg-gray-900 bg-opacity-50 overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 min-h-screen">
      <div className="z-50 bg-white dark:bg-gray-800 p-4 md:w-1/3 w-11/12 mx-auto rounded-lg">
        <header className="flex items-center justify-between gap-2">
          <h2 className="text-2xl text-zinc-300">Create a new task</h2>
          <button
            onClick={() => close()}
            className="text-4xl transition hover:text-red-500 dark:text-zinc-300 dark:hover:text-red-500"
          >
            &times;
          </button>
        </header>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 mt-4"
        >
          <div className="flex flex-col">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              className="bg-gray-50 border transition border-gray-300 mt-2 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              {...register("name", { required: true })}
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Description
            </label>
            <textarea
              id="description"
              {...register("description", { required: true })}
              className="bg-gray-50 border transition border-gray-300 mt-2 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            ></textarea>
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="startDate"
              className="block text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Start date
            </label>
            <input
              type="date"
              id="startDate"
              className="bg-gray-50 border transition border-gray-300 mt-2 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              {...register("startDate", { required: true })}
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="endDate"
              className="block text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              End date
            </label>
            <input
              type="date"
              id="endDate"
              className="bg-gray-50 border transition border-gray-300 mt-2 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              {...register("endDate", { required: true })}
            />
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
