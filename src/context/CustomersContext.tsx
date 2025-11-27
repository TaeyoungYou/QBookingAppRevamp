import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { useAppointments } from "./AppointmentsContext";

export interface Customer {
  id: string;
  name: string;
  email?: string;
  phone: string;
  totalBookings: number;
  lastVisit: Date;
  firstVisit: Date;
  status: "VIP" | "Regular" | "New";
}

interface CustomersContextValue {
  customers: Customer[];
  addCustomer: (name: string, phone: string, email?: string) => void;
  getCustomerByPhone: (phone: string) => Customer | undefined;
}

const CustomersContext = createContext<CustomersContextValue | null>(null);

export function CustomersProvider({ children }: { children: ReactNode }) {
  const { appointments } = useAppointments();
  const [customers, setCustomers] = useState<Customer[]>(() => {
    const stored = localStorage.getItem("salon-customers");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        return parsed.map((c: any) => ({
          ...c,
          lastVisit: new Date(c.lastVisit),
          firstVisit: new Date(c.firstVisit),
        }));
      } catch {
        return [];
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem("salon-customers", JSON.stringify(customers));
  }, [customers]);

  // Sync customers from appointments
  useEffect(() => {
    const customerMap = new Map<string, Customer>();

    // First, load existing customers from storage
    const storedCustomers = (() => {
      const stored = localStorage.getItem("salon-customers");
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          return parsed.map((c: any) => ({
            ...c,
            lastVisit: new Date(c.lastVisit),
            firstVisit: new Date(c.firstVisit),
          }));
        } catch {
          return [];
        }
      }
      return [];
    })();

    // Process appointments to build customer map
    appointments.forEach((apt) => {
      const phone = apt.customer.phone;
      const existing = customerMap.get(phone);

      if (existing) {
        existing.totalBookings += 1;
        if (apt.start > existing.lastVisit) {
          existing.lastVisit = apt.start;
        }
        if (apt.start < existing.firstVisit) {
          existing.firstVisit = apt.start;
        }
      } else {
        // Check if customer already exists in stored customers
        const storedCustomer = storedCustomers.find(
          (c: Customer) => c.phone === phone
        );
        if (storedCustomer) {
          customerMap.set(phone, {
            ...storedCustomer,
            totalBookings: storedCustomer.totalBookings + 1,
            lastVisit:
              apt.start > storedCustomer.lastVisit
                ? apt.start
                : storedCustomer.lastVisit,
            firstVisit:
              apt.start < storedCustomer.firstVisit
                ? apt.start
                : storedCustomer.firstVisit,
          });
        } else {
          // New customer from appointment
          // Check if appointment has email (from landing page booking)
          const appointmentEmail = (apt as any).customerEmail;
          customerMap.set(phone, {
            id: crypto.randomUUID(),
            name: apt.customer.name,
            phone: phone,
            email: appointmentEmail || undefined,
            totalBookings: 1,
            lastVisit: apt.start,
            firstVisit: apt.start,
            status: "New",
          });
        }
      }
    });

    // Merge with existing customers that don't have appointments
    storedCustomers.forEach((customer: Customer) => {
      if (!customerMap.has(customer.phone)) {
        customerMap.set(customer.phone, customer);
      }
    });

    const updatedCustomers = Array.from(customerMap.values()).map(
      (customer) => {
        // Update status based on total bookings
        let status: "VIP" | "Regular" | "New" = customer.status;
        if (customer.totalBookings >= 10) {
          status = "VIP";
        } else if (customer.totalBookings > 1) {
          status = "Regular";
        } else {
          status = "New";
        }

        return {
          ...customer,
          status,
        };
      }
    );

    setCustomers(updatedCustomers);
  }, [appointments]);

  const addCustomer = (name: string, phone: string, email?: string) => {
    // Check if customer already exists
    const exists = customers.find(
      (c) => c.phone === phone || (email && c.email === email)
    );
    if (exists) {
      return; // Don't add duplicate
    }

    const newCustomer: Customer = {
      id: crypto.randomUUID(),
      name,
      phone,
      email,
      totalBookings: 0,
      lastVisit: new Date(),
      firstVisit: new Date(),
      status: "New",
    };

    setCustomers((prev) => [...prev, newCustomer]);
  };

  const getCustomerByPhone = (phone: string) => {
    return customers.find((c) => c.phone === phone);
  };

  const value: CustomersContextValue = {
    customers,
    addCustomer,
    getCustomerByPhone,
  };

  return (
    <CustomersContext.Provider value={value}>
      {children}
    </CustomersContext.Provider>
  );
}

export const useCustomers = () => {
  const context = useContext(CustomersContext);
  if (!context) {
    throw new Error("useCustomers must be used within CustomersProvider");
  }
  return context;
};
