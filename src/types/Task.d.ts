export interface Task {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  status: "pending" | "in-progress" | "completed";
}
