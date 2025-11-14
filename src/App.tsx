import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import AnalyticsPage from "./pages/Dashboard/AnalyticsPage";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/services" element={<Services />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/appointment" element={<Appoiment />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<OverviewPage />} />
          <Route path="calendar" element={<CalendarPage />} />
          <Route path="customers" element={<CustomersPage />} />
          <Route path="analytics" element={<AnalyticsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
export default App;
