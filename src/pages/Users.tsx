import React, { useState } from "react";
import { useUsers } from "../context/UsersContext";
import UsersTable from "../components/users/UsersTable";

const roles = [
  { value: "admin", label: "Admin" },
  { value: "np", label: "Nurse Practitioner" },
  { value: "staff", label: "Staff" },
];

export default function Users() {
  const { users, addUser, currentUser, deleteUser, updateUser } = useUsers();
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    username: "",
    password: "",
    role: "staff",
  });
  const [error, setError] = useState("");

  const handleOpen = () => {
    setForm({ username: "", password: "", role: "staff" });
    setError("");
    setShowModal(true);
  };

  const handleClose = () => setShowModal(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.username.trim() || !form.password.trim()) {
      setError("Username and password are required.");
      return;
    }
    if (users.some((u) => u.username === form.username)) {
      setError("Username already exists.");
      return;
    }
    addUser(form.username, form.password, form.role);
    setShowModal(false);
  };

  const isAdmin =
    currentUser?.role === "superadmin" || currentUser?.role === "admin";

  return (
    <div style={{ maxWidth: 900, margin: "2rem auto" }}>
      <h2
        style={{
          textAlign: "left",
          marginBottom: 22,
          color: "#223",
          fontWeight: 700,
        }}
      >
        User Management
      </h2>
      {isAdmin && (
        <button
          onClick={handleOpen}
          style={{
            background: "#15adb3",
            color: "#fff",
            fontWeight: 700,
            border: "none",
            borderRadius: 8,
            padding: "10px 24px",
            marginBottom: 18,
            fontSize: "1.07rem",
            cursor: "pointer",
          }}
        >
          + Add User
        </button>
      )}
      <UsersTable
        users={users}
        onEdit={(user) => updateUser(user.id, user)}
        onDelete={(user) => deleteUser(user.id)}
        currentUserId={currentUser?.id || ""}
      />
      {showModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.15)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
          }}
        >
          <form
            onSubmit={handleSubmit}
            style={{
              background: "#fff",
              padding: "2.2rem 2.1rem",
              borderRadius: 12,
              minWidth: 330,
              boxShadow: "0 2px 14px rgba(21,173,179,0.12)",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <h3
              style={{
                textAlign: "center",
                color: "#15adb3",
                fontWeight: 700,
                marginBottom: 18,
              }}
            >
              Add New User
            </h3>
            <label style={{ fontWeight: 600 }}>Username</label>
            <input
              name="username"
              value={form.username}
              onChange={handleChange}
              autoFocus
              style={{
                padding: 8,
                marginBottom: 10,
                borderRadius: 6,
                border: "1.5px solid #e4ecee",
                fontSize: "1rem",
              }}
            />
            <label style={{ fontWeight: 600 }}>Password</label>
            <input
              name="password"
              value={form.password}
              onChange={handleChange}
              type="password"
              style={{
                padding: 8,
                marginBottom: 10,
                borderRadius: 6,
                border: "1.5px solid #e4ecee",
                fontSize: "1rem",
              }}
            />
            <label style={{ fontWeight: 600 }}>Role</label>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              style={{
                padding: 8,
                marginBottom: 16,
                borderRadius: 6,
                border: "1.5px solid #e4ecee",
                fontSize: "1rem",
              }}
            >
              {roles.map((r) => (
                <option value={r.value} key={r.value}>
                  {r.label}
                </option>
              ))}
            </select>
            {error && (
              <div style={{ color: "#e34549", marginBottom: 10 }}>{error}</div>
            )}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: 10,
              }}
            >
              <button
                type="submit"
                style={{
                  background: "#15adb3",
                  color: "#fff",
                  fontWeight: 700,
                  border: "none",
                  borderRadius: 8,
                  padding: "10px 20px",
                  fontSize: "1rem",
                  cursor: "pointer",
                }}
              >
                Add User
              </button>
              <button
                type="button"
                onClick={handleClose}
                style={{
                  background: "#eee",
                  color: "#333",
                  fontWeight: 600,
                  border: "none",
                  borderRadius: 8,
                  padding: "10px 20px",
                  fontSize: "1rem",
                  cursor: "pointer",
                  marginLeft: 12,
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
