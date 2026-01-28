import { Shield, Eye, Users, IndianRupee, Bell, Award } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: Shield,
    title: "Privacy Protected",
    description: "Automatic face and vehicle plate blurring ensures citizen privacy while maintaining transparency.",
  },
  {
    icon: Eye,
    title: "Full Transparency",
    description: "Every action, approval, and expense is publicly visible with immutable audit trails.",
  },
  {
    icon: Users,
    title: "Community Funding",
    description: "Support local issues with donations. All funds held in escrow with automatic refunds if unused.",
  },
  {
    icon: IndianRupee,
    title: "Financial Clarity",
    description: "All costs in ₹ INR with clear breakdown of government and community contributions.",
  },
  {
    icon: Bell,
    title: "Real-time Updates",
    description: "Get instant notifications on issue status, SLA breaches, and resolution updates.",
  },
  {
    icon: Award,
    title: "Rewards Program",
    description: "Earn points for verified reports. Monthly leaderboard with cash rewards for top contributors.",
  },
];

export function FeaturesSection() {
  return (
    <section className="py-16 md:py-24 bg-card">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Built for Accountability
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Every feature designed to ensure transparency, prevent corruption, and empower citizens
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="border-border hover:border-primary/50 transition-colors">
                <CardContent className="p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mb-4">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
