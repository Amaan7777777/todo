import React, { useState, useEffect } from "react";
import styles from "./Contexts.module.css";

const LOCAL_STORAGE_KEY = "aura_contexts";
const defaultContexts: string[] = ["Text", "Email", "PA"];

const Contexts: React.FC = () => {
  // Initialize from localStorage if available
  const [contexts, setContexts] = useState<string[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    return saved ? JSON.parse(saved) : defaultContexts;
  });

  const [newContext, setNewContext] = useState("");
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editValue, setEditValue] = useState("");
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);

  // Save to localStorage whenever contexts change
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contexts));
  }, [contexts]);

  const handleAdd = () => {
    const trimmed = newContext.trim();
    if (trimmed && !contexts.includes(trimmed)) {
      setContexts([...contexts, trimmed]);
      setNewContext("");
    }
  };

  const handleEdit = (index: number) => {
    setEditIndex(index);
    setEditValue(contexts[index]);
  };

  const handleSave = (index: number) => {
    const trimmed = editValue.trim();
    if (trimmed && !contexts.includes(trimmed)) {
      setContexts(contexts.map((ctx, idx) => (idx === index ? trimmed : ctx)));
      setEditIndex(null);
      setEditValue("");
    }
  };

  const handleDelete = (index: number) => {
    setDeleteIndex(index);
  };

  const confirmDelete = () => {
    if (deleteIndex !== null) {
      setContexts(contexts.filter((_, idx) => idx !== deleteIndex));
      setDeleteIndex(null);
    }
  };

  const cancelDelete = () => setDeleteIndex(null);

  return (
    <div className={styles.container}>
      <div className={styles.title}>Manage Contexts</div>
      <div className={styles.inputRow}>
        <input
          className={styles.input}
          placeholder="New context name"
          value={newContext}
          onChange={(e) => setNewContext(e.target.value)}
          onKeyDown={(e) => (e.key === "Enter" ? handleAdd() : undefined)}
        />
        <button className={styles.addBtn} onClick={handleAdd}>
          Add
        </button>
      </div>
      <ul className={styles.list}>
        {contexts.map((ctx, idx) => (
          <li className={styles.listItem} key={ctx}>
            {editIndex === idx ? (
              <>
                <input
                  className={styles.input}
                  style={{ maxWidth: 140 }}
                  type="text"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  onKeyDown={(e) =>
                    e.key === "Enter" ? handleSave(idx) : undefined
                  }
                  autoFocus
                />
                <button
                  className={styles.editBtn}
                  onClick={() => handleSave(idx)}
                >
                  Save
                </button>
                <button
                  className={styles.cancelBtn}
                  onClick={() => setEditIndex(null)}
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <span className={styles.label}>{ctx}</span>
                <button
                  className={styles.editBtn}
                  onClick={() => handleEdit(idx)}
                >
                  Edit
                </button>
                <button
                  className={styles.deleteBtn}
                  onClick={() => handleDelete(idx)}
                >
                  Delete
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
      {deleteIndex !== null && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div
              style={{ fontWeight: 600, fontSize: "1.18rem", marginBottom: 20 }}
            >
              Are you sure you want to delete &quot;{contexts[deleteIndex]}
              &quot;?
            </div>
            <button className={styles.deleteBtn} onClick={confirmDelete}>
              Delete
            </button>
            <button className={styles.cancelBtn} onClick={cancelDelete}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Contexts;
