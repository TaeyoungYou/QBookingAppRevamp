import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import {
  Calendar,
  Clock,
  User,
  Mail,
  Phone,
  MapPin,
  ChevronRight,
  ChevronLeft,
  X,
  Check,
} from "lucide-react";

interface Appointment {
  id: string;
  name: string;
  email: string;
  phone: string;
  industry: string;
  location: string;
  service: string;
  date: string;
  time: string;
  staff: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
}

const industries = [
  {
    value: "restaurant",
    label: "Restaurant",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop",
    description: "Book your table for an amazing dining experience",
  },
  {
    value: "fitness",
    label: "Fitness & Gym",
    image:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=300&fit=crop",
    description: "Schedule your workout sessions and classes",
  },
  {
    value: "doctor",
    label: "Medical & Healthcare",
    image:
      "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=400&h=300&fit=crop",
    description: "Book appointments with healthcare professionals",
  },
  {
    value: "beauty",
    label: "Beauty & Spa",
    image:
      "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=300&fit=crop",
    description: "Pamper yourself with beauty treatments",
  },
  {
    value: "salon",
    label: "Hair Salon",
    image:
      "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=400&h=300&fit=crop",
    description: "Get the perfect haircut and styling",
  },
  {
    value: "dental",
    label: "Dental Care",
    image:
      "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=400&h=300&fit=crop",
    description: "Schedule your dental checkup and treatments",
  },
];

const locations: Record<
  string,
  { name: string; description: string; address: string; image: string }[]
> = {
  restaurant: [
    {
      name: "Downtown",
      description: "Located in the heart of the city center",
      address: "123 Main Street, Downtown District",
      image:
        "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=300&fit=crop",
    },
    {
      name: "Uptown",
      description: "Modern dining in the business district",
      address: "456 Business Ave, Uptown Plaza",
      image:
        "https://images.unsplash.com/photo-1592861956120-e524fc739696?w=400&h=300&fit=crop",
    },
    {
      name: "Beach Front",
      description: "Stunning ocean views and fresh seafood",
      address: "789 Coastal Road, Beach District",
      image:
        "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400&h=300&fit=crop",
    },
    {
      name: "Mall Area",
      description: "Convenient shopping mall location",
      address: "321 Shopping Center, Mall Level 2",
      image:
        "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=400&h=300&fit=crop",
    },
  ],
  fitness: [
    {
      name: "City Center",
      description: "Premium gym with state-of-the-art equipment",
      address: "100 Fitness Street, Downtown",
      image:
        "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=300&fit=crop",
    },
    {
      name: "North Branch",
      description: "Spacious facility with olympic pool",
      address: "200 North Avenue, North District",
      image:
        "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=400&h=300&fit=crop",
    },
    {
      name: "South Branch",
      description: "24/7 access with personal training",
      address: "300 South Road, South District",
      image:
        "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=400&h=300&fit=crop",
    },
  ],
  doctor: [
    {
      name: "Main Hospital",
      description: "Full-service medical center",
      address: "500 Health Boulevard, Medical District",
      image:
        "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400&h=300&fit=crop",
    },
    {
      name: "Clinic A",
      description: "Specialist clinic for general practice",
      address: "600 Care Street, Downtown",
      image:
        "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=400&h=300&fit=crop",
    },
    {
      name: "Health Center",
      description: "Community health and wellness",
      address: "700 Wellness Way, Community District",
      image:
        "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=400&h=300&fit=crop",
    },
  ],
  beauty: [
    {
      name: "Spa Downtown",
      description: "Luxury spa in the city center",
      address: "800 Beauty Lane, Downtown",
      image:
        "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=300&fit=crop",
    },
    {
      name: "Luxury Spa",
      description: "Premium treatments and relaxation",
      address: "900 Luxury Boulevard, Uptown",
      image:
        "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&h=300&fit=crop",
    },
    {
      name: "Resort Spa",
      description: "Full-day spa resort experience",
      address: "1000 Resort Road, Spa District",
      image:
        "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=400&h=300&fit=crop",
    },
  ],
  salon: [
    {
      name: "Main Street",
      description: "Trendy salon with expert stylists",
      address: "1100 Main Street, Fashion District",
      image:
        "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=400&h=300&fit=crop",
    },
    {
      name: "Plaza",
      description: "Modern salon in shopping plaza",
      address: "1200 Plaza Avenue, Shopping District",
      image:
        "https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?w=400&h=300&fit=crop",
    },
  ],
  dental: [
    {
      name: "Dental Clinic 1",
      description: "Family dentistry and orthodontics",
      address: "1300 Dental Street, Medical District",
      image:
        "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=400&h=300&fit=crop",
    },
    {
      name: "Kids Dental",
      description: "Specialized pediatric dental care",
      address: "1400 Kids Way, Family District",
      image:
        "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=400&h=300&fit=crop",
    },
  ],
};

const services: Record<
  string,
  { name: string; description: string; duration: string; image: string }[]
