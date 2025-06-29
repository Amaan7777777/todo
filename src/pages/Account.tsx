// src/pages/Account.tsx
import React, { useState } from "react";
import { useUsers } from "../context/UsersContext";

export default function Account() {
  const { currentUser, updateUser, changePassword } = useUsers();
  const [username, setUsername] = useState(currentUser?.username || "");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  if (!currentUser) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) {
      setError("Username is required.");
      setSuccess("");
      return;
    }
    updateUser(currentUser.id, { username });
    if (password) {
      changePassword(currentUser.id, password);
    }
    setSuccess("Account updated successfully.");
    setError("");
    setPassword("");
  };

  return (
    <div
      style={{
        maxWidth: 480,
        margin: "2.5rem auto",
        background: "#fff",
        padding: "2.5rem 2.5rem 2rem 2.5rem",
        borderRadius: 14,
        boxShadow: "0 2px 16px rgba(21,173,179,0.09)",
        fontSize: "1.1rem",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: 32, color: "#15adb3" }}>
        Manage Account
      </h2>
      <form onSubmit={handleSave} autoComplete="off">
        <div style={{ marginBottom: 22 }}>
          <label style={{ fontWeight: 600 }}>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{
              width: "100%",
              padding: "10px 12px",
              borderRadius: 6,
              border: "1.5px solid #e4ecee",
              marginTop: 6,
              fontSize: "1.04rem",
            }}
          />
        </div>
        <div style={{ marginBottom: 18 }}>
          <label style={{ fontWeight: 600 }}>New Password</label>
          <input
            type="password"
            value={password}
            autoComplete="new-password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Leave blank to keep unchanged"
            style={{
              width: "100%",
              padding: "10px 12px",
              borderRadius: 6,
              border: "1.5px solid #e4ecee",
              marginTop: 6,
              fontSize: "1.04rem",
            }}
          />
        </div>
        {error && (
          <div style={{ color: "#e34549", marginBottom: 10 }}>{error}</div>
        )}
        {success && (
          <div style={{ color: "#15adb3", marginBottom: 10 }}>{success}</div>
        )}
        <button
          type="submit"
          style={{
            width: "100%",
            background: "#15adb3",
            color: "#fff",
            fontWeight: 700,
            fontSize: "1.08rem",
            padding: "0.9rem 0",
            border: "none",
            borderRadius: 8,
            cursor: "pointer",
            marginTop: 16,
            letterSpacing: "0.04em",
          }}
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
