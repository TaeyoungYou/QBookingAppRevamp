import { useState } from "react";
import { Menu, Save, User } from "lucide-react";
import { motion } from "framer-motion";
import { useDashboardLayout } from "./DashboardLayout";
import { useStaffDirectory } from "../../context/StaffContext";

export default function StaffProfilePage() {
  const { isSidebarOpen, setIsSidebarOpen } = useDashboardLayout();
  const { staff, updateStaff } = useStaffDirectory();
  const [selectedStaffId, setSelectedStaffId] = useState(staff[0]?.id ?? "");

  const activeStaff = staff.find((member) => member.id === selectedStaffId);

  const [profile, setProfile] = useState({
    avatar: activeStaff?.avatar ?? "",
    bio: activeStaff?.notes ?? "",
    instagram: activeStaff?.instagram ?? "",
    availability: activeStaff?.availability ?? "Full-time",
  });

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleChangeStaff = (id: string) => {
    setSelectedStaffId(id);
    const staffMember = staff.find((member) => member.id === id);
    setProfile({
      avatar: staffMember?.avatar ?? "",
      bio: staffMember?.notes ?? "",
      instagram: staffMember?.instagram ?? "",
      availability: staffMember?.availability ?? "Full-time",
    });
  };

  const handleSave = (event: React.FormEvent) => {
    event.preventDefault();
    if (!selectedStaffId) return;

    updateStaff(selectedStaffId, {
      avatar: profile.avatar || undefined,
      notes: profile.bio,
      instagram: profile.instagram,
      availability: profile.availability,
    });
  };

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
            <h1 className="text-xl font-bold text-slate-900">
              Staff Profile Studio
            </h1>
            <p className="text-sm text-slate-500">
              Personalize bio, availability, and avatar.
            </p>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto px-6 py-6">
        <div className="mx-auto max-w-3xl space-y-6">
          <div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-6">
            <label className="text-xs font-semibold uppercase text-slate-500 mb-2 block">
              Select team member
            </label>
            <select
              value={selectedStaffId}
              onChange={(e) => handleChangeStaff(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700"
            >
              {staff.map((member) => (
                <option key={member.id} value={member.id}>
                  {member.name}
                </option>
              ))}
            </select>
          </div>

          <motion.form
            onSubmit={handleSave}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-3xl bg-white border border-slate-200 shadow-sm p-6 space-y-6"
          >
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 text-xl font-semibold">
                {profile.avatar ? (
                  <img
                    src={profile.avatar}
                    alt="Avatar preview"
                    className="h-full w-full rounded-full object-cover"
                  />
                ) : (
                  <User size={26} />
                )}
              </div>
              <div className="flex-1">
                <label className="text-xs font-semibold text-slate-500">
                  Avatar URL
                </label>
                <input
                  type="url"
                  value={profile.avatar}
                  onChange={(e) =>
                    setProfile((prev) => ({ ...prev, avatar: e.target.value }))
                  }
                  placeholder="https://example.com/avatar.jpg"
                  className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-slate-400 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-500">
                Bio
              </label>
              <textarea
                value={profile.bio}
                onChange={(e) =>
                  setProfile((prev) => ({ ...prev, bio: e.target.value }))
                }
                rows={4}
                placeholder="Describe your style, favorite techniques, or certifications."
                className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-slate-400 focus:outline-none resize-none"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-xs font-semibold text-slate-500">
                  Instagram handle
                </label>
                <input
                  value={profile.instagram}
                  onChange={(e) =>
                    setProfile((prev) => ({
                      ...prev,
                      instagram: e.target.value,
                    }))
                  }
                  placeholder="@polishpro_artist"
                  className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-slate-400 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-500">
                  Availability
                </label>
                <select
                  value={profile.availability}
                  onChange={(e) =>
                    setProfile((prev) => ({
                      ...prev,
                      availability: e.target.value,
                    }))
                  }
                  className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-slate-400 focus:outline-none"
                >
                  <option>Full-time</option>
                  <option>Part-time</option>
                  <option>Weekends only</option>
                  <option>By appointment</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/20 hover:bg-slate-800"
            >
              <Save size={16} />
              Save profile
            </button>
          </motion.form>
        </div>
      </main>
    </div>
  );
}

