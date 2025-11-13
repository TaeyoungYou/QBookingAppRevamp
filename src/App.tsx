import { BrowserRouter, Routes, Route } from "react-router-dom";
import Pricing from "./pages/Landing/Pricing";
import Home from "./pages/Landing/Home";
import Services from "./pages/Landing/Services";
import AboutUs from "./pages/Landing/AboutUs";
import Appoiment from "./pages/Landing/Appoiment";
import ContactUs from "./pages/Landing/ContactUs";
import Dashboard from "./pages/Dashboard/Dashboard";
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
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
