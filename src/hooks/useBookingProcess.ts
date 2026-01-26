import {useMemo, useState} from "react";
import type { Appointment, FormData } from "../data/appointments";
import type {Id} from "../../convex/_generated/dataModel";
import {useBookingQueries} from "./useBookingQueries.ts";
import moment from "moment";

export const useBookingProcess = () => {




  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    industry: "",

    //todo: this should be the business name
    location: "",

    service: "",
    date: "",
    time: "",
    staff: "",
  });

  const {
    employeeId,
    businessId,
    serviceId,
    availableSlots,
    // rawAppointments,
    allBusinesses,
    allStaff,
    allServices,
    appointmentsForUser,
    appointmentsForBusiness,
    allUsers,
    allIndustries,
    user,
    cancelAppointment,
    createAppointment,
  } = useBookingQueries(formData);


  const getAvailableTimes = () => availableSlots ?? [];


  //Filtering all appointments
  //changed for user
  const hydratedAppointments = useMemo(() => {
    if (!appointmentsForUser) return [];

    return appointmentsForUser.map((a) => {
      const business = allBusinesses.find((b) => b._id === a.businessId);
      const staff = allStaff.find((s) => s._id === a.employeeId);
      const service = allServices.find((srv) => srv._id === a.serviceId);
      const user = allUsers.find((u) => u._id === a.customerId);
      const industry = allIndustries.find(i => i._id === business?.industryId);

      return {
        ...a,

        // Business info
        businessName: business?.businessName ?? "",
        businessLocation: business?.businessAddress ?? "",

        // Staff info
        staffName: staff?.name ?? "",

        // Service info
        serviceName: service?.serviceName ?? "",

        // Customer info
        customerName: user?.name ?? a.guestInfo?.name ?? "",
        customerEmail: user?.email ?? a.guestInfo?.email ?? "",
        customerPhone: user?.phone ?? a.guestInfo?.phone ?? "",

        // Industry Name
        industryValue: industry?.value ?? "",

        // Extract readable date + time for UI
        displayDate: moment.utc(a.appointmentStart).local().format("MMM DD, YYYY"),
        displayTime: moment.utc(a.appointmentStart),

        displayTimeStart: moment.utc(a.appointmentStart),
        displayTimeEnd: moment.utc(a.appointmentEnd),
      };
    });
  }, [
    appointmentsForUser,
    allBusinesses,
    allStaff,
    allServices,
    allUsers,
    allIndustries,
  ]);

  const hydratedAppointmentsForBusiness = useMemo(() => {
    if (!appointmentsForUser) return [];

    return appointmentsForBusiness?.map((a) => {
      const business = allBusinesses.find((b) => b._id === a.businessId);
      const staff = allStaff.find((s) => s._id === a.employeeId);
      const service = allServices.find((srv) => srv._id === a.serviceId);
      const user = allUsers.find((u) => u._id === a.customerId);
      const industry = allIndustries.find(i => i._id === business?.industryId);

      return {
        ...a,

        // Business info
        businessName: business?.businessName ?? "",
        businessLocation: business?.businessAddress ?? "",

        // Staff info
        staffName: staff?.name ?? "",

        // Service info
        serviceName: service?.serviceName ?? "",

        // Customer info
        customerName: user?.name ?? a.guestInfo?.name ?? "",
        customerEmail: user?.email ?? a.guestInfo?.email ?? "",
        customerPhone: user?.phone ?? a.guestInfo?.phone ?? "",

        // Industry Name
        industryValue: industry?.value ?? "",

        // Extract readable date + time for UI
        displayDate: moment.utc(a.appointmentStart).local().format("MMM DD, YYYY"),
        displayTime: moment.utc(a.appointmentStart),

        displayTimeStart: moment.utc(a.appointmentStart),
        displayTimeEnd: moment.utc(a.appointmentEnd),
      };
    });
  }, [
    appointmentsForBusiness,
    allBusinesses,
    allStaff,
    allServices,
    allUsers,
    allIndustries,
  ]);


  //Steps
  const handleNextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 5));
  };

  const handlePrevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };



  // Reset the form data when the form is closed
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


  const handleSubmitForm = async () => {
    const newAppointment: Appointment = {
      id: Date.now().toString(),
      ...formData,
      status: "pending",
    };

    const startISO = `${formData.date}T${formData.time}:00.000Z`;
    const endISO = new Date(new Date(startISO).getTime() + 30 * 60 * 1000).toISOString();

    //Backend
    await createAppointment({
      customerId: user?.id as Id<"users">,
      employeeId: employeeId as Id<"staff">,
      serviceId: serviceId as Id<"services">,
      businessId: businessId as Id<"businesses">,
      appointmentDate: formData.date,
      appointmentStart: startISO,
      appointmentEnd: endISO,
      appointmentStatus: "scheduled",
      dayOfWeek: new Date(formData.date).getDay(),
      guestInfo: {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
      },
    });

    setAppointments((prev) => [...prev, newAppointment]);
    resetForm();
  };

  const handleCancel = async (id: Id<"appointments">) => {
      await cancelAppointment({
        id: id,
      })
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
    { number: 4, label: "Date " },
    { number: 5, label: "Contact" },
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

  return {
    // State
    appointments,
    showForm,
    currentStep,
    formData,
    steps,
    // Setters
    setAppointments,
    setShowForm,
    setCurrentStep,
    setFormData,

    // Functions
    hydratedAppointments,
    hydratedAppointmentsForBusiness,
    getAvailableTimes,
    handleSubmitForm,
    handleNextStep,
    handlePrevStep,
    resetForm,
    handleCancel,
    getStatusColor,
    getStatusLabel,
    canProceed,
  };
};
