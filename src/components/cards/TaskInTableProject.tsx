import { AiFillEdit } from "react-icons/ai";
import useModal from "../../hooks/useModal";
import useProjectStore from "../../store/projectStore";
import { Task } from "../../types";
import { ProjectTaskUpdateModal } from "../modals/ProjectTaskUpdateModal";

export const TaskInTableProject = ({
  idProject,
  task,
}: {
  idProject: string;
  task: Task;
}) => {
  const { deleteTask, updateTaskStatus } = useProjectStore();
  const {
    close: closeTaskUpdateModal,
    open: openTaskUpdateModal,
    isOpen: isOpenTaskUpdateModal,
  } = useModal();
  const { close: closeTaskModal, open: openTaskModal } = useModal();
  const { id, name, description, startDate, endDate, status } = task;

  return (
    <>
      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
        <td className="w-4 p-4">
          <div className="flex items-center">
            <input
              id="checkbox-table-search-1"
              type="checkbox"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label htmlFor="checkbox-table-search-1" className="sr-only">
              checkbox
            </label>
          </div>
        </td>
        <th
          scope="row"
          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
        >
          {task.name}
        </th>
        <td className=" py-4">
          <select
            id="countries"
            onChange={(e) =>
              updateTaskStatus(
                idProject,
                id,
                e.target.value as "pending" | "in-progress" | "completed"
              )
            }
            className="w-28 text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            {status === "pending" ? (
              <>
                <option value="pending" selected>
                  Pending
                </option>
                <option value="in-progress">In progress</option>
                <option value="completed">Completed</option>
              </>
            ) : status === "in-progress" ? (
              <>
                <option value="pending">Pending</option>
                <option value="in-progress" selected>
                  In progress
                </option>
                <option value="completed">Completed</option>
              </>
            ) : (
              <>
                <option value="pending">Pending</option>
                <option value="in-progress">In progress</option>
                <option value="completed" selected>
                  Completed
                </option>
              </>
            )}
          </select>
        </td>
        <td className="px-6 py-4">{task.startDate}</td>
        <td className="px-6 py-4">{task.endDate}</td>
        <td className="flex items-center px-6 py-4">
          <button
            onClick={() => openTaskUpdateModal()}
            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
          >
            Edit
          </button>
          <button
            onClick={() => deleteTask(idProject, task.id)}
            className="font-medium text-red-600 dark:text-red-500 hover:underline ms-3"
          >
            Remove
          </button>
        </td>
      </tr>
      {isOpenTaskUpdateModal && (
        <ProjectTaskUpdateModal
          task={task}
          idTask={id}
          close={closeTaskUpdateModal}
          idProject={id}
        />
      )}
    </>
  );
};
