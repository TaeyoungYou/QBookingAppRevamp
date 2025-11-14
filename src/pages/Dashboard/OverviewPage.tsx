import { Menu, ArrowUpRight, Users, CalendarCheck2, Clock } from "lucide-react";
import { motion } from "motion/react";
import { useDashboardLayout } from "./DashboardLayout";

const statCards = [
  {
    title: "Total Bookings",
    value: "128",
    trend: "+12% vs last week",
    icon: CalendarCheck2,
    gradient: "from-violet-500 to-purple-600",
    bgGradient: "from-violet-50 to-purple-50",
    shadow: "shadow-violet-200/50",
  },
  {
    title: "Returning Clients",
    value: "64",
    trend: "+8% retention rate",
    icon: Users,
    gradient: "from-emerald-500 to-teal-600",
    bgGradient: "from-emerald-50 to-teal-50",
    shadow: "shadow-emerald-200/50",
  },
  {
    title: "Today's Appointments",
    value: "12",
    trend: "8 confirmed, 4 pending",
    icon: Clock,
    gradient: "from-amber-500 to-orange-600",
    bgGradient: "from-amber-50 to-orange-50",
    shadow: "shadow-amber-200/50",
  },
];

const upcomingBookings = [
  {
    time: "09:00 AM",
    customer: "Emma Wilson",
    service: "Facial Treatment",
    staff: "Sophia Tan",
    status: "Confirmed",
  },
  {
    time: "11:30 AM",
    customer: "Ethan Miller",
    service: "Classic Haircut",
    staff: "Liam Chen",
    status: "Pending",
  },
  {
    time: "02:00 PM",
    customer: "Chloe Anderson",
    service: "Personal Training",
    staff: "Mason Lee",
    status: "Confirmed",
  },
];

const insights = [
  {
    label: "Weekly Capacity",
    value: "72%",
    progress: "72%",
  },
  {
    label: "Customer Satisfaction",
    value: "4.8 / 5",
    progress: "88%",
  },
  {
    label: "New Leads Converted",
    value: "41%",
    progress: "41%",
  },
];

