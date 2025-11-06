import { useState } from "react";
import type { Appointment, FormData } from "../data/appointments";

export const useBookingProcess = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<FormData>({
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

  const handleNextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 5));
  };

  const handlePrevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  // Backend Todo: Fetch available times from the server (available time in range of business hours)
  // interval range is 15 mins
  const getAvailableTimes = () => {
    const times: string[] = [];
    for (let hour = 9; hour <= 17; hour++) {
      // this will add available times for each hour
      // if the pad is 9am it will add as 09:00
      // if the pad is 17pm it will add as 17:30
      times.push(`${hour.toString().padStart(2, "0")}:00`);
      // eg: because the business only opens till 17:00, so it will not add 17:30
      if (hour < 17) {
        times.push(`${hour.toString().padStart(2, "0")}:30`);
      }
    }
    return times;
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

  // Backend Todo: Submit the form data to the server
  const handleSubmitForm = () => {
    const newAppointment: Appointment = {
      id: Date.now().toString(),
      ...formData,
      status: "pending",
    };
    setAppointments((prev) => [...prev, newAppointment]);
    resetForm();
  };

  // Backend Todo: Change the status of the appointment when the appointment is cancelled
  const handleCancel = (id: string) => {
    setAppointments((prev) =>
      prev.map((appointment) =>
        appointment.id === id
          ? { ...appointment, status: "cancelled" }
          : appointment
      )
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
