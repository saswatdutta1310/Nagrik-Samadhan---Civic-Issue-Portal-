import {
  Car,
  Droplets,
  Zap,
  Trash2,
  Shield,
  TrafficCone,
  TreePine,
  Building2,
  Bath,
  Leaf,
  PawPrint,
  MoreHorizontal,
  type LucideIcon,
} from "lucide-react";

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  color: string;
  issueTypes: string[];
}

export const categories: Category[] = [
  {
    id: "road",
    name: "Road & Transportation",
    description:
      "Potholes, damaged roads, broken footpaths, and public transport issues",
    icon: Car,
    color: "bg-blue-500",
    issueTypes: [
      "Pothole",
      "Damaged Road",
      "Broken Footpath",
      "Bus Stop Issues",
      "Parking Problems",
    ],
  },
  {
    id: "water",
    name: "Water Supply & Drainage",
    description:
      "Water shortage, contamination, leakage, and drainage blockages",
    icon: Droplets,
    color: "bg-cyan-500",
    issueTypes: [
      "Water Shortage",
      "Water Contamination",
      "Pipe Leakage",
      "Drainage Blockage",
      "Sewage Overflow",
    ],
  },
  {
    id: "electricity",
    name: "Electricity & Streetlights",
    description:
      "Power outages, faulty streetlights, and electrical hazards",
    icon: Zap,
    color: "bg-yellow-500",
    issueTypes: [
      "Power Outage",
      "Faulty Streetlight",
      "Exposed Wires",
      "Transformer Issues",
      "Meter Problems",
    ],
  },
  {
    id: "sanitation",
    name: "Sanitation & Waste",
    description:
      "Garbage collection, waste dumping, and cleanliness issues",
    icon: Trash2,
    color: "bg-green-500",
    issueTypes: [
      "Garbage Not Collected",
      "Illegal Dumping",
      "Overflowing Bins",
      "Street Cleaning",
      "Dead Animal Removal",
    ],
  },
  {
    id: "safety",
    name: "Public Safety & Crime",
    description:
      "Safety concerns, suspicious activities, and crime reporting",
    icon: Shield,
    color: "bg-red-500",
    issueTypes: [
      "Suspicious Activity",
      "Street Crime",
      "Vandalism",
      "Harassment",
      "Unsafe Areas",
    ],
  },
  {
    id: "traffic",
    name: "Traffic & Signals",
    description:
      "Traffic congestion, signal malfunctions, and road safety",
    icon: TrafficCone,
    color: "bg-orange-500",
    issueTypes: [
      "Signal Malfunction",
      "Traffic Congestion",
      "Missing Signs",
      "Road Marking Issues",
      "Zebra Crossing",
    ],
  },
  {
    id: "parks",
    name: "Parks & Public Spaces",
    description:
      "Maintenance of parks, playgrounds, and community areas",
    icon: TreePine,
    color: "bg-emerald-500",
    issueTypes: [
      "Park Maintenance",
      "Playground Safety",
      "Bench Damage",
      "Fence Repair",
      "Landscaping Issues",
    ],
  },
  {
    id: "government",
    name: "Government Offices",
    description:
      "Issues with government office services and facilities",
    icon: Building2,
    color: "bg-indigo-500",
    issueTypes: [
      "Long Wait Times",
      "Poor Service",
      "Facility Issues",
      "Document Problems",
      "Staff Behavior",
    ],
  },
  {
    id: "toilets",
    name: "Public Toilets & Hygiene",
    description:
      "Public toilet maintenance and hygiene concerns",
    icon: Bath,
    color: "bg-teal-500",
    issueTypes: [
      "Toilet Not Working",
      "No Water Supply",
      "Unhygienic Conditions",
      "Missing Facilities",
      "Accessibility Issues",
    ],
  },
  {
    id: "environment",
    name: "Environmental Issues",
    description:
      "Pollution, illegal tree cutting, and water body concerns",
    icon: Leaf,
    color: "bg-lime-500",
    issueTypes: [
      "Air Pollution",
      "Noise Pollution",
      "Illegal Tree Cutting",
      "Water Body Pollution",
      "Burning Waste",
    ],
  },
  {
    id: "animal",
    name: "Animal Welfare",
    description:
      "Stray animals, animal cruelty, and wildlife concerns",
    icon: PawPrint,
    color: "bg-amber-500",
    issueTypes: [
      "Stray Dogs",
      "Animal Cruelty",
      "Dead Animals",
      "Wildlife Issues",
      "Pet Abandonment",
    ],
  },
  {
    id: "other",
    name: "Other Issues",
    description:
      "Issues not covered by other categories",
    icon: MoreHorizontal,
    color: "bg-gray-500",
    issueTypes: [
      "General Complaint",
      "Suggestion",
      "Information Request",
      "Other",
    ],
  },
];

export function getCategoryById(id: string): Category | undefined {
  return categories.find((cat) => cat.id === id);
}
 
