import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Shield, Eye, Users } from "lucide-react";
import heroImage from "@/assets/hero-city.jpg";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Smart City Infrastructure"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/40" />
      </div>

      <div className="container relative z-10 py-20 md:py-32">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-1.5 mb-6">
            <Shield className="h-4 w-4 text-accent-foreground" />
            <span className="text-sm font-medium text-accent-foreground">
              Government Verified Platform
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6">
            Your Voice, <br />
            <span className="text-primary">Your City's Future</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl">
            Report civic issues, track resolutions, and hold authorities accountable. 
            Together, we build transparent and responsive governance.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Link to="/report">
              <Button size="lg" className="w-full sm:w-auto">
                Report an Issue
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/issues">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                Browse Issues
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Eye className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">15K+</p>
                <p className="text-xs text-muted-foreground">Issues Resolved</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">50K+</p>
                <p className="text-xs text-muted-foreground">Active Citizens</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Shield className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">₹2Cr+</p>
                <p className="text-xs text-muted-foreground">Funds Utilized</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
