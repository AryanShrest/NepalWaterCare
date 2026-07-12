import tankImg from '@/assets/water-tank.jpg';
import drainImg from '@/assets/drainage.jpg';
import solarImg from '@/assets/solar.jpg';
import wellImg from '@/assets/well.jpg';

export interface Service {
  id: number;
  title: string;
  description: string;
  shortDesc: string;
  price: string;
  icon: string;
  img: string;
  banner: string;
  longDescription: string;
  features: string[];
  includes: string[];
  pricingDetails: string;
}

export const services: Service[] = [
  {
    id: 1,
    title: "Water Tank Cleaning",
    shortDesc: "Deep sanitization of overhead & underground tanks with eco-safe disinfectants.",
    description: "Keep your water clean, safe, and free from harmful contaminants with our professional water tank cleaning service. We thoroughly remove sludge, dirt, algae, bacteria, and sediment buildup from residential, commercial, and industrial water tanks using safe and effective cleaning methods. Regular tank cleaning helps improve water quality, prevents unpleasant odors, and protects your family's health.",
    price: "₹1,499",
    icon: "Droplets",
    img: tankImg,
    banner: "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?q=80&w=2070&auto=format&fit=crop",
    longDescription: "Over time, water tanks accumulate sediment, algae, and bacteria that can contaminate your drinking water. Our comprehensive cleaning process ensures your tank is spotless and safe for use. We use eco-friendly, non-toxic disinfectants that are safe for both humans and pets while being highly effective against pathogens.",
    features: [
      "Complete tank inspection",
      "Sludge and sediment removal",
      "Algae and bacteria cleaning",
      "Tank washing and sanitization",
      "Safe, hygienic, and eco-friendly process",
      "Suitable for residential and commercial water tanks"
    ],
    includes: [
      "Verified Workers",
      "Eco-friendly",
      "Same-day",
      "Insurance covered",
      "Free inspection",
      "24/7 support"
    ],
    pricingDetails: "Starting from ₹1,499 for residential tanks up to 1000L. Custom pricing for larger commercial tanks available upon request."
  },
  {
    id: 2,
    title: "Drainage Cleaning",
    shortDesc: "High-pressure jet cleaning to clear blockages and restore smooth flow.",
    description: "Get your drains flowing freely again with our professional drainage cleaning service. We use high-pressure water jetting to remove stubborn clogs, grease, debris, and tree roots from your drainage pipes, ensuring smooth and efficient water flow for your home or business.",
    price: "₹999",
    icon: "Waves",
    img: drainImg,
    banner: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1974&auto=format&fit=crop",
    longDescription: "Clogged drains can cause water damage, unpleasant odors, and unsanitary conditions. Our expert technicians use advanced high-pressure water jetting equipment to clear even the toughest blockages quickly and effectively, restoring your drainage system to optimal working condition.",
    features: [
      "High-pressure water jetting",
      "Clog and blockage removal",
      "Grease and debris cleaning",
      "Camera inspection (upon request)",
      "Preventive maintenance tips",
      "Suitable for residential and commercial drains"
    ],
    includes: [
      "Expert Technicians",
      "Fast Service",
      "Emergency support",
      "Guaranteed results",
      "Upfront pricing",
      "No hidden charges"
    ],
    pricingDetails: "Starting from ₹999 for basic drain cleaning. Complex jobs and commercial properties priced separately after inspection."
  },
  {
    id: 3,
    title: "Solar Panel Cleaning",
    shortDesc: "Boost panel efficiency up to 30% with safe, streak-free professional wash.",
    description: "Maximize your solar panel efficiency and energy production with our professional solar panel cleaning service. Dirt, dust, bird droppings, and grime can reduce your panel's output by up to 30%. Our streak-free cleaning process ensures your panels perform at their best all year round.",
    price: "₹799",
    icon: "Sun",
    img: solarImg,
    banner: "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=2072&auto=format&fit=crop",
    longDescription: "Regular solar panel cleaning is essential to maintain optimal energy production. Dust, pollen, bird droppings, and other debris form a layer on your panels that blocks sunlight, reducing efficiency. Our professional cleaning service uses purified water and soft brushes to safely and effectively clean your panels without scratching or damaging them.",
    features: [
      "Streak-free cleaning",
      "Efficiency boost up to 30%",
      "Safe for all panel types",
      "Water-efficient process",
      "Regular maintenance packages",
      "Increased lifespan of panels"
    ],
    includes: [
      "Certified Technicians",
      "Damage-free cleaning",
      "Free efficiency check",
      "Flexible scheduling",
      "Monthly/quarterly packages",
      "100% satisfaction guarantee"
    ],
    pricingDetails: "Starting from ₹799 for residential solar systems. Custom packages available for commercial installations."
  },
  {
    id: 4,
    title: "Well Cleaning",
    shortDesc: "Complete desilting, scrubbing and chlorination for safe drinking water.",
    description: "Ensure your well water is safe and clean with our comprehensive well cleaning service. We provide complete desilting, thorough scrubbing, and proper chlorination to remove contaminants, bacteria, and unpleasant tastes or odors from your well water.",
    price: "₹2,499",
    icon: "CircleDot",
    img: wellImg,
    banner: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2071&auto=format&fit=crop",
    longDescription: "Well water can become contaminated with sediment, bacteria, and other impurities over time. Our professional well cleaning service ensures your water supply is safe and clean for drinking, cooking, and other household uses. We use proven methods to clean and sanitize your well thoroughly.",
    features: [
      "Complete well desilting",
      "Thorough scrubbing",
      "Professional chlorination",
      "Water quality testing (optional)",
      "Safe and effective process",
      "Improves water taste and quality"
    ],
    includes: [
      "Well experts",
      "Quality guaranteed",
      "Water testing option",
      "Post-cleaning guidance",
      "Follow-up support",
      "Warranty on service"
    ],
    pricingDetails: "Starting from ₹2,499 for standard residential wells. Pricing varies based on well depth and condition."
  }
];

export function getServiceById(id: number): Service | undefined {
  return services.find(service => service.id === id);
}
