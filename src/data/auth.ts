import type { Id } from "../../convex/_generated/dataModel";

export interface AuthFormData {
    id: Id<"users">;
    address: string;
    businessId: string;
    createdAt: string;
    email: string;
    image: string;
    name: string;
    phoneNumber: string;
    postalCode: string;
    province: string;
    userStatus: string;
}

export interface AuthBusinessCreation {
    id: Id<"businesses">,
    businessWebsiteId: string,
    industryId : Id<"industries">,
    businessName: string,
    businessAddress: string,
    businessPhone: string,
    businessEmail: string,
    businessTimeZone: string,
}