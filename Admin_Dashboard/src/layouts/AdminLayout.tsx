// @ts-nocheck

import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

import AdminNavbar from "../components/admin/AdminNavbar";
import AdminSidebar from "../components/admin/AdminSidebar";

export default function AdminLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("sidebar-collapse", sidebarCollapsed);

    return () => {
      document.body.classList.remove("sidebar-collapse");
    };
  }, [sidebarCollapsed]);

  return (
    <div className="app-wrapper">
      <AdminNavbar
        onToggleSidebar={() =>
          setSidebarCollapsed((value) => !value)
        }
      />

      <AdminSidebar />

      <Outlet />

      <footer className="app-footer">
        <div className="float-end d-none d-sm-inline">
          DroneTV
        </div>

        <strong>
          DroneTV Support & Lead Assistant
        </strong>
      </footer>
    </div>
  );
}