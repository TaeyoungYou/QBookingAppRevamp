import { mutation, query } from "../_generated/server";
import { v } from "convex/values";


export const addBusiness = mutation({
    args: {
        industryId: v.id("industries"),
        businessName: v.string(),
        businessAddress: v.string(),
        businessPhoneNumber: v.string(),
        businessEmail: v.string(),
        businessWebsite: v.optional(v.string()),
        businessTimeZone: v.string() },

    handler: async (ctx, args) => {
        const businessId = await ctx.db.insert("businesses", args);
        return businessId;
    },
});

export const getBusinesses = query({
    args: {},
    handler: async (ctx) => ctx.db.query("businesses").collect() });

export const getBusinessById = query({
    args: { id: v.id("businesses") },
    handler: async (ctx, { id }) => ctx.db.get(id) });

export const getBusinessesByIndustry = query({
    args: { industryId: v.id("industries") },

    handler: async (ctx, { industryId }) => ctx.db.query("businesses")
        .withIndex("by_industry", q => q.eq("industryId", industryId))
        .collect() // add filter if you index by industry
});

export const getBusinessByName = query({
    args: { businessName: v.string() },
    handler: async (ctx, { businessName }) => {
        // Query the "businesses" table using the "by_name" index
        const result = await ctx.db
            .query("businesses")
            .withIndex("by_name", (q) => q.eq("businessName", businessName))
            .collect();

        // If you only want one result (the first match), return result[0]
        return result[0] ?? null;
    },
});

export const getBusinessByIndustryAndName = query({
    args: {
        industryId: v.id("industries"),
        businessName: v.string(),
    },
    handler: async (ctx, { industryId, businessName }) => {
        const business = await ctx.db
            .query("businesses")
            .withIndex("by_industry_name", (q) =>
                q.eq("industryId", industryId).eq("businessName", businessName)
            )
            .first();

        return business ?? null;
    },
});


export const updateBusiness = mutation({
  args: {
    id: v.id("businesses"), // the business ID to update
    businessName: v.optional(v.string()),
    businessAddress: v.optional(v.string()),
    businessPhoneNumber: v.optional(v.string()),
    businessEmail: v.optional(v.string()),
    businessWebsite: v.optional(v.string()),
    businessTimeZone: v.optional(v.string()),
    industryId: v.optional(v.id("industries")),
  },
  handler: async (ctx, args) => {
    const { id, ...fieldsToUpdate } = args;

    // Remove undefined fields (so we only patch fields that were actually passed)
    const patchData: Record<string, any> = {};
    for (const key in fieldsToUpdate) {
      if (fieldsToUpdate[key as keyof typeof fieldsToUpdate] !== undefined) {
        patchData[key] = fieldsToUpdate[key as keyof typeof fieldsToUpdate];
      }
    }

    if (Object.keys(patchData).length === 0) {
      // nothing to update
      return null;
    }

    await ctx.db.patch(id, patchData);

    // return the updated document
    return ctx.db.get(id);
  },
});