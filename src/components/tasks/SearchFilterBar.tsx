// src/components/tasks/SearchFilterBar.tsx
import React from "react";
import { TaskFilters, TaskStatus, TaskPriority, User } from "../../types";
import styles from "./SearchFilterBar.module.css";

interface SearchFilterBarProps {
  filters: TaskFilters;
  onFiltersChange: (filters: TaskFilters) => void;
  users: User[];
  currentUser: User;
}

const SearchFilterBar: React.FC<SearchFilterBarProps> = ({
  filters,
  onFiltersChange,
  users,
  currentUser,
}) => {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFiltersChange({
      ...filters,
      search: e.target.value,
    });
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFiltersChange({
      ...filters,
      status: e.target.value as TaskStatus | "all",
    });
  };

  const handlePriorityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFiltersChange({
      ...filters,
      priority: e.target.value as TaskPriority | "all",
    });
  };

  const handleAssignedToChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFiltersChange({
      ...filters,
      assignedTo: e.target.value,
    });
  };

  const clearAllFilters = () => {
    onFiltersChange({
      search: "",
      status: "all",
      priority: "all",
      assignedTo: "all",
    });
  };

  const isAdmin =
    currentUser.role === "admin" || currentUser.role === "superadmin";

  return (
    <div className={styles.container}>
      <div className={styles.searchSection}>
        <div className={styles.searchWrapper}>
          <input
            type="text"
            placeholder="🔍 Search tasks (context, details, assigned user...)"
            value={filters.search}
            onChange={handleSearchChange}
            className={styles.searchInput}
          />
        </div>
      </div>

      <div className={styles.filtersSection}>
        <div className={styles.filterGroup}>
          <label className={styles.filterLabel}>Status</label>
          <select
            value={filters.status}
            onChange={handleStatusChange}
            className={styles.select}
          >
            <option value="all">All Status</option>
            <option value="new">🔵 New</option>
            <option value="in_progress">🟡 In Progress</option>
            <option value="completed">🟢 Completed</option>
            <option value="created_in_error">⚫ Created in Error</option>
          </select>
        </div>

        <div className={styles.filterGroup}>
          <label className={styles.filterLabel}>Priority</label>
          <select
            value={filters.priority}
            onChange={handlePriorityChange}
            className={styles.select}
          >
            <option value="all">All Priority</option>
            <option value="normal">🟢 Normal</option>
            <option value="expedited">🟡 Expedited</option>
            <option value="urgent">🔴 Urgent</option>
          </select>
        </div>

        {isAdmin && (
          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Assigned To</label>
            <select
              value={filters.assignedTo}
              onChange={handleAssignedToChange}
              className={styles.select}
            >
              <option value="all">All Users</option>
              {users.map((user) => (
                <option key={user.id} value={user.username}>
                  👤 {user.username}
                </option>
              ))}
            </select>
          </div>
        )}

        <button
          onClick={clearAllFilters}
          className={styles.clearBtn}
          title="Clear all filters"
        >
          ✕ Clear
        </button>
      </div>
    </div>
  );
};

export default SearchFilterBar;
