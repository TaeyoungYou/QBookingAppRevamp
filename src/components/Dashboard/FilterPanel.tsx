import { X, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

interface FilterPanelProps {
  isOpen: boolean;
  onClose: () => void;
  selectedServices: string[];
  setSelectedServices: (services: string[]) => void;
  selectedStaff: string[];
  setSelectedStaff: (staff: string[]) => void;
  selectedLocation: string;
  setSelectedLocation: (location: string) => void;
}

const services = [
  { id: "all", name: "All Services" },
  { id: "Classic Manicure", name: "Classic Manicure" },
  { id: "Gel Extension", name: "Gel Extension" },
  { id: "Spa Pedicure", name: "Spa Pedicure" },
  { id: "Nail Art Session", name: "Nail Art Session" },
  { id: "Combo Mani + Pedi", name: "Combo Mani + Pedi" },
];

const staff = [{ id: "all", name: "All Staff" }];

const locations = [
  { id: "all", name: "All Areas" },
  { id: "Polish Pro Studio", name: "Polish Pro Studio" },
];

export default function FilterPanel({
  isOpen,
  onClose,
  selectedServices,
  setSelectedServices,
  selectedStaff,
  setSelectedStaff,
  selectedLocation,
  setSelectedLocation,
}: FilterPanelProps) {
  const [isServicesOpen, setIsServicesOpen] = useState(true);
  const [isStaffOpen, setIsStaffOpen] = useState(true);
  const [isLocationOpen, setIsLocationOpen] = useState(true);

  const handleServiceToggle = (serviceId: string) => {
    if (serviceId === "all") {
      setSelectedServices(["all"]);
    } else {
      const newServices = selectedServices.includes(serviceId)
        ? selectedServices.filter((id) => id !== serviceId)
        : [...selectedServices.filter((id) => id !== "all"), serviceId];

      setSelectedServices(newServices.length > 0 ? newServices : ["all"]);
    }
  };

  const handleStaffToggle = (staffId: string) => {
    if (staffId === "all") {
      setSelectedStaff(["all"]);
    } else {
      const newStaff = selectedStaff.includes(staffId)
        ? selectedStaff.filter((id) => id !== staffId)
        : [...selectedStaff.filter((id) => id !== "all"), staffId];

      setSelectedStaff(newStaff.length > 0 ? newStaff : ["all"]);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay for mobile */}
      <div
        className="fixed inset-0 bg-black/20 z-40 lg:hidden"
        onClick={onClose}
      />

      {/* Filter Panel */}
      <aside className="fixed lg:relative right-0 top-0 h-full w-80 bg-white border-l border-gray-200 shadow-xl lg:shadow-none z-50 overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-prussianBlue">Filter by</h2>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={20} className="text-gray-600" />
          </button>
        </div>

        <div className="p-6">
          {/* Services Filter */}
          <div className="mb-6">
            <button
              onClick={() => setIsServicesOpen(!isServicesOpen)}
              className="flex items-center justify-between w-full py-2 mb-3"
            >
              <h3 className="text-sm font-semibold text-prussianBlue">
                Services
              </h3>
              {isServicesOpen ? (
                <ChevronUp size={18} className="text-prussianBlue" />
              ) : (
                <ChevronDown size={18} className="text-prussianBlue" />
              )}
            </button>

            {isServicesOpen && (
              <div className="space-y-2">
                {services.map((service) => (
                  <label
                    key={service.id}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer group"
                  >
                    <input
                      type="checkbox"
                      checked={selectedServices.includes(service.id)}
                      onChange={() => handleServiceToggle(service.id)}
                      className="w-4 h-4 text-blueGreen border-gray-300 rounded focus:ring-skyBlue"
                    />
                    <span className="text-sm text-gray-700 group-hover:text-prussianBlue">
                      {service.name}
                    </span>
                    {service.id === "all" && (
                      <span className="ml-auto text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                        {services.length - 1}
                      </span>
                    )}
                  </label>
                ))}
              </div>
            )}
          </div>

          <div className="border-t border-gray-200 pt-6 mb-6">
            <button
              onClick={() => setIsStaffOpen(!isStaffOpen)}
              className="flex items-center justify-between w-full py-2 mb-3"
            >
              <h3 className="text-sm font-semibold text-prussianBlue">Staff</h3>
              {isStaffOpen ? (
                <ChevronUp size={18} className="text-prussianBlue" />
              ) : (
                <ChevronDown size={18} className="text-prussianBlue" />
              )}
            </button>

            {isStaffOpen && (
              <div className="space-y-2">
                {staff.map((person) => (
                  <label
                    key={person.id}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer group"
                  >
                    <input
                      type="checkbox"
                      checked={selectedStaff.includes(person.id)}
                      onChange={() => handleStaffToggle(person.id)}
                      className="w-4 h-4 text-blueGreen border-gray-300 rounded focus:ring-skyBlue"
                    />
                    <span className="text-sm text-gray-700 group-hover:text-prussianBlue">
                      {person.name}
                    </span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Location Filter */}
          <div className="border-t border-gray-200 pt-6">
            <button
              onClick={() => setIsLocationOpen(!isLocationOpen)}
              className="flex items-center justify-between w-full py-2 mb-3"
            >
              <h3 className="text-sm font-semibold text-prussianBlue">
                Location
              </h3>
              {isLocationOpen ? (
                <ChevronUp size={18} className="text-prussianBlue" />
              ) : (
                <ChevronDown size={18} className="text-prussianBlue" />
              )}
            </button>

            {isLocationOpen && (
              <div className="space-y-2">
                {locations.map((location) => (
                  <label
                    key={location.id}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer group"
                  >
                    <input
                      type="radio"
                      name="location"
                      checked={selectedLocation === location.id}
                      onChange={() => setSelectedLocation(location.id)}
                      className="w-4 h-4 text-blueGreen border-gray-300 focus:ring-skyBlue"
                    />
                    <span className="text-sm text-gray-700 group-hover:text-prussianBlue">
                      {location.name}
                    </span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Clear Filters */}
          <button
            onClick={() => {
              setSelectedServices(["all"]);
              setSelectedStaff(["all"]);
              setSelectedLocation("all");
            }}
            className="w-full mt-6 px-4 py-2.5 text-sm font-medium text-prussianBlue bg-skyBlue/20 rounded-lg hover:bg-skyBlue/30 transition-colors"
          >
            Clear all filters
          </button>

          {/* Session Availability Section */}
          <div className="border-t border-gray-200 mt-6 pt-6">
            <h3 className="text-sm font-semibold text-prussianBlue mb-3">
              Session availability
            </h3>
            <p className="text-xs text-gray-600">
              Filter by available time slots for services
            </p>
          </div>

          {/* Other Events Section */}
          <div className="border-t border-gray-200 mt-6 pt-6">
            <h3 className="text-sm font-semibold text-prussianBlue mb-3">
              Other events
            </h3>
            <p className="text-xs text-gray-600">
              Show holidays, breaks, and special events
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
