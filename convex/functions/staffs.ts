import {mutation, query} from "../_generated/server";
import { v } from "convex/values";

// ======================
// Create new staff
// ======================
export const addStaff = mutation({
    args: {
        businessId: v.optional(v.id("businesses")),
        name: v.string(),
        role: v.string(),
        bio: v.string(),
        image: v.optional(v.string()),
        rating: v.number(),
        status: v.optional(v.string()),
        email: v.optional(v.string())
    },
    handler: async (ctx, args) => {
        const staffId = await ctx.db.insert("staff", {
            ...args,
        });
        return staffId;
    },
});

// ======================
// Get all staff (for a business)
// ======================
export const getStaffByBusiness = query({
    args: { businessId: v.id("businesses") },
    handler: async (ctx, args) => {
        return await ctx.db
            .query("staff")
            .withIndex("by_business", (q) => q.eq("businessId", args.businessId))
            .collect();
    },
});
// ======================
// Get staff by email
// ======================
export const getStaffByEmail = query({
    args: { email: v.string() },
    handler: async (ctx, args) => {
        return await ctx.db
            .query("staff")
            .filter((q) => q.eq(q.field("email"), args.email))
            .first();
    },
});


// ======================
// Get staff by name (optional, useful for filtering/search)
// ======================
export const getStaffByName = query({
    args: { name: v.string() },
    handler: async (ctx, args) => {
        return await ctx.db
            .query("staff")
            .withIndex("by_name", (q) => q.eq("name", args.name))
            .collect();
    },
});

// ======================
// Get a single staff member by ID
// ======================
export const getStaff = query({
    args: { id: v.id("staff") },
    handler: async (ctx, args) => {
        return await ctx.db.get(args.id);
    },
});

// ======================
// Update staff info
// ======================
export const updateStaff = mutation({
    args: {
        id: v.id("staff"),
        name: v.optional(v.string()),
        role: v.optional(v.string()),
        bio: v.optional(v.string()),
        image: v.optional(v.string()),
        rating: v.optional(v.number()),
    },
    handler: async (ctx, args) => {
        const { id, ...updates } = args;
        const staff = await ctx.db.get(id);
        if (!staff) throw new Error("Staff not found");

        await ctx.db.patch(id, updates);
        return { success: true };
    },
});

// ======================
// Delete staff
// ======================
export const deleteStaff = mutation({
    args: { id: v.id("staff") },
    handler: async (ctx, args) => {
        const staff = await ctx.db.get(args.id);
        if (!staff) throw new Error("Staff not found");

        await ctx.db.delete(args.id);
        return { success: true };
    },
});

export const getAllStaffs = query({
    handler: async (ctx) => {
        return await ctx.db.query("staff").collect();
    },
});
