import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Get the current page's title for Header - you can adjust this logic as needed
  // For now, we’ll default to Dashboard. For a real app, you can use React Router location.
  let pageTitle = "Dashboard";
  // Optionally, you can set pageTitle based on route (not included for simplicity)

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar />
      <main style={{ flex: 1, background: "#fff", minHeight: "100vh" }}>
        {/* New styled header */}
        <Header title={pageTitle} />
        <section style={{ padding: 24 }}>{children}</section>
      </main>
    </div>
  );
};

export default Layout;
