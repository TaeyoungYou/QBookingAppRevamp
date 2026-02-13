import { motion, AnimatePresence } from "framer-motion";
import {useState, useEffect, useRef} from "react";
import {useAuthQueries} from "../../hooks/useAuthQueries.ts";
import {useBusinessSearch} from "../../hooks/useBusinessQueries.ts";
import type {Id} from "../../../convex/_generated/dataModel";



// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const CompleteProfile = ({user, signOut}) => {
    const {
        addBusiness,
        updateProfile,
        getAllIndustries,
        addStaff
    } = useAuthQueries();

    const [userStatus, setUserStatus] = useState(user?.userStatus || "");
    const [businessSearch, setBusinessSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [selectedBusiness, setSelectedBusiness] = useState<{_id: Id<"businesses">, businessName: string} | null>(null);
    const [showDropdown, setShowDropdown] = useState(false);
    const searchRef = useRef<HTMLDivElement>(null);
    
    const searchResults = useBusinessSearch(debouncedSearch);

    // Debounce search input - wait 500ms after user stops typing
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(businessSearch);
        }, 500);

        return () => clearTimeout(timer);
    }, [businessSearch]);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setShowDropdown(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!user?.id) {
            alert(user.id);
            return;
        }

        const formData = new FormData(e.currentTarget);

        const payload = {
            userStatus: formData.get("userStatus") as "customer" | "employee" | "owner",
            phoneNumber: formData.get("phone") as string,
            address: formData.get("street") as string + ", " + formData.get("apt") as string + ", " +
                     formData.get("city") as string + "," + formData.get("province") as string + ", " + formData.get("zipCode") as string,
        };

        const isBusiness = payload.userStatus === "owner";
        const isEmployee = payload.userStatus === "employee";
        let businessId: Id<"businesses"> | undefined;

        try {
            // 1. Create business if owner
            if (isBusiness) {
             businessId = await addBusiness({
                    businessName: formData.get("businessName") as string,
                    businessEmail: formData.get("businessEmail") as string,
                    businessPhoneNumber: formData.get("businessPhone") as string,
                    businessWebsite: (formData.get("businessWebsite") as string) || undefined,
                    businessAddress: formData.get("businessStreet") as string + ", " + formData.get("businessCity") + ", " +
                                    formData.get("businessProvince") + ", " + formData.get("businessZip"),
                    businessTimeZone: "America/Toronto",
                    industryId: formData.get("industryId") as Id<"industries">,
                });
            }

            // 2. Create staff profile if employee
            if (isEmployee) {
                if (!selectedBusiness) {
                    alert("Please select a business");
                    return;
                }
                
                await addStaff({
                    businessId: selectedBusiness._id,
                    name: formData.get("staffName") as string,
                    role: formData.get("role") as string,
                    bio: formData.get("bio") as string,
                    rating: 5.0,
                    email: user.email,
                    status: "active",
                });
                
                // Set businessId for employee user profile
                businessId = selectedBusiness._id;
            }

            // 3. Always update user profile
            await updateProfile({
                id: user.id,
                userStatus: payload.userStatus,
                phoneNumber: payload.phoneNumber,
                address: payload.address,
                businessId: businessId,
            });

            alert("Profile completed successfully!");
            // redirect or close modal here
        } catch (e) {
            console.error("Submit failed:", e);
            alert("Failed to save" );
        }
    };


    return (
        <div className="flex min-h-screen flex-col justify-center px-6 py-12 lg:px-8">
            <motion.div
                initial={{opacity: 0, y: 30}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.6, ease: "easeOut"}}
                className="sm:mx-auto sm:w-full sm:max-w-2xl"
            >
                {/* Header */}
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold tracking-tight text-black">
                        Welcome{user?.name ? `, ${user.name.split(" ")[0]}` : ""}!
                    </h2>
                    <p className="mt-2 text-gray-600">Let's complete your profile</p>
                </div>

                {/* Form */}
                <form className="space-y-6" onSubmit={handleSubmit}>
                    {/* Phone Number */}
                    <div>
                        <label className="block text-sm/6 font-medium text-black-100">
                            Phone Number <span className="text-red-500">*</span>
                        </label>
                        <div className="mt-2">
                            <input
                                type="tel"
                                name="phone"
                                defaultValue={user?.phone || ""}
                                placeholder="+1 (555) 123-4567"
                                required
                                className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-black outline-1 -outline-offset-1 outline-black/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                            />
                        </div>
                    </div>

                    {/* Address Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm/6 font-medium text-black-100">
                                Street Address <span className="text-red-500">*</span>
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="street"
                                    placeholder="123 Main Street"
                                    required
                                    className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-black outline-1 -outline-offset-1 outline-black/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm/6 font-medium text-black-100">
                                Apartment, Suite, etc. <span className="text-gray-400">(optional)</span>
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="apt"
                                    placeholder="Apt 4B"
                                    className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-black outline-1 -outline-offset-1 outline-black/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                                />
                            </div>
                        </div>
                    </div>

                    {/* City, Province, ZIP */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="md:col-span-2">
                            <label className="block text-sm/6 font-medium text-black-100">
                                City <span className="text-red-500">*</span>
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="city"
                                    placeholder="Los Angeles"
                                    required
                                    className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-black outline-1 -outline-offset-1 outline-black/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm/6 font-medium text-black-100">
                                Province <span className="text-red-500">*</span>
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="province"
                                    placeholder="CA"
                                    required
                                    className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-black outline-1 -outline-offset-1 outline-black/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm/6 font-medium text-black-100">
                                ZIP Code <span className="text-red-500">*</span>
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="zipCode"
                                    placeholder="90210"
                                    pattern="\d{5}"
                                    required
                                    className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-black outline-1 -outline-offset-1 outline-black/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Role Selection */}
                    <div>
                        <label className="block text-sm/6 font-medium text-black-100">
                            What best describes you? <span className="text-red-500">*</span>
                        </label>
                        <div className="mt-2">
                            <select
                                name="userStatus"
                                required
                                value={userStatus}
                                onChange={(e) => setUserStatus(e.target.value)}
                                className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-black outline-1 -outline-offset-1 outline-black/10 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                            >
                                <option value="" disabled>— Select your role —</option>
                                <option value="customer">Customer</option>
                                <option value="employee">Employee / Staff</option>
                                <option value="owner">Business Owner</option>
                            </select>
                        </div>
                        <p className="mt-2 text-sm text-gray-500">
                            This helps us show you the right features
                        </p>
                    </div>

                    {/* Conditional Fields with Smooth Animation */}
                    <AnimatePresence mode="wait">
                        {userStatus && (
                            <motion.div
                                key={userStatus}
                                initial={{opacity: 0, y: -20, height: 0}}
                                animate={{opacity: 1, y: 0, height: "auto"}}
                                exit={{opacity: 0, y: -20, height: 0}}
                                transition={{duration: 0.4, ease: "easeOut"}}
                                className="overflow-hidden space-y-6"
                            >
                                {/* === CUSTOMER OR EMPLOYEE === */}
                                {(userStatus === "customer" || userStatus === "employee") && (
                                    <div className="space-y-6 pt-4 border-t border-gray-200">
                                        <h3 className="text-lg font-semibold text-black">
                                            {userStatus === "customer" ? "Tell us a bit about yourself" : "Your professional profile"}
                                        </h3>

                                        {/* Business Search for employees */}
                                        {userStatus === "employee" && (
                                            <div ref={searchRef}>
                                                <label className="block text-sm/6 font-medium text-black-100">
                                                    Search Your Business <span className="text-red-500">*</span>
                                                </label>
                                                <div className="mt-2 relative">
                                                    <input
                                                        type="text"
                                                        value={selectedBusiness ? selectedBusiness.businessName : businessSearch}
                                                        onChange={(e) => {
                                                            setBusinessSearch(e.target.value);
                                                            setSelectedBusiness(null);
                                                            setShowDropdown(true);
                                                        }}
                                                        onFocus={() => setShowDropdown(true)}
                                                        placeholder="Start typing business name..."
                                                        required
                                                        className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-black outline-1 -outline-offset-1 outline-black/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                                                    />
                                                    
                                                    {/* Dropdown Results */}
                                                    {showDropdown && businessSearch && !selectedBusiness && (
                                                        <div className="absolute z-10 w-full mt-2 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                                                            {searchResults === undefined ? (
                                                                <div className="px-3 py-2 text-gray-500 text-sm">
                                                                    Searching...
                                                                </div>
                                                            ) : searchResults && searchResults.length > 0 ? (
                                                                searchResults.map((business) => (
                                                                    <div
                                                                        key={business._id}
                                                                        onClick={() => {
                                                                            setSelectedBusiness(business);
                                                                            setBusinessSearch(business.businessName);
                                                                            setShowDropdown(false);
                                                                        }}
                                                                        className="px-3 py-2 hover:bg-gray-100 cursor-pointer transition-colors border-b border-gray-100 last:border-b-0"
                                                                    >
                                                                        <div className="font-medium text-black text-sm">
                                                                            {business.businessName}
                                                                        </div>
                                                                        <div className="text-xs text-gray-500">
                                                                            {business.businessAddress}
                                                                        </div>
                                                                    </div>
                                                                ))
                                                            ) : (
                                                                <div className="px-3 py-2 text-gray-500 text-sm">
                                                                    No businesses found
                                                                </div>
                                                            )}
                                                        </div>
                                                    )}
                                                    
                                                    {/* Selected Business Display */}
                                                    {selectedBusiness && (
                                                        <div className="mt-2 px-3 py-2 bg-indigo-50 border border-indigo-200 rounded-md flex items-center justify-between">
                                                            <div>
                                                                <div className="font-medium text-indigo-900 text-sm">
                                                                    {selectedBusiness.businessName}
                                                                </div>
                                                                <div className="text-xs text-indigo-600">
                                                                    Selected
                                                                </div>
                                                            </div>
                                                            <button
                                                                type="button"
                                                                onClick={() => {
                                                                    setSelectedBusiness(null);
                                                                    setBusinessSearch("");
                                                                }}
                                                                className="text-sm text-indigo-600 hover:text-indigo-800 font-medium"
                                                            >
                                                                Change
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                                <p className="mt-2 text-sm text-gray-500">
                                                    Type to search for the business you work for
                                                </p>
                                            </div>
                                        )}

                                        {/* Name and Role fields for employees */}
                                        {userStatus === "employee" && (
                                            <>
                                                <div>
                                                    <label className="block text-sm/6 font-medium text-black-100">
                                                        Full Name <span className="text-red-500">*</span>
                                                    </label>
                                                    <div className="mt-2">
                                                        <input
                                                            type="text"
                                                            name="staffName"
                                                            required
                                                            defaultValue={user?.name || ""}
                                                            placeholder="e.g., John Doe"
                                                            className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-black outline-1 -outline-offset-1 outline-black/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                                                        />
                                                    </div>
                                                </div>
                                                
                                                <div>
                                                    <label className="block text-sm/6 font-medium text-black-100">
                                                        Role / Position <span className="text-red-500">*</span>
                                                    </label>
                                                    <div className="mt-2">
                                                        <input
                                                            type="text"
                                                            name="role"
                                                            required
                                                            placeholder="e.g., Hair Stylist, Barber, Nail Technician"
                                                            className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-black outline-1 -outline-offset-1 outline-black/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                                                        />
                                                    </div>
                                                </div>
                                            </>
                                        )}

                                        {/* Bio */}
                                        <div>
                                            <label className="block text-sm/6 font-medium text-black-100">
                                                Bio {userStatus === "employee" && <span className="text-red-500">*</span>}
                                                {userStatus === "customer" && <span className="text-gray-400">(optional)</span>}
                                            </label>
                                            <div className="mt-2">
                                                <textarea
                                                    name="bio"
                                                    rows={4}
                                                    required={userStatus === "employee"}
                                                    placeholder={userStatus === "customer" ? "I love trying new hairstyles and coffee shops!" : "Specializing in balayage and modern cuts for 5+ years"}
                                                    className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-black outline-1 -outline-offset-1 outline-black/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6 resize-none"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* === BUSINESS OWNER === */}
                                {userStatus === "owner" && (
                                    <div className="space-y-6 pt-4 border-t border-gray-200">
                                        <h3 className="text-lg font-semibold text-black">Your Business Details</h3>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {/* Business Name */}
                                            <div>
                                                <label className="block text-sm/6 font-medium text-black-100">
                                                    Business Name <span className="text-red-500">*</span>
                                                </label>
                                                <div className="mt-2">
                                                    <input
                                                        type="text"
                                                        name="businessName"
                                                        required
                                                        placeholder="e.g., Glow Hair Studio"
                                                        className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-black outline-1 -outline-offset-1 outline-black/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                                                    />
                                                </div>
                                            </div>

                                            {/* Industry */}
                                            <div>
                                                <label className="block text-sm/6 font-medium text-black-100">
                                                    Industry <span className="text-red-500">*</span>
                                                </label>
                                                <div className="mt-2">
                                                    {(() => {
                                                        const industries = getAllIndustries;

                                                        if (industries === undefined) {
                                                            return (
                                                                <div className="block w-full rounded-md bg-gray-50 px-3 py-1.5 text-base text-gray-500 sm:text-sm/6">
                                                                    Loading industries...
                                                                </div>
                                                            );
                                                        }

                                                        if (!industries || industries.length === 0) {
                                                            return (
                                                                <div className="block w-full rounded-md bg-red-50 px-3 py-1.5 text-base text-red-700 sm:text-sm/6">
                                                                    No industries found
                                                                </div>
                                                            );
                                                        }

                                                        return (
                                                            <select
                                                                name="industryId"
                                                                required
                                                                defaultValue=""
                                                                className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-black outline-1 -outline-offset-1 outline-black/10 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                                                            >
                                                                <option value="" disabled>— Select your industry —</option>
                                                                {industries.map((industry) => (
                                                                    <option key={industry._id} value={industry._id}>
                                                                        {industry.label}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                        );
                                                    })()}
                                                </div>
                                            </div>

                                            {/* Business Email */}
                                            <div>
                                                <label className="block text-sm/6 font-medium text-black-100">
                                                    Business Email <span className="text-red-500">*</span>
                                                </label>
                                                <div className="mt-2">
                                                    <input
                                                        type="email"
                                                        name="businessEmail"
                                                        required
                                                        placeholder="hello@glowhairstudio.com"
                                                        className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-black outline-1 -outline-offset-1 outline-black/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                                                    />
                                                </div>
                                            </div>

                                            {/* Business Phone */}
                                            <div>
                                                <label className="block text-sm/6 font-medium text-black-100">
                                                    Business Phone <span className="text-red-500">*</span>
                                                </label>
                                                <div className="mt-2">
                                                    <input
                                                        type="tel"
                                                        name="businessPhone"
                                                        required
                                                        placeholder="(555) 123-4567"
                                                        className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-black outline-1 -outline-offset-1 outline-black/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                                                    />
                                                </div>
                                            </div>

                                            {/* Website */}
                                            <div className="md:col-span-2">
                                                <label className="block text-sm/6 font-medium text-black-100">
                                                    Website <span className="text-gray-400">(optional)</span>
                                                </label>
                                                <div className="mt-2">
                                                    <input
                                                        type="url"
                                                        name="businessWebsite"
                                                        placeholder="https://www.glowhairstudio.com"
                                                        className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-black outline-1 -outline-offset-1 outline-black/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Business Address */}
                                        <div>
                                            <h4 className="text-base font-semibold text-black mb-4">Business Address</h4>
                                            <div className="space-y-4">
                                                <input
                                                    type="text"
                                                    name="businessStreet"
                                                    required
                                                    placeholder="Street Address"
                                                    className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-black outline-1 -outline-offset-1 outline-black/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                                                />
                                                <div className="grid grid-cols-2 gap-4">
                                                    <input
                                                        type="text"
                                                        name="businessCity"
                                                        required
                                                        placeholder="City"
                                                        className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-black outline-1 -outline-offset-1 outline-black/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                                                    />
                                                    <input
                                                        type="text"
                                                        name="businessProvince"
                                                        required
                                                        placeholder="Province"
                                                        className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-black outline-1 -outline-offset-1 outline-black/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                                                    />
                                                </div>
                                                <input
                                                    type="text"
                                                    name="businessZip"
                                                    required
                                                    placeholder="ZIP Code"
                                                    className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-black outline-1 -outline-offset-1 outline-black/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Action Buttons */}
                    <div className="pt-6 flex flex-col sm:flex-row gap-4">
                        <motion.button
                            whileHover={{scale: 1.05}}
                            whileTap={{scale: 0.98}}
                            transition={{type: "spring", stiffness: 300}}
                            type="submit"
                            className="flex-1 rounded-full bg-sky-600 px-6 py-3 text-white font-medium shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all"
                        >
                            Complete Profile
                        </motion.button>

                        <button
                            type="button"
                            onClick={signOut}
                            className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium rounded-full transition-all duration-200"
                        >
                            Log Out
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>
    )
}

export default CompleteProfile;
