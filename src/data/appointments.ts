export interface FormData {
  name: string;
  email: string;
  phone: string;
  industry: string;
  location: string;
  service: string;
  date: string;
  time: string;
  staff: string;
}

interface Appointment extends FormData {
  id: string;
  status: "pending" | "confirmed" | "cancelled" | "completed";
}
const industries = [
  {
    value: "restaurant",
    label: "Restaurant",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop",
    description: "Book your table for an amazing dining experience",
  },
  {
    value: "fitness",
    label: "Fitness & Gym",
    image:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=300&fit=crop",
    description: "Schedule your workout sessions and classes",
  },
  {
    value: "doctor",
    label: "Medical & Healthcare",
    image:
      "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=400&h=300&fit=crop",
    description: "Book appointments with healthcare professionals",
  },
  {
    value: "beauty",
    label: "Beauty & Spa",
    image:
      "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=300&fit=crop",
    description: "Pamper yourself with beauty treatments",
  },
  {
    value: "salon",
    label: "Hair Salon",
    image:
      "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=400&h=300&fit=crop",
    description: "Get the perfect haircut and styling",
  },
  {
    value: "dental",
    label: "Dental Care",
    image:
      "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=400&h=300&fit=crop",
    description: "Schedule your dental checkup and treatments",
  },
];

const locations: Record<
  string,
  { name: string; description: string; address: string; image: string }[]
> = {
  restaurant: [
    {
      name: "Downtown",
      description: "Located in the heart of the city center",
      address: "123 Main Street, Downtown District",
      image:
        "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=400&h=300&fit=crop",
    },
    {
      name: "Uptown",
      description: "Modern dining in the business district",
      address: "456 Business Ave, Uptown Plaza",
      image:
        "https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=400&h=300&fit=crop",
    },
    {
      name: "Beach Front",
      description: "Stunning ocean views and fresh seafood",
      address: "789 Coastal Road, Beach District",
      image:
        "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400&h=300&fit=crop",
    },
    {
      name: "Mall Area",
      description: "Convenient shopping mall location",
      address: "321 Shopping Center, Mall Level 2",
      image:
        "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=400&h=300&fit=crop",
    },
  ],
  fitness: [
    {
      name: "City Center",
      description: "Premium gym with state-of-the-art equipment",
      address: "100 Fitness Street, Downtown",
      image:
        "https://images.unsplash.com/photo-1593079831268-3381b0db4a77?w=400&h=300&fit=crop",
    },
    {
      name: "North Branch",
      description: "Spacious facility with olympic pool",
      address: "200 North Avenue, North District",
      image:
        "https://images.unsplash.com/photo-1519505907962-0a6cb0167c73?w=400&h=300&fit=crop",
    },
    {
      name: "South Branch",
      description: "24/7 access with personal training",
      address: "300 South Road, South District",
      image:
        "https://images.unsplash.com/photo-1558017487-06bf9f82613a?w=400&h=300&fit=crop",
    },
  ],
  doctor: [
    {
      name: "Main Hospital",
      description: "Full-service medical center",
      address: "500 Health Boulevard, Medical District",
      image:
        "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?w=400&h=300&fit=crop",
    },
    {
      name: "Clinic A",
      description: "Specialist clinic for general practice",
      address: "600 Care Street, Downtown",
      image:
        "https://images.unsplash.com/photo-1666214280557-f1b5022eb634?w=400&h=300&fit=crop",
    },
    {
      name: "Health Center",
      description: "Community health and wellness",
      address: "700 Wellness Way, Community District",
      image:
        "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=300&fit=crop",
    },
  ],
  beauty: [
    {
      name: "Spa Downtown",
      description: "Luxury spa in the city center",
      address: "800 Beauty Lane, Downtown",
      image:
        "https://images.unsplash.com/photo-1519415510236-718bdfcd89c8?w=400&h=300&fit=crop",
    },
    {
      name: "Luxury Spa",
      description: "Premium treatments and relaxation",
      address: "900 Luxury Boulevard, Uptown",
      image:
        "https://images.unsplash.com/photo-1519415510236-718bdfcd89c8?w=400&h=300&fit=crop",
    },
    {
      name: "Resort Spa",
      description: "Full-day spa resort experience",
      address: "1000 Resort Road, Spa District",
      image:
        "https://images.unsplash.com/photo-1519415510236-718bdfcd89c8?w=400&h=300&fit=crop",
    },
  ],
  salon: [
    {
      name: "Main Street",
      description: "Trendy salon with expert stylists",
      address: "1100 Main Street, Fashion District",
      image:
        "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=400&h=300&fit=crop",
    },
    {
      name: "Plaza",
      description: "Modern salon in shopping plaza",
      address: "1200 Plaza Avenue, Shopping District",
      image:
        "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=400&h=300&fit=crop",
    },
  ],
  dental: [
    {
      name: "Dental Clinic 1",
      description: "Family dentistry and orthodontics",
      address: "1300 Dental Street, Medical District",
      image:
        "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=400&h=300&fit=crop",
    },
    {
      name: "Kids Dental",
      description: "Specialized pediatric dental care",
      address: "1400 Kids Way, Family District",
      image:
        "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=400&h=300&fit=crop",
    },
  ],
};

