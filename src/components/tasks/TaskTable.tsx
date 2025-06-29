// src/components/tasks/TaskTable.tsx
import React from "react";
import { Task, TaskStatus, TaskPriority } from "../../types";
import styles from "./TaskTable.module.css";

interface TaskTableProps {
  tasks: Task[];
  onViewTask: (task: Task) => void;
  currentUser: string;
}

const TaskTable: React.FC<TaskTableProps> = ({
  tasks,
  onViewTask,
  currentUser,
}) => {
  const getStatusColor = (status: TaskStatus) => {
    switch (status) {
      case "new":
        return "#2196F3";
      case "in_progress":
        return "#FF9800";
      case "completed":
        return "#4CAF50";
      case "created_in_error":
        return "#9E9E9E";
      default:
        return "#2196F3";
    }
  };

  const getPriorityColor = (priority: TaskPriority) => {
    switch (priority) {
      case "normal":
        return "#4CAF50";
      case "expedited":
        return "#FF9800";
      case "urgent":
        return "#F44336";
      default:
        return "#4CAF50";
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "No due date";
    return new Date(dateString).toLocaleDateString();
  };

  if (tasks.length === 0) {
    return (
      <div className={styles.emptyState}>
        <p>No tasks found matching your criteria.</p>
      </div>
    );
  }

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Date</th>
            <th>Task From</th>
            <th>Context</th>
            <th>Details</th>
            <th>Due Date</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Assigned To</th>
            <th>View</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id} className={styles.row}>
              <td>{formatDate(task.date)}</td>
              <td>{task.createdBy}</td>
              <td>
                <span className={styles.contextBadge}>{task.context}</span>
              </td>
              <td className={styles.details}>
                {task.details.length > 50
                  ? `${task.details.substring(0, 50)}...`
                  : task.details}
              </td>
              <td>{formatDate(task.dueDate)}</td>
              <td>
                <span
                  className={styles.priorityBadge}
                  style={{ backgroundColor: getPriorityColor(task.priority) }}
                >
                  {task.priority}
                </span>
              </td>
              <td>
                <span
                  className={styles.statusBadge}
                  style={{ backgroundColor: getStatusColor(task.status) }}
                >
                  {task.status.replace("_", " ")}
                </span>
              </td>
              <td>{task.assignedTo}</td>
              <td>
                <button
                  className={styles.viewBtn}
                  onClick={() => onViewTask(task)}
                  title="View task details"
                >
                  👁️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskTable;
