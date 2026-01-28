import { FileText, Search, IndianRupee, CheckCircle, Star, ArrowRight } from "lucide-react";

const steps = [
  {
    icon: FileText,
    title: "Report Issue",
    description: "Submit civic issues with photos, location, and details. Your privacy is protected with automatic face and plate blurring.",
  },
  {
    icon: Search,
    title: "Government Review",
    description: "State authorities review and route issues to the appropriate Municipal Corporation for verification.",
  },
  {
    icon: IndianRupee,
    title: "Cost Approval",
    description: "Transparent cost estimation in ₹ INR with public visibility. Community funding available for approved issues.",
  },
  {
    icon: CheckCircle,
    title: "Resolution & Proof",
    description: "Authorities resolve issues and submit proof. Complete audit trail ensures accountability.",
  },
  {
    icon: Star,
    title: "Review & Reward",
    description: "Verify resolution and earn rewards. Top contributors receive monthly cash prizes!",
  },
];

export function HowItWorksSection() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A transparent, step-by-step process ensuring accountability at every stage
          </p>
        </div>

        <div className="relative">
          {/* Connection Line - Hidden on mobile */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-border -translate-y-1/2" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="relative flex flex-col items-center text-center">
                  <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground mb-4 shadow-lg">
                    <Icon className="h-8 w-8" />
                    <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-accent text-accent-foreground text-sm font-bold">
                      {index + 1}
                    </span>
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                  
                  {/* Arrow for mobile */}
                  {index < steps.length - 1 && (
                    <ArrowRight className="h-6 w-6 text-muted-foreground mt-4 lg:hidden rotate-90" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
