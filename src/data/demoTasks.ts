// src/data/demoTasks.ts

import { Task } from "../types";

export const demoTasks: Task[] = [
  {
    id: "1",
    date: "2025-06-28",
    createdBy: "admin",
    details:
      "Review patient refill requests for morning shift and ensure all prescriptions are validated before 10 AM",
    context: "Text",
    dueDate: "2025-06-29",
    priority: "urgent",
    status: "new",
    assignedTo: "staff",
    archived: false,
    transferHistory: [
      {
        from: "admin",
        to: "staff",
        timestamp: new Date("2025-06-28T09:00:00").getTime(),
        reason: "Initial assignment",
      },
    ],
    comments: [
      {
        id: "c1",
        author: "admin",
        text: "Urgent - needs completion by 10 AM. Patient Smith called twice about urgent medication refill.",
        timestamp: new Date("2025-06-28T09:05:00").getTime(),
      },
    ],
  },
  {
    id: "2",
    date: "2025-06-27",
    createdBy: "admin",
    details: "Review and approve pending medication requests for evening shift",
    context: "Email",
    dueDate: "2025-06-30",
    priority: "expedited",
    status: "in_progress",
    assignedTo: "np",
    archived: false,
    transferHistory: [
      {
        from: "admin",
        to: "np",
        timestamp: new Date("2025-06-27T14:00:00").getTime(),
        reason: "Initial assignment",
      },
    ],
    comments: [
      {
        id: "c2",
        author: "np",
        text: "Started reviewing the requests. About 60% complete.",
        timestamp: new Date("2025-06-28T10:30:00").getTime(),
      },
    ],
  },
  {
    id: "3",
    date: "2025-06-26",
    createdBy: "amaan",
    details: "Schedule patient consultation for next week",
    context: "PA",
    dueDate: "2025-07-02",
    priority: "normal",
    status: "new",
    assignedTo: "amaan",
    archived: false,
    transferHistory: [
      {
        from: "amaan",
        to: "amaan",
        timestamp: new Date("2025-06-26T11:00:00").getTime(),
        reason: "Self-assigned",
      },
    ],
    comments: [],
  },
  {
    id: "4",
    date: "2025-06-25",
    createdBy: "admin",
    details: "Update patient records in system",
    context: "Email",
    dueDate: "2025-06-28",
    priority: "normal",
    status: "completed",
    assignedTo: "staff",
    archived: false,
    transferHistory: [
      {
        from: "admin",
        to: "staff",
        timestamp: new Date("2025-06-25T16:00:00").getTime(),
        reason: "Routine assignment",
      },
    ],
    comments: [
      {
        id: "c3",
        author: "staff",
        text: "All patient records have been updated successfully.",
        timestamp: new Date("2025-06-28T08:00:00").getTime(),
      },
    ],
  },
  {
    id: "5",
    date: "2025-06-24",
    createdBy: "np",
    details: "Follow up with insurance company regarding claim",
    context: "Text",
    dueDate: "2025-06-29",
    priority: "expedited",
    status: "new",
    assignedTo: "np",
    archived: false,
    transferHistory: [
      {
        from: "np",
        to: "np",
        timestamp: new Date("2025-06-24T13:00:00").getTime(),
        reason: "Self-assigned",
      },
    ],
    comments: [
      {
        id: "c4",
        author: "np",
        text: "Need to call insurance company first thing Monday morning.",
        timestamp: new Date("2025-06-24T13:15:00").getTime(),
      },
    ],
  },
];
