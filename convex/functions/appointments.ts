import {mutation, query} from "../_generated/server";
import {v} from "convex/values";
export const addAppointment = mutation({
    args: {
        customerId: v.optional(v.id("users")),
        employeeId: v.id("staff"),
        serviceId: v.id("services"),
        businessId: v.id("businesses"),
        appointmentDate: v.string(),
        appointmentStart: v.string(),
        appointmentEnd: v.string(),
        appointmentStatus: v.union(
            v.literal("scheduled"),
            v.literal("completed"),
            v.literal("cancelled"),
            v.literal("confirmed"),
        ),
        notes: v.optional(v.string()),
        scheduleId: v.optional(v.id("schedules")),
        templateId: v.optional(v.id("scheduleTemplates")),
        dayOfWeek: v.number(),
        // 👇 Added guest info support
        guestInfo: v.optional(
            v.object({
                name: v.string(),
                email: v.string(),
                phone: v.string(),
            })
        ),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        let customerId = args.customerId;

        // Try linking if user is logged in
        if (!customerId && identity) {
            const existingUser = await ctx.db
                .query("users")
                .withIndex("by_token", (q) =>
                    q.eq("tokenIdentifier", identity.tokenIdentifier)
                )
                .unique();
            if (existingUser) customerId = existingUser._id;
        }

        return await ctx.db.insert("appointments", {
            ...args,
            customerId,
        });
    },
});

export const getAppointmentsByCustomer = query({
    args: { customerId: v.id("users") },
    handler:
        async (ctx, { customerId }) => ctx.db.query("appointments")
            .withIndex("by_customer", q => q.eq("customerId", customerId))
            .collect()
});

export const getAppointmentsByEmployee = query({
    args: { employeeId: v.id("staff") },
    handler:
        async (ctx, { employeeId }) => ctx.db.query("appointments")
            .withIndex("by_employee", q => q.eq("employeeId", employeeId))
            .collect()
});

export const getAppointmentsByBusiness = query({
    args: { businessId: v.id("businesses") },
    handler:
        async (ctx, { businessId }) => ctx.db.query("appointments")
            .withIndex("by_business", q => q.eq("businessId", businessId))
            .collect()
});


export const getAllAppointments = query({
    handler: async (ctx) => {
        return await ctx.db.query("appointments").collect();
    },
});


export const deleteAppointment = mutation({
    args: { id: v.id("appointments")},

    handler: async (ctx, args) => {
        await ctx.db.delete(args.id);
    },
})