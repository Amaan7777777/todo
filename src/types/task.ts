export type Task = {
  id: string;
  date: string;
  createdAt: string;
  updatedAt: string;
  context: string;
  details: string;
  dueDate: string;
  priority: "Normal" | "Expedited" | "Urgent";
  status: "new" | "in_progress" | "Completed" | "Created in Error";
  assignedTo: string;
  archived: boolean;
  transferHistory: Array<{
    from: string;
    to: string;
    by?: string;
    timestamp: number;
  }>;
  comments: Array<{
    author: string;
    text: string;
    timestamp: number;
  }>;
};
