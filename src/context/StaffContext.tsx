import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type StaffStatus = "active" | "invited" | "inactive";

export interface StaffMember {
  id: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  avatar?: string;
  accentColor: string;
  status: StaffStatus;
  notes?: string;
  instagram?: string;
  availability?: string;
}

const palette = ["#8ecae6", "#f4a261", "#90be6d", "#cdb4db", "#ffb703"];

const initialStaffDirectory: StaffMember[] = [
  {
    id: "mary",
    name: "Mary Collins",
    role: "Lead Nail Artist",
    email: "mary@polishpro.com",
    phone: "(555) 201-8842",
    accentColor: palette[0],
    status: "active",
    availability: "Full-time",
    instagram: "@mary.polishpro",
  },
  {
    id: "grace",
    name: "Grace Nguyen",
    role: "Gel Specialist",
    email: "grace@polishpro.com",
    phone: "(555) 309-1125",
    accentColor: palette[1],
    status: "active",
    availability: "Full-time",
  },
  {
    id: "lena",
    name: "Lena Howard",
    role: "Spa Pedicurist",
    email: "lena@polishpro.com",
    phone: "(555) 674-9302",
    accentColor: palette[2],
    status: "active",
    availability: "Weekends only",
  },
  {
    id: "ivy",
    name: "Ivy Chen",
    role: "Acrylic Artist",
    email: "ivy@polishpro.com",
    phone: "(555) 882-4410",
    accentColor: palette[3],
    status: "invited",
    availability: "Part-time",
  },
];

interface StaffContextValue {
  staff: StaffMember[];
  addStaff: (
    payload: Omit<StaffMember, "id" | "accentColor" | "status">
  ) => void;
  updateStaff: (id: string, patch: Partial<StaffMember>) => void;
  removeStaff: (id: string) => void;
  activateStaff: (id: string) => void;
}

const StaffContext = createContext<StaffContextValue | null>(null);

export function StaffProvider({ children }: { children: ReactNode }) {
  const [staff, setStaff] = useState<StaffMember[]>(() => {
    const stored = localStorage.getItem("salon-staff");
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return initialStaffDirectory;
      }
    }
    return initialStaffDirectory;
  });

  useEffect(() => {
    localStorage.setItem("salon-staff", JSON.stringify(staff));
  }, [staff]);

  const addStaff: StaffContextValue["addStaff"] = (payload) => {
    setStaff((prev) => [
      ...prev,
      {
        ...payload,
        id: crypto.randomUUID(),
        accentColor: palette[prev.length % palette.length],
        status: "invited",
        availability: payload.availability ?? "Full-time",
      },
    ]);
  };

  const updateStaff: StaffContextValue["updateStaff"] = (id, patch) => {
    setStaff((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...patch } : item))
    );
  };

  const removeStaff = (id: string) => {
    setStaff((prev) => prev.filter((item) => item.id !== id));
  };

  const activateStaff = (id: string) => {
    updateStaff(id, { status: "active" });
  };

  const value = useMemo(
    () => ({
      staff,
      addStaff,
      updateStaff,
      removeStaff,
      activateStaff,
    }),
    [staff]
  );

  return (
    <StaffContext.Provider value={value}>{children}</StaffContext.Provider>
  );
}

export const useStaffDirectory = () => {
  const context = useContext(StaffContext);
  if (!context) {
    throw new Error("useStaffDirectory must be used within a StaffProvider");
  }
  return context;
};
