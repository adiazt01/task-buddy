import { SubmitHandler, useForm } from "react-hook-form";
import useProjectStore from "../../store/projectStore";
import { Project } from "../../types";
import { v4 as uuidv4 } from "uuid";

export const ProjectCreateModal = ({ close }: { close: () => void }) => {
  const { createProject } = useProjectStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Project>();

  const onSubmit: SubmitHandler<Project> = (data) => {
    if (!data.name || !data.description) {
      return;
    }
    close();
    data.id = uuidv4();
    data.tasks = [];
    createProject(data);
  };

  return (
    <div className="flex flex-col overflow-y-auto overflow-x-hidden fixed bg-gray-900 bg-opacity-25 top-0 right-0 left-0 z-50 justify-center items-center w-full h-[calc(100%-1rem)] min-h-screen">
      <div className="z-50 py-4 px-6 bg-white dark:bg-gray-800 md:w-1/2 w-11/12 mx-auto rounded-lg">
        <header className="flex items-center justify-between gap-2">
          <h2 className="text-2xl dark:text-zinc-300">Create a new project</h2>
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
          <div className="flex flex-col gap-2">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              className="bg-gray-50 border transition border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="I need a new pc to work better..."
              {...register("name", { required: true })}
            />
            {errors.name && (
              <span className="text-red-500">Name is required</span>
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
              {...register("description", { required: true })}
              className="bg-gray-50 border transition border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="I need a new pc to work better..."
            ></textarea>
            {errors.description && (
              <span className="text-red-500">Description is required</span>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="startDate"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Start date
            </label>
            <input
              className="bg-gray-50 border transition border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="I need a new pc to work better..."
              type="date"
              {...register("startDate")}
            />
            {errors.startDate && (
              <span className="text-red-500">Start date is required</span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="endDate"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              End date
            </label>
            <input
              className="bg-gray-50 border transition border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="I need a new pc to work better..."
              type="date"
              {...register("endDate")}
            />
            {errors.endDate && (
              <span className="text-red-500">End date is required</span>
            )}
          </div>
          <button
            type="submit"
            className="bg-blue-500 w-1/2 mb-4 mt-4 ml-auto md:mx-auto hover:bg-blue-700 transition shadow text-white font-bold py-2 px-4 rounded"
          >
            Create
          </button>
        </form>
      </div>
    </div>
  );
};
