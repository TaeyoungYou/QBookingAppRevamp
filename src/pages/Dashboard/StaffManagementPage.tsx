import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Menu,
  UserPlus,
  Mail,
  // Phone,
  ShieldCheck,
  BadgeCheck,
  UserMinus,
} from "lucide-react";
import { useDashboardLayout } from "./DashboardLayout";
import { useStaffDirectory } from "../../context/StaffContext";
import {useAuthQueries} from "../../hooks/useAuthQueries.ts";
import type { Id } from "../../../convex/_generated/dataModel";

const roles = [
  "Lead Nail Artist",
  "Gel Specialist",
  "Spa Pedicurist",
  "Acrylic Artist",
  "Salon Coordinator",
];


const getInitials = (name: string) =>
  name
    .split(" ")
    .map((chunk) => chunk[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();



    
export default function StaffManagementPage() {
  const { isSidebarOpen, setIsSidebarOpen } = useDashboardLayout();

  const {staff, addStaff, user, removeStaff} = useAuthQueries();
  
  const {activateStaff } = useStaffDirectory();

  const [form, setForm] = useState({
    name: "",
    role: roles[0],
    email: "",
    phone: "",
  });

const [staffToRemove, setStaffToRemove] = useState<{
  id: Id<"staff">;
  name: string;
} | null>(null);



  const [note, setNote] = useState("");

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const pendingInvites = staff?.filter((member) => member.status === "invited");
  const activeStaff = staff?.filter((member) => member.status === "active");

  //Submit button for invite
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!form.name.trim() || !form.email.trim()) return;

    await addStaff({
      name: form.name.trim(),
      role: form.role,
      email: form.email.trim(),
      // phone: form.phone.trim() || "(not provided)",
      bio: note,
      rating: 100,
      status: "invited",                                      // Set initial status to "invited" until we can send email for activation
      businessId: user?.businessId
    });

    setForm({ name: "", role: roles[0], email: "", phone: "" });
    setNote("");
  };

  return (
    <div className="flex-1 flex flex-col min-h-0 overflow-hidden bg-[#f5f7fb]">
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
            <h1 className="text-xl font-bold text-slate-900">
              Staff Management
            </h1>
            <p className="text-sm text-slate-500">
              Invite nail techs, assign chairs, and manage access.
            </p>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl bg-white border border-slate-200 p-5 shadow-sm"
          >
            <p className="text-xs font-semibold uppercase text-slate-500">
              Active Staff
            </p>
            <p className="text-3xl font-bold text-slate-900 mt-2">
              {activeStaff?.length}
            </p>
            <p className="text-sm text-slate-500">Team members on the floor</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="rounded-2xl bg-white border border-slate-200 p-5 shadow-sm"
          >
            <p className="text-xs font-semibold uppercase text-slate-500">
              Pending Invites
            </p>
            <p className="text-3xl font-bold text-slate-900 mt-2">
              {pendingInvites?.length}
            </p>
            <p className="text-sm text-slate-500">
              Awaiting account activation
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-2xl bg-white border border-slate-200 p-5 shadow-sm"
          >
            <p className="text-xs font-semibold uppercase text-slate-500">
              Roles
            </p>
            <p className="text-3xl font-bold text-slate-900 mt-2">
              {Array.from(new Set(staff?.map((member) => member.role))).length}
            </p>
            <p className="text-sm text-slate-500">Unique specialties covered</p>
          </motion.div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <section className="lg:col-span-2 space-y-4">
            {staff?.map((member) => (
              <motion.div
                key={member._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-2xl bg-white border border-slate-200 p-5 shadow-sm flex flex-wrap gap-4 justify-between"
              >
                <div className="flex items-center gap-4">
                  <div
                    className="h-12 w-12 rounded-full border-2 flex items-center justify-center text-sm font-semibold text-slate-700 bg-slate-50"
                    // style={{ borderColor: member.accentColor }}
                  >
                    {member.image ? (
                      <img
                        src={member.image}
                        alt={member.name}
                        className="h-full w-full rounded-full object-cover"
                      />
                    ) : (
                      getInitials(member.name)
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">
                      {member.name}
                    </p>
                    <p className="text-xs text-slate-500">{member.role}</p>
                    <div className="mt-2 flex flex-wrap gap-3 text-xs text-slate-500">
                      <span className="inline-flex items-center gap-1">
                        <Mail size={12} />
                        {member.email}
                      </span>
                      {/*<span className="inline-flex items-center gap-1">*/}
                      {/*  <Phone size={12} />*/}
                      {/*  {member.phone}*/}
                      {/*</span>*/}
                      {/*{member.availability && (*/}
                      {/*  <span className="inline-flex items-center gap-1">*/}
                      {/*    <ShieldCheck size={12} />*/}
                      {/*    {member.availability}*/}
                      {/*  </span>*/}
                      {/*)}*/}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {member.status === "invited" ? (
                    <button
                      onClick={() => activateStaff(member._id)}
                      className="inline-flex items-center gap-1 rounded-lg bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-600 border border-emerald-200"
                    >
                      <ShieldCheck size={14} />
                      Pending Activation
                    </button>
                  ) : (
                    <span className="inline-flex items-center gap-1 rounded-lg bg-blue-50 px-3 py-2 text-xs font-semibold text-blue-600 border border-blue-200">
                      <BadgeCheck size={14} />
                      Active
                    </span>
                  )}
                            <button
                    onClick={() =>
                      setStaffToRemove({ id: member._id, name: member.name })
                    }
                    className="inline-flex items-center gap-1 rounded-lg border border-rose-200 px-3 py-2 text-xs font-semibold text-rose-500 hover:bg-rose-50"
                  >
                    <UserMinus size={14} />
                    Remove
                  </button>

                </div>
              </motion.div>
            ))}
          </section>

          <section className="rounded-2xl bg-white border border-slate-200 p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <div className="rounded-xl bg-slate-900 p-2 text-white">
                <UserPlus size={18} />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">
                  Invite a team member
                </p>
                <p className="text-xs text-slate-500">
                  Send credentials in a single step
                </p>
              </div>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="text-xs font-semibold text-slate-500">
                  Full name
                </label>
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Alex Doe"
                  className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-slate-400 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-500">
                  Role
                </label>
                <select
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-slate-400 focus:outline-none"
                >
                  {roles.map((role) => (
                    <option key={role}>{role}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-500">
                  Email
                </label>
                <input
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="alex@example.com"
                  className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-slate-400 focus:outline-none"
                  type="email"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-500">
                  Phone
                </label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => {
                    const filteredValue = e.target.value.replace(
                      /[^\d\s()\-+]/g,
                      ""
                    );
                    setForm({ ...form, phone: filteredValue });
                  }}
                  placeholder="(555) 000-0000"
                  pattern="[0-9\s()\-+]+"
                  inputMode="tel"
                  className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-slate-400 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-500">
                  Notes
                </label>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  rows={3}
                  className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-slate-400 focus:outline-none resize-none"
                  placeholder="Skills, schedule preferences, etc."
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-xl bg-slate-900 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/20 transition hover:bg-slate-800"
              >
                Send invite
              </button>
            </form>
          </section>
        </div>
      </main>
      <AnimatePresence>
  {staffToRemove && (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl"
      >
        <h2 className="text-lg font-bold text-slate-900">
          Remove staff member?
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          Are you sure you want to remove{" "}
          <span className="font-semibold text-slate-700">
            {staffToRemove.name}
          </span>{" "}
          from this business?
        </p>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={() => setStaffToRemove(null)}
            className="rounded-lg px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100"
          >
            Cancel
          </button>

          <button
            onClick={() => {
              removeStaff({ id: staffToRemove.id });
              setStaffToRemove(null);
            }}
            className="rounded-lg bg-rose-600 px-4 py-2 text-sm font-semibold text-white hover:bg-rose-700"
          >
            Remove
          </button>
        </div>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>

    </div>
  );
}