> = {
  restaurant: [
    {
      name: "Table for 2",
      description: "Intimate dining experience for two guests",
      duration: "2 hours",
      image:
        "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop",
    },
    {
      name: "Table for 4",
      description: "Perfect for family or friends gathering",
      duration: "2-3 hours",
      image:
        "https://images.unsplash.com/photo-1555244162-803834f70033?w=400&h=300&fit=crop",
    },
    {
      name: "Private Room",
      description: "Exclusive private dining room for special occasions",
      duration: "3-4 hours",
      image:
        "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=400&h=300&fit=crop",
    },
  ],
  fitness: [
    {
      name: "Personal Training",
      description: "One-on-one session with certified trainer",
      duration: "60 mins",
      image:
        "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=300&fit=crop",
    },
    {
      name: "Group Class",
      description: "High-energy group fitness session",
      duration: "45 mins",
      image:
        "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=300&fit=crop",
    },
    {
      name: "Yoga",
      description: "Relaxing yoga and meditation class",
      duration: "60 mins",
      image:
        "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop",
    },
    {
      name: "Swimming",
      description: "Lap swimming or aqua fitness",
      duration: "45 mins",
      image:
        "https://images.unsplash.com/photo-1576610616656-d3aa5d1f4534?w=400&h=300&fit=crop",
    },
  ],
  doctor: [
    {
      name: "General Checkup",
      description: "Comprehensive health examination",
      duration: "30 mins",
      image:
        "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=400&h=300&fit=crop",
    },
    {
      name: "Consultation",
      description: "Medical consultation with specialist",
      duration: "20 mins",
      image:
        "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&h=300&fit=crop",
    },
    {
      name: "Vaccination",
      description: "Immunization and vaccination service",
      duration: "15 mins",
      image:
        "https://images.unsplash.com/photo-1632053002928-e1d6d8d30300?w=400&h=300&fit=crop",
    },
  ],
  beauty: [
    {
      name: "Facial Treatment",
      description: "Deep cleansing and rejuvenating facial",
      duration: "90 mins",
      image:
        "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400&h=300&fit=crop",
    },
    {
      name: "Full Body Massage",
      description: "Relaxing full body massage therapy",
      duration: "120 mins",
      image:
        "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&h=300&fit=crop",
    },
    {
      name: "Manicure & Pedicure",
      description: "Complete nail care and styling",
      duration: "60 mins",
      image:
        "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400&h=300&fit=crop",
    },
  ],
  salon: [
    {
      name: "Haircut",
      description: "Professional haircut and styling",
      duration: "45 mins",
      image:
        "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=300&fit=crop",
    },
    {
      name: "Hair Coloring",
      description: "Full color treatment with premium products",
      duration: "120 mins",
      image:
        "https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=400&h=300&fit=crop",
    },
    {
      name: "Hair Treatment",
      description: "Deep conditioning and repair treatment",
      duration: "60 mins",
      image:
        "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=400&h=300&fit=crop",
    },
  ],
  dental: [
    {
      name: "Cleaning",
      description: "Professional teeth cleaning and polishing",
      duration: "45 mins",
      image:
        "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=400&h=300&fit=crop",
    },
    {
      name: "Checkup",
      description: "Comprehensive dental examination",
      duration: "30 mins",
      image:
        "https://images.unsplash.com/photo-1629909615957-be38e9e2f4af?w=400&h=300&fit=crop",
    },
    {
      name: "Whitening",
      description: "Professional teeth whitening treatment",
      duration: "60 mins",
      image:
        "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=400&h=300&fit=crop",
    },
  ],
};

const availableStaff: Record<
  string,
  { name: string; role: string; bio: string; image: string; rating: number }[]
