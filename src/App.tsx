// src/App.tsx
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { UsersProvider, useUsers } from "./context/UsersContext";
import Layout from "./components/layout/Layout";

// Pages (make sure all exist and paths are correct)
import Login from "./pages/Login";
import TodoTasks from "./pages/TodoTasks";
import AllTasks from "./pages/AllTasks";
import Archive from "./pages/Archive";
import Users from "./pages/Users";
import Contexts from "./pages/Contexts";
import Account from "./pages/Account"; // <--- THIS IS CRITICAL!
const RX = () => <h2>RX Page</h2>;

// Route guards
function RequireAuth({ children }: { children: React.ReactNode }) {
  const { currentUser } = useUsers();
  if (!currentUser) return <Navigate to="/login" replace />;
  return <>{children}</>;
}
function RequireAdmin({ children }: { children: React.ReactNode }) {
  const { currentUser } = useUsers();
  if (
    !currentUser ||
    (currentUser.role !== "admin" && currentUser.role !== "superadmin")
  ) {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
}

const App: React.FC = () => (
  <UsersProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/*"
          element={
            <RequireAuth>
              <Layout>
                <Routes>
                  <Route path="/" element={<TodoTasks />} />
                  <Route path="/all-tasks" element={<AllTasks />} />
                  <Route path="/archive" element={<Archive />} />
                  <Route path="/rx" element={<RX />} />
                  <Route path="/account" element={<Account />} />
                  <Route
                    path="/users"
                    element={
                      <RequireAdmin>
                        <Users />
                      </RequireAdmin>
                    }
                  />
                  <Route
                    path="/contexts"
                    element={
                      <RequireAdmin>
                        <Contexts />
                      </RequireAdmin>
                    }
                  />
                  {/* catch all */}
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </Layout>
            </RequireAuth>
          }
        />
      </Routes>
    </BrowserRouter>
  </UsersProvider>
);

export default App;
