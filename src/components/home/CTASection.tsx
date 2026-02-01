import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export function CTASection() {
  const { t } = useLanguage();

  return (
    <section className="py-16 md:py-24 bg-primary">
      <div className="container text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
          {t("cta.title")}
        </h2>
        <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto mb-8">
          {t("cta.subtitle")}
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link to="/report">
            <Button size="lg" variant="secondary" className="w-full sm:w-auto">
              {t("cta.reportBtn")}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link to="/auth">
            <Button size="lg" variant="outline" className="w-full sm:w-auto border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
              {t("cta.createAccount")}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
 
