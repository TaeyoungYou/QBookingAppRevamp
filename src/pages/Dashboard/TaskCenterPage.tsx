import { Menu, Phone, Mail, UserPlus } from "lucide-react";
import { motion } from "motion/react";
import { useDashboardLayout } from "./DashboardLayout";

const followUps = [
  {
    type: "call",
    customer: "Alice Johnson",
    reason: "Missed appointment last week",
    dueDate: "Today",
    priority: "High",
  },
  {
    type: "email",
    customer: "Robert Smith",
    reason: "Follow up on service feedback",
    dueDate: "Tomorrow",
    priority: "Medium",
  },
  {
    type: "call",
    customer: "Emily Davis",
    reason: "Birthday discount offer",
    dueDate: "Nov 15",
    priority: "Low",
  },
];

const waitlist = [
  {
    name: "Michael Brown",
    service: "Deep Tissue Massage",
    preferredDate: "Nov 14, 2025",
    contact: "+1 234 567 8910",
  },
  {
    name: "Sophia Martinez",
    service: "Hair Coloring",
    preferredDate: "Nov 15, 2025",
    contact: "+1 234 567 8911",
  },
];

export default function TaskCenterPage() {
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
              Task Center & Waitlist
            </h1>
            <p className="text-sm text-[#023047]/70">
              Manage follow-ups and waitlisted customers.
            </p>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-[#023047]">Follow-ups</h2>
            <button className="text-sm font-semibold text-[#219ebc] hover:text-[#8ecae6] transition-colors">
              Mark all complete
            </button>
          </div>
          <div className="space-y-3">
            {followUps.map((task, index) => (
              <motion.div
                key={`${task.customer}-${index}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white backdrop-blur-sm border border-[#8ecae6] rounded-2xl p-5 flex items-center gap-4 hover:bg-[#f0f8fb] transition-all shadow-lg"
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    task.type === "call"
                      ? "bg-[#219ebc]/20 border border-[#219ebc] text-[#219ebc]"
                      : "bg-[#8ecae6]/20 border border-[#8ecae6] text-[#219ebc]"
                  }`}
                >
                  {task.type === "call" ? (
                    <Phone size={20} strokeWidth={2.5} />
                  ) : (
                    <Mail size={20} strokeWidth={2.5} />
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-[#023047]">
                    {task.customer}
                  </p>
                  <p className="text-sm text-[#023047]/80">{task.reason}</p>
                  <p className="text-xs text-[#023047]/60 mt-1">Due: {task.dueDate}</p>
                </div>
                <span
                  className={`text-xs font-bold px-3 py-1 rounded-full ${
                    task.priority === "High"
                      ? "bg-[#fb8500]/20 text-[#fb8500] border border-[#ffb703]"
                      : task.priority === "Medium"
                      ? "bg-[#ffb703]/20 text-[#fb8500] border border-[#ffb703]"
                      : "bg-[#8ecae6]/20 text-[#219ebc] border border-[#8ecae6]"
                  }`}
                >
                  {task.priority}
                </span>
              </motion.div>
            ))}
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-[#023047]">Waitlist</h2>
            <button className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#219ebc] to-[#8ecae6] text-white font-semibold shadow-lg shadow-[#219ebc]/30 hover:shadow-xl hover:shadow-[#219ebc]/40 transition-all text-sm">
              <UserPlus size={16} strokeWidth={2.5} />
              Add to Waitlist
            </button>
          </div>
          <div className="space-y-3">
            {waitlist.map((item, index) => (
              <motion.div
                key={`${item.name}-${index}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.05 }}
                className="bg-white backdrop-blur-sm border border-[#8ecae6] rounded-2xl p-5 flex items-center justify-between hover:bg-[#f0f8fb] transition-all shadow-lg"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#f6dfc5]/50 border border-[#ffb703] flex items-center justify-center text-[#fb8500] font-bold text-sm">
                    {item.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#023047]">{item.name}</p>
                    <p className="text-sm text-[#023047]/80">{item.service}</p>
                    <p className="text-xs text-[#023047]/60 mt-1">
                      Preferred: {item.preferredDate}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-[#023047]/60 mb-2">Contact</p>
                  <p className="text-sm font-semibold text-[#023047]/80">
                    {item.contact}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

