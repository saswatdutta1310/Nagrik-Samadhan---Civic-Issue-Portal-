import { useNavigate } from "react-router-dom";
import { ArrowLeft, Landmark, ShieldCheck, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import aboutIllustration from "@/assets/about_illustration.png";
import { useLanguage } from "@/contexts/LanguageContext";

const About: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

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
              {t("about.tagline")}
            </span>

            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              {t("about.titlePrefix")} <span className="text-emerald-600">Nagrik Samadhan</span>
            </h1>

            <p className="text-lg text-muted-foreground mb-6">
              {t("about.desc1")}
            </p>

            {/* 🔙 BACK BUTTON */}
            <Button
              variant="outline"
              onClick={handleBack}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              {t("common.back")}
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
          {t("about.desc2")}
        </p>

        <h2 className="text-2xl font-semibold mb-3">{t("about.vision")}</h2>
        <p className="text-muted-foreground mb-8">
          {t("about.visionDesc")}
        </p>

        <h2 className="text-2xl font-semibold mb-4">{t("about.mission")}</h2>
        <ul className="list-disc list-inside text-muted-foreground space-y-3 mb-10">
          <li>{t("about.mission1")}</li>
          <li>{t("about.mission2")}</li>
          <li>{t("about.mission3")}</li>
          <li>{t("about.mission4")}</li>
        </ul>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="rounded-xl border p-6 bg-card">
            <Landmark className="h-8 w-8 text-emerald-600 mb-4" />
            <h3 className="font-semibold mb-2">{t("about.feature1")}</h3>
            <p className="text-sm text-muted-foreground">
              {t("about.feature1Desc")}
            </p>
          </div>

          <div className="rounded-xl border p-6 bg-card">
            <Users className="h-8 w-8 text-emerald-600 mb-4" />
            <h3 className="font-semibold mb-2">{t("about.feature2")}</h3>
            <p className="text-sm text-muted-foreground">
              {t("about.feature2Desc")}
            </p>
          </div>

          <div className="rounded-xl border p-6 bg-card">
            <ShieldCheck className="h-8 w-8 text-emerald-600 mb-4" />
            <h3 className="font-semibold mb-2">{t("about.feature3")}</h3>
            <p className="text-sm text-muted-foreground">
              {t("about.feature3Desc")}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
 
