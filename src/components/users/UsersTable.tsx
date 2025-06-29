// src/components/users/UsersTable.tsx

import React from "react";
import { User } from "../../types";

interface UsersTableProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
  currentUserId: string;
}

const ROLE_LABELS: Record<string, string> = {
  superadmin: "Superadmin",
  admin: "Admin",
  np: "Np",
  staff: "Staff",
};

export default function UsersTable({
  users,
  onEdit,
  onDelete,
  currentUserId,
}: UsersTableProps) {
  return (
    <div
      style={{
        background: "#f6fcfc",
        borderRadius: 18,
        padding: "24px 24px 16px 24px",
        marginTop: 8,
        minWidth: 400,
      }}
    >
      <table style={{ width: "100%" }}>
        <thead>
          <tr style={{ color: "#223", fontWeight: 700, fontSize: "1.14rem" }}>
            <th style={{ textAlign: "left", paddingBottom: 10 }}>Username</th>
            <th style={{ textAlign: "left", paddingBottom: 10 }}>Role</th>
            <th style={{ textAlign: "left", paddingBottom: 10 }}>Password</th>
            <th style={{ textAlign: "left", paddingBottom: 10 }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr
              key={u.id}
              style={{ borderTop: "1px solid #e7efef", height: 46 }}
            >
              <td>{u.username}</td>
              <td>{ROLE_LABELS[u.role] || u.role}</td>
              <td>•••••••</td>
              <td>
                <button
                  onClick={() => onEdit(u)}
                  style={{
                    background: "#15adb3",
                    color: "#fff",
                    border: "none",
                    borderRadius: 8,
                    padding: "6px 18px",
                    fontWeight: 700,
                    marginRight: 10,
                    cursor: "pointer",
                  }}
                  disabled={u.id === currentUserId}
                >
                  Edit
                </button>
                {u.id !== currentUserId && (
                  <button
                    onClick={() => onDelete(u)}
                    style={{
                      background: "#e34549",
                      color: "#fff",
                      border: "none",
                      borderRadius: 8,
                      padding: "6px 18px",
                      fontWeight: 700,
                      cursor: "pointer",
                    }}
                  >
                    Delete
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
