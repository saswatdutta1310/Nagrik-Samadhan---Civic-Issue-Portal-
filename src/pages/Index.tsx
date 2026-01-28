import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { CategoriesSection } from "@/components/home/CategoriesSection";
import { HowItWorksSection } from "@/components/home/HowItWorksSection";
import { RecentIssuesSection } from "@/components/home/RecentIssuesSection";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { CTASection } from "@/components/home/CTASection";

const Index = () => {
  return (
    <Layout>
      {/* Hero / Vision */}
      <HeroSection />

      {/* Issue Categories */}
      <CategoriesSection />

      {/* How the platform works */}
      <HowItWorksSection />

      {/* Live data from Supabase */}
      <RecentIssuesSection />

      {/* Platform benefits */}
      <FeaturesSection />

      {/* Call to action */}
      <CTASection />
    </Layout>
  );
};

export default Index;
