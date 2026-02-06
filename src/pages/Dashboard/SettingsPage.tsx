import { useEffect, useRef, useState } from "react";
import {
  Menu,
  Save,
  Plus,
  ImagePlus,
  Edit2,
  X,
  Trash2,
  Upload,
  Clock,
} from "lucide-react";
import { motion } from "motion/react";
import { useDashboardLayout } from "./DashboardLayout";
import {useBusinessQueries} from "../../hooks/useBusinessQueries";
import { useCurrentUser } from "../../hooks/useBusinessQueries";

type Service = {
  id: string;
  name: string;
  description: string;
  duration: number;
  image?: string;
};


export default function SettingsPage() {
  const { isSidebarOpen, setIsSidebarOpen } = useDashboardLayout();
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const [businessInfo, setBusinessInfo] = useState({
  businessName: "",
  businessEmail: "",
  businessPhoneNumber: "",
  businessAddress: "",
});

const { businessId } = useCurrentUser();
const { updateBusiness } = useBusinessQueries();


  const [services, setServices] = useState<Service[]>(() => {
    const stored = localStorage.getItem("salon-services");
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return [];
      }
    }
    return [];
  });


  //function to handle save/update business info
  const handleSaveBusiness = async () => {

  if (!businessId) return; // businessId should come from your current business data
  try {
    const updated = await updateBusiness({
      id: businessId,
      businessName: businessInfo.businessName,
      businessEmail: businessInfo.businessEmail,
      businessPhoneNumber: businessInfo.businessPhoneNumber,
      businessAddress: businessInfo.businessAddress,
    });
    console.log("Updated business:", updated);
    // optional: show a toast or confirmation message
  } catch (error) {
    console.error("Failed to update business:", error);
  }
};

  useEffect(() => {
    localStorage.setItem("salon-services", JSON.stringify(services));
  }, [services]);

  const [newService, setNewService] = useState({
    name: "",
    description: "",
    duration: 60,
    image: "",
  });
  const [editingService, setEditingService] = useState<Service | null>(null);
  const addImageInputRef = useRef<HTMLInputElement | null>(null);

  const resetNewService = () =>
    setNewService({ name: "", description: "", duration: 60, image: "" });

  const handleNewImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setNewService((prev) => ({
        ...prev,
        image: reader.result?.toString() || "",
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleEditImageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file || !editingService) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setEditingService((prev) =>
        prev ? { ...prev, image: reader.result?.toString() || "" } : prev
      );
    };
    reader.readAsDataURL(file);
  };

  const handleAddService = (event: React.FormEvent) => {
    event.preventDefault();
    if (!newService.name.trim() || !newService.description.trim()) return;
    const service: Service = {
      id: crypto.randomUUID(),
      name: newService.name.trim(),
      description: newService.description.trim(),
      duration: Number(newService.duration) || 30,
      image: newService.image || undefined,
    };
    setServices((prev) => [...prev, service]);
    resetNewService();
    if (addImageInputRef.current) {
      addImageInputRef.current.value = "";
    }
  };

  const handleDeleteService = (id: string) => {
    setServices((prev) => prev.filter((service) => service.id !== id));
  };

  const handleEditFieldChange = (
    field: keyof Omit<Service, "id">,
    value: string | number
  ) => {
    if (!editingService) return;
    setEditingService({
      ...editingService,
      [field]:
        field === "duration" ? Number(value) || editingService.duration : value,
    });
  };

  const handleSaveEdit = () => {
    if (!editingService) return;
    setServices((prev) =>
      prev.map((service) =>
        service.id === editingService.id ? editingService : service
      )
    );
    setEditingService(null);
  };
  



  const handleCancelEdit = () => setEditingService(null);

  return (
    <div className="flex-1 flex flex-col min-h-0 overflow-hidden bg-linear-to-br from-[#f0f8fb] via-[#fef9f3] to-[#f5f5f0]">
      <header className="bg-white/90 backdrop-blur-xl border-b border-skyBlue h-16 flex items-center justify-between px-6 shrink-0 shadow-sm">
        <div className="flex items-center gap-4">
          <button
            onClick={toggleSidebar}
            className="p-2 hover:bg-[#f0f8fb] rounded-xl transition-colors"
            title="Toggle Sidebar"
          >
            <Menu size={24} className="text-[#023047]" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-slate-900">Settings</h1>
            <p className="text-sm text-prussianBlue/70">
              Manage your account and preferences.
            </p>
          </div>
        </div>
        <button
  onClick={handleSaveBusiness}
  className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#219ebc] to-[#8ecae6] text-white font-semibold shadow-lg shadow-[#219ebc]/30 hover:shadow-xl hover:shadow-[#219ebc]/40 transition-all cursor-pointer"
>
  <Save size={18} strokeWidth={2.5} />
  Save Changes
</button>


      </header>

      <main className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white backdrop-blur-sm border border-[#8ecae6] rounded-2xl shadow-lg overflow-hidden"
        >
          <div className="px-6 py-5 border-b border-[#8ecae6] bg-[#f0f8fb]">
            <h2 className="text-lg font-bold text-[#023047]">
              Business Information
            </h2>
            <p className="text-sm text-[#023047]/70">
              Update your business details and contact info.
            </p>
          </div>
          <div className="p-6 space-y-4">
            
            <div>
              <label className="block text-sm font-bold text-[#023047] mb-2">
                Business Name
              </label>
                    <input
            className="w-full px-4 py-3 bg-white border border-[#8ecae6] rounded-xl text-[#023047] placeholder-[#023047]/50 focus:outline-none focus:border-[#219ebc] focus:ring-2 focus:ring-[#219ebc]/20 transition-all"
            type="text"
            placeholder="Your Business Name"
            value={businessInfo.businessName}
            onChange={(e) =>
              setBusinessInfo((prev) => ({ ...prev, businessName: e.target.value }))
            }
          />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-bold text-[#023047] mb-2">
                  Email
                </label>
                      <input
               className="w-full px-4 py-3 bg-white border border-[#8ecae6] rounded-xl text-[#023047] placeholder-[#023047]/50 focus:outline-none focus:border-[#219ebc] focus:ring-2 focus:ring-[#219ebc]/20 transition-all"       
              type="email"
              placeholder="business@example.com"
              value={businessInfo.businessEmail}
              onChange={(e) =>
                setBusinessInfo((prev) => ({ ...prev, businessEmail: e.target.value }))
              }
            />
              </div>
              <div>
                <label className="block text-sm font-bold text-[#023047] mb-2">
                  Phone
                </label>
                <input
                className="w-full px-4 py-3 bg-white border border-[#8ecae6] rounded-xl text-[#023047] placeholder-[#023047]/50 focus:outline-none focus:border-[#219ebc] focus:ring-2 focus:ring-[#219ebc]/20 transition-all"
                  type="tel"
                  placeholder="+1 234 567 8900"
                  value={businessInfo.businessPhoneNumber}
                  onChange={(e) =>
                    setBusinessInfo((prev) => ({ ...prev, businessPhoneNumber: e.target.value }))
                  }
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-[#023047] mb-2">
                Address
              </label>
                          <input
                  className="w-full px-4 py-3 bg-white border border-[#8ecae6] rounded-xl text-[#023047] placeholder-[#023047]/50 focus:outline-none focus:border-[#219ebc] focus:ring-2 focus:ring-[#219ebc]/20 transition-all"        
                  type="text"
                  placeholder="123 Main St, City, State 12345"
                  value={businessInfo.businessAddress}
                  onChange={(e) =>
                    setBusinessInfo((prev) => ({ ...prev, businessAddress: e.target.value }))
                  }
                />
            </div>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white backdrop-blur-sm border border-[#8ecae6] rounded-2xl shadow-lg overflow-hidden"
        >
          <div className="px-6 py-5 border-b border-[#8ecae6] bg-[#f0f8fb]">
            <h2 className="text-lg font-bold text-[#023047]">
              Booking Preferences
            </h2>
            <p className="text-sm text-[#023047]/70">
              Configure how bookings work for your business.
            </p>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-[#023047]">
                  Auto-confirm bookings
                </p>
                <p className="text-xs text-[#023047]/60">
                  Automatically confirm appointments without manual approval
                </p>
              </div>
              <button className="relative inline-flex h-7 w-12 items-center rounded-full bg-[#219ebc] shadow-lg shadow-[#219ebc]/30">
                <span className="inline-block h-5 w-5 transform translate-x-6 rounded-full bg-white transition" />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-[#023047]">
                  Send reminders
                </p>
                <p className="text-xs text-[#023047]/60">
                  Email customers 24 hours before their appointment
                </p>
              </div>
              <button className="relative inline-flex h-7 w-12 items-center rounded-full bg-[#219ebc] shadow-lg shadow-[#219ebc]/30">
                <span className="inline-block h-5 w-5 transform translate-x-6 rounded-full bg-white transition" />
              </button>
            </div>
            <div>
              <label className="block text-sm font-bold text-[#023047] mb-2">
                Cancellation Policy
              </label>
              <select className="w-full px-4 py-3 bg-white border border-[#8ecae6] rounded-xl text-[#023047] focus:outline-none focus:border-[#219ebc] focus:ring-2 focus:ring-[#219ebc]/20 transition-all">
                <option>24 hours notice required</option>
                <option>48 hours notice required</option>
                <option>No cancellation allowed</option>
                <option>Cancle any time</option>
              </select>
            </div>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white backdrop-blur-sm border border-[#8ecae6] rounded-2xl shadow-lg overflow-hidden"
        >
          <div className="px-6 py-5 border-b border-[#8ecae6] bg-[#f0f8fb]">
            <h2 className="text-lg font-bold text-[#023047]">Notifications</h2>
            <p className="text-sm text-[#023047]/70">
              Choose what alerts you want to receive.
            </p>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-gray-700">
                  New booking alerts
                </p>
                <p className="text-xs text-gray-500">
                  Get notified when a new appointment is booked
                </p>
              </div>
              <button className="relative inline-flex h-7 w-12 items-center rounded-full bg-violet-600 shadow-lg shadow-violet-500/30">
                <span className="inline-block h-5 w-5 transform translate-x-6 rounded-full bg-white transition" />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-gray-700">
                  Cancellation alerts
                </p>
                <p className="text-xs text-gray-500">
                  Get notified when an appointment is cancelled
                </p>
              </div>
              <button className="relative inline-flex h-7 w-12 items-center rounded-full bg-violet-600 shadow-lg shadow-violet-500/30">
                <span className="inline-block h-5 w-5 transform translate-x-6 rounded-full bg-white transition" />
              </button>
            </div>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white backdrop-blur-sm border border-[#8ecae6] rounded-2xl shadow-lg overflow-hidden"
        >
          <div className="px-6 py-5 border-b border-[#8ecae6] bg-[#f0f8fb] flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-bold text-[#023047]">
                Service Library
              </h2>
              <p className="text-sm text-[#023047]/70">
                Customize the services your salon offers, including visuals.
              </p>
            </div>
            <span className="text-xs font-semibold text-[#219ebc]">
              {services.length} active
            </span>
          </div>

          <div className="p-6 space-y-6">
            <form
              onSubmit={handleAddService}
              className="rounded-2xl border border-[#8ecae6]/60 bg-[#f0f8fb]/60 p-5 space-y-4"
            >
              <p className="text-sm font-semibold text-[#023047] flex items-center gap-2">
                <Plus size={16} />
                Add new service
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-bold text-[#023047] mb-1 uppercase tracking-wide">
                    Service name
                  </label>
                  <input
                    value={newService.name}
                    onChange={(e) =>
                      setNewService((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                    placeholder="Gel extensions"
                    className="w-full px-4 py-3 bg-white border border-[#8ecae6] rounded-xl text-[#023047] placeholder-[#023047]/50 focus:outline-none focus:border-[#219ebc] focus:ring-2 focus:ring-[#219ebc]/20 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#023047] mb-1 uppercase tracking-wide">
                    Duration (mins)
                  </label>
                  <div className="flex items-center gap-2">
                    <Clock size={16} className="text-[#219ebc]" />
                    <input
                      type="number"
                      min={15}
                      step={15}
                      value={newService.duration}
                      onChange={(e) =>
                        setNewService((prev) => ({
                          ...prev,
                          duration: Number(e.target.value),
                        }))
                      }
                      className="w-full px-4 py-3 bg-white border border-[#8ecae6] rounded-xl text-[#023047] placeholder-[#023047]/50 focus:outline-none focus:border-[#219ebc] focus:ring-2 focus:ring-[#219ebc]/20 transition-all"
                    />
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-[#023047] mb-1 uppercase tracking-wide">
                  Description
                </label>
                <textarea
                  value={newService.description}
                  onChange={(e) =>
                    setNewService((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  rows={3}
                  placeholder="Create a short intro for customers..."
                  className="w-full px-4 py-3 bg-white border border-[#8ecae6] rounded-xl text-[#023047] placeholder-[#023047]/50 focus:outline-none focus:border-[#219ebc] focus:ring-2 focus:ring-[#219ebc]/20 transition-all resize-none"
                />
              </div>
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-3">
                  {newService.image ? (
                    <img
                      src={newService.image}
                      alt="Preview"
                      className="h-16 w-16 rounded-xl object-cover border border-[#8ecae6]"
                    />
                  ) : (
                    <div className="h-16 w-16 rounded-xl border border-dashed border-[#8ecae6] flex items-center justify-center text-[#8ecae6]">
                      <ImagePlus size={20} />
                    </div>
                  )}
                  <input
                    ref={addImageInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleNewImageChange}
                  />
                  <button
                    type="button"
                    onClick={() => addImageInputRef.current?.click()}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-[#8ecae6] text-sm font-semibold text-[#023047] hover:border-[#219ebc]"
                  >
                    <Upload size={16} />
                    Upload image
                  </button>
                </div>
                {newService.image && (
                  <button
                    type="button"
                    onClick={() =>
                      setNewService((prev) => ({ ...prev, image: "" }))
                    }
                    className="text-xs font-semibold text-rose-500 hover:text-rose-600"
                  >
                    Remove image
                  </button>
                )}
              </div>

              <button
                type="submit"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-[#219ebc] to-[#8ecae6] text-white font-semibold shadow-lg shadow-[#219ebc]/30 hover:shadow-xl hover:shadow-[#219ebc]/40 transition-all"
              >
                <Plus size={18} />
                Add service
              </button>
            </form>

            <div className="space-y-4">
              {services.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-[#8ecae6] p-8 text-center text-sm text-[#023047]/60">
                  No services added yet. Use the form above to create your first
                  offering.
                </div>
              ) : (
                <div className="grid gap-4 lg:grid-cols-2">
                  {services.map((service) => {
                    const isEditingCard = editingService?.id === service.id;
                    return (
                      <div
                        key={service.id}
                        className="rounded-2xl border border-[#8ecae6]/60 bg-white/80 p-4 shadow-sm space-y-3"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            {isEditingCard ? (
                              <input
                                value={editingService?.name || ""}
                                onChange={(e) =>
                                  handleEditFieldChange("name", e.target.value)
                                }
                                className="w-full text-lg font-bold text-[#023047] bg-white border border-[#8ecae6] rounded-xl px-3 py-2 focus:outline-none focus:border-[#219ebc]"
                              />
                            ) : (
                              <h3 className="text-lg font-bold text-[#023047]">
                                {service.name}
                              </h3>
                            )}
                            <p className="text-xs uppercase tracking-wide text-[#023047]/60 mt-1">
                              {service.duration} mins
                            </p>
                          </div>
                          <div className="flex gap-2">
                            {isEditingCard ? (
                              <>
                                <button
                                  onClick={handleSaveEdit}
                                  className="p-2 rounded-xl bg-emerald-100 text-emerald-600 hover:bg-emerald-200"
                                >
                                  <Save size={16} />
                                </button>
                                <button
                                  onClick={handleCancelEdit}
                                  className="p-2 rounded-xl bg-slate-100 text-slate-500 hover:bg-slate-200"
                                >
                                  <X size={16} />
                                </button>
                              </>
                            ) : (
                              <>
                                <button
                                  onClick={() => setEditingService(service)}
                                  className="p-2 rounded-xl bg-[#f0f8fb] text-[#219ebc] hover:bg-[#e0f2f7]"
                                >
                                  <Edit2 size={16} />
                                </button>
                                <button
                                  onClick={() =>
                                    handleDeleteService(service.id)
                                  }
                                  className="p-2 rounded-xl bg-rose-50 text-rose-500 hover:bg-rose-100"
                                >
                                  <Trash2 size={16} />
                                </button>
                              </>
                            )}
                          </div>
                        </div>

                        <div className="flex gap-4">
                          {(
                            isEditingCard
                              ? editingService?.image
                              : service.image
                          ) ? (
                            <img
                              src={
                                isEditingCard
                                  ? editingService?.image
                                  : service.image
                              }
                              alt={service.name}
                              className="h-20 w-20 rounded-xl object-cover border border-[#8ecae6]"
                            />
                          ) : (
                            <div className="h-20 w-20 rounded-xl border border-dashed border-[#8ecae6] flex items-center justify-center text-[#8ecae6] text-xs">
                              No image
                            </div>
                          )}

                          <div className="flex-1">
                            {isEditingCard ? (
                              <textarea
                                value={editingService?.description || ""}
                                onChange={(e) =>
                                  handleEditFieldChange(
                                    "description",
                                    e.target.value
                                  )
                                }
                                rows={4}
                                className="w-full rounded-xl border border-[#8ecae6] px-3 py-2 text-sm text-[#023047] focus:outline-none focus:border-[#219ebc] resize-none bg-white"
                              />
                            ) : (
                              <p className="text-sm text-[#023047]/80">
                                {service.description}
                              </p>
                            )}
                            {isEditingCard ? (
                              <div className="mt-3 flex items-center gap-2 text-xs font-semibold text-[#023047]/70">
                                <Clock size={14} />
                                <input
                                  type="number"
                                  min={15}
                                  step={15}
                                  value={editingService?.duration || 30}
                                  onChange={(e) =>
                                    handleEditFieldChange(
                                      "duration",
                                      e.target.value
                                    )
                                  }
                                  className="w-28 rounded-xl border border-[#8ecae6] px-3 py-1 text-[#023047] focus:outline-none focus:border-[#219ebc]"
                                />
                                mins
                              </div>
                            ) : (
                              <div className="mt-3 flex flex-wrap gap-2 text-xs font-semibold text-[#023047]/70">
                                <span className="inline-flex items-center gap-1 rounded-full bg-[#f0f8fb] px-3 py-1">
                                  <Clock size={14} />
                                  {service.duration} mins
                                </span>
                              </div>
                            )}
                          </div>
                        </div>

                        {isEditingCard && (
                          <div className="flex flex-wrap items-center gap-3">
                            <label
                              htmlFor={`edit-image-${service.id}`}
                              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-dashed border-[#8ecae6] text-sm font-semibold text-[#023047] cursor-pointer hover:border-[#219ebc]"
                            >
                              <Upload size={16} />
                              Update image
                            </label>
                            <input
                              type="file"
                              id={`edit-image-${service.id}`}
                              className="hidden"
                              accept="image/*"
                              onChange={handleEditImageChange}
                            />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </motion.section>
      </main>
    </div>
  );
}
