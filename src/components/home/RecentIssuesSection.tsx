import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { statusLabels, statusColors } from "@/lib/mockData";
import { getCategoryById } from "@/lib/categories";
import { MapPin, Clock, ArrowRight } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

type Issue = {
  id: string;
  title: string;
  description: string;
  category: string;
  status: "pending" | "in_progress" | "resolved";
  created_at: string;
  latitude: number;
  longitude: number;
};

export function RecentIssuesSection() {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIssues = async () => {
      const { data, error } = await supabase
        .from("issues")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(4);

      if (!error && data) {
        setIssues(data);
      }

      setLoading(false);
    };

    fetchIssues();
  }, []);

  if (loading) {
    return (
      <section className="py-16 md:py-24 bg-card">
        <div className="container text-center text-muted-foreground">
          Loading recent issues...
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-24 bg-card">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              Recent Issues
            </h2>
            <p className="text-lg text-muted-foreground">
              Track civic issues being reported and resolved
            </p>
          </div>

          <Link to="/issues">
            <Button variant="outline">
              View All Issues
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        {issues.length === 0 ? (
          <p className="text-muted-foreground text-center">
            No issues reported yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {issues.map((issue) => {
              const category = getCategoryById(issue.category);
              const CategoryIcon = category?.icon;

              return (
                <Link key={issue.id} to={`/issues/${issue.id}`}>
                  <Card className="h-full hover:shadow-lg transition-all duration-300 hover:border-primary/50">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-center gap-3">
                          {CategoryIcon && (
                            <div
                              className={`flex h-10 w-10 items-center justify-center rounded-lg ${category?.color}`}
                            >
                              <CategoryIcon className="h-5 w-5 text-primary-foreground" />
                            </div>
                          )}
                          <div>
                            <p className="text-sm text-muted-foreground">
                              {category?.name}
                            </p>
                            <Badge
                              variant="secondary"
                              className={`mt-1 ${statusColors[issue.status]}`}
                            >
                              {statusLabels[issue.status]}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent>
                      <h3 className="font-semibold text-foreground mb-2 line-clamp-2">
                        {issue.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                        {issue.description}
                      </p>

                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          <span>
                            {issue.latitude.toFixed(2)},{" "}
                            {issue.longitude.toFixed(2)}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>
                            {formatDistanceToNow(
                              new Date(issue.created_at),
                              { addSuffix: true }
                            )}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
