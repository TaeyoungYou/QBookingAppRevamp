import { Menu, Users, MessageCircle, ClipboardCheck, Sparkles, Bell } from "lucide-react";
import { motion } from "framer-motion";
import { useDashboardLayout } from "./DashboardLayout";
import { useStaffDirectory } from "../../context/StaffContext";

const managementCards = [
  {
    label: "Check-ins today",
    value: "24",
    helper: "5 walk-ins awaiting confirmation",
    accent: "from-emerald-500 to-teal-500",
    icon: ClipboardCheck,
  },
  {
    label: "Client follow-ups",
    value: "12",
    helper: "3 overdue reminders",
    accent: "from-violet-500 to-fuchsia-500",
    icon: MessageCircle,
  },
  {
    label: "New members",
    value: "8",
    helper: "Invite links sent this week",
    accent: "from-amber-500 to-orange-500",
    icon: Users,
  },
];

const followUps = [
  {
    name: "Andrea Collins",
    service: "Matcha Glow Mani",
    channel: "SMS",
    due: "in 45 min",
  },
  {
    name: "Luke Perkins",
    service: "Chrome Mirage Set",
    channel: "Instagram DM",
    due: "today 5:00 PM",
  },
  {
    name: "Jeannie Grant",
    service: "Bridal trial",
    channel: "Email",
    due: "tomorrow",
  },
];

const loyaltyHighlights = [
  {
    title: "Gel fill members",
    stat: "82%",
    helper: "Rebook within 4 weeks",
  },
  {
    title: "Spa pedicure club",
    stat: "64%",
    helper: "Opt for add-on paraffin",
  },
  {
    title: "Retail attachment",
    stat: "41%",
    helper: "Home care kit with appointment",
  },
];

export default function AnalyticsPage() {
  const { isSidebarOpen, setIsSidebarOpen } = useDashboardLayout();
  const { staff } = useStaffDirectory();
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const staffLoad = staff.map((member, index) => ({
    ...member,
    bookings: 5 + index * 2,
    followUps: index % 2 === 0 ? 2 : 1,
  }));

  return (
    <div className="flex-1 flex flex-col min-h-0 overflow-hidden bg-[#f7f8fb]">
      <header className="bg-white/90 backdrop-blur-xl border-b border-slate-200 h-16 flex items-center justify-between px-6 shrink-0 shadow-sm">
        <div className="flex items-center gap-4">
          <button
            onClick={toggleSidebar}
            className="p-2 hover:bg-slate-100 rounded-xl transition-colors"
            title="Toggle Sidebar"
          >
            <Menu size={24} className="text-slate-500" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-slate-900">Operations Hub</h1>
            <p className="text-sm text-slate-500">
              Keep the team in sync and clients engaged.
            </p>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {managementCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.label}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="rounded-2xl bg-white border border-slate-200 p-5 shadow-sm flex flex-col gap-3"
              >
                <div className="flex items-center justify-between">
                  <div
                    className={`w-12 h-12 rounded-xl bg-linear-to-br ${card.accent} text-white flex items-center justify-center shadow-lg`}
                  >
                    <Icon size={22} />
                  </div>
                  <span className="text-xs font-semibold uppercase text-slate-400">
                    Live
                  </span>
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-500">{card.label}</p>
                  <p className="text-3xl font-bold text-slate-900">{card.value}</p>
                </div>
                <p className="text-sm text-slate-500">{card.helper}</p>
              </motion.div>
            );
          })}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-3xl bg-white border border-slate-200 shadow-sm overflow-hidden"
          >
            <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  Today's client follow-ups
                </h3>
                <p className="text-sm text-slate-500">
                  Reach out before they arrive
                </p>
              </div>
              <div className="rounded-full bg-slate-900/5 text-slate-900 text-xs font-semibold px-3 py-1">
                3 urgent
              </div>
            </div>
            <div className="p-6 space-y-4">
              {followUps.map((entry, index) => (
                <motion.div
                  key={entry.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                  className="rounded-2xl border border-slate-100 p-4 flex items-center justify-between hover:border-slate-300 transition"
                >
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{entry.name}</p>
                    <p className="text-xs text-slate-500">{entry.service}</p>
                    <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                      <MessageCircle size={12} />
                      {entry.channel}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-semibold text-emerald-500">
                      {entry.due}
                    </p>
                    <button className="mt-2 text-xs font-semibold text-slate-900 hover:text-slate-600">
                      Open chat
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-3xl bg-white border border-slate-200 shadow-sm overflow-hidden"
          >
            <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  Staff workload snapshot
                </h3>
                <p className="text-sm text-slate-500">Live bookings + touchpoints</p>
              </div>
              <Sparkles size={18} className="text-amber-500" />
            </div>
            <div className="p-6 space-y-4">
              {staffLoad.map((member) => (
                <div
                  key={member.id}
                  className="rounded-2xl border border-slate-100 p-4 hover:border-slate-300 transition"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      {member.avatar ? (
                        <img
                          src={member.avatar}
                          alt={member.name}
                          className="h-10 w-10 rounded-full object-cover border border-white shadow"
                        />
                      ) : (
                        <div className="h-10 w-10 rounded-full border border-white bg-slate-100 flex items-center justify-center text-xs font-semibold text-slate-600 shadow">
                          {member.name
                            .split(" ")
                            .map((chunk) => chunk[0])
                            .join("")
                            .slice(0, 2)
                            .toUpperCase()}
                        </div>
                      )}
                      <div>
                        <p className="text-sm font-semibold text-slate-900">
                          {member.name}
                        </p>
                        <p className="text-xs text-slate-500">{member.role}</p>
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-slate-500">
                      {member.bookings} appts
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-slate-900"
                      style={{ width: `${Math.min(member.bookings * 8, 100)}%` }}
                    />
                  </div>
                  <p className="mt-2 text-xs text-slate-500">
                    {member.followUps} client follow-ups assigned
                  </p>
                </div>
              ))}
            </div>
          </motion.section>
        </div>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl bg-white border border-slate-200 shadow-sm overflow-hidden"
        >
          <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Loyalty pulse</h3>
              <p className="text-sm text-slate-500">
                What keeps guests coming back
              </p>
            </div>
            <Bell size={18} className="text-slate-500" />
          </div>
          <div className="p-6 grid gap-4 sm:grid-cols-3">
            {loyaltyHighlights.map((card) => (
              <div
                key={card.title}
                className="rounded-2xl border border-slate-100 p-4 text-center"
              >
                <p className="text-xs font-semibold text-slate-500 uppercase">
                  {card.title}
                </p>
                <p className="text-2xl font-bold text-slate-900 mt-2">{card.stat}</p>
                <p className="text-xs text-slate-500 mt-1">{card.helper}</p>
              </div>
            ))}
          </div>
        </motion.section>
      </main>
    </div>
  );
}
