import { Task } from "./Task";

export interface Project {
  id: string;
  description: string;
  name: string;
  startDate: string;
  endDate: string;
  tasks: Task[];
}
