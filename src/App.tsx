import { BrowserRouter, Routes, Route } from "react-router-dom";
import type { ReactNode } from "react";
import Pricing from "./pages/Landing/Pricing";
import Home from "./pages/Landing/Home";
import Services from "./pages/Landing/Services";
import AboutUs from "./pages/Landing/AboutUs";
import Appoiment from "./pages/Landing/Appoiment";
import ContactUs from "./pages/Landing/ContactUs";
import DashboardLayout from "./pages/Dashboard/DashboardLayout";
import OverviewPage from "./pages/Dashboard/OverviewPage";
import CalendarPage from "./pages/Dashboard/CalendarPage";
import CustomersPage from "./pages/Dashboard/CustomersPage";
import SalonHubPage from "./pages/Dashboard/SalonHubPage";
import StaffManagementPage from "./pages/Dashboard/StaffManagementPage";
import StaffProfilePage from "./pages/Dashboard/StaffProfilePage";
import SettingsPage from "./pages/Dashboard/SettingsPage";
import { useUser } from "./context/UserContext";
import LoginPage from "./pages/Auth/LoginPage.tsx";
import SignUpForm from "./components/Auth/SignUpForm.tsx";
import ScrollToTop from "./components/ScrollToTop.tsx";
import TitleHandler from "./components/TitleHandler.tsx";

function ProtectedRoute({
  children,
  requireAdmin = false,
}: {
  children: ReactNode;
  requireAdmin?: boolean;
}) {
  const { isAdmin } = useUser();

  if (requireAdmin && !isAdmin) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-2">
            Access Denied
          </h1>
          <p className="text-slate-600">
            You don't have permission to access this page.
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <TitleHandler />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/services" element={<Services />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/appointment" element={<Appoiment />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignUpForm />} />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<OverviewPage />} />
          <Route path="calendar" element={<CalendarPage />} />
          <Route path="salon-hub" element={<SalonHubPage />} />
          <Route
            path="staff"
            element={
              <ProtectedRoute requireAdmin>
                <StaffManagementPage />
              </ProtectedRoute>
            }
          />
          <Route path="customers" element={<CustomersPage />} />
          <Route path="staff-profile" element={<StaffProfilePage />} />
          <Route
            path="settings"
            element={
              <ProtectedRoute requireAdmin>
                <SettingsPage />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
