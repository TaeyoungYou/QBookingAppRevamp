import { useState } from "react";
import { Menu } from "lucide-react";
import BookingCalendar from "../../components/Dashboard/BookingCalendar";
import FilterPanel from "../../components/Dashboard/FilterPanel";
import { useDashboardLayout } from "./DashboardLayout";

export default function CalendarPage() {
  const { isSidebarOpen, setIsSidebarOpen } = useDashboardLayout();
  const [selectedServices, setSelectedServices] = useState<string[]>(["all"]);
  const [selectedStaff, setSelectedStaff] = useState<string[]>(["all"]);
  const [selectedLocation, setSelectedLocation] = useState<string>("all");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

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
          <h1 className="text-xl font-bold bg-linear-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
            Booking Calendar
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className={` items-center gap-2 px-5 py-2.5 rounded-xl bg-linear-to-r from-blueGreen to-skyBlue text-white font-semibold shadow-lg shadow-blueGreen/30 hover:shadow-xl hover:shadow-blueGreen/40 transition-all hover:-translate-y-0.5 ${
              isFilterOpen
                ? "bg-linear-to-r from-violet-600 to-purple-600 text-white shadow-lg shadow-violet-500/30"
                : "bg-[#f0f8fb] text-slate-300 hover:bg-[#f0f8fb] border "
            }`}
          >
            Filter by
          </button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden min-h-0 bg-white">
        <main className="flex-1 overflow-hidden flex flex-col">
          <BookingCalendar
            selectedServices={selectedServices}
            selectedStaff={selectedStaff}
            selectedLocation={selectedLocation}
          />
        </main>

        <FilterPanel
          isOpen={isFilterOpen}
          onClose={() => setIsFilterOpen(false)}
          selectedServices={selectedServices}
          setSelectedServices={setSelectedServices}
          selectedStaff={selectedStaff}
          setSelectedStaff={setSelectedStaff}
          selectedLocation={selectedLocation}
          setSelectedLocation={setSelectedLocation}
        />
      </div>
    </div>
  );
}
