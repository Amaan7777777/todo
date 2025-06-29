// src/components/tasks/TaskModal.tsx
import React, { useState, useEffect } from "react";
import { Task, TaskStatus, TaskPriority, User, TaskComment } from "../../types";
import styles from "./TaskModal.module.css";

interface TaskModalProps {
  task: Task;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedTask: Task) => void;
  users: User[];
  currentUser: User;
  contexts: string[];
}

const TaskModal: React.FC<TaskModalProps> = ({
  task,
  isOpen,
  onClose,
  onSave,
  users,
  currentUser,
  contexts,
}) => {
  const [editedTask, setEditedTask] = useState<Task>(task);
  const [newComment, setNewComment] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  // Update editedTask when task prop changes
  useEffect(() => {
    setEditedTask(task);
  }, [task]);

  if (!isOpen) return null;

  const canEdit =
    currentUser.role === "admin" ||
    currentUser.role === "superadmin" ||
    editedTask.assignedTo === currentUser.username;

  const handleSave = () => {
    // Always save and close modal
    onSave(editedTask);
    setIsEditing(false);
    onClose(); // Close modal after saving
  };

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    const comment: TaskComment = {
      id: Date.now().toString(),
      author: currentUser.username,
      text: newComment.trim(),
      timestamp: Date.now(),
    };

    const updatedTask = {
      ...editedTask,
      comments: [...editedTask.comments, comment],
    };

    setEditedTask(updatedTask);
    setNewComment("");

    // Auto-save comment
    onSave(updatedTask);
  };

  const handleTransfer = (newAssignee: string) => {
    if (newAssignee === editedTask.assignedTo) return;

    const transfer = {
      from: editedTask.assignedTo,
      to: newAssignee,
      timestamp: Date.now(),
      reason: `Transferred by ${currentUser.username}`,
    };

    setEditedTask((prev) => ({
      ...prev,
      assignedTo: newAssignee,
      transferHistory: [...prev.transferHistory, transfer],
    }));
  };

  const formatDateTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleString();
  };

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

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2>Task Details</h2>
          <button className={styles.closeBtn} onClick={onClose}>
            ×
          </button>
        </div>

        <div className={styles.content}>
          {/* Task Info Section */}
          <div className={styles.section}>
            <h3>Task Information</h3>
            <div className={styles.taskInfo}>
              <div className={styles.infoCard}>
                <span className={styles.infoLabel}>Created</span>
                <span className={styles.infoValue}>
                  {new Date(editedTask.date).toLocaleDateString()}
                </span>
              </div>

              <div className={styles.infoCard}>
                <span className={styles.infoLabel}>Created By</span>
                <span className={styles.infoValue}>{editedTask.createdBy}</span>
              </div>

              <div className={styles.infoCard}>
                <span className={styles.infoLabel}>Due Date</span>
                {isEditing && canEdit ? (
                  <input
                    type="date"
                    value={editedTask.dueDate}
                    onChange={(e) =>
                      setEditedTask({ ...editedTask, dueDate: e.target.value })
                    }
                    className={styles.input}
                  />
                ) : (
                  <span className={styles.infoValue}>
                    {editedTask.dueDate
                      ? new Date(editedTask.dueDate).toLocaleDateString()
                      : "No due date"}
                  </span>
                )}
              </div>

              <div className={styles.infoCard}>
                <span className={styles.infoLabel}>Context</span>
                {isEditing && canEdit ? (
                  <select
                    value={editedTask.context}
                    onChange={(e) =>
                      setEditedTask({ ...editedTask, context: e.target.value })
                    }
                    className={styles.select}
                  >
                    {contexts.map((context) => (
                      <option key={context} value={context}>
                        {context}
                      </option>
                    ))}
                  </select>
                ) : (
                  <span className={styles.contextBadge}>
                    {editedTask.context}
                  </span>
                )}
              </div>

              <div className={styles.infoCard}>
                <span className={styles.infoLabel}>Priority</span>
                {isEditing && canEdit ? (
                  <select
                    value={editedTask.priority}
                    onChange={(e) =>
                      setEditedTask({
                        ...editedTask,
                        priority: e.target.value as TaskPriority,
                      })
                    }
                    className={styles.select}
                  >
                    <option value="normal">Normal</option>
                    <option value="expedited">Expedited</option>
                    <option value="urgent">Urgent</option>
                  </select>
                ) : (
                  <span
                    className={styles.priorityBadge}
                    style={{
                      backgroundColor: getPriorityColor(editedTask.priority),
                    }}
                  >
                    {editedTask.priority}
                  </span>
                )}
              </div>

              <div className={styles.infoCard}>
                <span className={styles.infoLabel}>Status</span>
                {isEditing && canEdit ? (
                  <select
                    value={editedTask.status}
                    onChange={(e) =>
                      setEditedTask({
                        ...editedTask,
                        status: e.target.value as TaskStatus,
                      })
                    }
                    className={styles.select}
                  >
                    <option value="new">New</option>
                    <option value="in_progress">In Progress</option>
                    <option value="completed">Completed</option>
                    <option value="created_in_error">Created in Error</option>
                  </select>
                ) : (
                  <span
                    className={styles.statusBadge}
                    style={{
                      backgroundColor: getStatusColor(editedTask.status),
                    }}
                  >
                    {editedTask.status.replace("_", " ")}
                  </span>
                )}
              </div>

              <div className={styles.infoCard}>
                <span className={styles.infoLabel}>Assigned To</span>
                {isEditing && canEdit ? (
                  <select
                    value={editedTask.assignedTo}
                    onChange={(e) => handleTransfer(e.target.value)}
                    className={styles.select}
                  >
                    {users.map((user) => (
                      <option key={user.id} value={user.username}>
                        {user.username}
                      </option>
                    ))}
                  </select>
                ) : (
                  <span className={styles.infoValue}>
                    {editedTask.assignedTo}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Details Section */}
          <div className={styles.section}>
            <h3>Details</h3>
            {isEditing && canEdit ? (
              <textarea
                value={editedTask.details}
                onChange={(e) =>
                  setEditedTask({ ...editedTask, details: e.target.value })
                }
                className={styles.textarea}
                rows={4}
              />
            ) : (
              <p className={styles.details}>{editedTask.details}</p>
            )}
          </div>

          {/* Comments Section - Moved after Details */}
          <div className={styles.section}>
            <h3>Comments</h3>
            {editedTask.comments.length > 0 ? (
              <div className={styles.commentsList}>
                {editedTask.comments.map((comment) => (
                  <div key={comment.id} className={styles.comment}>
                    <div className={styles.commentHeader}>
                      <strong>{comment.author}</strong>
                      <span className={styles.commentTime}>
                        {formatDateTime(comment.timestamp)}
                      </span>
                    </div>
                    <p className={styles.commentText}>{comment.text}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className={styles.noComments}>No comments yet.</p>
            )}

            {/* Add Comment */}
            <div className={styles.addComment}>
              <textarea
                placeholder="Add a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className={styles.commentInput}
                rows={3}
              />
              <button
                onClick={handleAddComment}
                className={styles.addCommentBtn}
                disabled={!newComment.trim()}
              >
                Add Comment
              </button>
            </div>
          </div>

          {/* Transfer History - Moved to last */}
          {editedTask.transferHistory.length > 0 && (
            <div className={styles.section}>
              <h3>Transfer History</h3>
              <div className={styles.historyList}>
                {editedTask.transferHistory.map((transfer, index) => (
                  <div key={index} className={styles.historyItem}>
                    <span>{formatDateTime(transfer.timestamp)}: </span>
                    <span>
                      Transferred from <strong>{transfer.from}</strong> to{" "}
                      <strong>{transfer.to}</strong>
                    </span>
                    {transfer.reason && <span> - {transfer.reason}</span>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className={styles.footer}>
          {canEdit && (
            <>
              {isEditing ? (
                <>
                  <button onClick={handleSave} className={styles.saveBtn}>
                    Save Changes
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className={styles.cancelBtn}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className={styles.editBtn}
                >
                  Edit Task
                </button>
              )}
            </>
          )}
          <button onClick={onClose} className={styles.closeFooterBtn}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
