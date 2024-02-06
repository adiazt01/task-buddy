import { useParams } from "react-router-dom";
import useProjectStore from "../store/projectStore";
import { IoCalendar, IoFlag } from "react-icons/io5";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import useModal from "../hooks/useModal";
import { ProjectCreateTaskModal } from "../components/modals/ProjectCreateTaskModal";
import { ProjectUpdateModal } from "../components/modals/ProjectUpdateModal";
import { TaskInTableProject } from "../components/cards/TaskInTableProject";

export const ProjectPage = () => {
  const { id } = useParams();
  const { getProject, deleteProject } = useProjectStore();
  const {
    close: closeTaskModal,
    isOpen: isOpenTaskModal,
    open: openTaskModal,
  } = useModal();
  const {
    close: closeProjectUpdateModal,
    isOpen: isOpenProjectUpdateModal,
    open: openProjectUpdateModal,
  } = useModal();

  if (!id) {
    return <div>Project not found</div>;
  }

  const project = getProject(id);

  if (typeof project !== "string") {
    const { name, description, endDate, tasks, startDate } = project;

    return (
      <>
        <main className="border-2 dark:border-slate-700 flex flex-col gap-2 py-6 p-4 rounded-lg">
          <div className="flex flex-row items-center justify-between">
            <h1 className="text-3xl font-bold text-zinc-800 dark:text-zinc-300">
              {name}
            </h1>
            <div className="flex flex-row gap-2 items-center justify-start">
              <button
                type="button"
                onClick={() => deleteProject(id)}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                <AiFillDelete className="text-md" />
              </button>
              <button
                type="button"
                onClick={openProjectUpdateModal}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                <AiFillEdit className="text-md" />
              </button>
            </div>
          </div>
          <hr className="my-2 dark:border-slate-700" />
          <div className="flex text-zinc-800 flex-row gap-2 items-center justify-start dark:text-zinc-500">
            <IoCalendar className="text-md " />
            <p className="font-medium ">Created at</p>
            <p className="font-medium">{startDate}</p>
          </div>
          <div className="flex text-zinc-800 flex-row gap-2 items-center justify-start dark:text-zinc-500">
            <IoFlag className="text-md" />
            <p className="font-medium">Ends at</p>
            <p className="font-medium">{endDate}</p>
          </div>
          <hr className="my-2 dark:border-slate-700" />
          <p className="text-lg text-zinc-700 dark:text-zinc-300">
            {description}
          </p>
          <hr className="my-2 dark:border-slate-700" />
          <h2 className="text-2xl dark:text-zinc-300 text-zinc-800 font-semibold w-full truncate mt-2">
            Tasks
          </h2>
          <div className="relative mt-8 overflow-x-auto shadow-md sm:rounded-lg">
            {tasks && tasks.length > 0 ? (
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="p-4">
                      <div className="flex items-center"></div>
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Task name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Created at
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Ends at
                    </th>

                    <th scope="col" className="px-6 py-3">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {tasks?.map((task) => (
                    <TaskInTableProject
                      key={task.id}
                      idProject={id}
                      task={task}
                    />
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="flex items-center justify-center w-full dark:border-slate-700 border-2 py-32 border-dashed">
                <p className="text-gray-500 dark:text-gray-400">
                  No tasks found
                </p>
              </div>
            )}
          </div>
          <hr className="my-4 dark:border-slate-700" />
          <button
            type="button"
            onClick={openTaskModal}
            className="transition text-blue-700 w-full  hover:text-white mt-5 border-2 border-dashed border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm py-2 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 "
          >
            Add task
          </button>
        </main>
        {isOpenTaskModal && (
          <ProjectCreateTaskModal close={closeTaskModal} idProject={id} />
        )}
        {isOpenProjectUpdateModal && (
          <ProjectUpdateModal
            idProject={id}
            close={closeProjectUpdateModal}
            project={project}
          />
        )}
      </>
    );
  } else {
    return <div>Project not found</div>;
  }
};
