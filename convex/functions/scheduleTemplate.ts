import {mutation, query} from "../_generated/server";
import {v} from "convex/values";

export const addScheduleTemplate = mutation({
    args: {
        businessId: v.id("businesses"),
        employeeId: v.id("staff"),
        servicesIds: v.array(v.id("services")),
        templateName: v.string(),
        days: v.array(v.number()),
        startTimeMinutes: v.number(),
        endTimeMinutes: v.number() },
    handler: async (ctx, args) => ctx.db.insert("scheduleTemplates", args)
});

export const getScheduleTemplatesByEmployee = query({
    args: { employeeId: v.id("staff") },
    handler: async (ctx, { employeeId }) => ctx.db.query("scheduleTemplates")
        .withIndex("by_employee", q => q.eq("employeeId", employeeId))
        .collect()
});
