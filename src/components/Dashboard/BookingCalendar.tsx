// ===== IMPORTS =====
// Import necessary React hooks
import { useState, useMemo, useCallback, useEffect } from "react";
// Import Calendar library for displaying the calendar
import {
  Calendar,
  momentLocalizer,
  Views,
  type SlotInfo,
  type View,
} from "react-big-calendar";
// Import moment for time handling
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./calendar.css";
// Import icons from lucide-react
import {
  ChevronLeft,
  ChevronRight,
  Phone,
  Plus,
  Scissors,
  User,
  X,
  Trash2,
  Edit,
} from "lucide-react";
// Import framer-motion for animations
import { motion, AnimatePresence } from "framer-motion";
// Import contexts for global state management
import {
  useStaffDirectory,
  type StaffMember,
  type StaffStatus,
} from "../../context/StaffContext";
import { useCustomers } from "../../context/CustomersContext";
import { useUser } from "../../context/UserContext";
import { useCurrentUser, useBusinessQueries } from "../../hooks/useBusinessQueries";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import type { Id } from "../../../convex/_generated/dataModel";

// Color palette for staff accent colors
const palette = ["#8ecae6", "#f4a261", "#90be6d", "#cdb4db", "#ffb703"];

// Set locale to English for moment
moment.locale("en");

// Initialize localizer so calendar displays correct time format
const localizer = momentLocalizer(moment);

// ===== CONFIGURATION CONSTANTS =====
const CLOSED_DAYS: number[] = []; // No closed days - all days are open
const BUSINESS_HOURS = { start: 9, end: 20 }; // Business hours: 9 AM - 8 PM
const PRIMARY_LOCATION = "Polish Pro Studio"; // Primary location name

// ===== SERVICE CATALOG =====
// Catalog containing all services with their duration and colors
const serviceCatalog = [
  { name: "Blow Dry", duration: 60, color: "#8ecae6" }, // Blow dry - 60 minutes
  { name: "Beard Grooming", duration: 60, color: "#f4a261" }, // Beard grooming - 60 minutes
  { name: "Balinese Massage", duration: 75, color: "#7cd4c5" }, // Balinese massage - 75 minutes
  { name: "Hair Colouring", duration: 60, color: "#f7aef8" }, // Hair coloring - 60 minutes
  { name: "Manicure & Pedicure", duration: 60, color: "#ffcb77" }, // Manicure & Pedicure - 60 minutes
];

// Create a map object for easy access to colors by service name
// Example: serviceColorMap["Blow Dry"] = "#8ecae6"
const serviceColorMap = serviceCatalog.reduce<Record<string, string>>(
    (acc, item) => {
      acc[item.name] = item.color;
      return acc;
    },
    {}
);

// ===== TYPE DEFINITIONS =====
// Booking status types
type BookingStatus = "pending" | "confirmed" | "cancelled" | "completed";

// Interface for a booking event on the calendar
interface BookingEvent {
  id: string; // Unique ID
  title: string; // Display title
  service: string; // Service name
  staffId: string; // Staff member ID
  location: string; // Location
  start: Date; // Start time
  end: Date; // End time
  status: BookingStatus; // Booking status
  customer: {
    name: string; // Customer name
    email: string; // Customer email
    phone: string; // Phone number
  };
  resourceId: string; // Resource ID (used for Day view)
}

// Props received by BookingCalendar component
interface BookingCalendarProps {
  selectedServices: string[]; // List of selected services for filtering
  selectedStaff: string[]; // List of selected staff for filtering
  selectedLocation: string; // Selected location for filtering
}

// ===== SAMPLE DATA =====
// List of initial bookings (demo data)
const initialEvents: BookingEvent[] = [
  {
    id: "evt-1",
    title: "Blow Dry",
    service: "Blow Dry",
    staffId: "mary",
    location: PRIMARY_LOCATION,
    start: new Date(2025, 10, 13, 9, 0), // Nov 13, 2025, 9:00 AM
    end: new Date(2025, 10, 13, 10, 0), // Nov 13, 2025, 10:00 AM
    status: "confirmed",
    customer: { name: "Brenda Massey", email: "brenda.massey@example.com", phone: "012-345-6789" },
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
    customer: { name: "Zachary Kelley", email: "zachary.kelley@example.com", phone: "014-444-2288" },
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
    customer: { name: "Diana Campos", email: "diana.campos@example.com", phone: "010-919-1212" },
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
    customer: { name: "Beverly Brown", email: "beverly.brown@example.com", phone: "010-222-3334" },
    resourceId: "mary",
  },
];

// ===== HELPER FUNCTIONS =====
// Check if a date is a closed day
const isClosedDay = (date: Date) => CLOSED_DAYS.includes(date.getDay());

// ===== CUSTOM COMPONENTS =====
// Component to display an event on the calendar
const CustomEvent = ({ event, colorMap }: { event: BookingEvent; colorMap: Record<string, string> }) => {
  return (
      <div
          className="h-full w-full rounded-md px-3 py-2 text-white shadow-sm"
          style={{
            // Use color corresponding to the service
            backgroundColor: colorMap[event.service] ?? "#8ecae6",
          }}
      >
        {/* Display time */}
        <p className="text-[11px] font-semibold uppercase tracking-wide opacity-90">
          {moment(event.start).format("h:mm A")} -{" "}
          {moment(event.end).format("h:mm A")}
        </p>
        {/* Display customer name */}
        <p className="text-sm font-bold leading-tight">{event.customer.name}</p>
        {/* Display service name */}
        <p className="text-xs opacity-90">{event.service}</p>
      </div>
  );
};

