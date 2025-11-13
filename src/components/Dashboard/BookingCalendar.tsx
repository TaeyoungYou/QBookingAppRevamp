import { useState, useMemo, useCallback } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import type { View } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./calendar.css";
import { ChevronLeft, ChevronRight, Plus, X } from "lucide-react";

moment.locale("en");

const localizer = momentLocalizer(moment);

interface BookingEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  resource: {
    service: string;
    staff: string;
    location: string;
    status: "pending" | "confirmed" | "cancelled" | "completed";
    customer: {
      name: string;
      email: string;
      phone: string;
    };
  };
}

interface BookingCalendarProps {
  selectedServices: string[];
  selectedStaff: string[];
  selectedLocation: string;
}

// Mock data - sample appointments
const mockAppointments: BookingEvent[] = [
  {
    id: "1",
    title: "Facial Treatment - John Smith",
    start: new Date(2025, 10, 13, 9, 0),
    end: new Date(2025, 10, 13, 10, 30),
    resource: {
      service: "Facial Treatment",
      staff: "Therapist Anna",
      location: "Spa Downtown",
      status: "confirmed",
      customer: {
        name: "John Smith",
        email: "john.smith@email.com",
        phone: "0123456789",
      },
    },
  },
  {
    id: "2",
    title: "Yoga Class - Sarah Johnson",
    start: new Date(2025, 10, 13, 14, 0),
    end: new Date(2025, 10, 13, 15, 0),
    resource: {
      service: "Yoga",
      staff: "Trainer Sarah",
      location: "City Center",
      status: "confirmed",
      customer: {
        name: "Sarah Johnson",
        email: "sarah.j@email.com",
        phone: "0987654321",
      },
    },
  },
  {
    id: "3",
    title: "Table for 2 - Michael Brown",
    start: new Date(2025, 10, 14, 18, 0),
    end: new Date(2025, 10, 14, 20, 0),
    resource: {
      service: "Table for 2",
      staff: "John Doe",
      location: "Downtown",
      status: "pending",
      customer: {
        name: "Michael Brown",
        email: "michael.b@email.com",
        phone: "0369852147",
      },
    },
  },
  {
    id: "4",
    title: "Personal Training - Emma Wilson",
    start: new Date(2025, 10, 15, 10, 0),
    end: new Date(2025, 10, 15, 11, 0),
    resource: {
      service: "Personal Training",
      staff: "Trainer John",
      location: "City Center",
      status: "confirmed",
      customer: {
        name: "Emma Wilson",
        email: "emma.w@email.com",
        phone: "0147258369",
      },
    },
  },
  {
    id: "5",
    title: "Haircut - David Lee",
    start: new Date(2025, 10, 16, 13, 0),
    end: new Date(2025, 10, 16, 13, 45),
    resource: {
      service: "Haircut",
      staff: "Stylist Alex",
      location: "Main Street",
      status: "confirmed",
      customer: {
        name: "David Lee",
        email: "david.lee@email.com",
        phone: "0258147369",
      },
    },
  },
];

