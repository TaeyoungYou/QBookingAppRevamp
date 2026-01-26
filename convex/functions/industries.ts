import { mutation, query } from "../_generated/server";
import { v } from "convex/values";

// Add Industry
export const addIndustry = mutation({
    args: {
        value: v.string(),
        label: v.string(),
        image: v.string(),
        description: v.string() },

    handler: async (ctx, args) => ctx.db.insert("industries", args)
});

// Get all Industries
export const getIndustries = query({
    args: {},
    handler: async (ctx) => ctx.db.query("industries")
        .collect()
});

// Get Industry by ID
export const getIndustryById = query({
    args: { id: v.id("industries") },
    handler: async (ctx, { id }) => ctx.db.get(id)
});

// Update Industry
export const updateIndustryById = mutation({
    args: {
        id: v.id("industries"),
        label: v.optional(v.string()),
        image: v.optional(v.string()),
        description: v.optional(v.string()) },

    handler: async (ctx, args) => {
        const { id, ...rest } = args;
        const clean = Object.fromEntries(Object.entries(rest).filter(([_, v]) => v !== undefined));
        await ctx.db.patch(id, clean);
        return { success: true };
    }
});

export const getIndustryByName = query({
    args: { name: v.string() },
    handler: async (ctx, { name }) => {
        const result = await ctx.db
            .query("industries")
            .withIndex("by_name", (q) => q.eq("value", name))
            .collect();
        return result;
    },
});

export const getAllIndustries = query({
    handler: async (ctx) => {
        return await ctx.db.query("industries").collect();
    },
});