import { useState, useMemo, useCallback, useEffect } from "react";
import {
  Calendar,
  momentLocalizer,
  Views,
  type SlotInfo,
  type View,
} from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./calendar.css";
import {
  ChevronLeft,
  ChevronRight,
  Phone,
  Plus,
  Scissors,
  User,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  useStaffDirectory,
  type StaffMember,
} from "../../context/StaffContext";
moment.locale("en");

const localizer = momentLocalizer(moment);

const CLOSED_DAYS = [0]; // Sunday
const BUSINESS_HOURS = { start: 9, end: 20 };
const PRIMARY_LOCATION = "Polish Pro Studio";

const serviceCatalog = [
  { name: "Blow Dry", duration: 60, color: "#8ecae6" },
  { name: "Beard Grooming", duration: 60, color: "#f4a261" },
  { name: "Balinese Massage", duration: 75, color: "#7cd4c5" },
  { name: "Hair Colouring", duration: 60, color: "#f7aef8" },
  { name: "Manicure & Pedicure", duration: 60, color: "#ffcb77" },
];

const serviceColorMap = serviceCatalog.reduce<Record<string, string>>(
  (acc, item) => {
    acc[item.name] = item.color;
    return acc;
  },
  {}
);

type BookingStatus = "pending" | "confirmed" | "cancelled" | "completed";

interface BookingEvent {
  id: string;
  title: string;
  service: string;
  staffId: string;
  location: string;
  start: Date;
  end: Date;
  status: BookingStatus;
  customer: {
    name: string;
    phone: string;
  };
  resourceId: string;
}

interface BookingCalendarProps {
  selectedServices: string[];
  selectedStaff: string[];
  selectedLocation: string;
}

const initialEvents: BookingEvent[] = [
  {
    id: "evt-1",
    title: "Blow Dry",
    service: "Blow Dry",
    staffId: "mary",
    location: PRIMARY_LOCATION,
    start: new Date(2025, 10, 13, 9, 0),
    end: new Date(2025, 10, 13, 10, 0),
    status: "confirmed",
    customer: { name: "Brenda Massey", phone: "012-345-6789" },
    resourceId: "mary",
  },
  {
    id: "evt-2",
    title: "Beard Grooming",
    service: "Beard Grooming",
    staffId: "john",
    location: PRIMARY_LOCATION,
    start: new Date(2025, 10, 13, 9, 0),
    end: new Date(2025, 10, 13, 10, 0),
    status: "confirmed",
    customer: { name: "Zachary Kelley", phone: "014-444-2288" },
    resourceId: "john",
  },
  {
    id: "evt-3",
    title: "Balinese Massage",
    service: "Balinese Massage",
    staffId: "michael",
    location: PRIMARY_LOCATION,
    start: new Date(2025, 10, 13, 9, 45),
    end: new Date(2025, 10, 13, 11, 0),
    status: "confirmed",
    customer: { name: "Diana Campos", phone: "010-919-1212" },
    resourceId: "michael",
  },
  {
    id: "evt-4",
    title: "Hair Colouring",
    service: "Hair Colouring",
    staffId: "mary",
    location: PRIMARY_LOCATION,
    start: new Date(2025, 10, 13, 11, 0),
    end: new Date(2025, 10, 13, 12, 0),
    status: "confirmed",
    customer: { name: "Beverly Brown", phone: "010-222-3334" },
    resourceId: "mary",
  },
];

const isClosedDay = (date: Date) => CLOSED_DAYS.includes(date.getDay());

const CustomEvent = ({ event }: { event: BookingEvent }) => {
  return (
    <div
      className="h-full w-full rounded-md px-3 py-2 text-white shadow-sm"
      style={{
        backgroundColor: serviceColorMap[event.service] ?? "#8ecae6",
      }}
    >
      <p className="text-[11px] font-semibold uppercase tracking-wide opacity-90">
        {moment(event.start).format("h:mm A")} -{" "}
        {moment(event.end).format("h:mm A")}
      </p>
      <p className="text-sm font-bold leading-tight">{event.customer.name}</p>
      <p className="text-xs opacity-90">{event.service}</p>
    </div>
  );
};