const services: Record<
  string,
  {
    name: string;
    description: string;
    price?: string;
    duration: string;
    image: string;
  }[]
> = {
  restaurant: [
    {
      name: "Table for 2",
      description: "Intimate dining experience for two guests",
      price: "$50",
      duration: "2 hours",
      image:
        "https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=400&h=300&fit=crop",
    },
    {
      name: "Table for 4",
      description: "Perfect for family or friends gathering",
      price: "$100",
      duration: "2-3 hours",
      image:
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop",
    },
    {
      name: "Private Room",
      description: "Exclusive private dining room for special occasions",
      price: "$150",
      duration: "3-4 hours",
      image:
        "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=400&h=300&fit=crop",
    },
  ],
  fitness: [
    {
      name: "Personal Training",
      description: "One-on-one session with certified trainer",
      price: "$50",
      duration: "60 mins",
      image:
        "https://images.unsplash.com/photo-1549576490-b0b4831ef60a?w=400&h=300&fit=crop",
    },
    {
      name: "Group Class",
      description: "High-energy group fitness session",
      price: "$30",
      duration: "45 mins",
      image:
        "https://images.unsplash.com/photo-1599058917212-d750089bc07e?w=400&h=300&fit=crop",
    },
    {
      name: "Yoga",
      description: "Relaxing yoga and meditation class",
      price: "$40",
      duration: "60 mins",
      image:
        "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=300&fit=crop",
    },
    {
      name: "Swimming",
      description: "Lap swimming or aqua fitness",
      price: "$35",
      duration: "45 mins",
      image:
        "https://images.unsplash.com/photo-1600965962102-9d260a71890d?w=400&h=300&fit=crop",
    },
  ],
  doctor: [
    {
      name: "General Checkup",
      description: "Comprehensive health examination",
      duration: "30 mins",
      image:
        "https://images.unsplash.com/photo-1628595351029-c2bf17511435?w=400&h=300&fit=crop",
    },
    {
      name: "Consultation",
      description: "Medical consultation with specialist",
      duration: "20 mins",
      image:
        "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=400&h=300&fit=crop",
    },
    {
      name: "Vaccination",
      description: "Immunization and vaccination service",
      duration: "15 mins",
      image:
        "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=400&h=300&fit=crop",
    },
  ],

  beauty: [
    {
      name: "Facial Treatment",
      description: "Deep cleansing and rejuvenating facial",
      price: "$100",
      duration: "90 mins",
      image:
        "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=400&h=300&fit=crop",
    },
    {
      name: "Full Body Massage",
      description: "Relaxing full body massage therapy",
      price: "$120",
      duration: "120 mins",
      image:
        "https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=400&h=300&fit=crop",
    },
    {
      name: "Manicure & Pedicure",
      description: "Complete nail care and styling",
      price: "$80",
      duration: "60 mins",
      image:
        "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?w=400&h=300&fit=crop",
    },
  ],
  salon: [
    {
      name: "Haircut",
      description: "Professional haircut and styling",
      price: "$50",
      duration: "45 mins",
      image:
        "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=400&h=300&fit=crop",
    },
    {
      name: "Hair Coloring",
      description: "Full color treatment with premium products",
      price: "$100",
      duration: "120 mins",
      image:
        "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=400&h=300&fit=crop",
    },
    {
      name: "Hair Treatment",
      description: "Deep conditioning and repair treatment",
      price: "$80",
      duration: "60 mins",
      image:
        "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=400&h=300&fit=crop",
    },
  ],
  dental: [
    {
      name: "Cleaning",
      description: "Professional teeth cleaning and polishing",
      price: "$100",
      duration: "45 mins",
      image:
        "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=400&h=300&fit=crop",
    },
    {
      name: "Checkup",
      description: "Comprehensive dental examination",
      price: "$80",
      duration: "30 mins",
      image:
        "https://images.unsplash.com/photo-1609840112855-9ab5ad8f66e4?w=400&h=300&fit=crop",
    },
    {
      name: "Whitening",
      description: "Professional teeth whitening treatment",
      price: "$120",
      duration: "60 mins",
      image:
        "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=400&h=300&fit=crop",
    },
  ],
};

