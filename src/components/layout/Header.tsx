import React from "react";
import styles from "./Header.module.css";
import { useUsers } from "../../context/UsersContext";

type HeaderProps = {
  title: string;
};

export default function Header({ title }: HeaderProps) {
  const { currentUser, logout } = useUsers();

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <span className={styles.brand}>Aura Psychiatry PLLC</span>
      </div>
      <div className={styles.center}>
        <h1 className={styles.title}>{title}</h1>
        <span className={styles.welcome}>
          Welcome back, <b>{currentUser?.username}</b>
        </span>
      </div>
      <div className={styles.right}>
        <button className={styles.logoutBtn} onClick={logout}>
          Logout
        </button>
      </div>
    </header>
  );
}
