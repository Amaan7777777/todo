import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUsers } from "../context/UsersContext";
import styles from "./Login.module.css";

const demoAccounts = [
  { username: "amaan", password: "demo123", label: "Super Admin" },
  { username: "admin", password: "admin123", label: "Admin" },
  { username: "np", password: "np123", label: "Nurse Practitioner" },
  { username: "staff", password: "staff123", label: "Staff" },
];

export default function Login() {
  const { login } = useUsers();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const success = login(username, password);
    if (!success) {
      setError("Invalid username or password.");
      return;
    }
    navigate("/");
  };

  const autofill = (u: string, p: string) => {
    setUsername(u);
    setPassword(p);
  };

  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <div className={styles.avatar}>AP</div>
        <div className={styles.brand}>Aura Psychiatry</div>
        <div className={styles.slogan}>Task Management System</div>
      </div>
      <form className={styles.form} onSubmit={handleLogin}>
        <h2 className={styles.title}>Sign in to your account</h2>
        <label>Username</label>
        <input
          type="text"
          placeholder="Enter username"
          autoComplete="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label>Password</label>
        <input
          type="password"
          placeholder="Password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <div className={styles.error}>{error}</div>}
        <button className={styles.loginBtn} type="submit">
          Sign In
        </button>
      </form>
      <div className={styles.demoSection}>
        <div>Demo Accounts (Click to auto-fill):</div>
        <div className={styles.demoBtns}>
          {demoAccounts.map((acc) => (
            <button
              key={acc.username}
              type="button"
              className={styles.demoBtn}
              onClick={() => autofill(acc.username, acc.password)}
            >
              {acc.label}
            </button>
          ))}
        </div>
        <div style={{ fontSize: 15, marginTop: 6, opacity: 0.8 }}>
          Password for all accounts:
          <span style={{ fontWeight: 600, color: "#15adb3", marginLeft: 5 }}>
            see button autofill
          </span>
        </div>
      </div>
      <div className={styles.footer}>
        © 2025 Aura Psychiatry. All rights reserved.
      </div>
    </div>
  );
}
