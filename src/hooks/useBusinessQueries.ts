import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

//get current user businessId
export const useCurrentUser = () => {
  const user = useQuery(api.functions.users.getCurrentUser);
  return { user, businessId: user?.businessId };
};

// Hook to get a business by ID
export const useBusinessById = (businessId: string | null | undefined) => {
  const business = useQuery(
    api.functions.businesses.getBusinessById,
    businessId ? { id: businessId as any } : "skip" // pass object with id property
  );

  // Return all fields with defaults if missing
  return {
    businessName: business?.businessName || "",
    businessEmail: business?.businessEmail || "",
    businessPhoneNumber: business?.businessPhoneNumber || "",
    businessAddress: business?.businessAddress || "",
    businessWebsite: business?.businessWebsite || "",
  };
};

export const useBusinessQueries = () => {
  const getbusinesses = useQuery(api.functions.businesses.getBusinesses);
  const addBusiness = useMutation(api.functions.businesses.addBusiness);
  const updateBusiness = useMutation(api.functions.businesses.updateBusiness);
    
  return {
    addBusiness,
    getbusinesses,
    updateBusiness,
    
  }
}

