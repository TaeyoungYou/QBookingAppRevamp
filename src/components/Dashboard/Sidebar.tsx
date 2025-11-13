import { Link, useLocation } from "react-router-dom";
import { motion } from "motion/react";
import {
  Calendar,
  LayoutDashboard,
  Users,
  Settings,
  Clock,
  BarChart3,
  MessageSquare,
  Home,
  ChevronRight,
} from "lucide-react";
import logo from "../../assets/logo.png";

const menuItems = [
  {
    icon: Home,
    label: "Home",
    path: "/",
  },
  {
    icon: LayoutDashboard,
    label: "Dashboard",
    path: "/dashboard",
  },
  {
    icon: Calendar,
    label: "Calendar",
    path: "/dashboard",
  },
  {
    icon: Clock,
    label: "Upcoming",
    path: "/dashboard/upcoming",
  },
  {
    icon: Users,
    label: "Customers",
    path: "/dashboard/customers",
  },
  {
    icon: BarChart3,
    label: "Analytics",
    path: "/dashboard/analytics",
  },
  {
    icon: MessageSquare,
    label: "Messages",
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

export default function Sidebar({ isOpen }: SidebarProps) {
  const location = useLocation();

  return (
    <motion.aside
      initial={{ x: -280 }}
      animate={{ x: isOpen ? 0 : -280 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="w-64 bg-prussianBlue text-white flex flex-col h-screen shadow-2xl fixed z-50"
    >
      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="h-16 flex items-center px-6 border-b border-white/10"
      >
        <img src={logo} alt="Logo" className="h-9 w-auto rounded-md" />
      </motion.div>

      {/* Navigation */}
      <nav className="flex-1 py-6 overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
        <div className="px-3 space-y-1">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <motion.div
                key={item.path}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.3 }}
              >
                <Link
                  to={item.path}
                  className={`flex items-center justify-between gap-3 px-4 py-3 rounded-xl transition-all duration-300 group relative overflow-hidden ${
                    isActive
                      ? "bg-skyBlue/20 text-skyBlue shadow-lg"
                      : "text-white/70 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-3 z-10">
                    <Icon
                      size={20}
                      className={`transition-transform duration-300 ${
                        isActive ? "scale-110" : "group-hover:scale-110"
                      }`}
                    />
                    <span className="font-medium text-sm">{item.label}</span>
                  </div>
                  <ChevronRight
                    size={16}
                    className={`transition-all duration-300 ${
                      isActive
                        ? "opacity-100 translate-x-0"
                        : "opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
                    }`}
                  />
                  {/* Hover effect background */}
                  {!isActive && (
                    <div className="absolute inset-0 bg-gradient-to-r from-skyBlue/0 to-skyBlue/5 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300" />
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
        className="p-4 border-t border-white/10"
      >
        <div className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-white/5 transition-colors cursor-pointer group">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="w-10 h-10 bg-gradient-to-br from-skyBlue to-blueGreen rounded-full flex items-center justify-center text-prussianBlue font-bold shadow-lg"
          >
            A
          </motion.div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-white group-hover:text-skyBlue transition-colors">
              Admin User
            </p>
            <p className="text-xs text-white/60">admin@example.com</p>
          </div>
        </div>
      </motion.div>
    </motion.aside>
  );
}
