import { Menu, Save } from "lucide-react";
import { motion } from "motion/react";
import { useDashboardLayout } from "./DashboardLayout";

export default function SettingsPage() {
  const { isSidebarOpen, setIsSidebarOpen } = useDashboardLayout();
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex-1 flex flex-col min-h-0 overflow-hidden bg-gradient-to-br from-[#f0f8fb] via-[#fef9f3] to-[#f5f5f0]">
      <header className="bg-white/90 backdrop-blur-xl border-b border-[#8ecae6] h-16 flex items-center justify-between px-6 shrink-0 shadow-sm">
        <div className="flex items-center gap-4">
          <button
            onClick={toggleSidebar}
            className="p-2 hover:bg-[#f0f8fb] rounded-xl transition-colors"
            title="Toggle Sidebar"
          >
            <Menu size={24} className="text-[#023047]" />
          </button>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-[#219ebc] to-[#8ecae6] bg-clip-text text-transparent">
              Settings
            </h1>
            <p className="text-sm text-[#023047]/70">
              Manage your account and preferences.
            </p>
          </div>
        </div>
        <button className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#219ebc] to-[#8ecae6] text-white font-semibold shadow-lg shadow-[#219ebc]/30 hover:shadow-xl hover:shadow-[#219ebc]/40 transition-all">
          <Save size={18} strokeWidth={2.5} />
          Save Changes
        </button>
      </header>

      <main className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white backdrop-blur-sm border border-[#8ecae6] rounded-2xl shadow-lg overflow-hidden"
        >
          <div className="px-6 py-5 border-b border-[#8ecae6] bg-[#f0f8fb]">
            <h2 className="text-lg font-bold text-[#023047]">
              Business Information
            </h2>
            <p className="text-sm text-[#023047]/70">
              Update your business details and contact info.
            </p>
          </div>
          <div className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-bold text-[#023047] mb-2">
                Business Name
              </label>
              <input
                type="text"
                placeholder="Your Business Name"
                className="w-full px-4 py-3 bg-white border border-[#8ecae6] rounded-xl text-[#023047] placeholder-[#023047]/50 focus:outline-none focus:border-[#219ebc] focus:ring-2 focus:ring-[#219ebc]/20 transition-all"
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-bold text-[#023047] mb-2">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="business@example.com"
                  className="w-full px-4 py-3 bg-white border border-[#8ecae6] rounded-xl text-[#023047] placeholder-[#023047]/50 focus:outline-none focus:border-[#219ebc] focus:ring-2 focus:ring-[#219ebc]/20 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-[#023047] mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  placeholder="+1 234 567 8900"
                  className="w-full px-4 py-3 bg-white border border-[#8ecae6] rounded-xl text-[#023047] placeholder-[#023047]/50 focus:outline-none focus:border-[#219ebc] focus:ring-2 focus:ring-[#219ebc]/20 transition-all"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-[#023047] mb-2">
                Address
              </label>
              <input
                type="text"
                placeholder="123 Main St, City, State 12345"
                className="w-full px-4 py-3 bg-white border border-[#8ecae6] rounded-xl text-[#023047] placeholder-[#023047]/50 focus:outline-none focus:border-[#219ebc] focus:ring-2 focus:ring-[#219ebc]/20 transition-all"
              />
            </div>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white backdrop-blur-sm border border-[#8ecae6] rounded-2xl shadow-lg overflow-hidden"
        >
          <div className="px-6 py-5 border-b border-[#8ecae6] bg-[#f0f8fb]">
            <h2 className="text-lg font-bold text-[#023047]">
              Booking Preferences
            </h2>
            <p className="text-sm text-[#023047]/70">
              Configure how bookings work for your business.
            </p>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-[#023047]">
                  Auto-confirm bookings
                </p>
                <p className="text-xs text-[#023047]/60">
                  Automatically confirm appointments without manual approval
                </p>
              </div>
              <button className="relative inline-flex h-7 w-12 items-center rounded-full bg-[#219ebc] shadow-lg shadow-[#219ebc]/30">
                <span className="inline-block h-5 w-5 transform translate-x-6 rounded-full bg-white transition" />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-[#023047]">
                  Send reminders
                </p>
                <p className="text-xs text-[#023047]/60">
                  Email customers 24 hours before their appointment
                </p>
              </div>
              <button className="relative inline-flex h-7 w-12 items-center rounded-full bg-[#219ebc] shadow-lg shadow-[#219ebc]/30">
                <span className="inline-block h-5 w-5 transform translate-x-6 rounded-full bg-white transition" />
              </button>
            </div>
            <div>
              <label className="block text-sm font-bold text-[#023047] mb-2">
                Cancellation Policy
              </label>
              <select className="w-full px-4 py-3 bg-white border border-[#8ecae6] rounded-xl text-[#023047] focus:outline-none focus:border-[#219ebc] focus:ring-2 focus:ring-[#219ebc]/20 transition-all">
                <option>24 hours notice required</option>
                <option>48 hours notice required</option>
                <option>No cancellation allowed</option>
              </select>
            </div>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white backdrop-blur-sm border border-[#8ecae6] rounded-2xl shadow-lg overflow-hidden"
        >
          <div className="px-6 py-5 border-b border-[#8ecae6] bg-[#f0f8fb]">
            <h2 className="text-lg font-bold text-[#023047]">Notifications</h2>
            <p className="text-sm text-[#023047]/70">
              Choose what alerts you want to receive.
            </p>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-gray-700">
                  New booking alerts
                </p>
                <p className="text-xs text-gray-500">
                  Get notified when a new appointment is booked
                </p>
              </div>
              <button className="relative inline-flex h-7 w-12 items-center rounded-full bg-violet-600 shadow-lg shadow-violet-500/30">
                <span className="inline-block h-5 w-5 transform translate-x-6 rounded-full bg-white transition" />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-gray-700">
                  Cancellation alerts
                </p>
                <p className="text-xs text-gray-500">
                  Get notified when an appointment is cancelled
                </p>
              </div>
              <button className="relative inline-flex h-7 w-12 items-center rounded-full bg-violet-600 shadow-lg shadow-violet-500/30">
                <span className="inline-block h-5 w-5 transform translate-x-6 rounded-full bg-white transition" />
              </button>
            </div>
          </div>
        </motion.section>
      </main>
    </div>
  );
}
