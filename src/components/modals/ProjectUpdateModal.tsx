import { SubmitHandler, useForm } from "react-hook-form";
import useProjectStore from "../../store/projectStore";
import { Project } from "../../types";

export const ProjectUpdateModal = ({
  close,
  idProject,
  project,
}: {
  close: () => void;
  idProject: string;
  project: Project;
}) => {
  const { updateProject } = useProjectStore();
  const { register, handleSubmit } = useForm<Project>();
  const { name, description, endDate } = project;

  const onSubmit: SubmitHandler<Project> = (data) => {
    if (!data.name || !data.description) {
      return;
    }
    close();
    console.log(data);
    updateProject(idProject, {
      ...data,
    });
  };
  return (
    <div className="flex flex-col overflow-y-auto bg-gray-900 bg-opacity-50 overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 min-h-screen">
      <div className="z-50 bg-white dark:bg-gray-800 p-4 md:w-1/3 w-11/12 mx-auto rounded-lg">
        <header className="flex items-center justify-between ">
          <h2 className="block mb-2 text-2xl font-medium text-gray-900 dark:text-white">
            Update project
          </h2>
          <button
            onClick={() => close()}
            className="text-4xl dark:text-zinc-500 hover:text-red-500 dark:hover:text-red-500 transition mb-2"
          >
            &times;
          </button>
        </header>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 mt-4"
        >
          <div className="flex flex-col ">
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
              {...register("name", { required: true })}
              defaultValue={name}
            />
          </div>
          <div className="flex flex-col">
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
              defaultValue={description}
            ></textarea>
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="endDate"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              End date
            </label>
            <input
              type="date"
              id="endDate"
              className="bg-gray-50 border transition border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              {...register("endDate")}
              defaultValue={endDate}
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 w-1/2 ml-auto md:mx-auto mb-4 mt-8 hover:bg-blue-700 transition shadow text-white font-bold py-2 px-4 rounded"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
};
