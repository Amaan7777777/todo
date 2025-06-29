// src/pages/TodoTasks.tsx
import React, { useState, useEffect, useMemo } from "react";
import { useUsers } from "../context/UsersContext";
import TaskTable from "../components/tasks/TaskTable";
import TaskModal from "../components/tasks/TaskModal";
import SearchFilterBar from "../components/tasks/SearchFilterBar";
import AddTaskButton from "../components/tasks/AddTaskButton";
import { Task, TaskFilters, NewTaskData } from "../types";
import { demoTasks } from "../data/demoTasks";
import styles from "./TodoTasks.module.css";

const TodoTasks: React.FC = () => {
  const { users, currentUser } = useUsers();
  const contexts = ["Text", "Email", "PA"]; // hardcoded contexts for now
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filters, setFilters] = useState<TaskFilters>({
    search: "",
    status: "all",
    priority: "all",
    assignedTo: "all",
  });

  // Load tasks from localStorage or use demo data
  useEffect(() => {
    const stored = localStorage.getItem("aura_tasks");
    if (stored) {
      setTasks(JSON.parse(stored));
    } else {
      setTasks(demoTasks);
      localStorage.setItem("aura_tasks", JSON.stringify(demoTasks));
    }
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem("aura_tasks", JSON.stringify(tasks));
    }
  }, [tasks]);

  // Auto-archive completed and error tasks
  const moveToArchive = (task: Task) => {
    const archivedTask = { ...task, archived: true };

    // Get existing archived tasks
    const existingArchived = localStorage.getItem("aura_archived_tasks");
    const archivedTasks = existingArchived ? JSON.parse(existingArchived) : [];

    // Add to archive
    archivedTasks.push(archivedTask);
    localStorage.setItem("aura_archived_tasks", JSON.stringify(archivedTasks));

    // Remove from active tasks
    setTasks((prevTasks) => prevTasks.filter((t) => t.id !== task.id));
  };

  // Filter tasks - "Tasks" page shows ONLY user's assigned NON-ARCHIVED tasks
  const filteredTasks = useMemo(() => {
    if (!currentUser) return [];

    // For "Tasks" page: EVERYONE sees only their assigned, non-archived tasks
    let userTasks = tasks.filter(
      (task) => task.assignedTo === currentUser.username && !task.archived
    );

    // Apply search and filter criteria
    return userTasks.filter((task) => {
      // Search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        const matchesSearch =
          task.details.toLowerCase().includes(searchLower) ||
          task.context.toLowerCase().includes(searchLower) ||
          task.assignedTo.toLowerCase().includes(searchLower) ||
          task.createdBy.toLowerCase().includes(searchLower);

        if (!matchesSearch) return false;
      }

      // Status filter
      if (filters.status !== "all" && task.status !== filters.status) {
        return false;
      }

      // Priority filter
      if (filters.priority !== "all" && task.priority !== filters.priority) {
        return false;
      }

      return true;
    });
  }, [tasks, filters, currentUser]);

  const handleViewTask = (task: Task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const handleSaveTask = (updatedTask: Task) => {
    // Check if task should be archived (completed or created in error)
    if (
      updatedTask.status === "completed" ||
      updatedTask.status === "created_in_error"
    ) {
      moveToArchive(updatedTask);
      setIsModalOpen(false);
      setSelectedTask(null);
      return;
    }

    // Update tasks in state and localStorage immediately
    const updatedTasks = tasks.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    );

    setTasks(updatedTasks);
    localStorage.setItem("aura_tasks", JSON.stringify(updatedTasks));

    // Close modal if task was transferred away from current user
    if (updatedTask.assignedTo !== currentUser?.username) {
      setIsModalOpen(false);
      setSelectedTask(null);
    } else {
      setSelectedTask(updatedTask);
    }
  };

  const handleAddTask = (taskData: NewTaskData) => {
    const newTask: Task = {
      id: Date.now().toString(),
      date: new Date().toISOString().split("T")[0],
      createdBy: currentUser!.username,
      details: taskData.details,
      context: taskData.context,
      dueDate: taskData.dueDate || "", // Handle optional due date
      priority: taskData.priority,
      status: "new",
      assignedTo: taskData.assignedTo,
      archived: false,
      transferHistory: [
        {
          from: currentUser!.username,
          to: taskData.assignedTo,
          timestamp: Date.now(),
          reason: "Initial assignment",
        },
      ],
      comments: [],
    };

    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    localStorage.setItem("aura_tasks", JSON.stringify(updatedTasks));
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTask(null);
  };

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>My Tasks</h1>
        <div className={styles.headerActions}>
          <AddTaskButton
            onAddTask={handleAddTask}
            users={users}
            currentUser={currentUser}
            contexts={contexts}
          />
          <div className={styles.stats}>
            <div className={styles.statCard}>
              <span className={styles.statNumber}>{filteredTasks.length}</span>
              <span className={styles.statLabel}>Active</span>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statNumber}>
                {filteredTasks.filter((t) => t.status === "new").length}
              </span>
              <span className={styles.statLabel}>New</span>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statNumber}>
                {filteredTasks.filter((t) => t.status === "in_progress").length}
              </span>
              <span className={styles.statLabel}>In Progress</span>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statNumber}>
                {(() => {
                  const archived = localStorage.getItem("aura_archived_tasks");
                  const archivedTasks = archived ? JSON.parse(archived) : [];
                  return archivedTasks.filter(
                    (t: Task) => t.assignedTo === currentUser.username
                  ).length;
                })()}
              </span>
              <span className={styles.statLabel}>Archived</span>
            </div>
          </div>
        </div>
      </div>

      <SearchFilterBar
        filters={filters}
        onFiltersChange={setFilters}
        users={users}
        currentUser={currentUser}
      />

      <TaskTable
        tasks={filteredTasks}
        onViewTask={handleViewTask}
        currentUser={currentUser.username}
      />

      {selectedTask && (
        <TaskModal
          task={selectedTask}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSave={handleSaveTask}
          users={users}
          currentUser={currentUser}
          contexts={contexts}
        />
      )}
    </div>
  );
};

export default TodoTasks;
