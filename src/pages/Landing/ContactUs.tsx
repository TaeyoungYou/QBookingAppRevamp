import { motion } from "framer-motion";
import { Phone, Mail, MessageSquare, Clock, Check, Send } from "lucide-react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

// Select options for the "Topic" dropdown in the contact form
const serviceOptions = [
  "In-store booking",
  "Events & pop-ups",
  "Salon operations",
  "Partner integration",
];

// Primary contact methods shown in the left column
const contactMethods = [
  {
    icon: Phone,
    label: "Call us",
    value: "+1 (555) 015-1024",
    link: "tel:+15550151024",
  },
  {
    icon: Mail,
    label: "Email",
    value: "support@qbooking.app",
    link: "mailto:support@qbooking.app",
  },
];

// Contact page layout with hero copy, contact methods, and lead form
const ContactUs = () => {
  return (
    <div className="bg-body min-h-screen flex flex-col">
      <Header />

      {/* Background decor: soft blobs to add depth without interfering with content */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-10 h-96 w-96 rounded-full bg-blueGreen/5 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-skyBlue/10 blur-[120px]" />
      </div>

      <main className="flex-1 relative z-10 pt-38 pb-20 px-6">
        <div className="mx-auto max-w-6xl">
          {/* Page Header */}
          <div className="text-center mb-16 space-y-4">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xs uppercase tracking-[0.4em] text-blueGreen font-semibold"
            >
              Get in touch
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold text-prussianBlue leading-tight"
            >
              Have a question? <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-prussianBlue to-skyBlue">
                Let's start a conversation.
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-gray-600 max-w-2xl mx-auto"
            >
              We respond within 24h to every request—whether you are live or
              launching.
            </motion.p>
          </div>

          <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 items-start">
            {/* Left Column: Info & Methods */}
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="rounded-[32px] border border-slate-100 bg-white p-8 shadow-xl shadow-slate-200/40 relative overflow-hidden"
              >
                {/* Decorative blob for subtle depth */}
                <div className="absolute top-0 right-0 h-32 w-32 bg-blueGreen/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />

                <div className="relative">
                  <div className="flex items-center justify-between mb-6">
                    <div className="space-y-1">
                      <p className="text-xs uppercase tracking-[0.2em] text-gray-400 font-semibold">
                        Schedule
                      </p>
                      <h2 className="text-xl font-bold text-prussianBlue">
                        Book a live demo
                      </h2>
                    </div>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-blueGreen/10 px-3 py-1 text-xs font-semibold text-blueGreen">
                      <Clock size={14} /> 24h reply
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-6">
                    Choose a time that fits your team and we will walk through
                    onboarding, product fit, or deeper technical details.
                  </p>
                  {/* Quick interest tags (non-interactive in current version) */}
                  <div className="flex flex-wrap gap-3">
                    {["Live demo", "Custom quote", "Tech support"].map(
                      (label) => (
                        <button
                          key={label}
                          className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-prussianBlue shadow-sm transition hover:border-blueGreen hover:text-blueGreen hover:shadow-md"
                        >
                          {label}
                        </button>
                      )
                    )}
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="grid gap-4"
              >
                {/* Contact methods list (tel / mailto links) */}
                {contactMethods.map((method) => (
                  <a
                    key={method.label}
                    href={method.link}
                    target={method.label === "Visit" ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-lg shadow-slate-200/20 transition-all hover:border-blueGreen/30 hover:shadow-blueGreen/10 hover:-translate-y-1"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blueGreen/10 text-blueGreen">
                      <method.icon size={20} />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase text-gray-400 tracking-wide">
                        {method.label}
                      </p>
                      <p className="font-semibold text-prussianBlue">
                        {method.value}
                      </p>
                    </div>
                  </a>
                ))}
              </motion.div>
            </div>

            {/* Right Column: Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="rounded-[32px] border border-white bg-white/60 backdrop-blur-xl p-8 sm:p-10 shadow-2xl shadow-slate-200/50"
            >
              {/* Lead capture form (UI only; no submit handler wired yet) */}
              <form className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <label className="flex flex-col gap-2">
                    <span className="text-sm font-semibold text-prussianBlue">
                      Full name
                    </span>
                    <input
                      type="text"
                      placeholder="Jordan Rivers"
                      className="rounded-xl border border-slate-200 bg-white/50 px-4 py-3.5 text-sm outline-none transition focus:border-blueGreen focus:ring-4 focus:ring-blueGreen/10"
                    />
                  </label>
                  <label className="flex flex-col gap-2">
                    <span className="text-sm font-semibold text-prussianBlue">
                      Business email
                    </span>
                    <input
                      type="email"
                      placeholder="hello@salon.com"
                      className="rounded-xl border border-slate-200 bg-white/50 px-4 py-3.5 text-sm outline-none transition focus:border-blueGreen focus:ring-4 focus:ring-blueGreen/10"
                    />
                  </label>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <label className="flex flex-col gap-2">
                    <span className="text-sm font-semibold text-prussianBlue">
                      Phone number
                    </span>
                    {/* Phone input with inline icon */}
                    <div className="relative">
                      <Phone
                        size={16}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                      />
                      <input
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                        className="w-full rounded-xl border border-slate-200 bg-white/50 pl-11 pr-4 py-3.5 text-sm outline-none transition focus:border-blueGreen focus:ring-4 focus:ring-blueGreen/10"
                      />
                    </div>
                  </label>
                  <label className="flex flex-col gap-2">
                    <span className="text-sm font-semibold text-prussianBlue">
                      Topic
                    </span>
                    {/* Service topic selector */}
                    <div className="relative">
                      <select className="w-full appearance-none rounded-xl border border-slate-200 bg-white/50 px-4 py-3.5 text-sm outline-none transition focus:border-blueGreen focus:ring-4 focus:ring-blueGreen/10 cursor-pointer">
                        {serviceOptions.map((option) => (
                          <option key={option}>{option}</option>
                        ))}
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 12 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M2.5 4.5L6 8L9.5 4.5"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </div>
                  </label>
                </div>

                <label className="flex flex-col gap-2">
                  <span className="text-sm font-semibold text-prussianBlue">
                    Message
                  </span>
                  {/* Free-form message for qualification */}
                  <textarea
                    rows={4}
                    placeholder="Describe your current challenges or desired launch date..."
                    className="w-full rounded-2xl border border-slate-200 bg-white/50 px-4 py-3 text-sm outline-none transition focus:border-blueGreen focus:ring-4 focus:ring-blueGreen/10 resize-none"
                  ></textarea>
                </label>

                <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                  {/* Lightweight trust cues */}
                  <div className="flex gap-4">
                    <div className="flex items-center gap-2 text-xs font-medium text-gray-500">
                      <MessageSquare size={14} className="text-blueGreen" />
                      <span>Avg. reply: 2h</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-medium text-gray-500">
                      <Check size={14} className="text-blueGreen" />
                      <span>GDPR Secure</span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 rounded-xl bg-linear-to-r from-blueGreen to-skyBlue px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blueGreen/20 transition hover:-translate-y-0.5 hover:shadow-blueGreen/40 active:translate-y-0"
                  >
                    Send Request
                    <Send size={16} />
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ContactUs;
