import React from "react";
import { useUsers } from "../../context/UsersContext";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./Sidebar.module.css";

const Sidebar = () => {
  const { currentUser, logout } = useUsers();
  const navigate = useNavigate();
  const location = useLocation();

  // Check if user is admin or superadmin
  const isAdmin =
    currentUser?.role === "superadmin" || currentUser?.role === "admin";

  // Sidebar navigation links
  const links = [
    { label: "Tasks", path: "/" },
    ...(isAdmin ? [{ label: "All Tasks", path: "/all-tasks" }] : []),
    ...(isAdmin ? [{ label: "Archive", path: "/archive" }] : []),
    { label: "RX", path: "/rx" },
    ...(isAdmin ? [{ label: "Manage Contexts", path: "/contexts" }] : []),
    ...(isAdmin
      ? [{ label: "Users Manage", path: "/users" }]
      : [{ label: "Manage Account", path: "/account" }]),
  ];

  return (
    <div className={styles.sidebar}>
      <div className={styles.welcomeArea}>
        <div className={styles.welcomeTitle}>
          Welcome, {currentUser?.username}
        </div>
        <div className={styles.welcomeDate}>
          {new Date().toLocaleString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          })}
        </div>
      </div>
      <nav className={styles.menu}>
        {links.map((link) => (
          <div
            key={link.path}
            className={`${styles.menuItem} ${
              location.pathname === link.path ? styles.active : ""
            }`}
            onClick={() => navigate(link.path)}
          >
            {link.label}
          </div>
        ))}
      </nav>
      <div style={{ flex: 1 }} />
      <button
        className={styles.logoutBtn}
        onClick={() => {
          logout();
          navigate("/login");
        }}
      >
        Log out
      </button>
    </div>
  );
};

export default Sidebar;
