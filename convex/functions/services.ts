import { mutation, query } from "../_generated/server";
import { v } from "convex/values";


export const addService = mutation({
  args: {
    businessId: v.id("businesses"),
    serviceName: v.string(),
    serviceDescription: v.string(),
    servicePrice: v.optional(v.string()),
    duration: v.optional(v.string()),
    image: v.optional(v.string()) },
  handler: async (ctx, args) => ctx.db.insert("services", args)
});

export const getServicesByBusiness = query({
  args: { businessId: v.id("businesses") },
  handler: async (ctx, { businessId }) => ctx.db.query("services").withIndex("by_business", q => q.eq("businessId", businessId)).collect()
});

export const getServiceById = query({
  args: { id: v.id("services") },
  handler: async (ctx, { id }) => ctx.db.get(id)
});

export const getServiceByName = query({
  args: { serviceName: v.string() },
  handler: async (ctx, { serviceName }) => {
    // Query the "services" table using an index on serviceName
    const result = await ctx.db
        .query("services")
        .withIndex("by_name", (q) => q.eq("serviceName", serviceName))
        .collect();

    // Return the first match or null if none found
    return result[0] ?? null;
  },
});

export const getAllServices = query({
  handler: async (ctx) => {
    return await ctx.db.query("services").collect();
  },
});
