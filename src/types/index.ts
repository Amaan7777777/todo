// src/types/index.ts

export type UserRole = "superadmin" | "admin" | "np" | "staff";

export interface User {
  id: string;
  username: string;
  password: string;
  role: UserRole;
}

export type TaskStatus =
  | "new"
  | "in_progress"
  | "completed"
  | "created_in_error";
export type TaskPriority = "normal" | "expedited" | "urgent";

export interface TaskComment {
  id: string;
  author: string; // username
  text: string;
  timestamp: number;
}

export interface TaskTransfer {
  from: string; // username
  to: string; // username
  timestamp: number;
  reason?: string;
}

export interface Task {
  id: string;
  date: string; // Created date
  createdBy: string; // username of creator
  details: string;
  context: string; // "Text" | "Email" | "PA"
  dueDate: string;
  priority: TaskPriority;
  status: TaskStatus;
  assignedTo: string; // username
  archived: boolean;
  transferHistory: TaskTransfer[];
  comments: TaskComment[];
}

// New interfaces for filters and forms
export interface TaskFilters {
  search: string;
  status: TaskStatus | "all";
  priority: TaskPriority | "all";
  assignedTo: string | "all";
}

export interface NewTaskData {
  context: string;
  details: string;
  dueDate: string;
  priority: TaskPriority;
  assignedTo: string;
}
