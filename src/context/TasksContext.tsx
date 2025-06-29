// src/context/TasksContext.tsx
import React, { createContext, useState, useContext, ReactNode } from "react";
import { Task } from "../types";
import { demoTasks } from "../data/demoTasks";

interface TasksContextType {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

const TasksContext = createContext<TasksContextType | undefined>(undefined);

export const TasksContextProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>(demoTasks);

  return (
    <TasksContext.Provider value={{ tasks, setTasks }}>
      {children}
    </TasksContext.Provider>
  );
};

export const useTasksContext = () => {
  const context = useContext(TasksContext);
  if (!context) {
    throw new Error(
      "useTasksContext must be used within a TasksContextProvider"
    );
  }
  return context;
};