const availableStaff: Record<
  string,
  { name: string; role: string; bio: string; image: string; rating: number }[]
> = {
  restaurant: [
    {
      name: "John Doe",
      role: "Waiter",
      bio: "Professional waiter with a passion for hospitality",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
      rating: 5,
    },
    {
      name: "Jane Smith",
      role: "Waitress",
      bio: "Friendly and attentive waitress with a smile",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
      rating: 5,
    },
    {
      name: "Michael Brown",
      role: "Bartender",
      bio: "Professional bartender with a passion for mixology",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
      rating: 4,
    },
  ],

  fitness: [
    {
      name: "Trainer John",
      role: "Senior Fitness Coach",
      bio: "10+ years experience in strength training and nutrition",
      image:
        "https://images.unsplash.com/photo-1605296867304-46d5465a13f1?w=200&h=200&fit=crop",
      rating: 5,
    },
    {
      name: "Trainer Sarah",
      role: "Yoga & Pilates Instructor",
      bio: "Certified yoga instructor specializing in mindfulness",
      image:
        "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=200&h=200&fit=crop",
      rating: 5,
    },
    {
      name: "Trainer Mike",
      role: "CrossFit Specialist",
      bio: "High-intensity training and athletic performance",
      image:
        "https://images.unsplash.com/photo-1597452485669-2c7bb5fef90d?w=200&h=200&fit=crop",
      rating: 4,
    },
  ],
  doctor: [
    {
      name: "Dr. Smith",
      role: "General Practitioner",
      bio: "15 years in family medicine and preventive care",
      image:
        "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&h=200&fit=crop",
      rating: 5,
    },
    {
      name: "Dr. Johnson",
      role: "Internal Medicine",
      bio: "Specialist in chronic disease management",
      image:
        "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&h=200&fit=crop",
      rating: 5,
    },
    {
      name: "Dr. Williams",
      role: "Pediatrician",
      bio: "Dedicated to children's health and wellbeing",
      image:
        "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=200&h=200&fit=crop",
      rating: 5,
    },
  ],
  beauty: [
    {
      name: "Therapist Anna",
      role: "Senior Spa Therapist",
      bio: "Expert in aromatherapy and relaxation techniques",
      image:
        "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&h=200&fit=crop",
      rating: 5,
    },
    {
      name: "Therapist Emma",
      role: "Facial Specialist",
      bio: "Certified esthetician with focus on skincare",
      image:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop",
      rating: 5,
    },
    {
      name: "Therapist Lisa",
      role: "Massage Therapist",
      bio: "Deep tissue and Swedish massage specialist",
      image:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&h=200&fit=crop",
      rating: 4,
    },
  ],
  salon: [
    {
      name: "Stylist Alex",
      role: "Master Stylist",
      bio: "Award-winning stylist with 12+ years experience",
      image:
        "https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?w=200&h=200&fit=crop",
      rating: 5,
    },
    {
      name: "Stylist Jessica",
      role: "Color Specialist",
      bio: "Expert in balayage and creative color techniques",
      image:
        "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=200&h=200&fit=crop",
      rating: 5,
    },
    {
      name: "Stylist David",
      role: "Men's Grooming Expert",
      bio: "Specialized in men's cuts and beard styling",
      image:
        "https://images.unsplash.com/photo-1492447166138-50c3889fccb1?w=200&h=200&fit=crop",
      rating: 4,
    },
  ],
  dental: [
    {
      name: "Dr. Davis",
      role: "Chief Dentist",
      bio: "20+ years in cosmetic and restorative dentistry",
      image:
        "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=200&h=200&fit=crop",
      rating: 5,
    },
    {
      name: "Dr. Miller",
      role: "Orthodontist",
      bio: "Specialist in braces and teeth alignment",
      image:
        "https://images.unsplash.com/photo-1622253694242-abeb37a33e97?w=200&h=200&fit=crop",
      rating: 5,
    },
    {
      name: "Dr. Wilson",
      role: "Pediatric Dentist",
      bio: "Gentle care for children and adolescents",
      image:
        "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=200&h=200&fit=crop",
      rating: 5,
    },
  ],
};

export { type Appointment, industries, locations, services, availableStaff };
