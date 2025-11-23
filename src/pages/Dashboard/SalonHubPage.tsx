import { useState } from "react";
import {
  Menu,
  Package2,
  Truck,
  WandSparkles,
  CalendarHeart,
} from "lucide-react";
import { motion } from "framer-motion";
import { useDashboardLayout } from "./DashboardLayout";

const inventoryAlerts = [
  { item: "Soft gel tips", status: "Low", daysLeft: 4 },
  { item: "Cuticle oil pens", status: "Reorder", daysLeft: 2 },
  { item: "Lavender soak", status: "Healthy", daysLeft: 14 },
];

const experiences = [
  { name: "Matcha Glow Mani", bookings: 18, conversion: "64%" },
  { name: "Chrome Mirage Set", bookings: 12, conversion: "51%" },
  { name: "Spa Pedicure Ritual", bookings: 22, conversion: "71%" },
];

export default function SalonHubPage() {
  const { isSidebarOpen, setIsSidebarOpen } = useDashboardLayout();
  const [selectedRange, setSelectedRange] = useState("This week");

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

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
            <h1 className="text-xl font-bold text-slate-900">Salon Hub</h1>
            <p className="text-sm text-slate-500">
              Supplies, rituals, and loyalty at a glance.
            </p>
          </div>
        </div>
        <select
          value={selectedRange}
          onChange={(e) => setSelectedRange(e.target.value)}
          className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm"
        >
          <option>This week</option>
          <option>Next 14 days</option>
          <option>This month</option>
        </select>
      </header>

      <main className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl bg-white border border-slate-200 p-5 shadow-sm"
          >
            <p className="text-xs font-semibold text-slate-500 uppercase">
              Waitlist
            </p>
            <p className="text-3xl font-bold text-slate-900 mt-2">11 guests</p>
            <p className="text-sm text-slate-500">4 prefer chrome sets</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="rounded-2xl bg-white border border-slate-200 p-5 shadow-sm"
          >
            <p className="text-xs font-semibold text-slate-500 uppercase">
              Retail bundles
            </p>
            <p className="text-3xl font-bold text-slate-900 mt-2">32 upsells</p>
            <p className="text-sm text-slate-500">
              Oil + buffer bag most popular
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-2xl bg-white border border-slate-200 p-5 shadow-sm"
          >
            <p className="text-xs font-semibold text-slate-500 uppercase">
              Loyalty check-ins
            </p>
            <p className="text-3xl font-bold text-slate-900 mt-2">68%</p>
            <p className="text-sm text-slate-500">
              Clients returning within 5 weeks
            </p>
          </motion.div>
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
                  Supply tracker
                </h3>
                <p className="text-sm text-slate-500">
                  Auto-alerts for low stock
                </p>
              </div>
              <Package2 size={18} className="text-slate-500" />
            </div>
            <div className="p-6 space-y-4">
              {inventoryAlerts.map((alert) => (
                <div
                  key={alert.item}
                  className="rounded-2xl border border-slate-100 p-4 flex items-center justify-between"
                >
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      {alert.item}
                    </p>
                    <p className="text-xs text-slate-500">
                      Est. {alert.daysLeft} days remaining
                    </p>
                  </div>
                  <button className="text-xs font-semibold text-slate-700 border border-slate-200 rounded-lg px-3 py-1.5 hover:bg-slate-50">
                    {alert.status === "Healthy" ? "Monitor" : "Order now"}
                  </button>
                </div>
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
                  Signature experiences
                </h3>
                <p className="text-sm text-slate-500">
                  Conversion this {selectedRange.toLowerCase()}
                </p>
              </div>
              <WandSparkles size={18} className="text-amber-500" />
            </div>
            <div className="p-6 space-y-4">
              {experiences.map((experience) => (
                <div
                  key={experience.name}
                  className="rounded-2xl border border-slate-100 p-4 flex items-center justify-between"
                >
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      {experience.name}
                    </p>
                    <p className="text-xs text-slate-500">
                      {experience.bookings} bookings
                    </p>
                  </div>
                  <span className="text-xs font-semibold text-emerald-500">
                    {experience.conversion} rebook rate
                  </span>
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
              <h3 className="text-lg font-bold text-slate-900">
                Vendor deliveries
              </h3>
              <p className="text-sm text-slate-500">Track ETA and notes</p>
            </div>
            <Truck size={18} className="text-slate-500" />
          </div>
          <div className="p-6 space-y-3">
            {[
              {
                vendor: "Pure Shades",
                eta: "Tomorrow 2-4 PM",
                note: "12 new gel colors",
              },
              { vendor: "Calm+Spa", eta: "Friday", note: "3 deluxe soak kits" },
              {
                vendor: "Buff & Co",
                eta: "Awaiting pick-up",
                note: "Buffers + files",
              },
            ].map((delivery) => (
              <div
                key={delivery.vendor}
                className="rounded-2xl border border-slate-100 p-4 flex items-center justify-between"
              >
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    {delivery.vendor}
                  </p>
                  <p className="text-xs text-slate-500">{delivery.note}</p>
                </div>
                <span className="text-xs font-semibold text-slate-500">
                  {delivery.eta}
                </span>
              </div>
            ))}
          </div>
        </motion.section>
      </main>
    </div>
  );
}
