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
                    name: user.name || "Staff Member",
                    role: formData.get("role") as string || "Staff",
                    bio: formData.get("bio") as string || "",
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
        <div
            className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center px-4 py-12">
            <motion.div
                initial={{opacity: 0, y: 30}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.6, ease: "easeOut"}}
                className="w-full max-w-3xl"
            >
                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-10 py-12 text-center">
                        <h1 className="text-4xl md:text-5xl font-bold text-white">
                            Welcome{user?.name ? `, ${user.name.split(" ")[0]}!` : ""}!
                        </h1>
                        <p className="text-indigo-100 text-lg mt-4">Let’s complete your profile</p>
                    </div>

                    {/* Form */
                    }
                    <form className="p-8 lg:p-12 space-y-8" onSubmit={handleSubmit}>
                        <div className="text-center -mt-4">
                            <p className="text-gray-600 text-lg">We just need a few more details to get started</p>
                        </div>

                        {/* Phone Number */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Phone Number <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="tel"
                                name="phone"
                                defaultValue={user?.phone || ""}
                                placeholder="+1 (555) 123-4567"
                                className="w-full px-5 py-4 rounded-xl border border-gray-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all outline-none text-gray-800 placeholder-gray-400"
                            />
                        </div>

                        {/* Address Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Street Address <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="street"
                                    placeholder="123 Main Street"
                                    className="w-full px-5 py-4 rounded-xl border border-gray-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Apartment, Suite, etc. <span className="text-gray-400">(optional)</span>
                                </label>
                                <input
                                    type="text"
                                    name="apt"
                                    placeholder="Apt 4B"
                                    className="w-full px-5 py-4 rounded-xl border border-gray-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all outline-none"
                                />
                            </div>
                        </div>

                        {/* City, State, ZIP */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            <div className="md:col-span-2">
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    City <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="city"
                                    placeholder="Los Angeles"
                                    className="w-full px-5 py-4 rounded-xl border border-gray-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Province <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="province"
                                    placeholder="CA"
                                    className="w-full px-5 py-4 rounded-xl border border-gray-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    ZIP Code <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="zipCode"
                                    placeholder="90210"
                                    pattern="\d{5}"
                                    className="w-full px-5 py-4 rounded-xl border border-gray-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all outline-none"
                                />
                            </div>
                        </div>


                        <div className="space-y-8">
                            {/* Role Selection */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    What best describes you? <span className="text-red-500">*</span>
                                </label>

                                <select
                                    name="userStatus"
                                    required
                                    value={userStatus}
                                    onChange={(e) => setUserStatus(e.target.value)}
                                    className="w-full px-5 py-4 rounded-xl border border-gray-300
                 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100
                 transition-all outline-none text-gray-800 bg-white
                 appearance-none cursor-pointer
                 bg-[url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 fill=%22none%22 viewBox=%220 0 20 20%22%3E%3Cpath stroke=%22%236b7280%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22 stroke-width=%221.5%22 d=%22m6 8 4 4 4-4%22/%3E%3C/svg%3E')]
                 bg-[length:12px] bg-[right_1rem_center] bg-no-repeat"
                                >
                                    <option value="" disabled>
                                        — Select your role —
                                    </option>
                                    <option value="customer">Customer</option>
                                    <option value="employee">Employee / Staff</option>
                                    <option value="owner">Business Owner</option>
                                </select>

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
                                        className="overflow-hidden space-y-8"
                                    >
                                        {/* === CUSTOMER OR EMPLOYEE === */}
                                        {(userStatus === "customer" || userStatus === "employee") && (
                                            <div
                                                className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8 border border-purple-200">
                                                <h3 className="text-xl font-bold text-gray-800 mb-6">
                                                    {userStatus === "customer" ? "Tell us a bit about yourself" : "Your professional profile"}
                                                </h3>

                                                {/* Business selector for employees */}
                                                {userStatus === "employee" && (
                                                    <div className="mb-6" ref={searchRef}>
                                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                            Search Your Business <span className="text-red-500">*</span>
                                                        </label>
                                                        <div className="relative">
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
                                                                className="w-full px-5 py-4 rounded-xl border border-gray-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all outline-none"
                                                                required
                                                            />
                                                            
                                                            {/* Dropdown Results */}
                                                            {showDropdown && businessSearch && !selectedBusiness && (
                                                                <div className="absolute z-10 w-full mt-2 bg-white border border-gray-300 rounded-xl shadow-lg max-h-60 overflow-y-auto">
                                                                    {searchResults === undefined ? (
                                                                        <div className="px-5 py-4 text-gray-500">
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
                                                                                className="px-5 py-3 hover:bg-indigo-50 cursor-pointer transition-colors border-b border-gray-100 last:border-b-0"
                                                                            >
                                                                                <div className="font-medium text-gray-800">
                                                                                    {business.businessName}
                                                                                </div>
                                                                                <div className="text-sm text-gray-500">
                                                                                    {business.businessAddress}
                                                                                </div>
                                                                            </div>
                                                                        ))
                                                                    ) : (
                                                                        <div className="px-5 py-4 text-gray-500">
                                                                            No businesses found. Try a different search term.
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            )}
                                                            
                                                            {/* Selected Business Display */}
                                                            {selectedBusiness && (
                                                                <div className="mt-2 px-4 py-3 bg-indigo-50 border border-indigo-200 rounded-lg flex items-center justify-between">
                                                                    <div>
                                                                        <div className="font-medium text-indigo-900">
                                                                            {selectedBusiness.businessName}
                                                                        </div>
                                                                        <div className="text-sm text-indigo-600">
                                                                            Selected
                                                                        </div>
                                                                    </div>
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => {
                                                                            setSelectedBusiness(null);
                                                                            setBusinessSearch("");
                                                                        }}
                                                                        className="text-indigo-600 hover:text-indigo-800 font-medium"
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

                                                {/* Role field for employees */}
                                                {userStatus === "employee" && (
                                                    <div className="mb-6">
                                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                            Role / Position <span className="text-red-500">*</span>
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="role"
                                                            required
                                                            placeholder="e.g., Hair Stylist, Barber, Nail Technician"
                                                            className="w-full px-5 py-4 rounded-xl border border-gray-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all outline-none"
                                                        />
                                                    </div>
                                                )}

                                                {/* Profile Picture Upload */}
                                                <div className="mb-8">
                                                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                                                        Profile Picture <span
                                                        className="text-gray-400">(optional)</span>
                                                    </label>
                                                    <div className="flex items-center gap-6">
                                                        <div
                                                            className="w-24 h-24 bg-gray-200 border-2 border-dashed border-gray-400 rounded-full flex items-center justify-center">
                                                            <span className="text-3xl text-gray-500">+</span>
                                                        </div>
                                                        <input type="file" accept="image/*" name="profilePicture"
                                                               className="hidden"/>
                                                        {/*<button*/}
                                                        {/*    type="button"*/}
                                                        {/*    onClick={() => document.querySelector('input[name="profilePicture"]')?.click()}*/}
                                                        {/*    className="px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition"*/}
                                                        {/*>*/}
                                                        {/*    Upload Photo*/}
                                                        {/*</button>*/}
                                                    </div>
                                                </div>

                                                {/* Bio */}
                                                <div>
                                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                        Bio {userStatus === "employee" && <span className="text-red-500">*</span>}
                                                        {userStatus === "customer" && <span className="text-gray-400">(optional)</span>}
                                                    </label>
                                                    <textarea
                                                        name="bio"
                                                        rows={4}
                                                        required={userStatus === "employee"}
                                                        placeholder={userStatus === "customer" ? "I love trying new hairstyles and coffee shops!" : "Specializing in balayage and modern cuts for 5+ years"}
                                                        className="w-full px-5 py-4 rounded-xl border border-gray-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all outline-none resize-none"
                                                    />
                                                </div>

                                                {/* Interests (Multi-select style) */}
                                                <div>
                                                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                                                        Interests <span className="text-gray-400">(optional)</span>
                                                    </label>
                                                    <div className="flex flex-wrap gap-3">
                                                        {["Hair Care", "Nails", "Skincare", "Fitness", "Wellness", "Makeup", "Massage"].map((interest) => (
                                                            <label key={interest}
                                                                   className="flex items-center gap-2 cursor-pointer">
                                                                <input type="checkbox" name="interests" value={interest}
                                                                       className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500"/>
                                                                <span className="text-gray-700">{interest}</span>
                                                            </label>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {/* === BUSINESS OWNER === */}
                                        {userStatus === "owner" && (
                                            <div
                                                className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-2xl p-8 border border-teal-200">
                                                <h3 className="text-xl font-bold text-gray-800 mb-6">Your Business
                                                    Details</h3>

                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                    {/* Business Name */}
                                                    <div>
                                                        <label
                                                            className="block text-sm font-semibold text-gray-700 mb-2">Business
                                                            Name *</label>
                                                        <input
                                                            type="text"
                                                            name="businessName"
                                                            required
                                                            placeholder="e.g., Glow Hair Studio"
                                                            className="w-full px-5 py-4 rounded-xl border border-gray-300 focus:border-teal-500 focus:ring-4 focus:ring-teal-100 transition-all outline-none"
                                                        />
                                                    </div>

                                                    {/* Industry — Dynamic from Convex */}
                                                    <div>
                                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                            Industry <span className="text-red-500">*</span>
                                                        </label>

                                                        {(() => {
                                                            const industries = getAllIndustries;

                                                            // Loading state
                                                            if (industries === undefined) {
                                                                return (
                                                                    <div className="w-full px-5 py-4 rounded-xl border border-gray-300 bg-gray-50 text-gray-500">
                                                                        Loading industries...
                                                                    </div>
                                                                );
                                                            }

                                                            // Empty state (shouldn't happen)
                                                            if (!industries || industries.length === 0) {
                                                                return (
                                                                    <div className="w-full px-5 py-4 rounded-xl border border-red-300 bg-red-50 text-red-700">
                                                                        No industries found
                                                                    </div>
                                                                );
                                                            }

                                                            return (
                                                                <select
                                                                    name="industryId"
                                                                    required
                                                                    defaultValue=""
                                                                    className="w-full px-5 py-4 rounded-xl border border-gray-300
                   focus:border-teal-500 focus:ring-4 focus:ring-teal-100
                   transition-all outline-none bg-white cursor-pointer
                   appearance-none
                   bg-[url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 fill=%22none%22 viewBox=%220 0 20 20%22%3E%3Cpath stroke=%22%236b7280%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22 stroke-width=%221.5%22 d=%22m6 8 4 4 4-4%22/%3E%3C/svg%3E')]
                   bg-no-repeat bg-[right_1rem_center] bg-[length:12px]"
                                                                >
                                                                    <option value="" disabled>
                                                                        — Select your industry —
                                                                    </option>

                                                                    {industries.map((industry) => (
                                                                        <option key={industry._id} value={industry._id}>
                                                                            {industry.label} {/* assuming your industry has a "name" field */}
                                                                        </option>
                                                                    ))}
                                                                </select>
                                                            );
                                                        })()}
                                                    </div>

                                                    {/* Business Email */}
                                                    <div>
                                                        <label
                                                            className="block text-sm font-semibold text-gray-700 mb-2">Business
                                                            Email *</label>
                                                        <input
                                                            type="email"
                                                            name="businessEmail"
                                                            required
                                                            placeholder="hello@glowhairstudio.com"
                                                            className="w-full px-5 py-4 rounded-xl border border-gray-300 focus:border-teal-500 focus:ring-4 focus:ring-teal-100 transition-all outline-none"
                                                        />
                                                    </div>

                                                    {/* Business Phone */}
                                                    <div>
                                                        <label
                                                            className="block text-sm font-semibold text-gray-700 mb-2">Business
                                                            Phone *</label>
                                                        <input
                                                            type="tel"
                                                            name="businessPhone"
                                                            required
                                                            placeholder="(555) 123-4567"
                                                            className="w-full px-5 py-4 rounded-xl border border-gray-300 focus:border-teal-500 focus:ring-4 focus:ring-teal-100 transition-all outline-none"
                                                        />
                                                    </div>

                                                    {/* Website */}
                                                    <div>
                                                        <label
                                                            className="block text-sm font-semibold text-gray-700 mb-2">Website <span
                                                            className="text-gray-400">(optional)</span></label>
                                                        <input
                                                            type="url"
                                                            name="businessWebsite"
                                                            placeholder="https://www.glowhairstudio.com"
                                                            className="w-full px-5 py-4 rounded-xl border border-gray-300 focus:border-teal-500 focus:ring-4 focus:ring-teal-100 transition-all outline-none"
                                                        />
                                                    </div>
                                                </div>

                                                {/* Business Address */}
                                                <div className="mt-8">
                                                    <h4 className="text-lg font-semibold text-gray-800 mb-4">Business
                                                        Address *</h4>
                                                    <div className="space-y-4">
                                                        <input type="text" name="businessStreet" required
                                                               placeholder="Street Address"
                                                               className="w-full px-5 py-4 rounded-xl border border-gray-300 focus:border-teal-500 focus:ring-4 focus:ring-teal-100"/>
                                                        <div className="grid grid-cols-2 gap-4">
                                                            <input type="text" name="businessCity" required
                                                                   placeholder="City"
                                                                   className="px-5 py-4 rounded-xl border border-gray-300 focus:border-teal-500 focus:ring-4 focus:ring-teal-100"/>
                                                            <input type="text" name="businessProvince" required
                                                                   placeholder="Province"
                                                                   className="px-5 py-4 rounded-xl border border-gray-300 focus:border-teal-500 focus:ring-4 focus:ring-teal-100"/>
                                                        </div>
                                                        <input type="text" name="businessZip" required
                                                               placeholder="ZIP Code"
                                                               className="w-full px-5 py-4 rounded-xl border border-gray-300 focus:border-teal-500 focus:ring-4 focus:ring-teal-100"/>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Action Buttons */}
                        <div className="pt-8 flex flex-col sm:flex-row gap-4">
                            <motion.button
                                whileHover={{scale: 1.02}}
                                whileTap={{scale: 0.98}}
                                type="submit"
                                className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold text-lg py-5 rounded-xl shadow-xl transition-all duration-300"
                            >
                                Complete Profile
                            </motion.button>

                            <button
                                type="button"
                                onClick={signOut}
                                className="px-10 py-5 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium rounded-xl transition-all duration-200"
                            >
                                Log Out
                            </button>
                        </div>
                    </form>
                </div>
            </motion.div>
        </div>
    )
}

export default CompleteProfile;