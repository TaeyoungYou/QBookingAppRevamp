import {
  Menu,
  TrendingUp,
  Users,
  DollarSign,
  CalendarCheck,
} from "lucide-react";
import { motion } from "framer-motion";
import { useDashboardLayout } from "./DashboardLayout";
import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const kpis = [
  {
    label: "Total Revenue",
    value: "$12,450",
    change: "+18.2%",
    icon: DollarSign,
    gradient: "from-emerald-500 to-teal-600",
  },
  {
    label: "New Customers",
    value: "34",
    change: "+12.5%",
    icon: Users,
    gradient: "from-violet-500 to-purple-600",
  },
  {
    label: "Bookings",
    value: "128",
    change: "+8.4%",
    icon: CalendarCheck,
    gradient: "from-amber-500 to-orange-600",
  },
];

const revenueData = [
  { day: "Mon", value: 850, label: "Monday" },
  { day: "Tue", value: 920, label: "Tuesday" },
  { day: "Wed", value: 780, label: "Wednesday" },
  { day: "Thu", value: 1050, label: "Thursday" },
  { day: "Fri", value: 1180, label: "Friday" },
  { day: "Sat", value: 1420, label: "Saturday" },
  { day: "Sun", value: 1100, label: "Sunday" },
];

const channels = [
  { name: "Online Booking", value: 45, color: "from-violet-500 to-purple-600" },
  { name: "Phone Bookings", value: 30, color: "from-emerald-500 to-teal-600" },
  { name: "Walk-ins", value: 25, color: "from-amber-500 to-orange-600" },
];

const services = [
  { name: "Teeth Cleaning", revenue: "$4,200", bookings: 58 },
  { name: "Dental Checkup", revenue: "$3,150", bookings: 72 },
  { name: "Teeth Whitening", revenue: "$2,800", bookings: 34 },
];