export default function OverviewPage() {
  const { isSidebarOpen, setIsSidebarOpen } = useDashboardLayout();
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
      <header className="bg-white/90 backdrop-blur-xl border-b border-skyBlue h-16 flex items-center justify-between px-6 shrink-0 shadow-sm">
        <div className="flex items-center gap-4">
          <button
            onClick={toggleSidebar}
            className="p-2 hover:bg-[#f0f8fb] rounded-xl transition-all hover:shadow-sm"
            title="Toggle Sidebar"
          >
            <Menu size={24} className="text-prussianBlue" />
          </button>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blueGreen to-skyBlue bg-clip-text text-transparent">
              Welcome back, Admin 👋
            </h1>
            <p className="text-sm text-prussianBlue/70">
              Here's a quick glance at today's schedule and performance.
            </p>
          </div>
        </div>
        <button className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-linear-to-r from-blueGreen to-skyBlue text-white font-semibold shadow-lg shadow-blueGreen/30 hover:shadow-xl hover:shadow-blueGreen/40 transition-all hover:-translate-y-0.5">
          Create booking
          <ArrowUpRight size={18} />
        </button>
      </header>

      <main className="flex-1 overflow-y-auto px-6 py-6 space-y-6 bg-linear-to-br from-[#f0f8fb] via-[#fef9f3] to-[#f5f5f0]">
        <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {statCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * index }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className={`relative overflow-hidden bg-white backdrop-blur-sm rounded-2xl p-6 shadow-lg ${card.shadow} border border-skyBlue hover:border-blueGreen hover:shadow-xl transition-all`}
              >
                <div
                  className={`absolute top-0 right-0 w-40 h-40 bg-linear-to-br ${card.bgGradient} rounded-full blur-3xl opacity-30 -mr-20 -mt-20`}
                ></div>
                <div className="relative z-10">
                  <div
                    className={`w-14 h-14 rounded-2xl bg-linear-to-br ${card.gradient} flex items-center justify-center text-white mb-4 shadow-lg shadow-violet-500/20`}
                  >
                    <Icon size={24} strokeWidth={2.5} />
                  </div>
                  <h3 className="text-xs font-bold text-prussianBlue/60 uppercase tracking-wider mb-1">
                    {card.title}
                  </h3>
                  <p className="text-4xl font-bold text-prussianBlue mt-2">
                    {card.value}
                  </p>
                  <p
                    className={`text-sm font-semibold mt-3 bg-linear-to-r ${card.gradient} bg-clip-text text-transparent`}
                  >
                    {card.trend}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </section>

        <section className="grid gap-6 xl:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white backdrop-blur-sm rounded-3xl shadow-lg border border-skyBlue xl:col-span-2 overflow-hidden"
          >
            <div className="flex items-center justify-between px-6 py-5 border-b border-skyBlue bg-[#f0f8fb]">
              <div>
                <h2 className="text-lg font-bold text-prussianBlue">
                  Upcoming appointments
                </h2>
                <p className="text-sm text-prussianBlue/70">
                  Stay ahead with a quick view of the next sessions.
                </p>
              </div>
              <button className="text-sm font-semibold text-blueGreen hover:text-skyBlue transition-colors">
                View calendar
              </button>
            </div>
            <ul className="divide-y divide-skyBlue/30">
              {upcomingBookings.map((booking, idx) => (
                <motion.li
                  key={booking.customer}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + idx * 0.1 }}
                  className="px-6 py-5 flex items-center gap-4 hover:bg-[#f0f8fb] transition-colors"
                >
                  <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-skyBlue/30 to-blueGreen/20 border border-blueGreen flex items-center justify-center text-blueGreen font-bold shadow-sm">
                    {booking.time.split(" ")[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-[#023047] truncate">
                      {booking.customer}
                    </p>
                    <p className="text-sm text-prussianBlue/80">
                      {booking.service}
                    </p>
                    <p className="text-xs text-prussianBlue/60 mt-1">
                      Staff:{" "}
                      <span className="text-prussianBlue font-medium">
                        {booking.staff}
                      </span>
                    </p>
                  </div>
                  <span
                    className={`text-xs font-bold px-3 py-1.5 rounded-full ${
                      booking.status === "Confirmed"
                        ? "bg-linear-to-r from-blueGreen/20 to-skyBlue/20 text-blueGreen border border-blueGreen"
                        : "bg-linear-to-r from-selectiveYellow/20 to-utOrange/20 text-utOrange border border-selectiveYellow"
                    }`}
                  >
                    {booking.status}
                  </span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="bg-white backdrop-blur-sm rounded-3xl shadow-lg border border-skyBlue p-6 flex flex-col gap-5"
          >
            <div>
              <h2 className="text-lg font-bold text-prussianBlue">
                Business insights
              </h2>
              <p className="text-sm text-prussianBlue/70">
                Track how your business is performing this week.
              </p>
            </div>
            <div className="space-y-5">
              {insights.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.35 + index * 0.1 }}
                >
                  <div className="flex justify-between text-sm font-bold text-[#023047] mb-2">
                    <span>{item.label}</span>
                    <span className="text-blueGreen">{item.value}</span>
                  </div>
                  <div className="h-3 rounded-full bg-[#f0f8fb] overflow-hidden shadow-inner border border-skyBlue">
                    <motion.div
                      className="h-full bg-linear-to-r from-blueGreen via-skyBlue to-blueGreen rounded-full shadow-lg shadow-blueGreen/30"
                      initial={{ width: 0 }}
                      animate={{ width: item.progress }}
                      transition={{
                        duration: 1,
                        delay: 0.4 + index * 0.1,
                        ease: "easeOut",
                      }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="rounded-2xl bg-linear-to-br from-skyBlue/10 to-blueGreen/10 border border-blueGreen p-5 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-linear-to-br from-blueGreen to-skyBlue flex items-center justify-center text-white font-bold text-sm shrink-0 shadow-lg">
                  💡
                </div>
                <div>
                  <p className="text-xs font-bold text-[#219ebc] mb-1">
                    Tip of the day
                  </p>
                  <p className="text-sm text-prussianBlue leading-relaxed">
                    Encourage repeat bookings by sending thank-you notes within
                    24 hours. Clients who hear back quickly are 30% more likely
                    to rebook.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </section>
      </main>
    </div>
  );
}
