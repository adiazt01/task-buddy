import {
  AiFillBell,
  AiFillDelete,
  AiFillEdit,
  AiFillFlag,
} from "react-icons/ai";
import { Project as ProjectType } from "../../types";
import { TaskInProjectCard } from "./TaskInProjectCard";
import { ProjectCreateTaskModal } from "../modals/ProjectCreateTaskModal";
import useModal from "../../hooks/useModal";
import useProjectStore from "../../store/projectStore";
import { ProjectUpdateModal } from "../modals/ProjectUpdateModal";
import { Link } from "react-router-dom";

export const ProjectCard = ({ project }: { project: ProjectType }) => {
  const { id, endDate, name, tasks, description } = project;

  const { close, isOpen, open } = useModal();
  const {
    close: closeTaskModal,
    isOpen: isOpenTaskModal,
    open: openTaskModal,
  } = useModal();
  const {
    close: closeTaskUpdateModal,
    isOpen: isOpenTaskUpdateModal,
    open: openTaskUpdateModal,
  } = useModal();

  const { deleteProject } = useProjectStore();

  const handleOpen = () => {
    if (isOpen) {
      close();
    } else {
      open();
    }
  };

  return (
    <>
      <article className="relative flex flex-col w-full p-6 bg-white border border-gray-200 rounded-lg shadow  dark:bg-gray-800 dark:border-gray-700 ">
        <header
          onMouseLeave={() => {
            if (isOpen) {
              close();
            }
          }}
          className="flex items-center justify-between gap-2"
        >
          <div className="flex gap-1 items-center">
            <AiFillBell className="text-lg text-gray-900 dark:text-gray-400" />
            <h5 className="text-xl font-bold text-gray-900 inline-flex dark:text-white">
              {name}
            </h5>
          </div>
          <div className="relative">
            <button
              onClick={handleOpen}
              className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              type="button"
            >
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 4 15"
              >
                <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
              </svg>
            </button>
            {isOpen && (
              <div className="absolute right-1 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
                <ul
                  className="py-2 text-sm text-gray-700 dark:text-gray-200"
                  aria-labelledby="dropdownMenuIconButton"
                >
                  <li>
                    <button
                      type="button"
                      onClick={() => openTaskUpdateModal()}
                      className="flex w-full justify-start flex-row gap-2 items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      <AiFillEdit className="inline-block" />
                      Edit project
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => deleteProject(id)}
                      className="flex w-full justify-start flex-row gap-2 items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      <AiFillDelete className="inline-block" />
                      Delete project
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </header>
        <section className="flex items-center gap-2">
          <AiFillFlag className="text-lg text-gray-900 dark:text-gray-400" />
          <p className="font-medium dark:text-gray-400 inline-block">
            {endDate.toString()}
          </p>
        </section>
        <p className="font-normal text-gray-700 text-sm dark:text-gray-400 mt-2">
          {description}
        </p>
        <section className="flex flex-col justify-between gap-2 mt-4">
          {tasks?.length > 0 &&
            tasks
              .slice(0, 3)
              .map((task) => (
                <TaskInProjectCard projectId={id} key={task.id} task={task} />
              ))}
          {tasks?.length > 3 && (
            <p className="text-sm font-medium text-gray-700 dark:text-gray-400">
              +{tasks.length - 3} more
            </p>
          )}
          {tasks?.length === 0 && (
            <div className="flex items-center justify-center w-full border-2 border-dashed dark:border-slate-700 py-16">
              <p className="text-gray-500 dark:text-gray-400">No tasks found</p>
            </div>
          )}
          <hr className="mb-2 mt-4 dark:border-slate-700" />
        </section>

        <footer className="flex items-center justify-end gap-2 mt-4">
          <Link
            to={`/app/projects/${id}`}
            className="text-white transition bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            View project
          </Link>
        </footer>
      </article>

      {isOpenTaskModal && (
        <ProjectCreateTaskModal close={closeTaskModal} idProject={id} />
      )}
      {isOpenTaskUpdateModal && (
        <ProjectUpdateModal
          project={project}
          close={closeTaskUpdateModal}
          idProject={id}
        />
      )}
    </>
  );
};