// Component to display header for each staff column in Day view
const CustomResourceHeader = ({ resource }: { resource: StaffMember }) => {
  // Create initials from staff name (e.g., "John Doe" -> "JD")
  const initials = resource.name
      .split(" ")
      .map((chunk) => chunk[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();

  return (
      <div className="flex flex-col items-center justify-center gap-2 py-3">
        <div className="relative">
          {/* Display avatar if available, otherwise show initials */}
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
          {/* Green dot indicating online/active status */}
          <span className="absolute -right-1 -bottom-1 h-3 w-3 rounded-full bg-emerald-400 border-2 border-white" />
        </div>
        {/* Display staff name */}
        <span className="text-sm font-semibold text-slate-800">
        {resource.name}
      </span>
      </div>
  );
};

// ===== MAIN COMPONENT =====
export default function BookingCalendar({
                                          selectedServices, // Props: selected services for filtering
                                          selectedStaff, // Props: selected staff for filtering
                                          selectedLocation, // Props: selected location for filtering
                                        }: BookingCalendarProps) {
  // ===== CONTEXTS & HOOKS =====
  const { staff } = useStaffDirectory(); // Get staff list from context (fallback)
  const { addCustomer, getCustomerByPhone } = useCustomers(); // Functions to manage customers
  const { user } = useUser(); // Get current user from local context
  const { user: currentUser } = useCurrentUser(); // Get current user with businessId from database
  const { getbusinesses } = useBusinessQueries(); // Get business data
  
  // Import mutation for creating appointments in database
  const createAppointmentMutation = useMutation(api.functions.appointments.addAppointment);
  const deleteAppointmentMutation = useMutation(api.functions.appointments.deleteAppointment);
  
  // Check if user is business owner (from database, not local context)
  const isBusinessOwner = currentUser?.status === "owner";
  
  // Fetch staff from database by businessId
  const dbStaff = useQuery(
    api.functions.staffs.getStaffByBusiness,
    currentUser?.businessId ? { businessId: currentUser.businessId } : "skip"
  );
  
  // Fetch current user's staff profile if they're an employee
  const currentUserStaffProfile = useQuery(
    api.functions.staffs.getStaffByEmail,
    currentUser?.email && currentUser?.status === "employee" ? { email: currentUser.email } : "skip"
  );
  
  // Fetch services from database by businessId
  const dbServices = useQuery(
    api.functions.services.getServicesByBusiness,
    currentUser?.businessId ? { businessId: currentUser.businessId } : "skip"
  );
  
  // Fetch appointments from database by businessId
  const dbAppointments = useQuery(
    api.functions.appointments.getAppointmentsByBusiness,
    currentUser?.businessId ? { businessId: currentUser.businessId } : "skip"
  );
  
  // Convert database services to service catalog format
  const serviceCatalogFromDB = useMemo(() => {
    if (!dbServices || dbServices.length === 0) return []; // Return empty array, no fallback
    
    return dbServices.map((service, index) => ({
      name: service.serviceName,
      duration: service.duration ? parseInt(service.duration) : 60, // Default to 60 minutes
      color: palette[index % palette.length], // Assign colors cyclically
    }));
  }, [dbServices]);
  
  // Check if services are available from database
  const hasServices = dbServices && dbServices.length > 0;
  
  // Create a map object for easy access to colors by service name from DB
  const serviceColorMapFromDB = useMemo(() => {
    return serviceCatalogFromDB.reduce<Record<string, string>>(
      (acc, item) => {
        acc[item.name] = item.color;
        return acc;
      },
      {}
    );
  }, [serviceCatalogFromDB]);
  
  // Convert database staff to StaffMember format
  const businessStaff: StaffMember[] = useMemo(() => {
    // If user is an employee and staff list is empty or doesn't include them, create entry from currentUser
    if (!isBusinessOwner && currentUser && currentUser.email) {
      // Check if current user is in the staff list
      const isInStaffList = dbStaff?.some(s => s.email === currentUser.email);
      
      if (!isInStaffList) {
        // Create a staff member entry from the current user or their staff profile
        const userStaffMember: StaffMember = {
          id: String(currentUserStaffProfile?._id || currentUser.id || "temp-user-id"),
          name: currentUserStaffProfile?.name || currentUser.name || "User",
          role: currentUserStaffProfile?.role || "Staff",
          avatar: currentUserStaffProfile?.image || "",
          email: currentUser.email,
          phone: currentUser.phone || "",
          accentColor: palette[0],
          status: "active",
        };
        return [userStaffMember];
      }
    }
    
    // For owners or when staff list exists
    if (!dbStaff || dbStaff.length === 0) return staff; // Fallback to context staff if no data
    
    return dbStaff.map((s, index) => ({
      id: s._id,
      name: s.name,
      role: s.role,
      avatar: s.image,
      email: s.email || "",
      phone: "", // Phone not in database schema yet
      accentColor: palette[index % palette.length], // Assign colors cyclically
      status: (s.status as StaffStatus) || "active",
    }));
  }, [dbStaff, staff, isBusinessOwner, currentUser, currentUserStaffProfile]);
  
  // Get business name from the current user's business
  const currentBusiness = getbusinesses?.find(
    (business) => business._id === currentUser?.businessId
  );
  const businessName = currentBusiness?.businessName || "Business Name";
  
  // Filter staff based on user role
  // If owner: show all staff
  // If employee: show only their own profile
  const filteredStaffByRole = useMemo(() => {
    if (isBusinessOwner) {
      return businessStaff; // Owner sees all staff
    }
    // Employee sees only themselves
    return businessStaff.filter((member) => member.email === currentUser?.email);
  }, [businessStaff, isBusinessOwner, currentUser?.email]);

  // ===== STATE MANAGEMENT =====
  // State managing current view (Day/Week/Month)
  const [view, setView] = useState<View>(Views.WEEK);

  // State managing the date being displayed on calendar
  const [date, setDate] = useState(new Date());

  // State managing list of all events/bookings
  const [events, setEvents] = useState<BookingEvent[]>(initialEvents);

  // State managing currently selected event for viewing details
  const [selectedEvent, setSelectedEvent] = useState<BookingEvent | null>(null);

  // State managing opening/closing of new booking form
  const [isFormOpen, setIsFormOpen] = useState(false);

  // State storing time slot information being selected for booking creation
  const [draftSlot, setDraftSlot] = useState<{ start: Date; end: Date } | null>(
      null
  );
  
  // State to track if we're editing an existing appointment
  const [editingAppointmentId, setEditingAppointmentId] = useState<string | null>(null);

  // State managing booking form data
  const [formData, setFormData] = useState({
    service: "", // Will be set when services load
    customerName: "", // Customer name
    customerEmail: "", // Customer email
    customerPhone: "", // Phone number
    staffId: "", // Staff member ID - will be set based on user role
    duration: 60, // Default duration
  });

  // State filtering staff displayed in header
  // For employees: automatically set to their own ID
  // For owners: default to "all"
  const [activeStaffFilter, setActiveStaffFilter] = useState<string>(() => {
    if (!isBusinessOwner && currentUser?.email) {
      // Find the staff member by email
      const currentStaffMember = businessStaff.find(s => s.email === currentUser.email);
      return currentStaffMember?.id || "all";
    }
    return "all";
  });

  // State managing feedback messages (success/error)
  const [feedback, setFeedback] = useState<string | null>(null);
  const [feedbackType, setFeedbackType] = useState<"success" | "error" | null>(
      null
  );

  // State managing form validation errors
  const [formError, setFormError] = useState<string | null>(null);

  // State managing date picker visibility
  const [showDatePicker, setShowDatePicker] = useState(false);

  // ===== EFFECTS =====
  // Update form data when services are loaded from database
  useEffect(() => {
    if (serviceCatalogFromDB.length > 0) {
      setFormData(prev => ({
        ...prev,
        service: prev.service || serviceCatalogFromDB[0].name,
        duration: prev.service ? prev.duration : serviceCatalogFromDB[0].duration,
      }));
    }
  }, [serviceCatalogFromDB]);
  
  // Load appointments from database and convert to calendar events
  useEffect(() => {
    if (!dbAppointments || !dbServices || !businessStaff.length) return;
    
    const convertedEvents: BookingEvent[] = dbAppointments.map((apt) => {
      // Find the service name
      const service = dbServices.find(s => s._id === apt.serviceId);
      const serviceName = service?.serviceName || "Unknown Service";
      
      // Get customer info from guestInfo or user
      const customerName = apt.guestInfo?.name || "Customer";
      const customerEmail = apt.guestInfo?.email || "";
      const customerPhone = apt.guestInfo?.phone || "";
      
      return {
        id: apt._id,
        title: serviceName,
        service: serviceName,
        staffId: apt.employeeId,
        location: PRIMARY_LOCATION,
        start: new Date(apt.appointmentStart),
        end: new Date(apt.appointmentEnd),
        status: apt.appointmentStatus as BookingStatus,
        customer: {
          name: customerName,
          email: customerEmail,
          phone: customerPhone,
        },
        resourceId: apt.employeeId,
      };
    });
    
    setEvents(convertedEvents);
  }, [dbAppointments, dbServices, businessStaff]);

  // ===== COMPUTED VALUES =====
  // Calculate list of staff to display based on filter and user role
  const visibleStaff = useMemo(() => {
    if (activeStaffFilter === "all") {
      return filteredStaffByRole; // Show all filtered staff (based on role)
    }
    return filteredStaffByRole.filter((s) => s.id === activeStaffFilter); // Show only selected staff
  }, [activeStaffFilter, filteredStaffByRole]);

  // Resources to pass into Calendar component (used for Day view)
  const resourcesForDay = visibleStaff.length ? visibleStaff : filteredStaffByRole;

  // Create Map for quick lookup of staff information by ID
  // useMemo to avoid recalculation on every render
  const staffLookup = useMemo(() => {
    const map = new Map<string, StaffMember>();
    businessStaff.forEach((member) => map.set(member.id, member));
    return map;
  }, [businessStaff]);

  // ===== EFFECTS =====
  // Effect: Update staffId in form when staff list changes
  useEffect(() => {
    if (businessStaff.length === 0) return;
    
    // Debug logging
    console.log("Setting default staff ID:", {
      isBusinessOwner,
      userEmail: user?.email,
      currentUserEmail: currentUser?.email,
      businessStaff: businessStaff.map(s => ({ id: s.id, name: s.name, email: s.email })),
    });
    
    // Determine the correct staff ID based on user role
    let defaultStaffId: string;
    if (!isBusinessOwner && currentUser?.email) {
      // Employee: find their staff profile using currentUser.email
      const currentStaffMember = businessStaff.find(s => s.email === currentUser.email);
      console.log("Found staff member by currentUser.email:", currentStaffMember);
      defaultStaffId = currentStaffMember?.id || businessStaff[0]?.id || "";
    } else {
      // Owner: use first staff
      defaultStaffId = businessStaff[0]?.id || "";
    }
    
    console.log("Setting staffId to:", defaultStaffId);
    
    setFormData((prev) => ({
      ...prev,
      staffId: prev.staffId || defaultStaffId,
    }));
  }, [businessStaff, isBusinessOwner, currentUser?.email]);

  // Effect: Set staff filter for employees to their own ID
  useEffect(() => {
    if (!isBusinessOwner && currentUser?.email && businessStaff.length > 0) {
      const currentStaffMember = businessStaff.find(s => s.email === currentUser.email);
      if (currentStaffMember) {
        setActiveStaffFilter(currentStaffMember.id);
        // Also set the form data to use this staff member
        setFormData((prev) => ({
          ...prev,
          staffId: currentStaffMember.id,
        }));
      }
    }
  }, [isBusinessOwner, currentUser?.email, businessStaff]);

  // ===== UTILITY FUNCTIONS =====
  // Display feedback message and auto-hide after 5 seconds
  const showFeedback = (
      message: string,
      type: "success" | "error" = "error"
  ) => {
    setFeedback(message);
    setFeedbackType(type);
    setTimeout(() => {
      setFeedback(null);
      setFeedbackType(null);
    }, 5000);
  };

  // Filter events by criteria: service, staff, location
  // useMemo to avoid recalculation on every render
  const mergedEvents = useMemo(() => {
    return events.filter((event) => {
      // Check if event matches selected service
      const matchesPropServices =
          selectedServices.includes("all") ||
          selectedServices.includes(event.service);

      // Check if event matches selected staff
      const matchesPropStaff =
          selectedStaff.includes("all") || selectedStaff.includes(event.staffId);

      // Check if event matches selected location
      const matchesPropLocation =
          selectedLocation === "all" || event.location === selectedLocation;

      // Check if event matches header staff filter
      const matchesHeaderStaff =
          activeStaffFilter === "all" || event.staffId === activeStaffFilter;

      // Only show event when all conditions are met
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

  // Start time displayed on calendar (9 AM)
  const minTime = useMemo(() => {
    const base = new Date();
    base.setHours(BUSINESS_HOURS.start, 0, 0, 0);
    return base;
  }, []);

  // End time displayed on calendar (8 PM)
  const maxTime = useMemo(() => {
    const base = new Date();
    base.setHours(BUSINESS_HOURS.end, 0, 0, 0);
    return base;
  }, []);

  // ===== EVENT HANDLERS =====
  // Handler: Navigate calendar (change displayed date)
  const handleNavigate = (newDate: Date) => setDate(newDate);

  // Handler: When clicking on an event on calendar -> show details modal
  const handleSelectEvent = useCallback((event: BookingEvent) => {
    setSelectedEvent(event);
  }, []);

  // Handler: When selecting an empty time slot on calendar (works in Day and Week view)
  const handleSlotSelect = useCallback(
      (slotInfo: SlotInfo) => {
        // If in month view, switch to day view for the selected date
        if (view === Views.MONTH) {
          setDate(slotInfo.start);
          setView(Views.DAY);
          return;
        }

        // Check if it's a closed day
        if (isClosedDay(slotInfo.start)) {
          showFeedback("Salon is closed on this day.", "error");
          return;
        }

        // Validate that selection is within a single day
        const startDay = slotInfo.start.getDate();
        const endDay = slotInfo.end.getDate();
        const startMonth = slotInfo.start.getMonth();
        const endMonth = slotInfo.end.getMonth();
        
        if (startDay !== endDay || startMonth !== endMonth) {
          showFeedback("Please select a time slot within a single day.", "error");
          return;
        }

        // Determine staff for the slot
        // For employees: always use their own staff ID
        // For owners: use the clicked column staff or first staff
        let staffId: string;
        if (!isBusinessOwner && currentUser?.email) {
          // Employee: find their staff profile
          const currentStaffMember = businessStaff.find(s => s.email === currentUser.email);
          staffId = currentStaffMember?.id || businessStaff[0]?.id || "";
        } else {
          // Owner: use clicked column or first staff
          staffId = typeof slotInfo.resourceId === "string" && slotInfo.resourceId
              ? slotInfo.resourceId
              : visibleStaff[0]?.id ?? businessStaff[0]?.id ?? "";
        }

        // Calculate the actual dragged duration in minutes
        const draggedDurationMs =
            slotInfo.end.getTime() - slotInfo.start.getTime();
        const draggedDurationMinutes = Math.round(
            draggedDurationMs / (60 * 1000)
        );

        // Use the dragged duration, or fall back to service default if drag was too short
        const selectedService =
            serviceCatalogFromDB.find((svc) => svc.name === formData.service) ||
            serviceCatalogFromDB[0];
        const actualDuration =
            draggedDurationMinutes >= 15
                ? draggedDurationMinutes
                : selectedService.duration;

        // Save time slot and open booking form
        setDraftSlot({ start: slotInfo.start, end: slotInfo.end });
        setFormData((prev) => ({
          ...prev,
          staffId,
          service: prev.service || serviceCatalogFromDB[0]?.name || "",
          duration: actualDuration,
        }));
        setIsFormOpen(true);
      },
      [view, visibleStaff, formData.service, isBusinessOwner, currentUser?.email, businessStaff, serviceCatalogFromDB]
  );

  // Handler: When clicking "Add new" button - create quick booking with current time
  const handleAddQuickAppointment = () => {
    // Create start time = current time (rounded to top of hour)
    const start = new Date();
    start.setMinutes(0, 0, 0);

    // Get default duration of service
    const defaultDuration =
        serviceCatalogFromDB.find((svc) => svc.name === formData.service)?.duration ||
        60;
    const end = new Date(start.getTime() + defaultDuration * 60 * 1000);

    // Determine staff ID
    // For employees: always use their own staff ID
    // For owners: use filtered staff or first staff
    let staffId: string;
    if (!isBusinessOwner && currentUser?.email) {
      // Employee: find their staff profile
      const currentStaffMember = businessStaff.find(s => s.email === currentUser.email);
      staffId = currentStaffMember?.id || businessStaff[0]?.id || "";
    } else {
      // Owner: use filtered staff or first staff
      staffId = activeStaffFilter === "all"
          ? businessStaff[0]?.id ?? ""
          : activeStaffFilter;
    }

    // Set slot and open form
    setDraftSlot({ start, end });
    setFormData((prev) => ({
      ...prev,
      staffId,
      duration: defaultDuration,
    }));
    setIsFormOpen(true);
  };

  // Handler: Close booking form and reset to initial state
  const closeForm = () => {
    setIsFormOpen(false);
    setDraftSlot(null);
    setFormError(null);
    setEditingAppointmentId(null);
    
    // Determine the correct staff ID based on user role
    let defaultStaffId: string;
    if (!isBusinessOwner && currentUser?.email) {
      // Employee: find their staff profile
      const currentStaffMember = businessStaff.find(s => s.email === currentUser.email);
      defaultStaffId = currentStaffMember?.id || businessStaff[0]?.id || "";
    } else {
      // Owner: use first staff
      defaultStaffId = businessStaff[0]?.id || "";
    }
    
    // Reset form to default values
    setFormData({
      service: serviceCatalogFromDB[0]?.name || "",
      customerName: "",
      customerEmail: "",
      customerPhone: "",
      staffId: defaultStaffId,
      duration: serviceCatalogFromDB[0]?.duration || 60,
    });
  };

  // Handler: Handle submit form for creating/updating booking
  const handleCreateAppointment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!draftSlot) return;

    // Clear previous errors if any
    setFormError(null);

    // VALIDATION 1: Check customer name and phone number
    if (!formData.customerName.trim() || !formData.customerPhone.trim()) {
      const errorMsg = "Please provide customer name and phone number.";
      setFormError(errorMsg);
      showFeedback(errorMsg, "error");
      return;
    }
    
    // VALIDATION 1b: Validate email format if provided
    if (formData.customerEmail.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.customerEmail)) {
        const errorMsg = "Please provide a valid email address.";
        setFormError(errorMsg);
        showFeedback(errorMsg, "error");
        return;
      }
    }

    // VALIDATION 2: Check minimum duration
    if (!formData.duration || formData.duration < 15) {
      const errorMsg = "Duration must be at least 15 minutes.";
      setFormError(errorMsg);
      showFeedback(errorMsg, "error");
      return;
    }

    // VALIDATION 3: Check if staff exists
    const targetStaff = staffLookup.get(formData.staffId);
    if (!targetStaff) {
      const errorMsg = "Add a staff member before scheduling.";
      setFormError(errorMsg);
      showFeedback(errorMsg, "error");
      return;
    }

    // VALIDATION 4: Check if business exists
    if (!currentUser?.businessId) {
      const errorMsg = "Business information is missing.";
      setFormError(errorMsg);
      showFeedback(errorMsg, "error");
      return;
    }

    // VALIDATION 5: Check if service exists in database
    const selectedServiceFromDB = dbServices?.find(
      (svc) => svc.serviceName === formData.service
    );
    if (!selectedServiceFromDB) {
      const errorMsg = "Selected service not found.";
      setFormError(errorMsg);
      showFeedback(errorMsg, "error");
      return;
    }

    // Calculate end time based on duration
    const endTime = new Date(
        draftSlot.start.getTime() + formData.duration * 60 * 1000
    );

    // VALIDATION 6: Check if staff has conflicting appointment (skip if editing the same appointment)
    const overlaps = events.some(
        (event) =>
            event.id !== editingAppointmentId && // Skip the appointment being edited
            event.staffId === formData.staffId &&
            draftSlot.start < event.end &&
            endTime > event.start
    );
    if (overlaps) {
      const errorMsg = "This staff member is already booked for that time.";
      setFormError(errorMsg);
      showFeedback(errorMsg, "error");
      return;
    }

    try {
      // Calculate day of week (0 = Sunday, 6 = Saturday)
      const dayOfWeek = draftSlot.start.getDay();
      
      // Format date as YYYY-MM-DD
      const appointmentDate = moment(draftSlot.start).format("YYYY-MM-DD");
      
      if (editingAppointmentId) {
        // EDITING MODE: Delete old appointment and create new one
        console.log("Updating appointment:", editingAppointmentId);
        
        // Delete the old appointment
        await deleteAppointmentMutation({ id: editingAppointmentId as Id<"appointments"> });
        
        // Create new appointment with updated data
        await createAppointmentMutation({
          customerId: currentUser?.id as Id<"users"> | undefined,
          employeeId: formData.staffId as Id<"staff">,
          serviceId: selectedServiceFromDB._id,
          businessId: currentUser.businessId,
          appointmentDate,
          appointmentStart: draftSlot.start.toISOString(),
          appointmentEnd: endTime.toISOString(),
          appointmentStatus: "confirmed",
          dayOfWeek,
          notes: "",
          guestInfo: {
            name: formData.customerName,
            email: formData.customerEmail,
            phone: formData.customerPhone,
          },
        });
        
        showFeedback("Appointment updated successfully!", "success");
      } else {
        // CREATING MODE: Create new appointment
        // Log the appointment data for debugging
        console.log("Creating appointment with:", {
          userRole: isBusinessOwner ? "owner" : "employee",
          userEmail: currentUser?.email,
          staffId: formData.staffId,
          staffName: businessStaff.find(s => s.id === formData.staffId)?.name,
          serviceId: selectedServiceFromDB._id,
          serviceName: selectedServiceFromDB.serviceName,
          businessId: currentUser.businessId,
          appointmentDate,
          customerName: formData.customerName,
        });
        
        // Create appointment in database
        await createAppointmentMutation({
          customerId: currentUser?.id as Id<"users"> | undefined,
          employeeId: formData.staffId as Id<"staff">,
          serviceId: selectedServiceFromDB._id,
          businessId: currentUser.businessId,
          appointmentDate,
          appointmentStart: draftSlot.start.toISOString(),
          appointmentEnd: endTime.toISOString(),
          appointmentStatus: "confirmed",
          dayOfWeek,
          notes: "",
          guestInfo: {
            name: formData.customerName,
            email: formData.customerEmail,
            phone: formData.customerPhone,
          },
        });

        // Automatically add new customer to list if not exists
        // (check by phone number)
        const existingCustomer = getCustomerByPhone(formData.customerPhone);
        if (!existingCustomer) {
          addCustomer(formData.customerName, formData.customerPhone);
        }

        showFeedback("Appointment created successfully!", "success");
      }

      // Show success message
      setFormError(null);

      // Close form after 500ms so user can see the message
      setTimeout(() => {
        closeForm();
      }, 500);
    } catch (error) {
      console.error("Error saving appointment:", error);
      const errorMsg = editingAppointmentId 
        ? "Failed to update appointment. Please try again."
        : "Failed to create appointment. Please try again.";
      setFormError(errorMsg);
      showFeedback(errorMsg, "error");
    }
  };

  // Handler: Delete appointment
  const handleDeleteAppointment = async () => {
    if (!selectedEvent) return;
    
    // Confirm deletion
    if (!window.confirm("Are you sure you want to delete this appointment?")) {
      return;
    }
    
    try {
      // Delete from database
      await deleteAppointmentMutation({ id: selectedEvent.id as Id<"appointments"> });
      
      // Remove from local state
      setEvents((prev) => prev.filter((event) => event.id !== selectedEvent.id));
      
      // Show success message
      showFeedback("Appointment deleted successfully!", "success");
      
      // Close modal
      setSelectedEvent(null);
    } catch (error) {
      console.error("Error deleting appointment:", error);
      showFeedback("Failed to delete appointment. Please try again.", "error");
    }
  };

  // Handler: Edit appointment - populate form with existing data
  const handleEditAppointment = () => {
    if (!selectedEvent) return;
    
    // Calculate the actual duration from the appointment's start and end times
    const durationMs = selectedEvent.end.getTime() - selectedEvent.start.getTime();
    const duration = Math.round(durationMs / (60 * 1000)); // Convert to minutes
    
    // Populate form with existing appointment data
    setFormData({
      service: selectedEvent.service,
      customerName: selectedEvent.customer.name,
      customerEmail: selectedEvent.customer.email || "",
      customerPhone: selectedEvent.customer.phone,
      staffId: selectedEvent.staffId,
      duration,
    });
    
    // Set the time slot
    setDraftSlot({
      start: selectedEvent.start,
      end: selectedEvent.end,
    });
    
    // Set editing mode
    setEditingAppointmentId(selectedEvent.id);
    
    // Close details modal and open form
    setSelectedEvent(null);
    setIsFormOpen(true);
  };

  // Helper: Create label to display on toolbar depending on view
  const getToolbarLabel = () => {
    if (view === Views.MONTH) return moment(date).format("MMMM YYYY"); // "November 2025"
    if (view === Views.WEEK)
      return `${moment(date).startOf("week").format("MMM DD")} - ${moment(date)
          .endOf("week")
          .format("MMM DD, YYYY")}`; // "Nov 13 - Nov 19, 2025"
    return moment(date).format("dddd, MMM DD, YYYY"); // "Wednesday, Nov 13, 2025"
  };

  // Handler: Navigate toolbar (Previous/Next/Today)
  const handleToolbarNavigate = (direction: "PREV" | "NEXT" | "TODAY") => {
    if (direction === "TODAY") {
      setDate(new Date()); // Go to today
      return;
    }

    // Calculate new date based on current view
    const factor = direction === "PREV" ? -1 : 1; // -1 for previous, +1 for next
    const unit =
        view === Views.MONTH ? "month" : view === Views.WEEK ? "week" : "day";
    setDate(moment(date).add(factor, unit).toDate());
  };

  // Getter: Add CSS class for closed days (in Month view)
  const dayPropGetter = useCallback((slotDate: Date) => {
    if (isClosedDay(slotDate)) {
      return {
        className: "closed-day", // Class will dim or disable that day
      };
    }
    return {};
  }, []);

  // Getter: Add CSS class for closed time slots (in Day/Week view)
  const slotPropGetter = useCallback((slotDate: Date) => {
    if (isClosedDay(slotDate)) {
      return {
        className: "closed-day",
      };
    }
    return {};
  }, []);

  // ===== RENDER =====
  return (
      <div className="flex h-full flex-col bg-white">
        {/* HEADER TOOLBAR - Contains controls and filters */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 px-6 py-4">
          {/* Left side: Display location and staff filter */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Badge displaying business name */}
            <span className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm">
            {businessName}
          </span>
            {/* Dropdown staff filter - only show for business owners */}
            {isBusinessOwner && (
              <select
                  value={activeStaffFilter}
                  onChange={(e) => setActiveStaffFilter(e.target.value)}
                  className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm focus:border-slate-400 focus:outline-none"
              >
                <option value="all">All Staff</option>
                {filteredStaffByRole.map((member) => (
                    <option key={member.id} value={member.id}>
                      {member.name}
                    </option>
                ))}
              </select>
            )}
          </div>

          {/* Right side: Navigation, view switcher, and Add new button */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Navigation buttons: Previous | Today | Next */}
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

            {/* Label displaying current day/week/month - clickable to show date picker */}
            <div className="relative">
              <button
                  onClick={() => setShowDatePicker(!showDatePicker)}
                  className="min-w-[170px] rounded-lg border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-100 transition-colors"
              >
                {getToolbarLabel()}
              </button>
              
              {/* Mini calendar date picker dropdown */}
              {showDatePicker && (
                  <div className="absolute top-full mt-2 right-0 z-50 bg-white rounded-lg shadow-xl border border-slate-200 p-4">
                    <input
                        type="date"
                        value={moment(date).format("YYYY-MM-DD")}
                        onChange={(e) => {
                          const selectedDate = new Date(e.target.value);
                          setDate(selectedDate);
                          setShowDatePicker(false);
                        }}
                        className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-800 focus:border-slate-400 focus:outline-none"
                    />
                  </div>
              )}
            </div>

            {/* View switcher: Day | Week | Month */}
            <div className="flex items-center gap-1 rounded-lg border border-slate-200 bg-slate-50 p-1">
              {[Views.DAY, Views.WEEK, Views.MONTH].map((type) => (
                  <button
                      key={type}
                      onClick={() => setView(type)}
                      className={`rounded-md px-3 py-1.5 text-sm font-semibold ${
                          view === type
                              ? "bg-slate-900 text-white shadow" // Active view
                              : "text-slate-700 hover:bg-white" // Inactive view
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

            {/* Quick booking creation button */}
            <button
                onClick={handleAddQuickAppointment}
                className="flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-slate-900/20 transition hover:bg-slate-800"
            >
              <Plus size={18} />
              Add new
            </button>
          </div>
        </div>

        {/* FEEDBACK BANNER - Display success/error messages */}
        {feedback && (
            <div
                className={`px-6 py-4 text-sm font-semibold ${
                    feedbackType === "success"
                        ? "bg-emerald-50 border-l-4 border-emerald-500 text-emerald-800" // Green color for success
                        : "bg-red-50 border-l-4 border-red-500 text-red-800" // Red color for error
                }`}
            >
              <div className="flex items-center gap-2">
                {/* Checkmark icon for success */}
                {feedbackType === "success" ? (
                    <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                      <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                ) : (
                    // Warning icon for error
                    <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                      <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                )}
                <span>{feedback}</span>
              </div>
            </div>
        )}

        {/* CALENDAR COMPONENT - Main component displaying the calendar */}
        <div
            className={`flex-1 overflow-hidden ${
                // Add CSS class depending on view for styling
                view === Views.DAY
                    ? "is-resource-view rbc-day-view"
                    : view === Views.WEEK
                        ? "rbc-week-view"
                        : "rbc-month-view-container"
            }`}
        >
          <Calendar
              localizer={localizer} // Time configuration
              events={mergedEvents} // Filtered events list
              startAccessor="start" // Property indicating start time
              endAccessor="end" // Property indicating end time
              view={view} // Current view (Day/Week/Month)
              onView={(next) => setView(next)} // Handler when view changes
              date={date} // Date being displayed
              onNavigate={handleNavigate} // Handler when navigating
              selectable // Allow slot selection in all views
              longPressThreshold={200} // Hold time to select (mobile)
              onSelectSlot={handleSlotSelect} // Handler when slot is selected
              onSelectEvent={handleSelectEvent} // Handler when clicking on event
              step={15} // Each time step = 15 minutes
              timeslots={4} // 4 timeslots per hour (15 min x 4 = 60 min)
              min={minTime} // Start time displayed (9 AM)
              max={maxTime} // End time displayed (8 PM)
              toolbar={false} // Hide default toolbar (use custom toolbar)
              dayPropGetter={dayPropGetter} // Add props for closed days
              slotPropGetter={slotPropGetter} // Add props for closed slots
              eventPropGetter={(event) => ({
                // Custom style for each event
                style: {
                  backgroundColor: serviceColorMapFromDB[event.service] ?? "#8ecae6",
                  border: "none",
                },
              })}
              components={{
                event: (props) => <CustomEvent {...props} colorMap={serviceColorMapFromDB} />, // Custom component to display event
                toolbar: () => null, // Hide toolbar
              }}
              // Resources removed for single column day view
              resources={undefined}
              resourceIdAccessor="id" // ID property of resource
              resourceTitleAccessor="name" // Name property of resource
              views={[Views.DAY, Views.WEEK, Views.MONTH]} // Available views
              dayLayoutAlgorithm={view === Views.MONTH ? "no-overlap" : undefined} // Event layout algorithm
              messages={{
                showMore: (count) => `+${count} more`, // Text when there are many events
              }}
              formats={{
                // Custom format for displaying dates
                dayFormat: (date, culture, loc) =>
                    loc?.format(date, "ddd DD", culture) ?? "",
                dayHeaderFormat: (date, culture, loc) =>
                    loc?.format(date, "dddd, MMM DD", culture) ?? "",
              }}
          />
        </div>

        {/* APPOINTMENT DETAILS MODAL */}
        <AnimatePresence>
          {selectedEvent && (
              // Dark overlay background
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-6">
                {/* Modal with fade and slide animation */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }} // Initial state
                    animate={{ opacity: 1, y: 0 }} // Display state
                    exit={{ opacity: 0, y: 20 }} // Exit state
                    className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl"
                >
                  {/* Modal header */}
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
                    {/* Close modal button */}
                    <button
                        onClick={() => setSelectedEvent(null)}
                        className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
                    >
                      <X size={20} />
                    </button>
                  </div>

                  {/* Detail content */}
                  <div className="space-y-4">
                    {/* Customer information */}
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

                    {/* 2-column grid: Staff and Business */}
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
                          Business
                        </p>
                        <p className="text-sm font-medium text-slate-800">
                          {businessName}
                        </p>
                      </div>
                    </div>

                    {/* 2-column grid: Phone and Email */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                        <p className="text-xs font-semibold uppercase text-slate-500">
                          Phone
                        </p>
                        <p className="text-sm font-medium text-slate-800">
                          {selectedEvent.customer.phone || "N/A"}
                        </p>
                      </div>
                      <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                        <p className="text-xs font-semibold uppercase text-slate-500">
                          Email
                        </p>
                        <p className="text-sm font-medium text-slate-800 break-all">
                          {selectedEvent.customer.email || "N/A"}
                        </p>
                      </div>
                    </div>
                    
                    {/* Action buttons */}
                    <div className="flex gap-3 pt-2">
                      <button
                          onClick={handleEditAppointment}
                          className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/20 transition hover:bg-slate-800"
                      >
                        <Edit size={18} />
                        Edit Appointment
                      </button>
                      <button
                          onClick={handleDeleteAppointment}
                          className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-red-600/20 transition hover:bg-red-700"
                      >
                        <Trash2 size={18} />
                        Delete
                      </button>
                    </div>
                  </div>
                </motion.div>
              </div>
          )}
        </AnimatePresence>

        {/* NEW BOOKING MODAL */}
        <AnimatePresence>
          {isFormOpen && draftSlot && (
              // Dark overlay background
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-6">
                {/* Modal with scale animation */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }} // Shrunk initially
                    animate={{ opacity: 1, scale: 1 }} // Expanded when displayed
                    exit={{ opacity: 0, scale: 0.95 }} // Shrunk when closed
                    className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl"
                >
                  {/* Modal header */}
                  <div className="mb-6 flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">
                        {editingAppointmentId ? "Edit Appointment" : "New Appointment"}
                      </h3>
                    </div>
                    {/* Close form button */}
                    <button
                        onClick={closeForm}
                        className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
                    >
                      <X size={20} />
                    </button>
                  </div>

                  {/* Booking form */}
                  <form className="space-y-4" onSubmit={handleCreateAppointment}>
                    {/* Display validation error if any */}
                    {formError && (
                        <div className="rounded-lg border border-red-200 bg-red-50 p-4">
                          <p className="text-sm font-medium text-red-800">
                            {formError}
                          </p>
                        </div>
                    )}
                    {/* 2-column grid: Date and Start Time */}
                    <div className="grid grid-cols-2 gap-4">
                      {/* Date input */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-500">
                          Date
                        </label>
                        <input
                            type="date"
                            value={moment(draftSlot.start).format("YYYY-MM-DD")}
                            onChange={(e) => {
                              const dateString = e.target.value;
                              if (!dateString) return;

                              // Parse date string to avoid timezone issues
                              const [year, month, day] = dateString
                                  .split("-")
                                  .map(Number);
                              const newDate = new Date(draftSlot.start);
                              newDate.setFullYear(year, month - 1, day); // month starts from 0
                              newDate.setHours(draftSlot.start.getHours());
                              newDate.setMinutes(draftSlot.start.getMinutes());
                              newDate.setSeconds(0);
                              newDate.setMilliseconds(0);

                              // Update both start and end time
                              const newEnd = new Date(
                                  newDate.getTime() + formData.duration * 60 * 1000
                              );
                              setDraftSlot({ start: newDate, end: newEnd });
                            }}
                            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-800 focus:border-slate-400 focus:outline-none"
                        />
                      </div>
                      {/* Start time input */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-500">
                          Start Time
                        </label>
                        <input
                            type="time"
                            value={moment(draftSlot.start).format("HH:mm")}
                            onChange={(e) => {
                              const [hours, minutes] = e.target.value
                                  .split(":")
                                  .map(Number);
                              const newStart = new Date(draftSlot.start);
                              newStart.setHours(hours);
                              newStart.setMinutes(minutes);
                              // Automatically calculate end time based on duration
                              const newEnd = new Date(
                                  newStart.getTime() + formData.duration * 60 * 1000
                              );
                              setDraftSlot({ start: newStart, end: newEnd });
                            }}
                            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-800 focus:border-slate-400 focus:outline-none"
                        />
                      </div>
                    </div>
                    {/* 2-column grid: Service and Staff */}
                    <div className="grid grid-cols-2 gap-4">
                      {/* Service dropdown */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-500">
                          Service
                        </label>
                        <select
                            value={formData.service}
                            onChange={(e) => {
                              // Find selected service
                              const selectedService =
                                  serviceCatalogFromDB.find(
                                      (svc) => svc.name === e.target.value
                                  );
                              // Update service and duration
                              setFormData((prev) => ({
                                ...prev,
                                service: e.target.value,
                                duration: selectedService?.duration || 60,
                              }));
                              // Automatically update end time based on new duration
                              if (draftSlot && selectedService) {
                                const newEndTime = new Date(
                                    draftSlot.start.getTime() +
                                    selectedService.duration * 60 * 1000
                                );
                                setDraftSlot({ ...draftSlot, end: newEndTime });
                              }
                            }}
                            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-800 focus:border-slate-400 focus:outline-none disabled:bg-slate-100 disabled:text-slate-500 disabled:cursor-not-allowed"
                            disabled={!hasServices}
                        >
                          {hasServices ? (
                            serviceCatalogFromDB.map((svc) => (
                              <option key={svc.name} value={svc.name}>
                                {svc.name}
                              </option>
                            ))
                          ) : (
                            <option value="">No services available</option>
                          )}
                        </select>
                        {!hasServices && (
                          <p className="text-xs text-amber-600">
                            Please add services to your business first
                          </p>
                        )}
                      </div>

                      {/* Staff dropdown */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-500">
                          Staff Member
                        </label>
                        <div className="relative">
                          {isBusinessOwner ? (
                            // Business owner can select from all staff
                            <>
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
                                {businessStaff.map((member) => (
                                    <option key={member.id} value={member.id}>
                                      {member.name}
                                    </option>
                                ))}
                              </select>
                              {/* Scissors icon on the left */}
                              <Scissors
                                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                                  size={16}
                              />
                            </>
                          ) : (
                            // Staff member sees only their own name (read-only)
                            <>
                              <div className="relative w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 pl-9 text-sm font-medium text-slate-800">
                                {businessStaff.find(s => s.id === formData.staffId)?.name || currentUser?.name || "N/A"}
                                {/* Scissors icon on the left */}
                                <Scissors
                                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                                    size={16}
                                />
                              </div>
                              {/* Hidden input to maintain the staff ID */}
                              <input type="hidden" value={formData.staffId} />
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Customer name input */}
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

                    {/* Customer email input */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-500">
                        Customer Email <span className="text-slate-400 font-normal">(optional)</span>
                      </label>
                      <input
                          type="email"
                          value={formData.customerEmail}
                          onChange={(e) =>
                              setFormData((prev) => ({
                                ...prev,
                                customerEmail: e.target.value,
                              }))
                          }
                          placeholder="customer@example.com"
                          className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-800 focus:border-slate-400 focus:outline-none"
                      />
                    </div>

                    {/* Phone number input */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-500">
                        Phone Number
                      </label>
                      <div className="relative">
                        <input
                            type="tel"
                            value={formData.customerPhone}
                            onChange={(e) => {
                              // Only allow numbers, spaces, parentheses, hyphens, and plus sign
                              const value = e.target.value.replace(
                                  /[^\d\s()\-+]/g,
                                  ""
                              );
                              setFormData((prev) => ({
                                ...prev,
                                customerPhone: value,
                              }));
                            }}
                            placeholder="(000) 000-0000"
                            pattern="[0-9\s()\-+]+" // Pattern validation
                            inputMode="tel" // Show numeric keyboard on mobile
                            className="w-full rounded-lg border border-slate-200 px-3 py-2 pl-10 text-sm font-medium text-slate-800 focus:border-slate-400 focus:outline-none"
                        />
                        {/* Phone icon on the left */}
                        <Phone
                            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                            size={16}
                        />
                      </div>
                    </div>

                    {/* Duration input - with complex validation */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-500">
                        Duration (minutes)
                      </label>
                      <input
                          type="number"
                          min="15" // Minimum 15 minutes
                          max="480" // Maximum 8 hours
                          step="15" // Step of 15 minutes
                          value={formData.duration || ""}
                          placeholder="Enter duration"
                          onFocus={(e) => {
                            // When focusing on input
                            if (formData.duration === 0) {
                              e.target.value = ""; // Clear 0 value
                            } else {
                              e.target.select(); // Select all text for easy editing
                            }
                          }}
                          onChange={(e) => {
                            const value = e.target.value;
                            // Allow empty input while typing
                            if (value === "") {
                              setFormData((prev) => ({
                                ...prev,
                                duration: 0,
                              }));
                              return;
                            }
                            const numValue = parseInt(value);
                            // Only update if it's a valid number
                            if (!isNaN(numValue)) {
                              // DON'T clamp while typing - let user type freely
                              // This allows typing numbers like 4, 45 without interruption
                              setFormData((prev) => ({
                                ...prev,
                                duration: numValue,
                              }));
                              // Only update end time if value is within valid range
                              if (numValue >= 15 && numValue <= 480 && draftSlot) {
                                const newEndTime = new Date(
                                    draftSlot.start.getTime() + numValue * 60 * 1000
                                );
                                setDraftSlot({ ...draftSlot, end: newEndTime });
                              }
                            }
                          }}
                          onBlur={(e) => {
                            // Validate and clamp value on blur (loses focus)
                            const value =
                                e.target.value === "" ? 0 : parseInt(e.target.value);

                            // If value < 15 or invalid -> revert to default duration
                            if (isNaN(value) || value < 15) {
                              const defaultDuration =
                                  serviceCatalogFromDB.find(
                                      (svc) => svc.name === formData.service
                                  )?.duration || 60;
                              const clampedDuration = Math.max(15, defaultDuration);
                              setFormData((prev) => ({
                                ...prev,
                                duration: clampedDuration,
                              }));
                              if (draftSlot) {
                                const newEndTime = new Date(
                                    draftSlot.start.getTime() +
                                    clampedDuration * 60 * 1000
                                );
                                setDraftSlot({ ...draftSlot, end: newEndTime });
                              }
                            }
                            // If value > 480 -> clamp to 480
                            else if (value > 480) {
                              const clampedDuration = 480;
                              setFormData((prev) => ({
                                ...prev,
                                duration: clampedDuration,
                              }));
                              if (draftSlot) {
                                const newEndTime = new Date(
                                    draftSlot.start.getTime() +
                                    clampedDuration * 60 * 1000
                                );
                                setDraftSlot({ ...draftSlot, end: newEndTime });
                              }
                            }
                            // Valid value -> ensure >= 15
                            else {
                              const validDuration = Math.max(15, value);
                              setFormData((prev) => ({
                                ...prev,
                                duration: validDuration,
                              }));
                              if (draftSlot) {
                                const newEndTime = new Date(
                                    draftSlot.start.getTime() +
                                    validDuration * 60 * 1000
                                );
                                setDraftSlot({ ...draftSlot, end: newEndTime });
                              }
                            }
                          }}
                          className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-800 focus:border-slate-400 focus:outline-none"
                      />
                      {/* Hint text displaying default duration of service */}
                      <p className="text-xs text-slate-400">
                        Default:{" "}
                        {serviceCatalogFromDB.find((svc) => svc.name === formData.service)
                            ?.duration ?? 60}{" "}
                        mins
                      </p>
                    </div>

                    {/* Submit button */}
                    <button
                        type="submit"
                        className="mt-2 w-full rounded-xl bg-slate-900 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/20 transition hover:bg-slate-800"
                    >
                      {editingAppointmentId ? "Update Appointment" : "Confirm Booking"}
                    </button>
                  </form>
                </motion.div>
              </div>
          )}
        </AnimatePresence>
      </div>
  );
}
// ===== END OF COMPONENT =====