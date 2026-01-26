import { mutation, query } from "../_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";

// Insert a user
export const addUser = mutation({
  args: {
    businessId: v.optional(v.id("businesses")),  // optional since customers won't have business
    name: v.string(),
    address: v.string(),
    phoneNumber: v.string(),
    province: v.string(),
    email: v.string(),
    postalCode: v.string(),
    userStatus: v.union(
      v.literal("customer"),
      v.literal("employee"),
      v.literal("owner")
    ),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    // Logged-in users use identity.tokenIdentifier, guests get a UUID
    const tokenIdentifier =
      identity?.tokenIdentifier || crypto.randomUUID();

    // Insert into users table with explicit order
    return await ctx.db.insert("users", {
      tokenIdentifier,
      businessId: args.businessId,
      name: args.name,
      address: args.address,
      phoneNumber: args.phoneNumber,
      province: args.province,
      email: args.email,
      postalCode: args.postalCode,
      userStatus: args.userStatus,
      createdAt: new Date().toISOString(),
    });
  },
});


// Fetch all users
export const getUsers = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("users").collect();
  },
});
// Get user by token
export const getUserByToken = query({
  args: { token: v.string() },
  handler: async (ctx, { token }) => {
    if (!token) return null;

    return await ctx.db
      .query("users")
      .withIndex("by_token", (q) => q.eq("tokenIdentifier", token))
      .unique();
  },
});
// update user by id
export const updateUser = mutation({
  args: {
    id: v.id("users"),
    businessId: v.optional(v.id("businesses")),  // <- added
    name: v.optional(v.string()),
    address: v.optional(v.string()),
    phoneNumber: v.optional(v.string()),
    province: v.optional(v.string()),
    email: v.optional(v.string()),
    postalCode: v.optional(v.string()),
    userStatus: v.optional(
      v.union(
        v.literal("customer"),
        v.literal("employee"),
        v.literal("owner")
      )
    ),
  },
  handler: async (ctx, args) => {
    const { id, userStatus, businessId, ...rest } = args;

    const cleanUpdates: Record<string, unknown> = {};

    // Add all provided fields
    for (const [key, value] of Object.entries(rest)) {
      if (value !== undefined) {
        cleanUpdates[key] = value;
      }
    }

    // Add optional fields
    if (userStatus !== undefined) {
      cleanUpdates["userStatus"] = userStatus;
    }

    if (businessId !== undefined) {
      cleanUpdates["businessId"] = businessId;
    }

    await ctx.db.patch(id, cleanUpdates);
    return { success: true };
  },
});

// update user by token
export const updateUserByToken = mutation({
  args: {
    token: v.string(),
    updates: v.object({
      businessId: v.optional(v.id("businesses")),
      name: v.optional(v.string()),
      address: v.optional(v.string()),
      phoneNumber: v.optional(v.string()),
      province: v.optional(v.string()),
      email: v.optional(v.string()),
      postalCode: v.optional(v.string()),
      userStatus: v.optional(
        v.union(v.literal("customer"), v.literal("employee"), v.literal("owner"))
      ),
    }),
  },
  handler: async (ctx, { token, updates }) => {
    if (!token) return null;

    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) => q.eq("tokenIdentifier", token))
      .unique();

    if (!user) return null;

    // Only update provided fields
    const cleanUpdates = Object.fromEntries(
      Object.entries(updates).filter(([_, v]) => v !== undefined)
    );

    await ctx.db.patch(user._id, cleanUpdates);
    return user._id;
  },
});

export const getUserByID = query({
  args: { id: v.id("users") },
  handler: async (ctx, { id }) => {
    return await ctx.db.get(id); // fetches document by its _id
  },
});


export const getAllUsers = query({
  handler: async (ctx) => {
    return await ctx.db.query("users").collect();
  },
});

// AUTH
export const getCurrentUser = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      return null;
    }
    const user = await ctx.db.get(userId);
    if (!user) {
      return null;
    }
    return {
      id: user._id,
      name: user.name,
      email: user.email,
      status: user.userStatus,
      phone: user.phoneNumber,
      businessId: user.businessId

    };
  },
});