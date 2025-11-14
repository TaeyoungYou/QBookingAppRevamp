import { Menu, Search, UserPlus } from "lucide-react";
import { motion } from "framer-motion";
import { useDashboardLayout } from "./DashboardLayout";

const customers = [
  {
    name: "Emma Wilson",
    email: "emma.w@email.com",
    phone: "+1 234 567 8900",
    totalBookings: 12,
    lastVisit: "Nov 10, 2025",
    status: "VIP",
  },
  {
    name: "Michael Chen",
    email: "m.chen@email.com",
    phone: "+1 234 567 8901",
    totalBookings: 8,
    lastVisit: "Nov 8, 2025",
    status: "Regular",
  },
  {
    name: "Sarah Johnson",
    email: "sarah.j@email.com",
    phone: "+1 234 567 8902",
    totalBookings: 15,
    lastVisit: "Nov 12, 2025",
    status: "VIP",
  },
  {
    name: "James Anderson",
    email: "j.anderson@email.com",
    phone: "+1 234 567 8903",
    totalBookings: 5,
    lastVisit: "Nov 5, 2025",
    status: "Regular",
  },
];

export default function CustomersPage() {
  const { isSidebarOpen, setIsSidebarOpen } = useDashboardLayout();
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex-1 flex flex-col min-h-0 overflow-hidden bg-linear-to-br from-[#f0f8fb] via-[#fef9f3] to-[#f5f5f0]">
      <header className="bg-white/90 backdrop-blur-xl border-b border-skyBlue h-16 flex items-center justify-between px-6 shrink-0 shadow-sm">
        <div className="flex items-center gap-4">
          <button
            onClick={toggleSidebar}
            className="p-2 hover:bg-[#f0f8fb] rounded-xl transition-colors"
            title="Toggle Sidebar"
          >
            <Menu size={24} className="text-prussianBlue" />
          </button>
          <div>
            <h1 className="text-xl font-bold bg-linear-to-r from-blueGreen to-skyBlue bg-clip-text text-transparent">
              Customer Management
            </h1>
            <p className="text-sm text-prussianBlue/70">
              View and manage your customer database.
            </p>
          </div>
        </div>
        <button className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-linear-to-r from-blueGreen to-skyBlue text-white font-semibold shadow-lg shadow-blueGreen/30 hover:shadow-xl hover:shadow-blueGreen/40 transition-all">
          <UserPlus size={18} strokeWidth={2.5} />
          Add Customer
        </button>
      </header>

      <main className="flex-1 overflow-y-auto px-6 py-6">
        <div className="mb-6">
          <div className="relative">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-prussianBlue/60"
              size={20}
            />
            <input
              type="text"
              placeholder="Search customers by name, email, or phone..."
              className="w-full pl-12 pr-4 py-3 bg-white border border-skyBlue rounded-xl text-prussianBlue placeholder-prussianBlue/50 focus:outline-none focus:border-blueGreen focus:ring-2 focus:ring-blueGreen/20 transition-all"
            />
          </div>
        </div>

        <div className="bg-white backdrop-blur-sm border border-skyBlue rounded-2xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-[#f0f8fb] border-b border-skyBlue">
                  <th className="text-left px-6 py-4 text-xs font-bold text-prussianBlue uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-bold text-prussianBlue uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-bold text-prussianBlue uppercase tracking-wider">
                    Total Bookings
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-bold text-prussianBlue uppercase tracking-wider">
                    Last Visit
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-bold text-prussianBlue uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-skyBlue/30">
                {customers.map((customer, index) => (
                  <motion.tr
                    key={customer.email}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-[#f0f8fb] transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-linear-to-br from-blueGreen to-skyBlue flex items-center justify-center text-white font-bold text-sm shadow-lg">
                          {customer.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-prussianBlue">
                            {customer.name}
                          </p>
                          <p className="text-xs text-prussianBlue/60">
                            {customer.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-prussianBlue/80">
                        {customer.phone}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-semibold text-prussianBlue">
                        {customer.totalBookings}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-prussianBlue/80">
                        {customer.lastVisit}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex px-3 py-1 rounded-full text-xs font-bold ${
                          customer.status === "VIP"
                            ? "bg-selectiveYellow/20 text-utOrange border border-selectiveYellow"
                            : "bg-skyBlue/20 text-blueGreen border border-skyBlue"
                        }`}
                      >
                        {customer.status}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
