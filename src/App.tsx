import { BrowserRouter, Routes, Route } from "react-router-dom"; // import AboutUs from "./pages/Landing/AboutUs";
import Pricing from "./pages/Landing/Pricing";
import Home from "./pages/Landing/Home";
import Services from "./pages/Landing/Services";
import AboutUs from "./pages/Landing/AboutUs";
import Appoiment from "./pages/Landing/Appoiment";
import ContactUs from "./pages/Landing/ContactUs";
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
      </Routes>
    </BrowserRouter>
  );
};
export default App;
