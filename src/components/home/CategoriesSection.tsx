import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { categories } from "@/lib/categories";
import { ArrowRight } from "lucide-react";

export function CategoriesSection() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Report Issues by Category
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Select the category that best matches your civic concern for faster routing and resolution.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {categories.slice(0, 8).map((category) => {
            const Icon = category.icon;
            return (
              <Link key={category.id} to={`/report?category=${category.id}`}>
                <Card className="group h-full transition-all duration-300 hover:shadow-xl hover:border-primary/50">

                  <CardContent className="p-6">
                    <div
                      className={`inline-flex h-12 w-12 items-center justify-center rounded-xl 
  ${category.color} mb-4 shadow-sm 
  group-hover:scale-105 transition-transform`}
                    >
                      <Icon className="h-6 w-6 text-white" />
                    </div>

                    <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {category.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>

        <div className="mt-8 text-center">
          <Link
            to="/report"
            className="inline-flex items-center gap-2 text-primary hover:underline font-medium"
          >
            View all categories
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
