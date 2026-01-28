
export const MOCK_ISSUES = [
  {
    id: "mock-1",
    title: "Large Pothole Main Street",
    description: "A very deep pothole causing traffic slowdowns near the central market.",
    category: "road",
    urgency: "high",
    status: "open",
    reported_at: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    location_address: "123 Main St, Central Market",
    latitude: 28.6139,
    longitude: 77.2090,
    funding: {
      total: 50000,
      raised: 15000,
      government: 10000,
      community: 5000,
      contributors: [
        { name: "Suresh Wangam", amount: 2000, date: "2 days ago" },
        { name: "Anjali P.", amount: 3000, date: "3 days ago" }
      ]
    }
  },
  {
    id: "mock-2",
    title: "Overflowing Garbage Bin",
    description: "The garbage bin has not been collected for a week and is overflowing.",
    category: "sanitation",
    urgency: "medium",
    status: "in_progress",
    reported_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
    location_address: "45 Park Avenue",
    latitude: 28.5355,
    longitude: 77.3910,
    funding: {
      total: 20000,
      raised: 18000,
      government: 15000,
      community: 3000,
      contributors: [
        { name: "Ravi Kumar", amount: 1000, date: "1 week ago" },
        { name: "Swati M.", amount: 500, date: "Yesterday" }
      ]
    }
  },
  {
    id: "mock-3",
    title: "Streetlight Malfunction",
    description: "Streetlights on 5th Avenue are flickering constantly.",
    category: "electricity",
    urgency: "low",
    status: "resolved",
    reported_at: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(), // 2 days ago
    location_address: "5th Avenue, Sector 4",
    latitude: 28.7041,
    longitude: 77.1025,
    funding: {
      total: 10000,
      raised: 10000,
      government: 10000,
      community: 0,
      contributors: []
    }
  },
  {
    id: "mock-4",
    title: "Leaking Water Pipe",
    description: "Clean water is being wasted due to a leak in the main supply pipe.",
    category: "water",
    urgency: "high",
    status: "open",
    reported_at: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 mins ago
    location_address: "Near Water Tank, Block C",
    latitude: 28.4595,
    longitude: 77.0266,
    funding: {
      total: 30000,
      raised: 5000,
      government: 0,
      community: 5000,
      contributors: [
        { name: "Resident Assoc.", amount: 5000, date: "Today" }
      ]
    }
  },
  {
    id: "mock-5",
    title: "Stray Dogs Aggression",
    description: "Pack of stray dogs chasing vehicles and pedestrians.",
    category: "animal",
    urgency: "medium",
    status: "open",
    reported_at: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), // 5 hours ago
    location_address: "Sunset Blvd",
    latitude: 28.50,
    longitude: 77.20,
    funding: {
      total: 0,
      raised: 0,
      government: 0,
      community: 0,
      contributors: []
    }
  }
];

export const ACCOUNT_HOLDER_ISSUES = [
  {
    id: "user-1",
    title: "Tree Fallen on Road (My Report)",
    description: "A heavy storm caused a tree to fall, blocking the entire road.",
    category: "environment",
    urgency: "high",
    status: "open",
    reported_at: new Date(Date.now() - 1000 * 60 * 15).toISOString(), // 15 mins ago
    location_address: "My Neighborhood, Street 1",
    latitude: 28.62,
    longitude: 77.21,
    funding: {
      total: 40000,
      raised: 2000,
      government: 0,
      community: 2000,
      contributors: [
        { name: "Local Hero", amount: 2000, date: "Just now" }
      ]
    }
  },
  {
    id: "user-2",
    title: "Broken Park Bench (My Report)",
    description: "The bench in the local park is broken and unsafe for children.",
    category: "parks",
    urgency: "low",
    status: "open",
    reported_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(), // 3 days ago
    location_address: "Community Park, Zone A",
    latitude: 28.63,
    longitude: 77.22,
    funding: {
      total: 5000,
      raised: 5000,
      government: 2500,
      community: 2500,
      contributors: [
        { name: "Parents Group", amount: 2500, date: "2 days ago" }
      ]
    }
  }
];

// Added missing exports for status visualization
export const statusLabels: Record<string, string> = {
  pending: "Pending Review",
  open: "Open",
  in_progress: "In Progress",
  resolved: "Resolved",
  rejected: "Rejected",
};

export const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-500",
  open: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-500",
  in_progress: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-500",
  resolved: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-500",
  rejected: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-500",
};
