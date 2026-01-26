import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export const useAuthQueries = () => {

    const user = useQuery(api.functions.users.getCurrentUser);

    const updateProfile = useMutation(api.functions.users.updateUser);
    const addBusiness = useMutation(api.functions.businesses.addBusiness);
    const getAllIndustries = useQuery(api.functions.industries.getAllIndustries);

    //Staffs
    const staff = useQuery(api.functions.staffs.getStaffByBusiness,
        user?.businessId ? {businessId: user.businessId} : "skip");
    const addStaff = useMutation(api.functions.staffs.addStaff);
    const removeStaff = useMutation(api.functions.staffs.deleteStaff);



    return{
        addBusiness,
        updateProfile,
        getAllIndustries,
        staff,
        addStaff,
        removeStaff,
        user,
    }
}



/* businessId: v.id("businesses"),
        name: v.string(),
        role: v.string(),
        bio: v.string(),
        image: v.optional(v.string()),
        rating: v.number(),*/