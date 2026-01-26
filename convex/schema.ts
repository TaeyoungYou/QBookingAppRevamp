import { defineSchema, defineTable } from "convex/server";
import { authTables } from "@convex-dev/auth/server";
import { v } from "convex/values";

export default defineSchema({
    ...authTables,

    // --- Industries ---
    industries: defineTable({
        value: v.string(), // unique key, e.g., "restaurant"
        label: v.string(),
        image: v.string(),
        description: v.string(),
    }).index("by_name", ["value"]),

    // --- Locations ---
    locations: defineTable({
        industryId: v.id("industries"), // reference industries
        name: v.string(),
        description: v.string(),
        address: v.string(),
        image: v.string(),
    })
        .index("by_name", ["name"])
        .index("by_industry", ["industryId"]),

    // --- Businesses ---
    businesses: defineTable({
        industryId: v.id("industries"),   // reference industry
        businessName: v.string(),
        businessAddress: v.string(),
        businessPhoneNumber: v.string(),
        businessEmail: v.string(),
        businessWebsite: v.optional(v.string()),
        businessTimeZone: v.string(),
    })
        .index("by_industry_name", ["industryId", "businessName"])
        .index("by_name", ["businessName"])
        .index("by_industry", ["industryId"]),

    // --- Services ---
    services: defineTable({
        businessId: v.id("businesses"),   // reference business
        serviceName: v.string(),
        serviceDescription: v.string(),

        //todo: make sure to have proper val after demo
        servicePrice: v.optional(v.string()),
        duration: v.optional(v.string()), // minutes
        image: v.optional(v.string()),
    })
        .index("by_name", ["serviceName"])
        .index("by_business", ["businessId"]),

    // --- Staff ---
    staff: defineTable({
        businessId: v.optional(v.id("businesses")),   // reference business
        name: v.string(),
        role: v.string(),
        bio: v.string(),
        image: v.optional(v.string()),
        rating: v.number(),
        status: v.optional(v.string()),
        email: v.optional(v.string()),
    })
        .index("by_name", ["name"])
        .index("by_business", ["businessId"]),

    // --- Users ---
    users: defineTable({
        tokenIdentifier: v.optional(v.string()),
        businessId: v.optional(v.id("businesses")), // only employees/owners
        name: v.optional(v.string()),
        address: v.optional(v.string()),
        phoneNumber: v.optional(v.string()),
        province: v.optional(v.string()),
        email: v.string(),
        postalCode: v.optional(v.string()),
        userStatus: v.optional(v.union(
            v.literal("customer"),
            v.literal("employee"),
            v.literal("owner")
        )),
        createdAt: v.optional(v.string()),
        emailVerificationTime: v.optional(v.number()),
        image: v.optional(v.string()),
        phone: v.optional(v.string()),
        phoneVerificationTime: v.optional(v.number()),
        isAnonymous: v.optional(v.boolean()),

    })
        .index("by_name", ["name"])
        .index("by_token", ["tokenIdentifier"])
        .index("by_business", ["businessId"])
        .index("email", ["email"]),

    appointments: defineTable({
        customerId: v.optional(v.id("users")), // reference if logged in
        employeeId: v.id("staff"),
        serviceId: v.id("services"),
        businessId: v.id("businesses"),
        scheduleId: v.optional(v.id("schedules")),
        templateId: v.optional(v.id("scheduleTemplates")),
        dayOfWeek: v.number(), // 0 (Sun) - 6 (Sat)
        appointmentDate: v.string(), // YYYY-MM-DD
        appointmentStart: v.string(), // ISO timestamp
        appointmentEnd: v.string(), // ISO timestamp
        appointmentStatus: v.union(
            v.literal("scheduled"),
            v.literal("completed"),
            v.literal("cancelled"),
            v.literal("confirmed"),
            v.literal("pending"),
        ),
        notes: v.optional(v.string()),

        //for geust
        guestInfo: v.optional(
            v.object({
                name: v.string(),
                email: v.string(),
                phone: v.string(),
            })
        ),
    })
        .index("by_customer", ["customerId"])
        .index("by_employee", ["employeeId"])
        .index("by_date", ["appointmentDate"])
        .index("by_business", ["businessId"]),

    // --- Schedules ---
    schedules: defineTable({
        businessId: v.id("businesses"),
        employeeId: v.id("staff"),
        servicesIds: v.array(v.id("services")),
        dayOfWeek: v.number(),
        date: v.string(),
        startTimeMinutes: v.number(),
        endTimeMinutes: v.number(),
        dateOverride: v.optional(v.string()),
        templateId: v.optional(v.id("scheduleTemplates")),
    }).index("by_business", ["businessId"])
        .index("by_employee", ["employeeId"]),

    // --- Schedule Templates ---
    scheduleTemplates: defineTable({
        businessId: v.id("businesses"),
        employeeId: v.id("staff"),
        servicesIds: v.array(v.id("services")),
        templateName: v.string(),
        days: v.array(v.number()),
        startTimeMinutes: v.number(),
        endTimeMinutes: v.number(),
    }).index("by_business", ["businessId"])
        .index("by_employee", ["employeeId"]),

}, { schemaValidation: true });
