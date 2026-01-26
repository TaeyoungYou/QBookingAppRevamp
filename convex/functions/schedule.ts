import {mutation, query} from "../_generated/server";
import {v} from "convex/values";

export const addSchedule = mutation({
    args: {
        businessId: v.id("businesses"),
        employeeId: v.id("staff"),
        servicesIds: v.array(v.id("services")),
        dayOfWeek: v.number(),
        date: v.string(),
        startTimeMinutes: v.number(),
        endTimeMinutes: v.number(),
        dateOverride: v.optional(v.string()),
        templateId: v.optional(v.id("scheduleTemplates")) },
    handler: async (ctx, args) => ctx.db.insert("schedules", args)
});

export const getSchedulesByEmployee = query({
    args: { employeeId: v.id("staff") },
    handler: async (ctx, { employeeId }) => ctx.db.query("schedules")
        .withIndex("by_employee", q => q.eq("employeeId", employeeId))
        .collect()
});


/** helpers **/
// function pad(n: number) {
//     return String(n).padStart(2, "0");
// }
// function minutesToHHMM(min: number) {
//     const h = Math.floor(min / 60);
//     const m = min % 60;
//     return `${pad(h)}:${pad(m)}`;
// }

// function hhmmToMinutes(hhmm: string) {
//     const [h, m] = hhmm.split(":").map(Number);
//     return h * 60 + m;
// }

/**
 * Generates 30-min start times from 09:00 to last start 16:30 (inclusive).
 * Returns minutes array (start minutes).
 */
// function generateDefaultStarts30(): number[] {
//     const starts: number[] = [];
//     const startMin = 9 * 60; // 540
//     const lastStart = 16 * 60 + 30; // 990
//     for (let t = startMin; t <= lastStart; t += 30) starts.push(t);
//     return starts;
// }

/**
 * Return structure:
 * [{ time: "09:00", available: boolean, reason?: string }]
 */
export const getAvailableTimes = query({
    args: {
        businessId: v.id("businesses"),
        date: v.string(), // YYYY-MM-DD
        interval: v.optional(v.number()), // defaults to 30 minutes
    },
    handler: async (ctx, { businessId, date, interval }) => {
        const slotSize = interval ?? 30; // default 30 minutes

        // 1️⃣ Business hours (9 AM – 5 PM)
        const OPEN = 9 * 60;
        const CLOSE = 17 * 60;

        // 2️⃣ Fetch existing bookings for business + date
        const appointments = await ctx.db
            .query("appointments")
            .withIndex("by_business", (q) => q.eq("businessId", businessId))
            .collect();

        const bookings = appointments.filter(
            (a) =>
                a.appointmentDate === date &&
                a.appointmentStatus === "scheduled"
        );

        // Convert to minute ranges
        const bookedRanges = bookings.map((b) => ({
            start: new Date(b.appointmentStart).getHours() * 60 +
                new Date(b.appointmentStart).getMinutes(),
            end: new Date(b.appointmentEnd).getHours() * 60 +
                new Date(b.appointmentEnd).getMinutes(),
        }));

        // 3️⃣ Build slots
        const result = [];
        for (let t = OPEN; t + slotSize <= CLOSE; t += slotSize) {
            const label = format(t);

            const isBooked = bookedRanges.some(
                (r) => !(t + slotSize <= r.start || t >= r.end)
            );

            result.push({
                time: label,
                available: !isBooked,
            });
        }

        return result;
    },
});

function format(mins: number) {
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}
