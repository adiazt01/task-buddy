import { ProjectCard } from "../components/cards/ProjectCard";
import { IoMdAdd } from "react-icons/io";
import { IoPaperPlane } from "react-icons/io5";
import { NoteCreateModal } from "../components/modals/NoteCreateModal";
import useModal from "../hooks/useModal";
import useNoteStore from "../store/noteStore";
import { NoteDashboardContainer } from "../components/containers/TaskDashboardContainer";
import { ProjectCreateModal } from "../components/modals/ProjectCreateModal";
import useProjectStore from "../store/projectStore";

export const Dashboard = () => {
  const {
    isOpen: isOpenCreateNoteModal,
    open: openNoteCreateModal,
    close: closeCreateNoteModal,
  } = useModal();
  const {
    isOpen: isOpenCreateProjectModal,
    open: openProjectCreateModal,
    close: closeCreateProjectModal,
  } = useModal();
  const { notes } = useNoteStore();
  const { projects } = useProjectStore();

  return (
    <main className="px-4 container d-flex flex-col">
      <header className="flex flex-row justify-between items-center mb-4  w-full text-center">
        <h2 className="text-2xl dark:text-zinc-300 font-medium">Mis notas</h2>
        <div className="inline-flex rounded-md shadow-sm" role="group">
          <button
            type="button"
            onClick={openNoteCreateModal}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white transition"
          >
            <IoMdAdd className="w-3 h-3 me-2" />
            Add note
          </button>
          <button
            type="button"
            onClick={openProjectCreateModal}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border-t  border-r rounded-e-lg border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-whit transition"
          >
            <IoPaperPlane className="w-3 h-3 me-2" />
            Add Project
          </button>
        </div>
      </header>

      <section className="mb-8 min-h-52">
        <hr className="mb-8 bt-4 dark:border-slate-700" />
        <NoteDashboardContainer notes={notes} />
      </section>
      <section>
        <h2 className="text-2xl dark:text-zinc-300 font-medium">
          Mis proyectos
        </h2>
        <hr className="mb-8 mt-4 bt-4 dark:border-slate-700" />
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
      {isOpenCreateNoteModal && (
        <NoteCreateModal close={closeCreateNoteModal} />
      )}
      {isOpenCreateProjectModal && (
        <ProjectCreateModal close={closeCreateProjectModal} />
      )}
    </main>
  );
};
