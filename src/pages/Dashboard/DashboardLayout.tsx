import { useState } from "react";
import { Outlet, useOutletContext } from "react-router-dom";
import Sidebar from "../../components/Dashboard/Sidebar";
import { StaffProvider } from "../../context/StaffContext";
import { UserProvider } from "../../context/UserContext";
import { AppointmentsProvider } from "../../context/AppointmentsContext";
import { CustomersProvider } from "../../context/CustomersContext";

type DashboardLayoutContext = {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
};

export default function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleToggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <UserProvider>
      <StaffProvider>
        <AppointmentsProvider>
          <CustomersProvider>
            <div className="h-screen bg-gradient-to-br from-[#f0f8fb] via-[#fef9f3] to-[#f5f5f0] flex overflow-hidden">
              {isSidebarOpen && (
                <div
                  className="fixed inset-0 bg-prussianBlue/20 backdrop-blur-sm z-40 lg:hidden"
                  onClick={() => setIsSidebarOpen(false)}
                />
              )}

              <Sidebar isOpen={isSidebarOpen} onToggle={handleToggleSidebar} />

              <div
                className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${
                  isSidebarOpen ? "lg:ml-64" : "lg:ml-0"
                }`}
              >
                <Outlet context={{ isSidebarOpen, setIsSidebarOpen }} />
              </div>
            </div>
          </CustomersProvider>
        </AppointmentsProvider>
      </StaffProvider>
    </UserProvider>
  );
}

export const useDashboardLayout = () =>
  useOutletContext<DashboardLayoutContext>();