export default function AnalyticsPage() {
  const { isSidebarOpen, setIsSidebarOpen } = useDashboardLayout();
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);

  // Custom tooltip component
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-prussianBlue text-white px-3 py-2 rounded-lg shadow-xl border border-blueGreen">
          <p className="text-skyBlue text-[10px] mb-0.5">{data.label}</p>
          <p className="text-white text-sm font-bold">
            ${data.value.toLocaleString()}
          </p>
        </div>
      );
    }
    return null;
  };

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
              Analytics Dashboard
            </h1>
            <p className="text-sm text-prussianBlue/70">
              Track performance and insights at a glance.
            </p>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-linear-to-br from-blueGreen to-skyBlue rounded-3xl p-8 shadow-xl shadow-blueGreen/20 border border-blueGreen"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-violet-200 text-sm font-semibold uppercase tracking-wide mb-2">
                This week
              </p>
              <h2 className="text-4xl font-bold text-white mb-2">$12,450</h2>
              <div className="flex items-center gap-2 text-emerald-300">
                <TrendingUp size={18} strokeWidth={2.5} />
                <span className="text-sm font-bold">+18.2% vs last week</span>
              </div>
            </div>
            <div className="relative w-20 h-20 rounded-2xl overflow-hidden group">
              {/* Animated gradient background */}
              <div className="absolute inset-0 bg-linear-to-br from-white/20 via-white/10 to-transparent"></div>

              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

              {/* Pattern overlay */}
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                  backgroundSize: "16px 16px",
                }}
              ></div>

              {/* Circular accent */}
              <div className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm border border-white/30"></div>
              <div className="absolute bottom-2 left-2 w-6 h-6 rounded-full bg-white/15 backdrop-blur-sm"></div>

              {/* Center highlight */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-linear-to-br from-white/30 to-white/10 backdrop-blur-sm border border-white/20 shadow-lg"></div>
              </div>

              {/* Glow effect */}
              <div className="absolute inset-0 rounded-2xl bg-white/10 blur-2xl"></div>
            </div>
          </div>
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {kpis.map((kpi, index) => {
            const Icon = kpi.icon;
            return (
              <motion.div
                key={kpi.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
                whileHover={{ y: -4 }}
                className="bg-white backdrop-blur-sm border border-skyBlue rounded-2xl p-6 shadow-lg hover:shadow-xl hover:border-blueGreen transition-all"
              >
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-12 h-12 rounded-xl bg-linear-to-br ${kpi.gradient} flex items-center justify-center text-white shadow-lg`}
                  >
                    <Icon size={22} strokeWidth={2.5} />
                  </div>
                  <span className="text-blueGreen text-sm font-bold">
                    {kpi.change}
                  </span>
                </div>
                <p className="text-prussianBlue/70 text-xs font-bold uppercase tracking-wide mb-1">
                  {kpi.label}
                </p>
                <p className="text-prussianBlue text-3xl font-bold">
                  {kpi.value}
                </p>
              </motion.div>
            );
          })}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="bg-white backdrop-blur-sm border border-skyBlue rounded-2xl shadow-lg overflow-hidden"
          >
            <div className="px-6 py-5 border-b border-skyBlue bg-[#f0f8fb]">
              <h3 className="text-lg font-bold text-prussianBlue">
                Revenue Trend
              </h3>
              <p className="text-sm text-prussianBlue/70">Weekly breakdown</p>
            </div>
            <div className="p-6">
              <ResponsiveContainer width="100%" height={280}>
                <BarChart
                  data={revenueData}
                  margin={{ top: 20, right: 10, left: 0, bottom: 5 }}
                >
                  <defs>
                    <linearGradient
                      id="barGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="0%" stopColor="#219ebc" stopOpacity={1} />
                      <stop offset="100%" stopColor="#8ecae6" stopOpacity={1} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#8ecae6"
                    opacity={0.3}
                    vertical={false}
                  />
                  <XAxis
                    dataKey="day"
                    tick={{ fill: "#023047", fontSize: 12, fontWeight: 600 }}
                    axisLine={{ stroke: "#8ecae6", strokeWidth: 1 }}
                    tickLine={{ stroke: "#8ecae6" }}
                  />
                  <YAxis
                    tick={{ fill: "#023047", fontSize: 11 }}
                    axisLine={{ stroke: "#8ecae6", strokeWidth: 1 }}
                    tickLine={{ stroke: "#8ecae6" }}
                    tickFormatter={(value) => `$${value}`}
                  />
                  <Tooltip
                    content={<CustomTooltip />}
                    cursor={{ fill: "rgba(33, 158, 188, 0.1)" }}
                  />
                  <Bar
                    dataKey="value"
                    radius={[8, 8, 0, 0]}
                    onMouseEnter={(_, index) => setHoveredPoint(index)}
                    onMouseLeave={() => setHoveredPoint(null)}
                  >
                    {revenueData.map((_, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill="url(#barGradient)"
                        opacity={hoveredPoint === index ? 1 : 0.9}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white backdrop-blur-sm border border-skyBlue rounded-2xl shadow-lg overflow-hidden"
          >
            <div className="px-6 py-5 border-b border-skyBlue bg-[#f0f8fb]">
              <h3 className="text-lg font-bold text-prussianBlue">
                Booking Channels
              </h3>
              <p className="text-sm text-prussianBlue/70">
                Distribution breakdown
              </p>
            </div>
            <div className="p-6 space-y-5">
              {channels.map((channel, index) => (
                <motion.div
                  key={channel.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.35 + index * 0.1 }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-bold text-prussianBlue">
                      {channel.name}
                    </span>
                    <span className="text-sm font-bold text-blueGreen">
                      {channel.value}%
                    </span>
                  </div>
                  <div className="h-3 rounded-full bg-[#f0f8fb] overflow-hidden border border-skyBlue">
                    <motion.div
                      className={`h-full bg-linear-to-r ${channel.color} shadow-lg`}
                      initial={{ width: 0 }}
                      animate={{ width: `${channel.value}%` }}
                      transition={{ duration: 1, delay: 0.4 + index * 0.1 }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="bg-white backdrop-blur-sm border border-skyBlue rounded-2xl shadow-lg overflow-hidden"
        >
          <div className="px-6 py-5 border-b border-skyBlue bg-[#f0f8fb]">
            <h3 className="text-lg font-bold text-prussianBlue">
              Top Performing Services
            </h3>
            <p className="text-sm text-prussianBlue/70">
              Most revenue this week
            </p>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {services.map((service, index) => (
                <motion.div
                  key={service.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.05 }}
                  className="flex items-center justify-between p-4 rounded-xl bg-[#f0f8fb] hover:bg-skyBlue/20 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-linear-to-br from-blueGreen to-skyBlue flex items-center justify-center text-white font-bold text-sm shadow-lg">
                      {index + 1}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-prussianBlue">
                        {service.name}
                      </p>
                      <p className="text-xs text-prussianBlue/70">
                        {service.bookings} bookings
                      </p>
                    </div>
                  </div>
                  <p className="text-lg font-bold text-blueGreen">
                    {service.revenue}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
