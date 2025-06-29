// src/components/tasks/AddTaskButton.tsx
import React, { useState } from "react";
import { User, TaskPriority, NewTaskData } from "../../types";
import styles from "./AddTaskButton.module.css";

interface AddTaskButtonProps {
  onAddTask: (taskData: NewTaskData) => void;
  users: User[];
  currentUser: User;
  contexts: string[];
}

const AddTaskButton: React.FC<AddTaskButtonProps> = ({
  onAddTask,
  users,
  currentUser,
  contexts,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<NewTaskData>({
    context: contexts[0] || "",
    details: "",
    dueDate: "",
    priority: "normal",
    assignedTo: currentUser.username,
  });
  const [error, setError] = useState("");

  const isAdmin =
    currentUser.role === "admin" || currentUser.role === "superadmin";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.details.trim()) {
      setError("Task details are required.");
      return;
    }

    if (!formData.context) {
      setError("Context is required.");
      return;
    }

    // Due date is now optional - no validation needed

    onAddTask(formData);
    setIsModalOpen(false);
    setFormData({
      context: contexts[0] || "",
      details: "",
      dueDate: "",
      priority: "normal",
      assignedTo: currentUser.username,
    });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setError("");
    setFormData({
      context: contexts[0] || "",
      details: "",
      dueDate: "",
      priority: "normal",
      assignedTo: currentUser.username,
    });
  };

  return (
    <>
      <button onClick={() => setIsModalOpen(true)} className={styles.addBtn}>
        + Add New Task
      </button>

      {isModalOpen && (
        <div className={styles.overlay} onClick={handleCancel}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.header}>
              <h2>Create New Task</h2>
              <button className={styles.closeBtn} onClick={handleCancel}>
                ×
              </button>
            </div>

            <div className={styles.content}>
              <div className={styles.form}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Context *</label>
                  <select
                    value={formData.context}
                    onChange={(e) =>
                      setFormData({ ...formData, context: e.target.value })
                    }
                    className={styles.select}
                  >
                    {contexts.map((context) => (
                      <option key={context} value={context}>
                        {context}
                      </option>
                    ))}
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Task Details *</label>
                  <textarea
                    value={formData.details}
                    onChange={(e) =>
                      setFormData({ ...formData, details: e.target.value })
                    }
                    placeholder="Describe the task in detail..."
                    className={styles.textarea}
                    rows={4}
                  />
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Due Date</label>
                    <input
                      type="date"
                      value={formData.dueDate}
                      onChange={(e) =>
                        setFormData({ ...formData, dueDate: e.target.value })
                      }
                      className={styles.input}
                      min={new Date().toISOString().split("T")[0]}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>Priority</label>
                    <select
                      value={formData.priority}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          priority: e.target.value as TaskPriority,
                        })
                      }
                      className={styles.select}
                    >
                      <option value="normal">Normal</option>
                      <option value="expedited">Expedited</option>
                      <option value="urgent">Urgent</option>
                    </select>
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Assign To</label>
                  <select
                    value={formData.assignedTo}
                    onChange={(e) =>
                      setFormData({ ...formData, assignedTo: e.target.value })
                    }
                    className={styles.select}
                  >
                    {isAdmin ? (
                      users.map((user) => (
                        <option key={user.id} value={user.username}>
                          {user.username}
                        </option>
                      ))
                    ) : (
                      <option value={currentUser.username}>
                        {currentUser.username}
                      </option>
                    )}
                  </select>
                </div>

                {error && <div className={styles.error}>{error}</div>}
              </div>
            </div>

            <div className={styles.footer}>
              <button onClick={handleSubmit} className={styles.createBtn}>
                Create Task
              </button>
              <button onClick={handleCancel} className={styles.cancelBtn}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddTaskButton;
