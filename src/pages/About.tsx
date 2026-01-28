import { useNavigate } from "react-router-dom";
import { ArrowLeft, Landmark, ShieldCheck, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import aboutIllustration from "@/assets/about_illustration.png";

const About: React.FC = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  return (
    <div className="w-full">
      {/* HERO SECTION */}
      <section className="relative bg-gradient-to-r from-emerald-50 via-sky-50 to-emerald-100 overflow-hidden">
        <div className="container py-20 grid md:grid-cols-2 gap-10 items-center">
          
          {/* Left Content */}
          <div>
            <span className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-emerald-100 text-emerald-700 text-sm font-medium mb-4">
              <ShieldCheck className="h-4 w-4" />
              Government Civic Platform
            </span>

            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              About <span className="text-emerald-600">Nagrik Samadhan</span>
            </h1>

            <p className="text-lg text-muted-foreground mb-6">
              A unified digital grievance redressal and civic issue management
              platform designed to promote transparency, accountability, and
              citizen participation in public service delivery.
            </p>

            {/* 🔙 BACK BUTTON */}
            <Button
              variant="outline"
              onClick={handleBack}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
          </div>

          {/* Right Graphic */}
          <div className="hidden md:block">
            <img
              src={aboutIllustration}
              alt="Civic Governance Illustration"
              className="w-full max-w-lg mx-auto"
            />
          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="container py-16 max-w-5xl">
        <p className="text-muted-foreground leading-relaxed mb-8">
          Nagrik Samadhan has been developed as part of a modern e-Governance
          initiative to bridge the gap between citizens and civic authorities.
          The platform enables citizens to report civic infrastructure issues,
          track progress, and ensure time-bound resolution through a transparent
          and accountable digital system.
        </p>

        <h2 className="text-2xl font-semibold mb-3">Vision</h2>
        <p className="text-muted-foreground mb-8">
          To establish a transparent, accountable, and responsive governance
          ecosystem where technology empowers citizens and strengthens public
          trust in civic administration.
        </p>

        <h2 className="text-2xl font-semibold mb-4">Mission</h2>
        <ul className="list-disc list-inside text-muted-foreground space-y-3 mb-10">
          <li>Provide a single-window digital platform for civic issue reporting</li>
          <li>Enhance transparency and accountability in grievance redressal</li>
          <li>Enable data-driven decision-making for civic authorities</li>
          <li>Encourage active citizen participation in governance</li>
        </ul>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="rounded-xl border p-6 bg-card">
            <Landmark className="h-8 w-8 text-emerald-600 mb-4" />
            <h3 className="font-semibold mb-2">Institutional Transparency</h3>
            <p className="text-sm text-muted-foreground">
              Public visibility of reported issues and resolution timelines.
            </p>
          </div>

          <div className="rounded-xl border p-6 bg-card">
            <Users className="h-8 w-8 text-emerald-600 mb-4" />
            <h3 className="font-semibold mb-2">Citizen Participation</h3>
            <p className="text-sm text-muted-foreground">
              Empowers citizens to actively engage in governance.
            </p>
          </div>

          <div className="rounded-xl border p-6 bg-card">
            <ShieldCheck className="h-8 w-8 text-emerald-600 mb-4" />
            <h3 className="font-semibold mb-2">Data Security</h3>
            <p className="text-sm text-muted-foreground">
              Secure handling of data following government-grade standards.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
