import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

//get current user businessId
export const useCurrentUser = () => {
  const user = useQuery(api.functions.users.getCurrentUser);
  return { user, businessId: user?.businessId };
};

export const useBusinessQueries = () => {
  const businesses = useQuery(api.functions.businesses.getBusinesses);
  const addBusiness = useMutation(api.functions.businesses.addBusiness);
  const updateBusiness = useMutation(api.functions.businesses.updateBusiness);
    
  return {
    addBusiness,
    businesses,
    updateBusiness,
    
  }
}

