import { AiFillDelete, AiOutlineCheck } from "react-icons/ai";
import { Task as TaskType } from "../../types";
import useProjectStore from "../../store/projectStore";

export const TaskInProjectCard = ({
  task,
  projectId,
}: {
  task: TaskType;
  projectId: string;
}) => {
  const { name, id } = task;
  const { deleteTask } = useProjectStore();

  return (
    <div className="text-sm rounded dark:border-slate-700 flex items-center flex-row justify-between border p-2 font-normal">
      <h6 className="dark:text-zinc-300">{name}</h6>
      <div className="flex flex-row gap-2">
        <button
          onClick={() => deleteTask(projectId, id)}
          className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-2 rounded-full"
        >
          <AiFillDelete className="text-white" />
        </button>
      </div>
    </div>
  );
};