const CustomResourceHeader = ({ resource }: { resource: StaffMember }) => {
  const initials = resource.name
    .split(" ")
    .map((chunk) => chunk[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  return (
    <div className="flex flex-col items-center justify-center gap-2 py-3">
      <div className="relative">
        {resource.avatar ? (
          <img
            src={resource.avatar}
            alt={resource.name}
            className="h-12 w-12 rounded-full border-2 border-white object-cover shadow"
          />
        ) : (
          <div className="h-12 w-12 rounded-full border-2 border-white bg-slate-100 text-slate-600 flex items-center justify-center font-semibold shadow">
            {initials}
          </div>
        )}
        <span className="absolute -right-1 -bottom-1 h-3 w-3 rounded-full bg-emerald-400 border-2 border-white" />
      </div>
      <span className="text-sm font-semibold text-slate-800">
        {resource.name}
      </span>
    </div>
  );
};

export default function BookingCalendar({
  selectedServices,
  selectedStaff,
  selectedLocation,
}: BookingCalendarProps) {
  const { staff } = useStaffDirectory();
  const [view, setView] = useState<View>(Views.WEEK);
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState<BookingEvent[]>(initialEvents);
  const [selectedEvent, setSelectedEvent] = useState<BookingEvent | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [draftSlot, setDraftSlot] = useState<{ start: Date; end: Date } | null>(
    null
  );
  const [formData, setFormData] = useState({
    service: serviceCatalog[0].name,
    customerName: "",
    customerPhone: "",
    staffId: staff[0]?.id ?? "",
  });
  const [activeStaffFilter, setActiveStaffFilter] = useState<string>("all");
  const [feedback, setFeedback] = useState<string | null>(null);

  const visibleStaff =
    activeStaffFilter === "all"
      ? staff
      : staff.filter((s) => s.id === activeStaffFilter);

  const resourcesForDay = visibleStaff.length ? visibleStaff : staff;

  const staffLookup = useMemo(() => {
    const map = new Map<string, StaffMember>();
    staff.forEach((member) => map.set(member.id, member));
    return map;
  }, [staff]);

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      staffId: prev.staffId || staff[0]?.id || "",
    }));
  }, [staff]);

  const showFeedback = (message: string) => {
    setFeedback(message);
    setTimeout(() => setFeedback(null), 3500);
  };

  const mergedEvents = useMemo(() => {
    return events.filter((event) => {
      const matchesPropServices =
        selectedServices.includes("all") ||
        selectedServices.includes(event.service);
      const matchesPropStaff =
        selectedStaff.includes("all") || selectedStaff.includes(event.staffId);
      const matchesPropLocation =
        selectedLocation === "all" || event.location === selectedLocation;

      const matchesHeaderStaff =
        activeStaffFilter === "all" || event.staffId === activeStaffFilter;

      return (
        matchesPropServices &&
        matchesPropStaff &&
        matchesPropLocation &&
        matchesHeaderStaff
      );
    });
  }, [
    events,
    selectedServices,
    selectedStaff,
    selectedLocation,
    activeStaffFilter,
  ]);

  const minTime = useMemo(() => {
    const base = new Date();
    base.setHours(BUSINESS_HOURS.start, 0, 0, 0);
    return base;
  }, []);

  const maxTime = useMemo(() => {
    const base = new Date();
    base.setHours(BUSINESS_HOURS.end, 0, 0, 0);
    return base;
  }, []);

  const handleNavigate = (newDate: Date) => setDate(newDate);

  const handleSelectEvent = useCallback((event: BookingEvent) => {
    setSelectedEvent(event);
  }, []);

  const handleSlotSelect = useCallback(
    (slotInfo: SlotInfo) => {
      if (isClosedDay(slotInfo.start)) {
        showFeedback("Salon is closed on this day.");
        return;
      }

      const staffId =
        typeof slotInfo.resourceId === "string" && slotInfo.resourceId
          ? slotInfo.resourceId
          : visibleStaff[0]?.id ?? staff[0]?.id ?? "";

      setDraftSlot({ start: slotInfo.start, end: slotInfo.end });
      setFormData((prev) => ({
        ...prev,
        staffId,
        service: prev.service || serviceCatalog[0].name,
      }));
      setIsFormOpen(true);
    },
    [visibleStaff]
  );

  const handleAddQuickAppointment = () => {
    const start = new Date();
    start.setMinutes(0, 0, 0);
    const end = new Date(start.getTime() + 60 * 60 * 1000);
    setDraftSlot({ start, end });
    setFormData((prev) => ({
      ...prev,
      staffId:
        activeStaffFilter === "all"
          ? staff[0]?.id ?? prev.staffId
          : activeStaffFilter,
    }));
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setDraftSlot(null);
    setFormData({
      service: serviceCatalog[0].name,
      customerName: "",
      customerPhone: "",
      staffId: staff[0]?.id ?? "",
    });
  };

  const handleCreateAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!draftSlot) return;

    if (!formData.customerName.trim() || !formData.customerPhone.trim()) {
      showFeedback("Please provide customer name and phone number.");
      return;
    }

    const targetStaff = staffLookup.get(formData.staffId);
    if (!targetStaff) {
      showFeedback("Add a staff member before scheduling.");
      return;
    }

    const overlaps = events.some(
      (event) =>
        event.staffId === formData.staffId &&
        draftSlot.start < event.end &&
        draftSlot.end > event.start
    );
    if (overlaps) {
      showFeedback("This staff member is already booked for that time.");
      return;
    }

    const newEvent: BookingEvent = {
      id: crypto.randomUUID(),
      title: formData.service,
      service: formData.service,
      staffId: formData.staffId,
      location: PRIMARY_LOCATION,
      start: draftSlot.start,
      end: draftSlot.end,
      status: "confirmed",
      customer: {
        name: formData.customerName,
        phone: formData.customerPhone,
      },
      resourceId: formData.staffId,
    };

    setEvents((prev) => [...prev, newEvent]);
    closeForm();
    showFeedback("Appointment created successfully.");
  };

  const getToolbarLabel = () => {
    if (view === Views.MONTH) return moment(date).format("MMMM YYYY");
    if (view === Views.WEEK)
      return `${moment(date).startOf("week").format("MMM DD")} - ${moment(date)
        .endOf("week")
        .format("MMM DD, YYYY")}`;
    return moment(date).format("dddd, MMM DD, YYYY");
  };

  const handleToolbarNavigate = (direction: "PREV" | "NEXT" | "TODAY") => {
    if (direction === "TODAY") {
      setDate(new Date());
      return;
    }
    const factor = direction === "PREV" ? -1 : 1;
    const unit =
      view === Views.MONTH ? "month" : view === Views.WEEK ? "week" : "day";
    setDate(moment(date).add(factor, unit).toDate());
  };

  const dayPropGetter = useCallback((slotDate: Date) => {
    if (isClosedDay(slotDate)) {
      return {
        className: "closed-day",
      };
    }
    return {};
  }, []);

  const slotPropGetter = useCallback((slotDate: Date) => {
    if (isClosedDay(slotDate)) {
      return {
        className: "closed-day",
      };
    }
    return {};
  }, []);

  return (
    <div className="flex h-full flex-col bg-white">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 px-6 py-4">
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm">
            {PRIMARY_LOCATION}
          </span>
          <select
            value={activeStaffFilter}
            onChange={(e) => setActiveStaffFilter(e.target.value)}
            className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm focus:border-slate-400 focus:outline-none"
          >
            <option value="all">Working Staff</option>
            {staff.map((member) => (
              <option key={member.id} value={member.id}>
                {member.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1 rounded-lg border border-slate-200 bg-slate-50 p-1">
            <button
              onClick={() => handleToolbarNavigate("PREV")}
              className="rounded-md p-2 text-slate-600 transition hover:bg-white"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => handleToolbarNavigate("TODAY")}
              className="rounded-md px-3 py-1 text-sm font-semibold text-slate-700 transition hover:bg-white"
            >
              Today
            </button>
            <button
              onClick={() => handleToolbarNavigate("NEXT")}
              className="rounded-md p-2 text-slate-600 transition hover:bg-white"
            >
              <ChevronRight size={18} />
            </button>
          </div>

          <div className="min-w-[170px] rounded-lg border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-800">
            {getToolbarLabel()}
          </div>

          <div className="flex items-center gap-1 rounded-lg border border-slate-200 bg-slate-50 p-1">
            {[Views.DAY, Views.WEEK, Views.MONTH].map((type) => (
              <button
                key={type}
                onClick={() => setView(type)}
                className={`rounded-md px-3 py-1.5 text-sm font-semibold ${
                  view === type
                    ? "bg-slate-900 text-white shadow"
                    : "text-slate-700 hover:bg-white"
                }`}
              >
                {type === Views.DAY
                  ? "Day"
                  : type === Views.WEEK
                  ? "Week"
                  : "Month"}
              </button>
            ))}
          </div>

          <button
            onClick={handleAddQuickAppointment}
            className="flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-slate-900/20 transition hover:bg-slate-800"
          >
            <Plus size={18} />
            Add new
          </button>
        </div>
      </div>

      {feedback && (
        <div className="px-6 py-3 text-sm font-medium text-slate-700">
          {feedback}
        </div>
      )}

      <div
        className={`flex-1 overflow-hidden ${
          view === Views.DAY ? "is-resource-view" : ""
        }`}
      >
        <Calendar
          localizer={localizer}
          events={mergedEvents}
          startAccessor="start"
          endAccessor="end"
          view={view}
          onView={(next) => setView(next)}
          date={date}
          onNavigate={handleNavigate}
          selectable
          longPressThreshold={200}
          onSelectSlot={handleSlotSelect}
          onSelectEvent={handleSelectEvent}
          step={15}
          timeslots={4}
          min={minTime}
          max={maxTime}
          toolbar={false}
          dayPropGetter={dayPropGetter}
          slotPropGetter={slotPropGetter}
          eventPropGetter={(event) => ({
            style: {
              backgroundColor: serviceColorMap[event.service] ?? "#8ecae6",
              border: "none",
            },
          })}
          components={{
            event: CustomEvent,
            toolbar: () => null,
            resourceHeader: ({ resource }) => (
              <CustomResourceHeader resource={resource as any} />
            ),
          }}
          resources={view === Views.DAY ? resourcesForDay : undefined}
          resourceIdAccessor="id"
          resourceTitleAccessor="name"
          views={[Views.DAY, Views.WEEK, Views.MONTH]}
          messages={{
            showMore: (count) => `+${count} more`,
          }}
          formats={{
            dayFormat: (date, culture, loc) =>
              loc?.format(date, "ddd DD", culture) ?? "",
            dayHeaderFormat: (date, culture, loc) =>
              loc?.format(date, "dddd, MMM DD", culture) ?? "",
          }}
        />
      </div>

      {/* Appointment Details Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl"
            >
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">
                    {selectedEvent.service}
                  </h3>
                  <p className="text-sm text-slate-500">
                    {moment(selectedEvent.start).format(
                      "dddd, MMM DD • h:mm A"
                    )}{" "}
                    - {moment(selectedEvent.end).format("h:mm A")}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 p-4">
                  <User className="text-slate-500" size={20} />
                  <div>
                    <p className="text-xs font-semibold uppercase text-slate-500">
                      Customer
                    </p>
                    <p className="text-sm font-medium text-slate-800">
                      {selectedEvent.customer.name}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                    <p className="text-xs font-semibold uppercase text-slate-500">
                      Staff
                    </p>
                    <p className="text-sm font-medium text-slate-800">
                      {staffLookup.get(selectedEvent.staffId)?.name ?? "N/A"}
                    </p>
                  </div>
                  <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                    <p className="text-xs font-semibold uppercase text-slate-500">
                      Location
                    </p>
                    <p className="text-sm font-medium text-slate-800">
                      {selectedEvent.location}
                    </p>
                  </div>
                </div>

                <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                  <p className="text-xs font-semibold uppercase text-slate-500">
                    Phone
                  </p>
                  <p className="text-sm font-medium text-slate-800">
                    {selectedEvent.customer.phone}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* New Appointment Modal */}
      <AnimatePresence>
        {isFormOpen && draftSlot && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl"
            >
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">
                    New Appointment
                  </h3>
                  <p className="text-sm text-slate-500">
                    {moment(draftSlot.start).format("dddd, MMM DD")} ·{" "}
                    {moment(draftSlot.start).format("h:mm A")} -{" "}
                    {moment(draftSlot.end).format("h:mm A")}
                  </p>
                </div>
                <button
                  onClick={closeForm}
                  className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
                >
                  <X size={20} />
                </button>
              </div>

              <form className="space-y-4" onSubmit={handleCreateAppointment}>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-500">
                      Service
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          service: e.target.value,
                        }))
                      }
                      className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-800 focus:border-slate-400 focus:outline-none"
                    >
                      {serviceCatalog.map((svc) => (
                        <option key={svc.name} value={svc.name}>
                          {svc.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-500">
                      Staff Member
                    </label>
                    <div className="relative">
                      <select
                        value={formData.staffId}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            staffId: e.target.value,
                          }))
                        }
                        className="w-full appearance-none rounded-lg border border-slate-200 px-3 py-2 pl-9 text-sm font-medium text-slate-800 focus:border-slate-400 focus:outline-none"
                      >
                        {staff.map((member) => (
                          <option key={member.id} value={member.id}>
                            {member.name}
                          </option>
                        ))}
                      </select>
                      <Scissors
                        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                        size={16}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-500">
                    Customer Name
                  </label>
                  <input
                    type="text"
                    value={formData.customerName}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        customerName: e.target.value,
                      }))
                    }
                    placeholder="Enter customer name"
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-800 focus:border-slate-400 focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-500">
                    Phone Number
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      value={formData.customerPhone}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          customerPhone: e.target.value,
                        }))
                      }
                      placeholder="(000) 000-0000"
                      className="w-full rounded-lg border border-slate-200 px-3 py-2 pl-10 text-sm font-medium text-slate-800 focus:border-slate-400 focus:outline-none"
                    />
                    <Phone
                      className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                      size={16}
                    />
                  </div>
                </div>

                <p className="text-xs font-medium text-slate-500">
                  Duration:{" "}
                  {serviceCatalog.find((svc) => svc.name === formData.service)
                    ?.duration ?? 60}{" "}
                  mins
                </p>

                <button
                  type="submit"
                  className="mt-2 w-full rounded-xl bg-slate-900 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/20 transition hover:bg-slate-800"
                >
                  Confirm Booking
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
