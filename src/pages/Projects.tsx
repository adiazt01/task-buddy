import { IoPaperPlane } from "react-icons/io5";
import { ProjectCard } from "../components/cards/ProjectCard";
import useProjectStore from "../store/projectStore";
import useModal from "../hooks/useModal";
import { ProjectCreateModal } from "../components/modals/ProjectCreateModal";

export const Projects = () => {
  const {
    isOpen: isOpenCreateProjectModal,
    open: openProjectCreateModal,
    close: closeCreateProjectModal,
  } = useModal();
  const { projects } = useProjectStore();
  return (
    <main className="px-4 container d-flex flex-col">
      <header className="flex flex-row items-center justify-between">
        <h1 className="text-2xl dark:text-zinc-300 font-medium">Projects</h1>
        <button
          type="button"
          onClick={openProjectCreateModal}
          className="inline-flex items-center px-4 py-2 text-sm rounded-lg font-medium text-gray-900 bg-white border border-gray-20 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white transition"
        >
          <IoPaperPlane className="w-3 h-3 me-2" />
          Add Project
        </button>
      </header>
      <hr className="dark:border-slate-700 mb-8 mt-5 bt-4" />
      <section>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
        <div className="text-center">
          {projects.length === 0 && (
            <p className="text-center py-20 border-dashed dark:border-slate-700 border-2 text-gray-500">
            No hay proyectos por mostrar 😎
          </p>
          )}
        </div>
      </section>
      {isOpenCreateProjectModal && (
        <ProjectCreateModal close={closeCreateProjectModal} />
      )}
    </main>
  );
};
