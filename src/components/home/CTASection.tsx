import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-16 md:py-24 bg-primary">
      <div className="container text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
          Ready to Make a Difference?
        </h2>
        <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto mb-8">
          Join thousands of citizens working together to build better communities. 
          Report issues, track progress, and hold authorities accountable.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link to="/report">
            <Button size="lg" variant="secondary" className="w-full sm:w-auto">
              Report an Issue
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link to="/auth">
            <Button size="lg" variant="outline" className="w-full sm:w-auto border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
              Create Account
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
