import { useState } from "react";
import BookingCalendar from "../../components/Dashboard/BookingCalendar";
import FilterPanel from "../../components/Dashboard/FilterPanel";
import Sidebar from "../../components/Dashboard/Sidebar";
import { Menu } from "lucide-react";

export default function Dashboard() {
  const [selectedServices, setSelectedServices] = useState<string[]>(["all"]);
  const [selectedStaff, setSelectedStaff] = useState<string[]>(["all"]);
  const [selectedLocation, setSelectedLocation] = useState<string>("all");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="h-screen bg-gray-50 flex overflow-hidden">
      {/* Sidebar Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Left Sidebar Navigation */}
      <Sidebar
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      {/* Main Content Area */}
      <div
        className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${
          isSidebarOpen ? "ml-64" : "ml-0"
        }`}
      >
        {/* Top Header Bar */}
        <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-6 shrink-0">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              title="Toggle Sidebar"
            >
              <Menu size={24} className="text-prussianBlue" />
            </button>
            <h1 className="text-xl font-semibold text-prussianBlue">
              Booking Calendar
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                isFilterOpen
                  ? "bg-skyBlue text-prussianBlue shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-sm"
              }`}
            >
              Filter by
            </button>
          </div>
        </header>

        {/* Main Content with Calendar */}
        <div className="flex-1 flex overflow-hidden min-h-0">
          <main className="flex-1 overflow-hidden flex flex-col">
            <BookingCalendar
              selectedServices={selectedServices}
              selectedStaff={selectedStaff}
              selectedLocation={selectedLocation}
            />
          </main>

          {/* Right Filter Panel */}
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
    </div>
  );
}
