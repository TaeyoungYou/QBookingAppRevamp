import { useLocation } from "react-router-dom";
import { useEffect } from "react";

function TitleHandler() {
  const { pathname } = useLocation();

  useEffect(() => {
    const titles: Record<string, string> = {
      "/": "Q - Home",
      "/pricing": "Q - Pricing",
      "/services": "Q - Services",
      "/about-us": "Q - About Us",
      "/appointment": "Q - Appointment",
      "/contact-us": "Q - Contact Us",
      "/login": "Q - Login",
      "/sign-up": "Q - Sign Up",
      "/dashboard": "Q - Dashboard",
      "/dashboard/calendar": "Q - Dashboard | Calendar",
      "/dashboard/salon-hub": "Q - Dashboard | Salon Hub",
      "/dashboard/staff": "Q - Dashboard | Staff",
      "/dashboard/customers": "Q - Dashboard | Customers",
      "/dashboard/staff-profile": "Q - Dashboard | Staff Profile",
      "/dashboard/settings": "Q - Dashboard | Settings",
    };

    document.title = titles[pathname] ?? "Q Application";
  }, [pathname]);

  return null;
}

export default TitleHandler;
