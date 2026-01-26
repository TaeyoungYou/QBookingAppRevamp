/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as auth from "../auth.js";
import type * as functions_appointments from "../functions/appointments.js";
import type * as functions_businesses from "../functions/businesses.js";
import type * as functions_industries from "../functions/industries.js";
import type * as functions_locations from "../functions/locations.js";
import type * as functions_schedule from "../functions/schedule.js";
import type * as functions_scheduleTemplate from "../functions/scheduleTemplate.js";
import type * as functions_services from "../functions/services.js";
import type * as functions_staffs from "../functions/staffs.js";
import type * as functions_users from "../functions/users.js";
import type * as http from "../http.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

declare const fullApi: ApiFromModules<{
  auth: typeof auth;
  "functions/appointments": typeof functions_appointments;
  "functions/businesses": typeof functions_businesses;
  "functions/industries": typeof functions_industries;
  "functions/locations": typeof functions_locations;
  "functions/schedule": typeof functions_schedule;
  "functions/scheduleTemplate": typeof functions_scheduleTemplate;
  "functions/services": typeof functions_services;
  "functions/staffs": typeof functions_staffs;
  "functions/users": typeof functions_users;
  http: typeof http;
}>;

/**
 * A utility for referencing Convex functions in your app's public API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;

/**
 * A utility for referencing Convex functions in your app's internal API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = internal.myModule.myFunction;
 * ```
 */
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

export declare const components: {};