> = {
  restaurant: [
    {
      name: "Table 1",
      role: "Window Seating",
      bio: "Prime window view overlooking the city skyline",
      image:
        "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=200&h=200&fit=crop",
      rating: 5,
    },
    {
      name: "Table 2",
      role: "Garden View",
      bio: "Peaceful garden terrace seating area",
      image:
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=200&h=200&fit=crop",
      rating: 5,
    },
    {
      name: "Table 3",
      role: "Bar Side",
      bio: "Vibrant atmosphere near the bar area",
      image:
        "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=200&h=200&fit=crop",
      rating: 4,
    },
  ],
  fitness: [
    {
      name: "Trainer John",
      role: "Senior Fitness Coach",
      bio: "10+ years experience in strength training and nutrition",
      image:
        "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=200&h=200&fit=crop",
      rating: 5,
    },
    {
      name: "Trainer Sarah",
      role: "Yoga & Pilates Instructor",
      bio: "Certified yoga instructor specializing in mindfulness",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
      rating: 5,
    },
    {
      name: "Trainer Mike",
      role: "CrossFit Specialist",
      bio: "High-intensity training and athletic performance",
      image:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop",
      rating: 4,
    },
  ],
  doctor: [
    {
      name: "Dr. Smith",
      role: "General Practitioner",
      bio: "15 years in family medicine and preventive care",
      image:
        "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&h=200&fit=crop",
      rating: 5,
    },
    {
      name: "Dr. Johnson",
      role: "Internal Medicine",
      bio: "Specialist in chronic disease management",
      image:
        "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&h=200&fit=crop",
      rating: 5,
    },
    {
      name: "Dr. Williams",
      role: "Pediatrician",
      bio: "Dedicated to children's health and wellbeing",
      image:
        "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=200&h=200&fit=crop",
      rating: 5,
    },
  ],
  beauty: [
    {
      name: "Therapist Anna",
      role: "Senior Spa Therapist",
      bio: "Expert in aromatherapy and relaxation techniques",
      image:
        "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200&h=200&fit=crop",
      rating: 5,
    },
    {
      name: "Therapist Emma",
      role: "Facial Specialist",
      bio: "Certified esthetician with focus on skincare",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop",
      rating: 5,
    },
    {
      name: "Therapist Lisa",
      role: "Massage Therapist",
      bio: "Deep tissue and Swedish massage specialist",
      image:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop",
      rating: 4,
    },
  ],
  salon: [
    {
      name: "Stylist Alex",
      role: "Master Stylist",
      bio: "Award-winning stylist with 12+ years experience",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop",
      rating: 5,
    },
    {
      name: "Stylist Jessica",
      role: "Color Specialist",
      bio: "Expert in balayage and creative color techniques",
      image:
        "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=200&h=200&fit=crop",
      rating: 5,
    },
    {
      name: "Stylist David",
      role: "Men's Grooming Expert",
      bio: "Specialized in men's cuts and beard styling",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
      rating: 4,
    },
  ],
  dental: [
    {
      name: "Dr. Davis",
      role: "Chief Dentist",
      bio: "20+ years in cosmetic and restorative dentistry",
      image:
        "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=200&h=200&fit=crop",
      rating: 5,
    },
    {
      name: "Dr. Miller",
      role: "Orthodontist",
      bio: "Specialist in braces and teeth alignment",
      image:
        "https://images.unsplash.com/photo-1622253694242-abeb37a33e97?w=200&h=200&fit=crop",
      rating: 5,
    },
    {
      name: "Dr. Wilson",
      role: "Pediatric Dentist",
      bio: "Gentle care for children and adolescents",
      image:
        "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=200&h=200&fit=crop",
      rating: 5,
    },
  ],
};

