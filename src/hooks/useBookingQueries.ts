// src/hooks/useBookingQueries.ts
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import type { Id } from "../../convex/_generated/dataModel";
import type { FormData } from "../data/appointments";




export const useBookingQueries = (formData: FormData) => {

    // --- Mutations ---
    const createAppointment = useMutation(api.functions.appointments.addAppointment);

    // --- Lookups ---
    const staffResult = useQuery(
        api.functions.staffs.getStaffByName,
        formData.staff ? { name: formData.staff } : "skip"
    );
    const employeeId = staffResult?.[0]?._id as Id<"staff"> | undefined;



    const industryResult = useQuery(
        api.functions.industries.getIndustryByName,
        formData.industry ? { name: formData.industry } : "skip"
    );
    const industryId = industryResult?.[0]?._id;

    const businessResult = useQuery(
        api.functions.businesses.getBusinessByIndustryAndName,
        industryId && formData.location
            ? { industryId, businessName: formData.location }
            : "skip"
    );
    const businessId = businessResult?._id as Id<"businesses"> | undefined;

    const serviceResult = useQuery(
        api.functions.services.getServiceByName,
        formData.service ? { serviceName: formData.service } : "skip"
    );
    const serviceId = serviceResult?._id;

    const availableSlots = useQuery(
        api.functions.schedule.getAvailableTimes,
        businessId && formData.date
            ? {
                businessId,
                date: formData.date,
                interval: 30,
            }
            : "skip"
    );
    const user = useQuery(api.functions.users.getCurrentUser);

    // --- Reference tables ---
    const rawAppointments = useQuery(api.functions.appointments.getAllAppointments);

    const appointmentsForUser = useQuery(
            api.functions.appointments.getAppointmentsByCustomer,
            user?.id ? { customerId: user.id } : "skip");

    const appointmentsForBusiness = useQuery(
        api.functions.appointments.getAppointmentsByBusiness, user?.businessId ? {businessId: user.businessId} : "skip")

    console.log(user?.businessId);


    const allBusinesses = useQuery(api.functions.businesses.getBusinesses) ?? [];
    const allStaff = useQuery(api.functions.staffs.getAllStaffs) ?? [];
    const allServices = useQuery(api.functions.services.getAllServices) ?? [];
    const allUsers = useQuery(api.functions.users.getAllUsers) ?? [];
    const allIndustries = useQuery(api.functions.industries.getAllIndustries) ?? [];

    const cancelAppointment = useMutation(api.functions.appointments.deleteAppointment);

    return {
        user,
        // IDs
        employeeId,
        industryId,
        businessId,
        serviceId,

        // Data
        availableSlots,
        rawAppointments,
        allBusinesses,
        allStaff,
        allServices,
        allUsers,
        allIndustries,
        appointmentsForUser,
        appointmentsForBusiness,
        cancelAppointment,

        // Mutations
        createAppointment,
    };
};
