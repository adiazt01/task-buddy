import { create } from "zustand";
import { Project, Task } from "../types";
import { persist, devtools } from "zustand/middleware";

export interface ProjectState {
  projects: Project[];
  getProject: (projectId: string) => Project | "not found";
  setProjects: (projects: Project[]) => void;
  createProject: (project: Project) => void;
  updateProject: (projectId: string, updatedProject: Project) => void;
  deleteProject: (projectId: string) => void;
  createTask: (projectId: string, task: Task) => void;
  updateTask: (projectId: string, taskId: string, updatedTask: Task) => void;
  deleteTask: (projectId: string, taskId: string) => void;
  updateTaskStatus: (
    projectId: string,
    taskId: string,
    status: Task["status"]
  ) => void;
}

const useProjectStore = create<ProjectState>()(
  devtools(
    persist(
      (set, get) => ({
        projects: [],
        getProject: (projectId: string) => {
          const project = get().projects.find((p) => p.id === projectId);
          return project ? project : "not found";
        },
        setProjects: (projects) => set({ projects }),
        createProject: (project) => {
          set((state) => ({ projects: [...state.projects, project] }));
        },
        updateProject: (projectId, updatedProject) =>
          set((state) => ({
            projects: state.projects.map((project) =>
              project.id === projectId
                ? { ...project, ...updatedProject }
                : project
            ),
          })),
        deleteProject: (projectId) =>
          set((state) => ({
            projects: state.projects.filter(
              (project) => project.id !== projectId
            ),
          })),
        createTask: (projectId, task) => {
          set((state) => ({
            projects: state.projects.map((project) =>
              project.id === projectId
                ? { ...project, tasks: [...project.tasks, task] }
                : project
            ),
          }));
        },
        updateTask: (projectId, taskId, updatedTask) =>
          set((state) => ({
            projects: state.projects.map((project) =>
              project.id === projectId
                ? {
                    ...project,
                    tasks: project.tasks.map((task) =>
                      task.id === taskId ? updatedTask : task
                    ),
                  }
                : project
            ),
          })),
        deleteTask: (projectId, taskId) =>
          set((state) => ({
            projects: state.projects.map((project) =>
              project.id === projectId
                ? {
                    ...project,
                    tasks: project.tasks.filter((task) => task.id !== taskId),
                  }
                : project
            ),
          })),
        updateTaskStatus: (projectId, taskId, status) =>
          set((state) => ({
            projects: state.projects.map((project) =>
              project.id === projectId
                ? {
                    ...project,
                    tasks: project.tasks.map((task) =>
                      task.id === taskId ? { ...task, status } : task
                    ),
                  }
                : project
            ),
          })),
      }),
      { name: "project-store" }
    )
  )
);

export default useProjectStore;
