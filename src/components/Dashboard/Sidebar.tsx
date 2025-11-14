import { Link, useLocation } from "react-router-dom";
import { motion } from "motion/react";
import {
  Calendar,
  LayoutDashboard,
  Users,
  Settings,
  Clock,
  BarChart3,
  ClipboardList,
  Home,
  ChevronRight,
} from "lucide-react";
import logo from "../../assets/logo.png";

const menuItems = [
  {
    icon: LayoutDashboard,
    label: "Dashboard",
    path: "/dashboard",
  },
  {
    icon: Calendar,
    label: "Calendar",
    path: "/dashboard/calendar",
  },
  {
    icon: BarChart3,
    label: "Analytics",
    path: "/dashboard/analytics",
  },
  {
    icon: Users,
    label: "Customers",
    path: "/dashboard/customers",
  },
  {
    icon: Clock,
    label: "Upcoming",
    path: "/dashboard/upcoming",
  },

  {
    icon: ClipboardList,
    label: "Task Center",
    path: "/dashboard/messages",
  },
  {
    icon: Settings,
    label: "Settings",
    path: "/dashboard/settings",
  },
];

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export default function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const location = useLocation();

  return (
    <motion.aside
      initial={{ x: -280 }}
      animate={{ x: isOpen ? 0 : -280 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="w-64 bg-gradient-to-b from-[#e8f4f8] via-[#f0f8fb] to-[#fef9f3] text-[#023047] flex flex-col h-screen shadow-xl fixed z-50 border-r border-[#8ecae6]"
    >
      {/* Logo  */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="h-16 flex items-center px-6 border-b border-[#8ecae6] bg-white/80 backdrop-blur-sm"
      >
        <img
          src={logo}
          alt="Logo"
          className="h-9 w-auto rounded-lg shadow-lg"
        />
      </motion.div>

      {/* Navigation */}
      <nav className="flex-1 py-6 overflow-y-auto scrollbar-thin scrollbar-thumb-[#219ebc] scrollbar-track-transparent">
        <div className="px-3 space-y-1">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            // isActive is true if the current path is the same as the item path
            const isActive = location.pathname === item.path;

            return (
              <motion.div
                key={`${item.path}-${index}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.3 }}
              >
                <Link
                  to={item.path}
                  className={`flex items-center justify-between gap-3 px-4 py-3 rounded-xl transition-all duration-300 group relative overflow-hidden ${
                    isActive
                      ? "bg-linear-to-r from-blueGreen to-skyBlue text-white shadow-lg shadow-blueGreen/30 border border-blueGreen"
                      : "text-prussianBlue hover:bg-white/80 hover:text-BlueGreen border border-transparent"
                  }`}
                >
                  <div className="flex items-center gap-3 z-10">
                    <Icon
                      size={20}
                      strokeWidth={2.5}
                      className={`transition-transform duration-300 ${
                        isActive ? "scale-110" : "group-hover:scale-110"
                      }`}
                    />
                    <span className="font-semibold text-sm">{item.label}</span>
                  </div>
                  <ChevronRight
                    size={16}
                    strokeWidth={2.5}
                    className={`transition-all duration-300 ${
                      isActive
                        ? "opacity-100 translate-x-0"
                        : "opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
                    }`}
                  />
                  {/* Hover effect background */}
                  {!isActive && (
                    <div className="absolute inset-0 bg-linear-to-r from-blueGreen/0 to-skyBlue/10 -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
                  )}
                </Link>
              </motion.div>
            );
          })}
        </div>
      </nav>

      {/* User Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="p-4 border-t border-blueGreen bg-white/80 backdrop-blur-sm"
      >
        <div className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-white transition-all cursor-pointer group">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="w-11 h-11 bg-linear-to-r from-blueGreen to-skyBlue rounded-full flex items-center justify-center text-white font-bold shadow-lg shadow-blueGreen/30"
          >
            A
          </motion.div>
          <div className="flex-1">
            <p className="text-sm font-bold text-prussianBlue group-hover:text-BlueGreen transition-colors">
              Admin User
            </p>
            <p className="text-xs text-prussianBlue/70">admin@example.com</p>
          </div>
        </div>
      </motion.div>
    </motion.aside>
  );
}
