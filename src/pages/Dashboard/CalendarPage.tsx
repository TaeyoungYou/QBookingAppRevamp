import { Menu } from "lucide-react";
import BookingCalendar from "../../components/Dashboard/BookingCalendar";
import { useDashboardLayout } from "./DashboardLayout";

export default function CalendarPage() {
  const { isSidebarOpen, setIsSidebarOpen } = useDashboardLayout();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex-1 flex flex-col min-h-0">
      <header className="bg-white/90 backdrop-blur-xl border-b border-skyBlue h-16 flex items-center justify-between px-6 shrink-0 shadow-sm">
        <div className="flex items-center gap-4">
          <button
            onClick={toggleSidebar}
            className="p-2 hover:bg-[#f0f8fb] rounded-xl transition-all"
            title="Toggle Sidebar"
          >
            <Menu size={24} className="text-slate-300" />
          </button>
          <h1 className="text-xl font-bold text-slate-900">Booking Calendar</h1>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden min-h-0 bg-white">
        <main className="flex-1 overflow-hidden flex flex-col">
          <BookingCalendar
            selectedServices={["all"]}
            selectedStaff={["all"]}
            selectedLocation="all"
          />
        </main>
      </div>
    </div>
  );
}
