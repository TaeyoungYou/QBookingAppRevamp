import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

export type BookingStatus = "pending" | "confirmed" | "cancelled" | "completed";

export interface BookingEvent {
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
  customerEmail?: string; // Optional email from landing page booking
}

interface AppointmentsContextValue {
  appointments: BookingEvent[];
  addAppointment: (appointment: BookingEvent) => void;
  updateAppointment: (id: string, updates: Partial<BookingEvent>) => void;
  deleteAppointment: (id: string) => void;
}

const AppointmentsContext = createContext<AppointmentsContextValue | null>(
  null
);

// Initial mock data
const initialAppointments: BookingEvent[] = [
  {
    id: "evt-1",
    title: "Blow Dry",
    service: "Blow Dry",
    staffId: "mary",
    location: "Polish Pro Studio",
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
    location: "Polish Pro Studio",
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
    location: "Polish Pro Studio",
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
    location: "Polish Pro Studio",
    start: new Date(2025, 10, 13, 11, 0),
    end: new Date(2025, 10, 13, 12, 0),
    status: "confirmed",
    customer: { name: "Beverly Brown", phone: "010-222-3334" },
    resourceId: "mary",
  },
  {
    id: "evt-5",
    title: "Blow Dry",
    service: "Blow Dry",
    staffId: "mary",
    location: "Polish Pro Studio",
    start: new Date(2025, 10, 20, 14, 0),
    end: new Date(2025, 10, 20, 15, 0),
    status: "completed",
    customer: { name: "Brenda Massey", phone: "012-345-6789" },
    resourceId: "mary",
  },
  {
    id: "evt-6",
    title: "Manicure & Pedicure",
    service: "Manicure & Pedicure",
    staffId: "john",
    location: "Polish Pro Studio",
    start: new Date(2025, 10, 15, 10, 0),
    end: new Date(2025, 10, 15, 11, 0),
    status: "completed",
    customer: { name: "Sarah Johnson", phone: "011-555-1234" },
    resourceId: "john",
  },
  {
    id: "evt-7",
    title: "Hair Colouring",
    service: "Hair Colouring",
    staffId: "mary",
    location: "Polish Pro Studio",
    start: new Date(2025, 11, 5, 14, 0),
    end: new Date(2025, 11, 5, 16, 0),
    status: "confirmed",
    customer: {
      name: "Emma Wilson",
      phone: "+1 234 567 8900",
    },
    resourceId: "mary",
    customerEmail: "emma.w@email.com", // Email from landing page booking
  },
];

export function AppointmentsProvider({ children }: { children: ReactNode }) {
  const [appointments, setAppointments] = useState<BookingEvent[]>(() => {
    const stored = localStorage.getItem("salon-appointments");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        // Convert date strings back to Date objects
        return parsed.map((apt: any) => ({
          ...apt,
          start: new Date(apt.start),
          end: new Date(apt.end),
        }));
      } catch {
        return initialAppointments;
      }
    }
    return initialAppointments;
  });

  useEffect(() => {
    localStorage.setItem("salon-appointments", JSON.stringify(appointments));
  }, [appointments]);

  const addAppointment = (appointment: BookingEvent) => {
    setAppointments((prev) => [...prev, appointment]);
  };

  const updateAppointment = (id: string, updates: Partial<BookingEvent>) => {
    setAppointments((prev) =>
      prev.map((apt) => (apt.id === id ? { ...apt, ...updates } : apt))
    );
  };

  const deleteAppointment = (id: string) => {
    setAppointments((prev) => prev.filter((apt) => apt.id !== id));
  };

  const value: AppointmentsContextValue = {
    appointments,
    addAppointment,
    updateAppointment,
    deleteAppointment,
  };

  return (
    <AppointmentsContext.Provider value={value}>
      {children}
    </AppointmentsContext.Provider>
  );
}

export const useAppointments = () => {
  const context = useContext(AppointmentsContext);
  if (!context) {
    throw new Error("useAppointments must be used within AppointmentsProvider");
  }
  return context;
};
