type BillingCycle = "monthly" | "yearly";

type Tier = {
  id: string;
  name: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  cta: string;
  mostPopular: boolean;
  features: { label: string; included: boolean }[];
  suffix?: string;
};

const TIERS: Tier[] = [
  {
    id: "starter",
    name: "Beginner",
    description:
      "Ideal for small teams getting started with appointment scheduling.",
    monthlyPrice: 29.99,
    yearlyPrice: 24.99,
    cta: "Start Now",
    mostPopular: false,
    features: [
      { label: "Booking for up to 2 staff", included: true },
      { label: "Self‑serve booking page", included: true },
      { label: "Email reminders", included: true },
      { label: "Basic analytics", included: true },
      { label: "Custom branding", included: false },
    ],
  },
  {
    id: "reliable",
    name: "Reliable",
    description:
      "Everything you need to run bookings at scale and keep customers happy.",
    monthlyPrice: 39.99,
    yearlyPrice: 33.99,
    cta: "Start Now",
    mostPopular: true,
    features: [
      { label: "Booking for up to 10 staff", included: true },
      { label: "Unlimited services & categories", included: true },
      { label: "Online payments (Stripe)", included: true },
      { label: "Auto email/SMS reminders", included: true },
      { label: "Customer reviews & ratings", included: true },
      { label: "Priority support", included: true },
    ],
  },
  {
    id: "expert",
    name: "Expert",
    description:
      "Advanced controls, integrations, and support for scaling operations.",
    monthlyPrice: 49.99,
    yearlyPrice: 39.99,
    cta: "Start Now",
    mostPopular: false,
    features: [
      { label: "Unlimited staff & locations", included: true },
      { label: "Advanced reports & dashboards", included: true },
      { label: "All features & integrations", included: true },
      { label: "Webhooks & API access", included: true },
      { label: "Dedicated success manager", included: true },
    ],
  },
];

export { TIERS, type BillingCycle, type Tier };
