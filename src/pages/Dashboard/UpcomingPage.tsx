import { Menu, CalendarClock } from "lucide-react";
import { motion } from "motion/react";
import { useDashboardLayout } from "./DashboardLayout";

const upcoming = [
  {
    date: "Thursday, Nov 13",
    time: "09:00 AM",
    service: "Advanced Facial Treatment",
    customer: "Isabella Carter",
    staff: "Sophia Tan",
    status: "Confirmed",
  },
  {
    date: "Thursday, Nov 13",
    time: "11:30 AM",
    customer: "Nathan Brown",
    service: "Signature Hair Styling",
    staff: "Ethan Wong",
    status: "Pending",
  },
  {
    date: "Thursday, Nov 13",
    time: "02:00 PM",
    customer: "Lucas Johnson",
    service: "Strength Training",
    staff: "Mason Lee",
    status: "Confirmed",
  },
  {
    date: "Friday, Nov 14",
    time: "10:00 AM",
    customer: "Ava Thompson",
    service: "Deep Tissue Massage",
    staff: "Mia Davis",
    status: "Confirmed",
  },
];

export default function UpcomingPage() {
  const { isSidebarOpen, setIsSidebarOpen } = useDashboardLayout();
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex-1 flex flex-col min-h-0 overflow-hidden bg-linear-to-br from-slate-950 via-slate-900 to-slate-950">
      <header className="bg-slate-900/80 backdrop-blur-xl border-b border-slate-700/50 h-16 flex items-center justify-between px-6 shrink-0 shadow-lg">
        <div className="flex items-center gap-4">
          <button
            onClick={toggleSidebar}
            className="p-2 hover:bg-slate-800 rounded-xl transition-colors"
            title="Toggle Sidebar"
          >
            <Menu size={24} className="text-slate-300" />
          </button>
          <div>
            <h1 className="text-xl font-bold bg-linear-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
              Upcoming Schedule
            </h1>
            <p className="text-sm text-slate-400">
              Review what's on the books for the next few days.
            </p>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto px-6 py-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl shadow-xl px-6 py-5 mb-6 flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <span className="w-12 h-12 rounded-xl bg-violet-500/20 border border-violet-500/30 flex items-center justify-center text-violet-400">
              <CalendarClock size={22} />
            </span>
            <div>
              <p className="text-sm font-bold text-white">
                Next available slot
              </p>
              <p className="text-sm text-slate-400">Today at 4:30 PM</p>
            </div>
          </div>
          <button className="text-sm font-semibold text-violet-400 hover:text-violet-300 transition-colors">
            Manage availability
          </button>
        </motion.div>

        <section className="space-y-4">
          {upcoming.map((booking, index) => (
            <motion.div
              key={`${booking.date}-${booking.time}-${booking.customer}`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl shadow-xl p-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between hover:bg-slate-800/70 transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-violet-500/20 border border-violet-500/30 flex flex-col items-center justify-center text-violet-300 font-bold">
                  <span className="text-xs uppercase tracking-wide text-slate-400">
                    {booking.time.split(" ")[1]}
                  </span>
                  <span className="text-base">
                    {booking.time.split(" ")[0]}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-bold text-white">
                    {booking.service}
                  </p>
                  <p className="text-sm text-slate-300">{booking.customer}</p>
                  <p className="text-xs text-slate-500 mt-1">
                    Assigned to{" "}
                    <span className="text-slate-400 font-medium">
                      {booking.staff}
                    </span>
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 justify-between sm:justify-end w-full sm:w-auto">
                <div className="text-sm text-slate-400">{booking.date}</div>
                <span
                  className={`text-xs font-bold px-3 py-1 rounded-full ${
                    booking.status === "Confirmed"
                      ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                      : "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                  }`}
                >
                  {booking.status}
                </span>
              </div>
            </motion.div>
          ))}
        </section>
      </main>
    </div>
  );
}