const Appoiment = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    industry: "",
    location: "",
    service: "",
    date: "",
    time: "",
    staff: "",
  });

  const getAvailableTimes = () => {
    const times = [];
    for (let hour = 9; hour <= 17; hour++) {
      times.push(`${hour.toString().padStart(2, "0")}:00`);
      if (hour < 17) times.push(`${hour.toString().padStart(2, "0")}:30`);
    }
    return times;
  };

  const handleSubmit = () => {
    const newAppointment: Appointment = {
      id: Date.now().toString(),
      ...formData,
      status: "pending",
    };
    setAppointments((prev) => [...prev, newAppointment]);
    setFormData({
      name: "",
      email: "",
      phone: "",
      industry: "",
      location: "",
      service: "",
      date: "",
      time: "",
      staff: "",
    });
    setShowForm(false);
    setCurrentStep(1);
  };

  const nextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 5));
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const resetForm = () => {
    setShowForm(false);
    setCurrentStep(1);
    setFormData({
      name: "",
      email: "",
      phone: "",
      industry: "",
      location: "",
      service: "",
      date: "",
      time: "",
      staff: "",
    });
  };

  const handleCancel = (id: string) => {
    setAppointments((prev) =>
      prev.map((apt) => (apt.id === id ? { ...apt, status: "cancelled" } : apt))
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800 border-green-300";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "completed":
        return "bg-blue-100 text-blue-800 border-blue-300";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "confirmed":
        return "Confirmed";
      case "pending":
        return "Pending";
      case "completed":
        return "Completed";
      case "cancelled":
        return "Cancelled";
      default:
        return status;
    }
  };

  const steps = [
    { number: 1, label: "Industry" },
    { number: 2, label: "Location" },
    { number: 3, label: "Service" },
    { number: 4, label: "Date & Time" },
    { number: 5, label: "Staff & Contact" },
  ];

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.industry !== "";
      case 2:
        return formData.location !== "";
      case 3:
        return formData.service !== "";
      case 4:
        return formData.date !== "" && formData.time !== "";
      case 5:
        return (
          formData.staff !== "" &&
          formData.name !== "" &&
          formData.email !== "" &&
          formData.phone !== ""
        );
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-body">
      <Header />

      {/* Hero Section */}
      <section className="w-full min-h-[50vh] pt-32 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-9/12 md:w-3/4 mx-auto"
        >
          <div className="max-w-3xl">
            <h1 className="font-inter text-4xl sm:text-5xl lg:text-6xl font-bold text-prussianBlue leading-tight mb-6">
              Book Your Appointment with Ease
            </h1>
            <p className="text-xl text-prussianBlue/70 font-inter leading-relaxed mb-8">
              Schedule appointments for restaurants, fitness centers, medical
              services, spas, and more — all in one seamless experience.
            </p>
            <motion.button
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ duration: 0.3, type: "spring", stiffness: 100 }}
              onClick={() => setShowForm(true)}
              className="bg-skyBlue text-prussianBlue px-8 py-4 rounded-full font-inter font-semibold text-lg inline-flex items-center gap-2 shadow-md hover:shadow-lg transition-all"
            >
              <Calendar className="w-5 h-5" />
              Book Now
            </motion.button>
          </div>
        </motion.div>
      </section>

      {/* Main Content */}
      <section className="w-full py-12 pb-20 bg-body">
        {/* Multi-Step Booking Form Modal */}
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
            onClick={resetForm}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-body rounded-3xl shadow-2xl max-w-4xl w-full my-8"
            >
              {/* Header with Progress */}
              <div className="bg-prussianBlue text-white p-6 rounded-t-3xl">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="text-2xl font-bold font-inter">
                      Book Appointment
                    </h2>
                    <p className="text-white/80 mt-1 font-inter">
                      Step {currentStep} of 5
                    </p>
                  </div>
                  <button
                    onClick={resetForm}
                    className="p-2 hover:bg-white/10 rounded-full transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Progress Steps */}
                <div className="flex items-center justify-between">
                  {steps.map((step, index) => (
                    <div key={step.number} className="flex items-center flex-1">
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                            currentStep > step.number
                              ? "bg-skyBlue text-prussianBlue"
                              : currentStep === step.number
                              ? "bg-skyBlue text-prussianBlue ring-4 ring-skyBlue/30"
                              : "bg-white/20 text-white/60"
                          }`}
                        >
                          {currentStep > step.number ? (
                            <Check className="w-5 h-5" />
                          ) : (
                            step.number
                          )}
                        </div>
                        <span
                          className={`text-xs mt-2 hidden md:block ${
                            currentStep >= step.number
                              ? "text-white"
                              : "text-white/60"
                          }`}
                        >
                          {step.label}
                        </span>
                      </div>
                      {index < steps.length - 1 && (
                        <div
                          className={`h-1 flex-1 mx-2 rounded ${
                            currentStep > step.number
                              ? "bg-white"
                              : "bg-white/20"
                          }`}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Form Content */}
              <div className="p-8 min-h-[400px]">
                <AnimatePresence mode="wait">
                  {/* Step 1: Choose Industry */}
                  {currentStep === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                    >
                      <h3 className="text-2xl font-bold text-prussianBlue mb-2 font-inter">
                        Choose Your Industry
                      </h3>
                      <p className="text-prussianBlue/70 mb-6 font-inter">
                        Select the type of service you're looking for
                      </p>
                      <div className="grid md:grid-cols-3 gap-4">
                        {industries.map((industry) => (
                          <motion.button
                            key={industry.value}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => {
                              setFormData((prev) => ({
                                ...prev,
                                industry: industry.value,
                                location: "",
                                service: "",
                              }));
                            }}
                            className={`relative overflow-hidden rounded-2xl border-2 transition-all ${
                              formData.industry === industry.value
                                ? "border-skyBlue ring-4 ring-skyBlue/20 shadow-lg"
                                : "border-gray-200 hover:border-skyBlue/50 hover:shadow-md"
                            }`}
                          >
                            <img
                              src={industry.image}
                              alt={industry.label}
                              className="w-full h-40 object-cover"
                            />
                            <div className="p-4 bg-body">
                              <h4 className="font-bold text-prussianBlue mb-1 font-inter">
                                {industry.label}
                              </h4>
                              <p className="text-sm text-prussianBlue/70 font-inter">
                                {industry.description}
                              </p>
                            </div>
                            {formData.industry === industry.value && (
                              <div className="absolute top-3 right-3 bg-skyBlue text-prussianBlue rounded-full p-1">
                                <Check className="w-5 h-5" />
                              </div>
                            )}
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Step 2: Choose Location */}
                  {currentStep === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                    >
                      <h3 className="text-2xl font-bold text-prussianBlue mb-2 font-inter">
                        Select Location
                      </h3>
                      <p className="text-prussianBlue/70 mb-6 font-inter">
                        Choose your preferred location
                      </p>
                      <div className="grid md:grid-cols-2 gap-4">
                        {locations[formData.industry]?.map(
                          (location, index) => (
                            <motion.button
                              key={location.name}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.1 }}
                              whileHover={{ scale: 1.03, y: -5 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => {
                                setFormData((prev) => ({
                                  ...prev,
                                  location: location.name,
                                }));
                              }}
                              className={`relative overflow-hidden rounded-2xl border-2 transition-all text-left ${
                                formData.location === location.name
                                  ? "border-skyBlue ring-4 ring-skyBlue/20 shadow-lg"
                                  : "border-gray-200 hover:border-skyBlue/50 hover:shadow-md"
                              }`}
                            >
                              <div className="relative h-32 overflow-hidden">
                                <img
                                  src={location.image}
                                  alt={location.name}
                                  className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
                                <div className="absolute bottom-2 left-3">
                                  <MapPin className="w-5 h-5 text-white" />
                                </div>
                              </div>
                              <div className="p-4 bg-body">
                                <h4 className="font-bold text-prussianBlue mb-1 font-inter text-lg">
                                  {location.name}
                                </h4>
                                <p className="text-sm text-prussianBlue/70 font-inter mb-2">
                                  {location.description}
                                </p>
                                <p className="text-xs text-prussianBlue/50 font-inter flex items-center gap-1">
                                  <MapPin className="w-3 h-3" />
                                  {location.address}
                                </p>
                              </div>
                              {formData.location === location.name && (
                                <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  className="absolute top-3 right-3 bg-skyBlue text-prussianBlue rounded-full p-1.5"
                                >
                                  <Check className="w-5 h-5" />
                                </motion.div>
                              )}
                            </motion.button>
                          )
                        )}
                      </div>
                    </motion.div>
                  )}

                  {/* Step 3: Choose Service */}
                  {currentStep === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                    >
                      <h3 className="text-2xl font-bold text-prussianBlue mb-2 font-inter">
                        Select Service
                      </h3>
                      <p className="text-prussianBlue/70 mb-6 font-inter">
                        What service do you need?
                      </p>
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {services[formData.industry]?.map((service, index) => (
                          <motion.button
                            key={service.name}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1, type: "spring" }}
                            whileHover={{ scale: 1.05, y: -8 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => {
                              setFormData((prev) => ({
                                ...prev,
                                service: service.name,
                              }));
                            }}
                            className={`relative overflow-hidden rounded-2xl border-2 transition-all text-left ${
                              formData.service === service.name
                                ? "border-skyBlue ring-4 ring-skyBlue/20 shadow-lg"
                                : "border-gray-200 hover:border-skyBlue/50 hover:shadow-md"
                            }`}
                          >
                            <div className="relative h-32 overflow-hidden">
                              <img
                                src={service.image}
                                alt={service.name}
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent" />
                              <div className="absolute bottom-2 left-3 right-3">
                                <span className="text-white text-xs font-semibold bg-prussianBlue/70 px-2 py-1 rounded-full">
                                  {service.duration}
                                </span>
                              </div>
                            </div>
                            <div className="p-4 bg-body">
                              <h4 className="font-bold text-prussianBlue mb-1 font-inter">
                                {service.name}
                              </h4>
                              <p className="text-xs text-prussianBlue/70 font-inter">
                                {service.description}
                              </p>
                            </div>
                            {formData.service === service.name && (
                              <motion.div
                                initial={{ scale: 0, rotate: -180 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{ type: "spring", stiffness: 200 }}
                                className="absolute top-3 right-3 bg-skyBlue text-prussianBlue rounded-full p-1.5 shadow-lg"
                              >
                                <Check className="w-4 h-4" />
                              </motion.div>
                            )}
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Step 4: Choose Date & Time */}
                  {currentStep === 4 && (
                    <motion.div
                      key="step4"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                    >
                      <h3 className="text-2xl font-bold text-prussianBlue mb-2 font-inter">
                        Select Date & Time
                      </h3>
                      <p className="text-prussianBlue/70 mb-6 font-inter">
                        When would you like to visit?
                      </p>

                      <div className="grid md:grid-cols-2 gap-6">
                        {/* Date Selection */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="bg-linear-to-br from-white to-skyBlue/5 border-2 border-skyBlue/20 rounded-2xl p-6 shadow-lg h-fit"
                        >
                          <div className="flex items-center justify-between mb-4">
                            <label className="flex items-center gap-2 text-base font-bold text-prussianBlue font-inter">
                              <div className="p-2 bg-skyBlue/20 rounded-lg">
                                <Calendar className="w-5 h-5 text-skyBlue" />
                              </div>
                              Select Date
                            </label>
                            {formData.date && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold"
                              >
                                ✓ Selected
                              </motion.div>
                            )}
                          </div>

                          {/* Custom Date Input with Better Styling */}
                          <div className="relative">
                            <input
                              type="date"
                              value={formData.date}
                              onChange={(e) =>
                                setFormData((prev) => ({
                                  ...prev,
                                  date: e.target.value,
                                }))
                              }
                              min={new Date().toISOString().split("T")[0]}
                              className="w-full px-5 py-4 border-2 border-skyBlue/30 rounded-xl focus:border-skyBlue focus:ring-4 focus:ring-skyBlue/10 focus:outline-none transition-all text-lg font-inter text-prussianBlue bg-white shadow-sm hover:shadow-md cursor-pointer"
                              style={{
                                colorScheme: "light",
                              }}
                            />
                          </div>

                          {/* Selected Date Display */}
                          {formData.date && (
                            <motion.div
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="mt-4 p-4 bg-skyBlue/10 border-2 border-skyBlue/30 rounded-xl relative overflow-hidden"
                            >
                              <div className="absolute top-0 right-0 w-20 h-20 bg-skyBlue/10 rounded-full -mr-10 -mt-10" />
                              <div className="relative">
                                <p className="text-xs text-prussianBlue/60 font-inter mb-1 font-semibold">
                                  YOUR APPOINTMENT
                                </p>
                                <p className="text-prussianBlue font-bold font-inter text-lg">
                                  {new Date(formData.date).toLocaleDateString(
                                    "en-US",
                                    {
                                      weekday: "long",
                                      month: "long",
                                      day: "numeric",
                                      year: "numeric",
                                    }
                                  )}
                                </p>
                                <div className="flex items-center gap-2 mt-2">
                                  <div className="h-1 w-12 bg-skyBlue rounded-full" />
                                  <span className="text-xs text-prussianBlue/60 font-inter">
                                    {Math.ceil(
                                      (new Date(formData.date).getTime() -
                                        new Date().getTime()) /
                                        (1000 * 60 * 60 * 24)
                                    )}{" "}
                                    days from now
                                  </span>
                                </div>
                              </div>
                            </motion.div>
                          )}

                          {/* Quick Date Selection Hints */}
                          {!formData.date && (
                            <div className="mt-4 space-y-2">
                              <p className="text-xs text-prussianBlue/50 font-inter mb-2">
                                Quick select:
                              </p>
                              <div className="flex gap-2">
                                {["Today", "Tomorrow", "Next Week"].map(
                                  (label, index) => {
                                    const date = new Date();
                                    if (label === "Tomorrow")
                                      date.setDate(date.getDate() + 1);
                                    if (label === "Next Week")
                                      date.setDate(date.getDate() + 7);

                                    return (
                                      <motion.button
                                        key={label}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: index * 0.1 }}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() =>
                                          setFormData((prev) => ({
                                            ...prev,
                                            date: date
                                              .toISOString()
                                              .split("T")[0],
                                          }))
                                        }
                                        className="px-3 py-2 bg-skyBlue/10 hover:bg-skyBlue/20 text-prussianBlue text-xs font-semibold rounded-lg transition-colors border border-skyBlue/20"
                                      >
                                        {label}
                                      </motion.button>
                                    );
                                  }
                                )}
                              </div>
                            </div>
                          )}
                        </motion.div>

                        {/* Time Selection */}
                        <div>
                          <h4 className="font-bold text-prussianBlue mb-3 flex items-center gap-2 font-inter">
                            <Clock className="w-5 h-5 text-skyBlue" />
                            Available Times
                          </h4>
                          <AnimatePresence>
                            {formData.date ? (
                              <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="grid grid-cols-3 gap-2 max-h-96 overflow-y-auto"
                              >
                                {getAvailableTimes().map((time, index) => (
                                  <motion.button
                                    key={time}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{
                                      delay: index * 0.03,
                                      type: "spring",
                                    }}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() =>
                                      setFormData((prev) => ({
                                        ...prev,
                                        time: time,
                                      }))
                                    }
                                    className={`p-3 rounded-xl font-semibold transition-all font-inter ${
                                      formData.time === time
                                        ? "bg-skyBlue text-prussianBlue shadow-md ring-2 ring-skyBlue/50"
                                        : "bg-gray-100 text-prussianBlue/70 hover:bg-gray-200"
                                    }`}
                                  >
                                    {time}
                                  </motion.button>
                                ))}
                              </motion.div>
                            ) : (
                              <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-center py-12 text-prussianBlue/50 font-inter"
                              >
                                <Calendar className="w-12 h-12 mx-auto mb-3 text-prussianBlue/30" />
                                <p>Please select a date first</p>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>

                      {formData.date && formData.time && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-6 p-4 bg-skyBlue/10 border border-skyBlue/30 rounded-xl text-center"
                        >
                          <p className="text-prussianBlue font-semibold font-inter">
                            ✓{" "}
                            {new Date(formData.date).toLocaleDateString(
                              "en-US",
                              {
                                weekday: "long",
                                month: "long",
                                day: "numeric",
                              }
                            )}{" "}
                            at {formData.time}
                          </p>
                        </motion.div>
                      )}
                    </motion.div>
                  )}

                  {/* Step 5: Staff Selection & Contact Info */}
                  {currentStep === 5 && (
                    <motion.div
                      key="step5"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                    >
                      <h3 className="text-2xl font-bold text-prussianBlue mb-2 font-inter">
                        Choose Your Professional & Confirm Details
                      </h3>
                      <p className="text-prussianBlue/70 mb-6 font-inter">
                        Select your preferred staff and provide your contact
                        information
                      </p>

                      {/* Staff Selection with Profiles */}
                      <div className="mb-8">
                        <h4 className="font-bold text-prussianBlue mb-4 flex items-center gap-2 font-inter text-lg">
                          <User className="w-6 h-6 text-skyBlue" />
                          Available Staff
                        </h4>
                        <div className="grid md:grid-cols-3 gap-4">
                          {availableStaff[formData.industry]?.map(
                            (staff, index) => (
                              <motion.button
                                key={staff.name}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ scale: 1.05, y: -5 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() =>
                                  setFormData((prev) => ({
                                    ...prev,
                                    staff: staff.name,
                                  }))
                                }
                                className={`relative overflow-hidden rounded-2xl border-2 transition-all text-left ${
                                  formData.staff === staff.name
                                    ? "border-skyBlue ring-4 ring-skyBlue/20 shadow-lg"
                                    : "border-gray-200 hover:border-skyBlue/50 hover:shadow-md"
                                }`}
                              >
                                <div className="relative h-32 overflow-hidden">
                                  <img
                                    src={staff.image}
                                    alt={staff.name}
                                    className="w-full h-full object-cover"
                                  />
                                  <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent" />
                                  <div className="absolute bottom-2 left-3">
                                    <div className="flex gap-0.5">
                                      {[...Array(5)].map((_, i) => (
                                        <span
                                          key={i}
                                          className={`text-xs ${
                                            i < staff.rating
                                              ? "text-yellow-400"
                                              : "text-gray-400"
                                          }`}
                                        >
                                          ★
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                                <div className="p-4 bg-body">
                                  <h5 className="font-bold text-prussianBlue font-inter">
                                    {staff.name}
                                  </h5>
                                  <p className="text-xs text-skyBlue font-inter mb-2">
                                    {staff.role}
                                  </p>
                                  <p className="text-xs text-prussianBlue/70 font-inter">
                                    {staff.bio}
                                  </p>
                                </div>
                                {formData.staff === staff.name && (
                                  <motion.div
                                    initial={{ scale: 0, rotate: -180 }}
                                    animate={{ scale: 1, rotate: 0 }}
                                    transition={{
                                      type: "spring",
                                      stiffness: 200,
                                    }}
                                    className="absolute top-3 right-3 bg-skyBlue text-prussianBlue rounded-full p-1.5 shadow-lg"
                                  >
                                    <Check className="w-4 h-4" />
                                  </motion.div>
                                )}
                              </motion.button>
                            )
                          )}
                        </div>
                      </div>

                      {/* Contact Form */}
                      <AnimatePresence>
                        {formData.staff && (
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="border-t border-gray-200 pt-6"
                          >
                            <h4 className="font-bold text-prussianBlue mb-4 font-inter text-lg">
                              Your Contact Information
                            </h4>
                            <div className="grid md:grid-cols-2 gap-4">
                              <div>
                                <label className="flex items-center gap-2 text-sm font-semibold text-prussianBlue mb-2 font-inter">
                                  <User className="w-4 h-4 text-skyBlue" />
                                  Full Name
                                </label>
                                <input
                                  type="text"
                                  value={formData.name}
                                  onChange={(e) =>
                                    setFormData((prev) => ({
                                      ...prev,
                                      name: e.target.value,
                                    }))
                                  }
                                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-skyBlue focus:outline-none transition-colors font-inter"
                                  placeholder="John Doe"
                                />
                              </div>

                              <div>
                                <label className="flex items-center gap-2 text-sm font-semibold text-prussianBlue mb-2 font-inter">
                                  <Phone className="w-4 h-4 text-skyBlue" />
                                  Phone Number
                                </label>
                                <input
                                  type="tel"
                                  value={formData.phone}
                                  onChange={(e) =>
                                    setFormData((prev) => ({
                                      ...prev,
                                      phone: e.target.value,
                                    }))
                                  }
                                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-skyBlue focus:outline-none transition-colors font-inter"
                                  placeholder="+1 (555) 123-4567"
                                />
                              </div>

                              <div className="md:col-span-2">
                                <label className="flex items-center gap-2 text-sm font-semibold text-prussianBlue mb-2 font-inter">
                                  <Mail className="w-4 h-4 text-skyBlue" />
                                  Email Address
                                </label>
                                <input
                                  type="email"
                                  value={formData.email}
                                  onChange={(e) =>
                                    setFormData((prev) => ({
                                      ...prev,
                                      email: e.target.value,
                                    }))
                                  }
                                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-skyBlue focus:outline-none transition-colors font-inter"
                                  placeholder="john@example.com"
                                />
                              </div>
                            </div>

                            {/* Booking Summary */}
                            {formData.name &&
                              formData.email &&
                              formData.phone && (
                                <motion.div
                                  initial={{ opacity: 0, scale: 0.95 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  className="mt-6 p-5 bg-skyBlue/10 border border-skyBlue/30 rounded-2xl"
                                >
                                  <h5 className="font-bold text-prussianBlue mb-3 font-inter">
                                    Booking Summary
                                  </h5>
                                  <div className="grid md:grid-cols-2 gap-x-6 gap-y-2 text-sm text-prussianBlue/80 font-inter">
                                    <p>
                                      <strong>Service:</strong>{" "}
                                      {formData.service}
                                    </p>
                                    <p>
                                      <strong>Location:</strong>{" "}
                                      {formData.location}
                                    </p>
                                    <p>
                                      <strong>Date:</strong>{" "}
                                      {new Date(
                                        formData.date
                                      ).toLocaleDateString("en-US", {
                                        month: "short",
                                        day: "numeric",
                                      })}
                                    </p>
                                    <p>
                                      <strong>Time:</strong> {formData.time}
                                    </p>
                                    <p className="md:col-span-2">
                                      <strong>Staff:</strong> {formData.staff}
                                    </p>
                                  </div>
                                </motion.div>
                              )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Navigation Buttons */}
              <div className="border-t border-gray-200 p-6 flex justify-between items-center">
                <button
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all font-inter ${
                    currentStep === 1
                      ? "opacity-50 cursor-not-allowed bg-gray-100 text-gray-400"
                      : "bg-gray-100 text-prussianBlue hover:bg-gray-200"
                  }`}
                >
                  <ChevronLeft className="w-5 h-5" />
                  Previous
                </button>

                {currentStep < 5 ? (
                  <button
                    onClick={nextStep}
                    disabled={!canProceed()}
                    className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all font-inter ${
                      canProceed()
                        ? "bg-skyBlue text-prussianBlue hover:shadow-lg"
                        : "opacity-50 cursor-not-allowed bg-gray-300 text-gray-500"
                    }`}
                  >
                    Next
                    <ChevronRight className="w-5 h-5" />
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    disabled={!canProceed()}
                    className={`flex items-center gap-2 px-8 py-3 rounded-full font-semibold transition-all font-inter ${
                      canProceed()
                        ? "bg-blueGreen text-body hover:shadow-lg hover:bg-blueGreen/90"
                        : "opacity-50 cursor-not-allowed bg-gray-300 text-gray-500"
                    }`}
                  >
                    <Check className="w-5 h-5" />
                    Confirm Booking
                  </button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}

        <div className="w-9/12 md:w-3/4 mx-auto">
          {/* Appointments List or Empty State */}
          {appointments.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-3xl mx-auto"
            >
              <div className="bg-body rounded-3xl shadow-md p-12 text-center border border-gray-100">
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="inline-block mb-6"
                >
                  <div className="relative w-32 h-32 mx-auto">
                    {/* Background circles */}
                    <motion.div
                      animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.1, 0.3] }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="absolute inset-0 bg-skyBlue/20 rounded-full"
                    />
                    <motion.div
                      animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.2, 0.4] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute inset-2 bg-skyBlue/30 rounded-full"
                    />

                    {/* Icon container */}
                    <div className="absolute inset-4 bg-skyBlue rounded-full flex items-center justify-center shadow-lg">
                      <svg
                        className="w-12 h-12 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                  </div>
                </motion.div>

                <h3 className="text-3xl font-bold text-prussianBlue mb-4 font-inter">
                  No Appointments Yet
                </h3>
                <p className="text-prussianBlue/70 text-lg mb-8 leading-relaxed font-inter max-w-xl mx-auto">
                  You haven't booked any appointments yet. Start by creating
                  your first booking for restaurants, fitness centers, medical
                  services, or other services.
                </p>

                <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mb-8">
                  {industries.map((industry, index) => (
                    <motion.div
                      key={industry.value}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
                    >
                      <img
                        src={industry.image}
                        alt={industry.label}
                        className="w-full h-20 object-cover"
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ) : (
            <div>
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h2 className="text-3xl font-bold text-prussianBlue font-inter">
                    Your Appointments
                  </h2>
                  <p className="text-prussianBlue/70 mt-2 font-inter">
                    You have {appointments.length} appointment
                    {appointments.length !== 1 ? "s" : ""}
                  </p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ duration: 0.3, type: "spring", stiffness: 100 }}
                  onClick={() => setShowForm(true)}
                  className="bg-skyBlue text-prussianBlue px-6 py-3 rounded-full font-inter font-semibold shadow-md hover:shadow-lg transition-all inline-flex items-center gap-2"
                >
                  <Calendar className="w-5 h-5" />
                  New
                </motion.button>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {appointments.map((appointment, index) => {
                  const industry = industries.find(
                    (i) => i.value === appointment.industry
                  );
                  return (
                    <motion.div
                      key={appointment.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-body rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-200"
                    >
                      <div className="relative h-40 overflow-hidden">
                        <img
                          src={industry?.image}
                          alt={industry?.label}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent" />
                        <div className="absolute bottom-4 left-4 right-4">
                          <h3 className="text-xl font-bold text-white font-inter mb-1">
                            {industry?.label}
                          </h3>
                          <p className="text-white/90 text-sm font-inter">
                            {appointment.service}
                          </p>
                        </div>
                        <div
                          className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold font-inter ${getStatusColor(
                            appointment.status
                          )}`}
                        >
                          {getStatusLabel(appointment.status)}
                        </div>
                      </div>

                      <div className="p-5 space-y-3">
                        <div className="flex items-center gap-3 text-prussianBlue">
                          <MapPin className="w-4 h-4 text-skyBlue shrink-0" />
                          <span className="font-semibold font-inter text-sm">
                            {appointment.location}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 text-prussianBlue">
                          <Calendar className="w-4 h-4 text-skyBlue shrink-0" />
                          <span className="font-inter text-sm">
                            {new Date(appointment.date).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              }
                            )}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 text-prussianBlue">
                          <Clock className="w-4 h-4 text-skyBlue shrink-0" />
                          <span className="font-inter text-sm">
                            {appointment.time}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 text-prussianBlue">
                          <User className="w-4 h-4 text-skyBlue shrink-0" />
                          <span className="font-inter text-sm">
                            {appointment.staff}
                          </span>
                        </div>

                        <div className="pt-3 border-t border-gray-200">
                          <p className="text-xs text-prussianBlue/60 mb-1 font-inter">
                            Contact
                          </p>
                          <p className="text-sm text-prussianBlue font-semibold font-inter">
                            {appointment.name}
                          </p>
                          <p className="text-xs text-prussianBlue/70 font-inter">
                            {appointment.email}
                          </p>
                        </div>

                        {appointment.status !== "cancelled" && (
                          <button
                            onClick={() => handleCancel(appointment.id)}
                            className="w-full mt-3 px-4 py-2 bg-red-50 text-red-600 rounded-xl font-semibold hover:bg-red-100 transition-colors border border-red-200 text-sm font-inter"
                          >
                            Cancel
                          </button>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Appoiment;
