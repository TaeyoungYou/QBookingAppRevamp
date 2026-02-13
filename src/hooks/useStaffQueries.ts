import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Id } from "../../convex/_generated/dataModel";

export const useStaffQueries = () => {
    const updateStaffProfile = useMutation(api.functions.staffs.updateStaff);

    const getStaffById = (staffId: Id<"staff"> | undefined) => {
        return useQuery(
            api.functions.staffs.getStaff,
            staffId ? { id: staffId } : "skip"
        );
    };

    return {
        updateStaffProfile,
        getStaffById,
    };
};
