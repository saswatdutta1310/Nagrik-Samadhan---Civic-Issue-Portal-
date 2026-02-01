import { Shield, Eye, Users, IndianRupee, Bell, Award } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

export function FeaturesSection() {
  const { t } = useLanguage();

  const features = [
    {
      icon: Shield,
      title: t("features.f1.title"),
      description: t("features.f1.desc"),
    },
    {
      icon: Eye,
      title: t("features.f2.title"),
      description: t("features.f2.desc"),
    },
    {
      icon: Users,
      title: t("features.f3.title"),
      description: t("features.f3.desc"),
    },
    {
      icon: IndianRupee,
      title: t("features.f4.title"),
      description: t("features.f4.desc"),
    },
    {
      icon: Bell,
      title: t("features.f5.title"),
      description: t("features.f5.desc"),
    },
    {
      icon: Award,
      title: t("features.f6.title"),
      description: t("features.f6.desc"),
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-card">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t("features.title")}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("features.subtitle")}
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
 
 
