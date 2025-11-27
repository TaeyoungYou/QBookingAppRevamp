import { useState, useMemo, useEffect } from "react";
import {
  Menu,
  Package2,
  Plus,
  Users,
  UserCheck,
  Calendar,
  TrendingUp,
  Clock,
  BarChart3,
  Sparkles,
  X,
  Edit2,
  Trash2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useDashboardLayout } from "./DashboardLayout";
import { useUser } from "../../context/UserContext";
import { useStaffDirectory } from "../../context/StaffContext";
import { useAppointments } from "../../context/AppointmentsContext";
import moment from "moment";

interface Supply {
  id: string;
  item: string;
  status: "Low" | "Reorder" | "Healthy";
  daysLeft: number;
  reminderDate?: string; // YYYY-MM-DD format
}

const initialSupplies: Supply[] = [
  { id: "1", item: "Soft gel tips", status: "Low", daysLeft: 4 },
  { id: "2", item: "Cuticle oil pens", status: "Reorder", daysLeft: 2 },
  { id: "3", item: "Lavender soak", status: "Healthy", daysLeft: 14 },
];

export default function SalonHubPage() {
  const { isSidebarOpen, setIsSidebarOpen } = useDashboardLayout();
  const { isEmployee, user } = useUser();
  const { staff } = useStaffDirectory();
  const { appointments } = useAppointments();
  const [selectedRange, setSelectedRange] = useState("This week");
  const [supplies, setSupplies] = useState<Supply[]>(() => {
    const stored = localStorage.getItem("salon-supplies");
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return initialSupplies;
      }
    }
    return initialSupplies;
  });
  const [isSupplyModalOpen, setIsSupplyModalOpen] = useState(false);
  const [editingSupply, setEditingSupply] = useState<Supply | null>(null);
  const [supplyForm, setSupplyForm] = useState({
    item: "",
    daysLeft: 14,
    status: "Healthy" as "Low" | "Reorder" | "Healthy",
    reminderDate: "",
  });
  const [deleteConfirm, setDeleteConfirm] = useState<{
    isOpen: boolean;
    supplyId: string | null;
    supplyName: string;
  }>({
    isOpen: false,
    supplyId: null,
    supplyName: "",
  });

  useEffect(() => {
    localStorage.setItem("salon-supplies", JSON.stringify(supplies));
  }, [supplies]);

  // Check for reminders and show notifications
  useEffect(() => {
    const checkReminders = () => {
      const today = moment().format("YYYY-MM-DD");
      const reminders = supplies.filter(
        (supply) => supply.reminderDate === today
      );

      if (reminders.length > 0) {
        // Request browser notification permission
        if ("Notification" in window && Notification.permission === "granted") {
          reminders.forEach((supply) => {
            new Notification(`Supply Reminder: ${supply.item}`, {
              body: `Reminder: ${supply.item} needs attention. ${supply.daysLeft} days remaining.`,
              icon: "/favicon.ico",
              tag: `supply-reminder-${supply.id}`,
            });
          });
        } else if (
          "Notification" in window &&
          Notification.permission === "default"
        ) {
          Notification.requestPermission().then((permission) => {
            if (permission === "granted") {
              reminders.forEach((supply) => {
                new Notification(`Supply Reminder: ${supply.item}`, {
                  body: `Reminder: ${supply.item} needs attention. ${supply.daysLeft} days remaining.`,
                  icon: "/favicon.ico",
                  tag: `supply-reminder-${supply.id}`,
                });
              });
            }
          });
        }
      }
    };

    // Check reminders on mount and set up interval
    checkReminders();
    const interval = setInterval(checkReminders, 60000); // Check every minute

    return () => clearInterval(interval);
  }, [supplies]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const openAddSupplyModal = () => {
    setEditingSupply(null);
    setSupplyForm({
      item: "",
      daysLeft: 14,
      status: "Healthy",
      reminderDate: "",
    });
    setIsSupplyModalOpen(true);
  };

  const openEditSupplyModal = (supply: Supply) => {
    setEditingSupply(supply);
    setSupplyForm({
      item: supply.item,
      daysLeft: supply.daysLeft,
      status: supply.status,
      reminderDate: supply.reminderDate || "",
    });
    setIsSupplyModalOpen(true);
  };

  const closeSupplyModal = () => {
    setIsSupplyModalOpen(false);
    setEditingSupply(null);
    setSupplyForm({
      item: "",
      daysLeft: 14,
      status: "Healthy",
      reminderDate: "",
    });
  };

  const handleSaveSupply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!supplyForm.item.trim()) return;

    if (editingSupply) {
      // Update existing supply
      setSupplies((prev) =>
        prev.map((s) =>
          s.id === editingSupply.id
            ? {
                ...s,
                item: supplyForm.item.trim(),
                daysLeft: supplyForm.daysLeft,
                status: supplyForm.status,
                reminderDate: supplyForm.reminderDate || undefined,
              }
            : s
        )
      );
    } else {
      // Add new supply
      const newSupply: Supply = {
        id: crypto.randomUUID(),
        item: supplyForm.item.trim(),
        daysLeft: supplyForm.daysLeft,
        status: supplyForm.status,
        reminderDate: supplyForm.reminderDate || undefined,
      };
      setSupplies((prev) => [...prev, newSupply]);
    }
    closeSupplyModal();
  };

  const handleDeleteSupply = (id: string) => {
    const supply = supplies.find((s) => s.id === id);
    if (supply) {
      setDeleteConfirm({
        isOpen: true,
        supplyId: id,
        supplyName: supply.item,
      });
    }
  };

  const confirmDelete = () => {
    if (deleteConfirm.supplyId) {
      setSupplies((prev) =>
        prev.filter((s) => s.id !== deleteConfirm.supplyId)
      );
      setDeleteConfirm({ isOpen: false, supplyId: null, supplyName: "" });
    }
  };

  const cancelDelete = () => {
    setDeleteConfirm({ isOpen: false, supplyId: null, supplyName: "" });
  };

  // Get current staff member ID for employee
  const currentStaffId = useMemo(() => {
    if (isEmployee && user) {
      const staffMember = staff.find(
        (s) => s.email === user.email || s.name === user.name
      );
      return staffMember?.id || null;
    }
    return null;
  }, [isEmployee, user, staff]);

  // Filter appointments based on role
  const filteredAppointments = useMemo(() => {
    if (isEmployee && currentStaffId) {
      return appointments.filter((apt) => apt.staffId === currentStaffId);
    }
    return appointments;
  }, [appointments, isEmployee, currentStaffId]);

  // Calculate date range based on selectedRange
  const dateRange = useMemo(() => {
    const now = moment();
    switch (selectedRange) {
      case "This week":
        return {
          start: now.clone().startOf("week"),
          end: now.clone().endOf("week"),
        };
      case "Next 14 days":
        return {
          start: now.clone(),
          end: now.clone().add(14, "days"),
        };
      case "This month":
        return {
          start: now.clone().startOf("month"),
          end: now.clone().endOf("month"),
        };
      default:
        return {
          start: now.clone().startOf("week"),
          end: now.clone().endOf("week"),
        };
    }
  }, [selectedRange]);

  // Filter appointments by date range
  const rangeAppointments = useMemo(() => {
    return filteredAppointments.filter((apt) => {
      const aptDate = moment(apt.start);
      return aptDate.isBetween(dateRange.start, dateRange.end, "day", "[]");
    });
  }, [filteredAppointments, dateRange]);

  // Calculate customer metrics
  const customerMetrics = useMemo(() => {
    const customerMap = new Map<
      string,
      { count: number; firstVisit: Date; lastVisit: Date }
    >();

    rangeAppointments.forEach((apt) => {
      const customerKey = apt.customer.phone;
      const existing = customerMap.get(customerKey);

      if (existing) {
        existing.count += 1;
        if (apt.start < existing.firstVisit) {
          existing.firstVisit = apt.start;
        }
        if (apt.start > existing.lastVisit) {
          existing.lastVisit = apt.start;
        }
      } else {
        customerMap.set(customerKey, {
          count: 1,
          firstVisit: apt.start,
          lastVisit: apt.start,
        });
      }
    });

    const allCustomers = Array.from(customerMap.values());
    const newCustomers = allCustomers.filter(
      (c) =>
        moment(c.firstVisit).isSame(moment(dateRange.start), "day") ||
        moment(c.firstVisit).isAfter(moment(dateRange.start))
    );
    const returningCustomers = allCustomers.filter((c) => c.count > 1);

    return {
      total: customerMap.size,
      new: newCustomers.length,
      returning: returningCustomers.length,
      totalAppointments: rangeAppointments.length,
      completedAppointments: rangeAppointments.filter(
        (apt) => apt.status === "completed"
      ).length,
    };
  }, [rangeAppointments, dateRange]);

  // Calculate service breakdown
  const serviceBreakdown = useMemo(() => {
    const serviceMap = new Map<string, number>();
    rangeAppointments.forEach((apt) => {
      serviceMap.set(apt.service, (serviceMap.get(apt.service) || 0) + 1);
    });
    return Array.from(serviceMap.entries())
      .map(([service, count]) => ({ service, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 3);
  }, [rangeAppointments]);

  // Calculate rebook rate
  const rebookRate = useMemo(() => {
    if (customerMetrics.total === 0) return 0;
    return Math.round(
      (customerMetrics.returning / customerMetrics.total) * 100
    );
  }, [customerMetrics]);

  // Calculate average appointment duration
  const averageDuration = useMemo(() => {
    if (rangeAppointments.length === 0) return 0;
    const totalMinutes = rangeAppointments.reduce((sum, apt) => {
      const duration = moment(apt.end).diff(moment(apt.start), "minutes");
      return sum + duration;
    }, 0);
    return Math.round(totalMinutes / rangeAppointments.length);
  }, [rangeAppointments]);

  // Calculate peak hours
  const peakHours = useMemo(() => {
    const hourCounts = new Map<number, number>();
    rangeAppointments.forEach((apt) => {
      const hour = moment(apt.start).hour();
      hourCounts.set(hour, (hourCounts.get(hour) || 0) + 1);
    });

    const sorted = Array.from(hourCounts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3);

    return sorted.map(([hour, count]) => ({
      hour,
      count,
      label: `${hour}:00`,
    }));
  }, [rangeAppointments]);

  // Calculate completion rate
  const completionRate = useMemo(() => {
    if (rangeAppointments.length === 0) return 0;
    const completed = rangeAppointments.filter(
      (apt) => apt.status === "completed"
    ).length;
    return Math.round((completed / rangeAppointments.length) * 100);
  }, [rangeAppointments]);

  return (
    <div className="flex-1 flex flex-col min-h-0 overflow-hidden bg-[#f7f8fb]">
      <header className="bg-white/90 backdrop-blur-xl border-b border-skyBlue h-16 flex items-center justify-between px-6 shrink-0 shadow-sm">
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
              {isEmployee
                ? "Your customer insights and performance at a glance."
                : "Supplies, rituals, and loyalty at a glance."}
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
        {/* Employee View - Customer Analytics */}
        {isEmployee ? (
          <>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-2xl bg-white border border-slate-200 p-5 shadow-sm"
              >
                <div className="flex items-center gap-3 mb-2">
                  <Users className="text-blue-500" size={20} />
                  <p className="text-xs font-semibold text-slate-500 uppercase">
                    Total Customers
                  </p>
                </div>
                <p className="text-3xl font-bold text-slate-900 mt-2">
                  {customerMetrics.total}
                </p>
                <p className="text-sm text-slate-500">
                  {selectedRange.toLowerCase()}
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 }}
                className="rounded-2xl bg-white border border-slate-200 p-5 shadow-sm"
              >
                <div className="flex items-center gap-3 mb-2">
                  <UserCheck className="text-emerald-500" size={20} />
                  <p className="text-xs font-semibold text-slate-500 uppercase">
                    New Customers
                  </p>
                </div>
                <p className="text-3xl font-bold text-slate-900 mt-2">
                  {customerMetrics.new}
                </p>
                <p className="text-sm text-slate-500">First-time visitors</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="rounded-2xl bg-white border border-slate-200 p-5 shadow-sm"
              >
                <div className="flex items-center gap-3 mb-2">
                  <TrendingUp className="text-purple-500" size={20} />
                  <p className="text-xs font-semibold text-slate-500 uppercase">
                    Returning Customers
                  </p>
                </div>
                <p className="text-3xl font-bold text-slate-900 mt-2">
                  {customerMetrics.returning}
                </p>
                <p className="text-sm text-slate-500">
                  {rebookRate}% rebook rate
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="rounded-2xl bg-white border border-slate-200 p-5 shadow-sm"
              >
                <div className="flex items-center gap-3 mb-2">
                  <Calendar className="text-amber-500" size={20} />
                  <p className="text-xs font-semibold text-slate-500 uppercase">
                    Total Appointments
                  </p>
                </div>
                <p className="text-3xl font-bold text-slate-900 mt-2">
                  {customerMetrics.totalAppointments}
                </p>
                <p className="text-sm text-slate-500">
                  {customerMetrics.completedAppointments} completed
                </p>
              </motion.div>
            </div>

            {/* Service Performance */}
            {serviceBreakdown.length > 0 && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-3xl bg-white border border-slate-200 shadow-sm overflow-hidden"
              >
                <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">
                      Top Services Performed
                    </h3>
                    <p className="text-sm text-slate-500">
                      Your most requested services this{" "}
                      {selectedRange.toLowerCase()}
                    </p>
                  </div>
                  <TrendingUp size={18} className="text-emerald-500" />
                </div>
                <div className="p-6 space-y-4">
                  {serviceBreakdown.map((item, index) => (
                    <div
                      key={item.service}
                      className="rounded-2xl border border-slate-100 p-4 flex items-center justify-between"
                    >
                      <div>
                        <p className="text-sm font-semibold text-slate-900">
                          {item.service}
                        </p>
                        <p className="text-xs text-slate-500">
                          {item.count}{" "}
                          {item.count === 1 ? "appointment" : "appointments"}
                        </p>
                      </div>
                      <span className="text-xs font-semibold text-emerald-500">
                        #{index + 1}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.section>
            )}
          </>
        ) : (
          /* Admin View - Original Content */
          <>
            <div className="grid gap-4 sm:grid-cols-1">
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
          </>
        )}

        {/* Additional Metrics Section */}
        {isEmployee && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl bg-linear-to-br from-blue-50 to-blue-100 border border-blue-200 p-5 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-2">
                <Clock className="text-blue-600" size={20} />
                <p className="text-xs font-semibold text-blue-700 uppercase">
                  Avg Duration
                </p>
              </div>
              <p className="text-3xl font-bold text-blue-900 mt-2">
                {averageDuration}
              </p>
              <p className="text-sm text-blue-700">minutes</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="rounded-2xl bg-linear-to-br from-emerald-50 to-emerald-100 border border-emerald-200 p-5 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-2">
                <BarChart3 className="text-emerald-600" size={20} />
                <p className="text-xs font-semibold text-emerald-700 uppercase">
                  Completion Rate
                </p>
              </div>
              <p className="text-3xl font-bold text-emerald-900 mt-2">
                {completionRate}%
              </p>
              <p className="text-sm text-emerald-700">appointments</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="rounded-2xl bg-linear-to-br from-purple-50 to-purple-100 border border-purple-200 p-5 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-2">
                <Sparkles className="text-purple-600" size={20} />
                <p className="text-xs font-semibold text-purple-700 uppercase">
                  Peak Hours
                </p>
              </div>
              <p className="text-3xl font-bold text-purple-900 mt-2">
                {peakHours.length > 0 ? peakHours[0].label : "N/A"}
              </p>
              <p className="text-sm text-purple-700">
                {peakHours.length > 0
                  ? `${peakHours[0].count} appointments`
                  : "No data"}
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="rounded-2xl bg-linear-to-br from-amber-50 to-amber-100 border border-amber-200 p-5 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-2">
                <TrendingUp className="text-amber-600" size={20} />
                <p className="text-xs font-semibold text-amber-700 uppercase">
                  Rebook Rate
                </p>
              </div>
              <p className="text-3xl font-bold text-amber-900 mt-2">
                {rebookRate}%
              </p>
              <p className="text-sm text-amber-700">customer retention</p>
            </motion.div>
          </div>
        )}

        {/* Admin Additional Stats */}
        {!isEmployee && (
          <div className="grid gap-4 sm:grid-cols-3">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl bg-linear-to-br from-indigo-50 to-indigo-100 border border-indigo-200 p-5 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-2">
                <Calendar className="text-indigo-600" size={20} />
                <p className="text-xs font-semibold text-indigo-700 uppercase">
                  Total Appointments
                </p>
              </div>
              <p className="text-3xl font-bold text-indigo-900 mt-2">
                {customerMetrics.totalAppointments}
              </p>
              <p className="text-sm text-indigo-700">
                {selectedRange.toLowerCase()}
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="rounded-2xl bg-linear-to-br from-rose-50 to-rose-100 border border-rose-200 p-5 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-2">
                <Users className="text-rose-600" size={20} />
                <p className="text-xs font-semibold text-rose-700 uppercase">
                  Total Customers
                </p>
              </div>
              <p className="text-3xl font-bold text-rose-900 mt-2">
                {customerMetrics.total}
              </p>
              <p className="text-sm text-rose-700">
                {customerMetrics.new} new this period
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="rounded-2xl bg-linear-to-br from-teal-50 to-teal-100 border border-teal-200 p-5 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-2">
                <BarChart3 className="text-teal-600" size={20} />
                <p className="text-xs font-semibold text-teal-700 uppercase">
                  Completion Rate
                </p>
              </div>
              <p className="text-3xl font-bold text-teal-900 mt-2">
                {completionRate}%
              </p>
              <p className="text-sm text-teal-700">appointments completed</p>
            </motion.div>
          </div>
        )}

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
                  Track and manage your inventory
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={openAddSupplyModal}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors"
                >
                  <Plus size={16} />
                  Add Supply
                </button>
                <Package2 size={18} className="text-slate-500" />
              </div>
            </div>
            <div className="p-6 space-y-4">
              {supplies.length > 0 ? (
                supplies.map((supply) => (
                  <div
                    key={supply.id}
                    className="rounded-2xl border border-slate-100 p-4 flex items-center justify-between group hover:shadow-md transition-all"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-sm font-semibold text-slate-900">
                          {supply.item}
                        </p>
                        {supply.reminderDate && (
                          <span
                            title={`Reminder set for ${moment(
                              supply.reminderDate
                            ).format("MMM DD, YYYY")}`}
                          >
                            <Clock size={14} className="text-blue-500" />
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500">
                        Est. {supply.daysLeft} days remaining
                        {supply.reminderDate && (
                          <span className="ml-2 text-blue-600">
                            • Reminder:{" "}
                            {moment(supply.reminderDate).format("MMM DD")}
                          </span>
                        )}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openEditSupplyModal(supply)}
                        className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                        title="Edit supply"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => handleDeleteSupply(supply.id)}
                        className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                        title="Delete supply"
                      >
                        <Trash2 size={16} />
                      </button>
                      <div
                        className={`text-xs font-semibold rounded-lg px-3 py-1.5 ${
                          supply.status === "Reorder"
                            ? "bg-red-100 text-red-700"
                            : supply.status === "Low"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-emerald-100 text-emerald-700"
                        }`}
                      >
                        {supply.daysLeft === 0
                          ? "Out of stock"
                          : supply.daysLeft === 1
                          ? "1 day left"
                          : `${supply.daysLeft} days left`}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <Package2 size={48} className="text-slate-300 mx-auto mb-3" />
                  <p className="text-sm text-slate-500 mb-4">
                    No supplies tracked yet
                  </p>
                  <button
                    onClick={openAddSupplyModal}
                    className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors"
                  >
                    <Plus size={16} />
                    Add Your First Supply
                  </button>
                </div>
              )}
            </div>
          </motion.section>

          {/* Peak Hours Section */}
          {peakHours.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-3xl bg-white border border-slate-200 shadow-sm overflow-hidden"
            >
              <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    Peak Hours
                  </h3>
                  <p className="text-sm text-slate-500">
                    Busiest times this {selectedRange.toLowerCase()}
                  </p>
                </div>
                <BarChart3 size={18} className="text-purple-500" />
              </div>
              <div className="p-6 space-y-4">
                {peakHours.map((peak, index) => (
                  <div
                    key={peak.hour}
                    className="rounded-2xl border border-slate-100 p-4"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                          <span className="text-sm font-bold text-purple-700">
                            #{index + 1}
                          </span>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-900">
                            {peak.label}
                          </p>
                          <p className="text-xs text-slate-500">
                            {peak.count}{" "}
                            {peak.count === 1 ? "appointment" : "appointments"}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-2">
                      <div className="w-full bg-slate-100 rounded-full h-2">
                        <div
                          className="bg-linear-to-r from-purple-500 to-purple-600 h-2 rounded-full transition-all"
                          style={{
                            width: `${
                              (peak.count / peakHours[0].count) * 100
                            }%`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.section>
          )}
        </div>
      </main>

      {/* Add/Edit Supply Modal */}
      <AnimatePresence>
        {isSupplyModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">
                    {editingSupply ? "Edit Supply" : "Add New Supply"}
                  </h3>
                  <p className="text-sm text-slate-500 mt-1">
                    {editingSupply
                      ? "Update supply information"
                      : "Track inventory levels and alerts"}
                  </p>
                </div>
                <button
                  onClick={closeSupplyModal}
                  className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSaveSupply} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Supply Item Name
                  </label>
                  <input
                    type="text"
                    value={supplyForm.item}
                    onChange={(e) =>
                      setSupplyForm({ ...supplyForm, item: e.target.value })
                    }
                    placeholder="e.g., Soft gel tips"
                    className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Days Remaining
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="365"
                    value={supplyForm.daysLeft}
                    onChange={(e) =>
                      setSupplyForm({
                        ...supplyForm,
                        daysLeft: parseInt(e.target.value) || 0,
                      })
                    }
                    className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Status
                  </label>
                  <select
                    value={supplyForm.status}
                    onChange={(e) =>
                      setSupplyForm({
                        ...supplyForm,
                        status: e.target.value as "Low" | "Reorder" | "Healthy",
                      })
                    }
                    className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
                  >
                    <option value="Healthy">Healthy</option>
                    <option value="Low">Low</option>
                    <option value="Reorder">Reorder</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Reminder Date{" "}
                    <span className="text-slate-400">(Optional)</span>
                  </label>
                  <input
                    type="date"
                    value={supplyForm.reminderDate}
                    onChange={(e) =>
                      setSupplyForm({
                        ...supplyForm,
                        reminderDate: e.target.value,
                      })
                    }
                    min={moment().format("YYYY-MM-DD")}
                    className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
                  />
                  <p className="text-xs text-slate-500 mt-1">
                    Set a date to receive a notification reminder for this
                    supply
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2.5 text-sm font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors"
                  >
                    {editingSupply ? "Update Supply" : "Add Supply"}
                  </button>
                  <button
                    type="button"
                    onClick={closeSupplyModal}
                    className="px-4 py-2.5 text-sm font-semibold text-slate-700 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteConfirm.isOpen && (
          <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                  <Trash2 size={24} className="text-red-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-slate-900">
                    Delete Supply
                  </h3>
                  <p className="text-sm text-slate-500 mt-1">
                    This action cannot be undone
                  </p>
                </div>
              </div>

              <p className="text-sm text-slate-700 mb-6">
                Are you sure you want to delete{" "}
                <span className="font-semibold text-slate-900">
                  "{deleteConfirm.supplyName}"
                </span>
                ? This will permanently remove it from your inventory.
              </p>

              <div className="flex items-center gap-3">
                <button
                  onClick={cancelDelete}
                  className="flex-1 px-4 py-2.5 text-sm font-semibold text-slate-700 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="flex-1 px-4 py-2.5 text-sm font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