export default function BookingCalendar({
  selectedServices,
  selectedStaff,
  selectedLocation,
}: BookingCalendarProps) {
  const [view, setView] = useState<View>("week");
  const [date, setDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState<BookingEvent | null>(null);

  // Filter events based on filters
  const filteredEvents = useMemo(() => {
    return mockAppointments.filter((event) => {
      const serviceMatch =
        selectedServices.includes("all") ||
        selectedServices.includes(event.resource.service);
      const staffMatch =
        selectedStaff.includes("all") ||
        selectedStaff.includes(event.resource.staff);
      const locationMatch =
        selectedLocation === "all" ||
        event.resource.location === selectedLocation;

      return serviceMatch && staffMatch && locationMatch;
    });
  }, [selectedServices, selectedStaff, selectedLocation]);

  const handleSelectEvent = useCallback((event: BookingEvent) => {
    setSelectedEvent(event);
  }, []);

  const handleNavigate = (newDate: Date) => {
    setDate(newDate);
  };

  const handleViewChange = (newView: View) => {
    setView(newView);
  };

  const eventStyleGetter = (event: BookingEvent) => {
    let backgroundColor = "#219ebc"; // default blueGreen

    switch (event.resource.status) {
      case "confirmed":
        backgroundColor = "#219ebc"; // blueGreen
        break;
      case "pending":
        backgroundColor = "#ffb703"; // selectiveYellow
        break;
      case "cancelled":
        backgroundColor = "#EF4444"; // red
        break;
      case "completed":
        backgroundColor = "#023047"; // prussianBlue
        break;
    }

    return {
      style: {
        backgroundColor,
        borderRadius: "4px",
        opacity: 0.95,
        color: "white",
        border: "none",
        display: "block",
        fontSize: "0.875rem",
        padding: "4px 8px",
        fontWeight: "500",
      },
    };
  };

  // Gray out past days - only for day slots, not headers
  const dayPropGetter = useCallback((date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const compareDate = new Date(date);
    compareDate.setHours(0, 0, 0, 0);

    if (compareDate < today) {
      return {
        className: "past-date",
      };
    }
    return {};
  }, []);

  const slotPropGetter = useCallback((date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const compareDate = new Date(date);
    compareDate.setHours(0, 0, 0, 0);

    if (compareDate < today) {
      return {
        className: "past-date",
      };
    }
    return {};
  }, []);

  const handleToolbarNavigate = (action: string) => {
    if (action === "PREV") {
      setDate(
        moment(date)
          .subtract(
            1,
            view === "month" ? "month" : view === "week" ? "week" : "day"
          )
          .toDate()
      );
    } else if (action === "NEXT") {
      setDate(
        moment(date)
          .add(1, view === "month" ? "month" : view === "week" ? "week" : "day")
          .toDate()
      );
    } else if (action === "TODAY") {
      setDate(new Date());
    }
  };

  const getToolbarLabel = () => {
    if (view === "month") {
      return moment(date).format("MMMM YYYY");
    } else if (view === "week") {
      return `${moment(date).startOf("week").format("MMM DD")} - ${moment(date)
        .endOf("week")
        .format("MMM DD, YYYY")}`;
    } else {
      return moment(date).format("dddd, MMMM DD, YYYY");
    }
  };

  return (
    <>
      {/* Custom Toolbar */}
      <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200 shrink-0">
        <div className="flex items-center gap-4">
          <button
            onClick={() => handleToolbarNavigate("TODAY")}
            className="px-4 py-2 text-sm font-semibold text-prussianBlue bg-skyBlue rounded-lg hover:bg-skyBlue/80 transition-colors"
          >
            Today
          </button>
          <div className="flex items-center gap-1">
            <button
              onClick={() => handleToolbarNavigate("PREV")}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-prussianBlue"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => handleToolbarNavigate("NEXT")}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-prussianBlue"
            >
              <ChevronRight size={20} />
            </button>
          </div>
          <h2 className="text-lg font-semibold text-prussianBlue min-w-[200px]">
            {getToolbarLabel()}
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setView("day")}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                view === "day"
                  ? "bg-white text-prussianBlue shadow-sm"
                  : "text-gray-600 hover:text-prussianBlue"
              }`}
            >
              Day
            </button>
            <button
              onClick={() => setView("week")}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                view === "week"
                  ? "bg-white text-prussianBlue shadow-sm"
                  : "text-gray-600 hover:text-prussianBlue"
              }`}
            >
              Weekly
            </button>
            <button
              onClick={() => setView("month")}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                view === "month"
                  ? "bg-white text-prussianBlue shadow-sm"
                  : "text-gray-600 hover:text-prussianBlue"
              }`}
            >
              Month
            </button>
          </div>

          <button className="flex items-center gap-2 px-4 py-2 bg-blueGreen text-white rounded-lg hover:bg-blueGreen/90 transition-colors shadow-sm">
            <Plus size={18} />
            <span className="font-medium">Add</span>
          </button>
        </div>
      </div>

      {/* Calendar */}
      <div className="flex-1 overflow-hidden w-full">
        <Calendar
          localizer={localizer}
          events={filteredEvents}
          startAccessor="start"
          endAccessor="end"
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
          }}
          view={view}
          onView={handleViewChange}
          date={date}
          onNavigate={handleNavigate}
          onSelectEvent={handleSelectEvent}
          eventPropGetter={eventStyleGetter}
          dayPropGetter={dayPropGetter}
          slotPropGetter={slotPropGetter}
          toolbar={false}
          messages={{
            next: "Next",
            previous: "Previous",
            today: "Today",
            month: "Month",
            week: "Week",
            day: "Day",
            agenda: "Agenda",
            date: "Date",
            time: "Time",
            event: "Event",
            noEventsInRange: "No appointments in this range",
            showMore: (total) => `+${total} more`,
          }}
          formats={{
            dayFormat: (date, culture, localizer) =>
              localizer?.format(date, "ddd DD", culture) || "",
            dayHeaderFormat: (date, culture, localizer) =>
              localizer?.format(date, "dddd, MMM DD", culture) || "",
            dayRangeHeaderFormat: ({ start, end }, culture, localizer) => {
              return `${localizer?.format(
                start,
                "MMM DD",
                culture
              )} - ${localizer?.format(end, "MMM DD, YYYY", culture)}`;
            },
          }}
          step={30}
          timeslots={2}
          min={new Date(2025, 10, 13, 6, 0, 0)}
          max={new Date(2025, 10, 13, 22, 0, 0)}
        />
      </div>

      {/* Event Details Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full mx-4 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-prussianBlue">
                Appointment Details
              </h3>
              <button
                onClick={() => setSelectedEvent(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-600">
                  Service
                </label>
                <p className="text-lg text-prussianBlue font-semibold">
                  {selectedEvent.resource.service}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Staff Member
                  </label>
                  <p className="text-lg text-prussianBlue">
                    {selectedEvent.resource.staff}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Location
                  </label>
                  <p className="text-lg text-prussianBlue">
                    {selectedEvent.resource.location}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Start Time
                  </label>
                  <p className="text-lg text-prussianBlue">
                    {moment(selectedEvent.start).format("MMM DD, YYYY h:mm A")}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    End Time
                  </label>
                  <p className="text-lg text-prussianBlue">
                    {moment(selectedEvent.end).format("MMM DD, YYYY h:mm A")}
                  </p>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600">
                  Status
                </label>
                <p>
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                      selectedEvent.resource.status === "confirmed"
                        ? "bg-green-100 text-green-800"
                        : selectedEvent.resource.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : selectedEvent.resource.status === "cancelled"
                        ? "bg-red-100 text-red-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {selectedEvent.resource.status === "confirmed"
                      ? "Confirmed"
                      : selectedEvent.resource.status === "pending"
                      ? "Pending"
                      : selectedEvent.resource.status === "cancelled"
                      ? "Cancelled"
                      : "Completed"}
                  </span>
                </p>
              </div>

              <div className="border-t pt-4">
                <h4 className="text-lg font-semibold text-prussianBlue mb-3">
                  Customer Information
                </h4>
                <div className="space-y-2">
                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      Name
                    </label>
                    <p className="text-prussianBlue">
                      {selectedEvent.resource.customer.name}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      Email
                    </label>
                    <p className="text-prussianBlue">
                      {selectedEvent.resource.customer.email}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      Phone
                    </label>
                    <p className="text-prussianBlue">
                      {selectedEvent.resource.customer.phone}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button className="flex-1 px-4 py-2 bg-blueGreen text-white rounded-lg hover:bg-blueGreen/90 transition-colors font-medium">
                  Edit
                </button>
                <button className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium">
                  Cancel Appointment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
