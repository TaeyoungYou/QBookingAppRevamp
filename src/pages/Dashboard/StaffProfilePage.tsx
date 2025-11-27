import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Menu,
  Phone,
  User,
  Clock,
  Edit2,
  Save,
  X,
  Upload,
  Sparkles,
  ShieldCheck,
  Award,
  MapPin,
  Bell,
} from "lucide-react";
import { useDashboardLayout } from "./DashboardLayout";
import { useUser } from "../../context/UserContext";
import { useStaffDirectory } from "../../context/StaffContext";

const availabilityOptions = [
  { label: "Full-time", sub: "40h+ on-site availability" },
  { label: "Part-time", sub: "Up to 25h per week" },
  { label: "Flexible", sub: "Custom rotating schedule" },
];

const statusBadgeStyles: Record<string, string> = {
  active: "bg-emerald-100 text-emerald-700",
  invited: "bg-amber-100 text-amber-700",
  inactive: "bg-slate-100 text-slate-600",
};

export default function StaffProfilePage() {
  const { isSidebarOpen, setIsSidebarOpen } = useDashboardLayout();
  const { user, setUser } = useUser();
  const { staff, updateStaff } = useStaffDirectory();

  const currentStaffMember = staff.find(
    (member) => member.email === user?.email
  );

  const [isEditing, setIsEditing] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState(
    currentStaffMember?.avatar || user?.avatar || ""
  );
  const [editForm, setEditForm] = useState({
    name: user?.name || currentStaffMember?.name || "",
    email: user?.email || currentStaffMember?.email || "",
    phone: currentStaffMember?.phone || user?.phone || "",
    availability:
      currentStaffMember?.availability || user?.availability || "Full-time",
    avatar: currentStaffMember?.avatar || user?.avatar || "",
  });
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!isEditing) {
      setEditForm({
        name: user?.name || currentStaffMember?.name || "",
        email: user?.email || currentStaffMember?.email || "",
        phone: currentStaffMember?.phone || user?.phone || "",
        availability:
          currentStaffMember?.availability || user?.availability || "Full-time",
        avatar: currentStaffMember?.avatar || user?.avatar || "",
      });
      setAvatarPreview(currentStaffMember?.avatar || user?.avatar || "");
    }
  }, [user, currentStaffMember, isEditing]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((chunk) => chunk[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();

  const handleAvatarSelection = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result?.toString() || "";
      setEditForm((prev) => ({ ...prev, avatar: result }));
      setAvatarPreview(result);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    if (user) {
      setUser({
        ...user,
        name: editForm.name.trim() || user.name,
        email: editForm.email.trim() || user.email,
        phone: editForm.phone.trim(),
        availability: editForm.availability,
        avatar: editForm.avatar || undefined,
      });
    }

    if (currentStaffMember) {
      updateStaff(currentStaffMember.id, {
        name: editForm.name.trim() || currentStaffMember.name,
        email: editForm.email.trim() || currentStaffMember.email,
        phone: editForm.phone.trim(),
        availability: editForm.availability,
        avatar: editForm.avatar || undefined,
      });
    }

    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditForm({
      name: user?.name || currentStaffMember?.name || "",
      email: user?.email || currentStaffMember?.email || "",
      phone: currentStaffMember?.phone || user?.phone || "",
      availability:
        currentStaffMember?.availability || user?.availability || "Full-time",
      avatar: currentStaffMember?.avatar || user?.avatar || "",
    });
    setAvatarPreview(currentStaffMember?.avatar || user?.avatar || "");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const displayName =
    (isEditing ? editForm.name : user?.name || currentStaffMember?.name) ||
    "Staff member";
  const displayEmail =
    (isEditing ? editForm.email : user?.email || currentStaffMember?.email) ||
    "No email";
  const displayPhone =
    (isEditing ? editForm.phone : currentStaffMember?.phone || user?.phone) ||
    "Not provided";

  const availabilityLabel = isEditing
    ? editForm.availability
    : currentStaffMember?.availability || user?.availability || "Full-time";

  const profileStatus =
    currentStaffMember?.status || user?.profileStatus || "Active";
  const normalizedStatus = profileStatus.toLowerCase();
  const statusStyle =
    statusBadgeStyles[normalizedStatus] || statusBadgeStyles.active;

  const profileRole =
    currentStaffMember?.role ||
    user?.roleTitle ||
    (user?.role === "admin" ? "Admin" : "Team member");

  const memberSinceLabel = currentStaffMember
    ? new Intl.DateTimeFormat("en-US", {
        month: "short",
        year: "numeric",
      }).format(new Date())
    : user?.memberSince || "N/A";

  const quickNotes = currentStaffMember?.notes || user?.notes;

  const focusAreas = [
    { label: "Gel artistry", value: 86 },
    { label: "Client experience", value: 78 },
    { label: "Wellness rituals", value: 64 },
  ];

  const workspacePrefs = [
    { label: "Default station", value: "Chair B · Window side" },
    { label: "Preferred location", value: "Polish Pro Studio" },
    { label: "Check-in method", value: "QR badge" },
  ];

  const notificationPrefs = [
    { label: "Push alerts", value: "Same-day only" },
    { label: "Email summary", value: "Weekly snapshots" },
    { label: "SMS backup", value: "On" },
  ];

  return (
    <div className="flex-1 flex flex-col min-h-0 overflow-hidden bg-[#e9eff5]">
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
            <h1 className="text-xl font-bold text-slate-900">Staff Profile</h1>
            <p className="text-sm text-slate-500">
              A personal hub for your schedule, availability, and credentials.
            </p>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto px-4 sm:px-6 py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="relative rounded-[28px] border border-white/30 bg-linear-to-br from-slate-900 via-blue-900 to-sky-700 p-px shadow-xl shadow-slate-500/20"
          >
            <div className="rounded-[26px] bg-slate-900/70 px-6 py-8 sm:px-10 relative overflow-hidden">
              <div className="absolute inset-y-0 right-0 opacity-60 pointer-events-none">
                <div className="h-40 w-40 bg-blue-500/20 blur-3xl translate-x-12 -translate-y-12 rounded-full" />
                <div className="h-40 w-40 bg-emerald-400/20 blur-3xl translate-x-16 translate-y-10 rounded-full" />
              </div>
              <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  <div className="relative h-28 w-28 rounded-[24px] bg-white/10 border border-white/20 flex items-center justify-center text-3xl font-bold text-white shadow-lg shadow-slate-900/40 overflow-hidden">
                    {avatarPreview ? (
                      <img
                        src={avatarPreview}
                        alt="Profile avatar"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      getInitials(displayName)
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-xs text-white/70 uppercase tracking-[0.2em]">
                      <Sparkles size={14} />
                      Profile overview
                    </div>
                    <h2 className="text-3xl font-semibold text-white mt-2 leading-tight">
                      {displayName}
                    </h2>
                    <p className="text-sm text-white/70 mt-1">{displayEmail}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <span className="inline-flex items-center gap-1 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white">
                        <Clock size={14} />
                        {availabilityLabel}
                      </span>
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${statusStyle}`}
                      >
                        <ShieldCheck size={14} />
                        {currentStaffMember?.status || "Active"}
                      </span>
                      <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white">
                        <Phone size={14} />
                        {displayPhone}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  {isEditing ? (
                    <>
                      <button
                        onClick={handleSave}
                        className="inline-flex items-center gap-2 rounded-2xl bg-white text-slate-900 px-5 py-3 text-sm font-semibold shadow-lg shadow-white/30 hover:-translate-y-0.5 transition"
                      >
                        <Save size={16} />
                        Save changes
                      </button>
                      <button
                        onClick={handleCancel}
                        className="inline-flex items-center gap-2 rounded-2xl bg-white/10 text-white px-4 py-3 text-sm font-semibold hover:bg-white/20 transition border border-white/20"
                      >
                        <X size={16} />
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="inline-flex items-center gap-2 rounded-2xl bg-white text-slate-900 px-5 py-3 text-sm font-semibold shadow-lg shadow-white/40 hover:-translate-y-0.5 transition"
                    >
                      <Edit2 size={16} />
                      Edit profile
                    </button>
                  )}
                </div>
              </div>
            </div>
          </motion.section>

          <AnimatePresence>
            {isEditing && (
              <motion.section
                key="edit-panel"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
                className="grid gap-6 lg:grid-cols-2"
              >
                <div className="rounded-3xl bg-white p-6 shadow-lg shadow-slate-200/70 border border-slate-100">
                  <p className="text-xs font-semibold uppercase text-slate-500">
                    Contact
                  </p>
                  <h3 className="text-xl font-bold text-slate-900">
                    Personal details
                  </h3>
                  <div className="mt-5 space-y-4">
                    <div>
                      <label className="text-xs font-semibold text-slate-500">
                        Full name
                      </label>
                      <input
                        value={editForm.name}
                        onChange={(e) =>
                          setEditForm((prev) => ({
                            ...prev,
                            name: e.target.value,
                          }))
                        }
                        placeholder="Alex Doe"
                        className="mt-1 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-500">
                        Email
                      </label>
                      <input
                        type="email"
                        value={editForm.email}
                        onChange={(e) =>
                          setEditForm((prev) => ({
                            ...prev,
                            email: e.target.value,
                          }))
                        }
                        placeholder="alex@example.com"
                        className="mt-1 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-500">
                        Phone
                      </label>
                      <input
                        type="tel"
                        inputMode="tel"
                        value={editForm.phone}
                        onChange={(e) =>
                          setEditForm((prev) => ({
                            ...prev,
                            phone: e.target.value.replace(/[^\d\s()\-+]/g, ""),
                          }))
                        }
                        placeholder="(555) 000-0000"
                        className="mt-1 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                      />
                    </div>
                  </div>
                </div>

                <div className="rounded-3xl bg-white p-6 shadow-lg shadow-slate-200/70 border border-slate-100 space-y-6">
                  <div>
                    <p className="text-xs font-semibold uppercase text-slate-500">
                      Profile photo
                    </p>
                    <div className="mt-3 flex items-center gap-4">
                      <div className="h-20 w-20 rounded-2xl border border-dashed border-slate-300 flex items-center justify-center overflow-hidden bg-slate-50 text-slate-400">
                        {avatarPreview ? (
                          <img
                            src={avatarPreview}
                            alt="Avatar preview"
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <User size={28} />
                        )}
                      </div>
                      <div className="space-y-2">
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="inline-flex items-center gap-2 rounded-2xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:border-blue-500 hover:text-blue-600 transition"
                        >
                          <Upload size={16} />
                          Upload photo
                        </button>
                        <p className="text-xs text-slate-500">
                          Works with file explorer or phone photo picker (JPG,
                          PNG up to 2MB).
                        </p>
                        {avatarPreview && (
                          <button
                            type="button"
                            onClick={() => {
                              setEditForm((prev) => ({ ...prev, avatar: "" }));
                              setAvatarPreview("");
                              if (fileInputRef.current) {
                                fileInputRef.current.value = "";
                              }
                            }}
                            className="text-xs font-semibold text-rose-500 hover:text-rose-600"
                          >
                            Remove current photo
                          </button>
                        )}
                      </div>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleAvatarSelection}
                      />
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase text-slate-500">
                      Availability
                    </p>
                    <div className="mt-3 space-y-3">
                      {availabilityOptions.map((option) => {
                        const selected = editForm.availability === option.label;
                        return (
                          <button
                            key={option.label}
                            type="button"
                            onClick={() =>
                              setEditForm((prev) => ({
                                ...prev,
                                availability: option.label,
                              }))
                            }
                            className={`w-full text-left rounded-2xl border px-4 py-3 transition ${
                              selected
                                ? "border-blue-500 bg-blue-50 text-blue-700"
                                : "border-slate-200 hover:border-blue-200"
                            }`}
                          >
                            <p className="text-sm font-semibold">
                              {option.label}
                            </p>
                            <p className="text-xs text-slate-500">
                              {option.sub}
                            </p>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </motion.section>
            )}
          </AnimatePresence>

          <div className="grid gap-6 lg:grid-cols-3">
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="rounded-3xl bg-white border border-slate-100 p-6 shadow-lg shadow-slate-200/70 space-y-5"
            >
              <div>
                <p className="text-xs font-semibold uppercase text-slate-500">
                  Quick info
                </p>
                <h3 className="text-lg font-bold text-slate-900">Snapshot</h3>
              </div>
              <div className="space-y-4 text-sm">
                <div className="rounded-2xl border border-slate-100 p-4 flex items-center gap-3">
                  <Award size={20} className="text-blueGreen" />
                  <div>
                    <p className="text-xs uppercase text-slate-500">Role</p>
                    <p className="text-base font-semibold text-slate-900">
                      {profileRole}
                    </p>
                  </div>
                </div>
                <div className="rounded-2xl border border-slate-100 p-4">
                  <p className="text-xs uppercase text-slate-500">
                    Account type
                  </p>
                  <p className="text-base font-semibold text-slate-900">
                    {user?.role || "Employee"}
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-100 p-4">
                  <p className="text-xs uppercase text-slate-500">
                    Member since
                  </p>
                  <p className="text-base font-semibold text-slate-900">
                    {memberSinceLabel}
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-100 p-4">
                  <p className="text-xs uppercase text-slate-500">
                    Profile status
                  </p>
                  <p className="text-base font-semibold text-emerald-600">
                    {profileStatus}
                  </p>
                </div>
              </div>
              {quickNotes && (
                <div className="rounded-2xl border border-slate-100 p-4 bg-slate-50">
                  <p className="text-xs uppercase text-slate-500 mb-1">
                    Team notes
                  </p>
                  <p className="text-sm text-slate-700">{quickNotes}</p>
                </div>
              )}
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="rounded-3xl bg-white border border-slate-100 p-6 shadow-lg shadow-slate-200/70 space-y-4"
            >
              <div>
                <p className="text-xs font-semibold uppercase text-slate-500">
                  Craft focus
                </p>
                <h3 className="text-lg font-bold text-slate-900">
                  Growth streak
                </h3>
              </div>
              <div className="space-y-4">
                {focusAreas.map((area) => (
                  <div key={area.label}>
                    <div className="flex items-center justify-between text-sm font-semibold text-slate-700">
                      <span>{area.label}</span>
                      <span>{area.value}%</span>
                    </div>
                    <div className="mt-2 h-2 rounded-full bg-slate-100 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-linear-to-r from-blue-500 via-sky-400 to-emerald-400"
                        style={{ width: `${area.value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-slate-500">
                Progress updates auto-refresh after each completed appointment
                or client review.
              </p>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="rounded-3xl bg-white border border-slate-100 p-6 shadow-lg shadow-slate-200/70 space-y-5"
            >
              <div>
                <p className="text-xs font-semibold uppercase text-slate-500">
                  Workspace
                </p>
                <h3 className="text-lg font-bold text-slate-900">
                  Environment & alerts
                </h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs uppercase text-slate-500">
                  <MapPin size={16} className="text-blueGreen" />
                  Locations
                </div>
                <div className="space-y-2">
                  {workspacePrefs.map((item) => (
                    <div
                      key={item.label}
                      className="rounded-2xl border border-slate-100 px-4 py-3"
                    >
                      <p className="text-[11px] uppercase text-slate-400 tracking-wide">
                        {item.label}
                      </p>
                      <p className="text-sm font-semibold text-slate-900">
                        {item.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs uppercase text-slate-500">
                  <Bell size={16} className="text-blueGreen" />
                  Notification flow
                </div>
                <div className="space-y-2">
                  {notificationPrefs.map((item) => (
                    <div
                      key={item.label}
                      className="rounded-2xl border border-slate-100 px-4 py-3"
                    >
                      <p className="text-[11px] uppercase text-slate-400 tracking-wide">
                        {item.label}
                      </p>
                      <p className="text-sm font-semibold text-slate-900">
                        {item.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.section>
          </div>
        </div>
      </main>
    </div>
  );
}
