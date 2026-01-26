import { mutation, query } from "../_generated/server";
import { v } from "convex/values";

// Add Location
export const addLocation = mutation({
    args: {
        industryId: v.id("industries"),
        name: v.string(), description: v.string(),
        address: v.string(),
        image: v.string() },

    handler: async (ctx, args) => ctx.db.insert("locations", args)
});

// Get Locations by Industry
export const getLocationsByIndustry = query({
    args: { industryId: v.id("industries") },
    handler: async (ctx, { industryId }) => ctx.db.query("locations")
        .withIndex("by_industry", q => q.eq("industryId", industryId))
        .collect()
});

// Get Location by ID
export const getLocationById = query({
    args: { id: v.id("locations") },
    handler: async (ctx, { id }) => ctx.db.get(id)
});

export const getLocationByName = query({
    args: { name: v.string() },
    handler: async (ctx, { name }) => {
        const result = await ctx.db
            .query("locations")
            .withIndex("by_name", (q) => q.eq("name", name))
            .collect();
        return result;
    },
});

