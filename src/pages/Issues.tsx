import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { categories, getCategoryById } from "@/lib/categories";
import { Clock, Search, MapPin } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { supabase } from "@/lib/supabase";
import { useLanguage } from "@/contexts/LanguageContext";

import { MOCK_ISSUES, ACCOUNT_HOLDER_ISSUES } from "@/lib/mockData";

type Issue = {
  id: string;
  title: string;
  description: string;
  category: string;
  urgency: "low" | "medium" | "high" | null;
  status: string | null;
  reported_at: string | null;
  location_address?: string; // Added optional field
  image_url?: string;        // Added optional field
};

export default function Issues() {
  const { t } = useLanguage();
  const [issues, setIssues] = useState<Issue[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedUrgency, setSelectedUrgency] = useState("all");
  const [loading, setLoading] = useState(true);

  // 🔹 FETCH ISSUES
  const fetchIssues = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("issues")
      .select("id,title,description,category,urgency,status,reported_at, image_url, location_address")
      .order("reported_at", { ascending: false });

    const fetchedIssues = (data as any) ?? [];
    const allIssues = [...fetchedIssues, ...MOCK_ISSUES, ...ACCOUNT_HOLDER_ISSUES];

    // Sort combined issues by date descending
    allIssues.sort((a, b) => {
      const dateA = new Date(a.reported_at || 0).getTime();
      const dateB = new Date(b.reported_at || 0).getTime();
      return dateB - dateA;
    });

    setIssues(allIssues as Issue[]);
    setLoading(false);
  };

  useEffect(() => {
    fetchIssues();
  }, []);

  // 🔹 FILTER
  const filteredIssues = issues.filter((issue) => {
    const matchesSearch =
      issue.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      issue.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" || issue.category === selectedCategory;

    const matchesUrgency =
      selectedUrgency === "all" || issue.urgency === selectedUrgency;

    return matchesSearch && matchesCategory && matchesUrgency;
  });

  return (
    <Layout>
      <div className="container py-10">
        {/* HEADER */}
        <h1 className="text-3xl font-bold mb-2">{t("browse.title")}</h1>
        <p className="text-muted-foreground mb-10">
          {t("browse.subtitle")}
        </p>

        {/* 🔹 CATEGORY GRID (LIKE SCREENSHOT) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <Card
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`cursor-pointer transition hover:shadow-md ${selectedCategory === cat.id
                  ? "border-primary ring-1 ring-primary"
                  : ""
                  }`}
              >
                <CardContent className="p-6 text-center space-y-3">
                  <div
                    className={`mx-auto h-12 w-12 rounded-xl flex items-center justify-center ${cat.color}`}
                  >
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-semibold">{t(`categories.${cat.id}.name`)}</h3>
                  <p className="text-xs text-muted-foreground">
                    {t(`categories.${cat.id}.desc`)}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* 🔹 FILTER BAR */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              className="pl-10"
              placeholder={t("browse.searchPlaceholder")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <Select value={selectedUrgency} onValueChange={setSelectedUrgency}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder={t("browse.urgency")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("browse.all")}</SelectItem>
              <SelectItem value="low">{t("browse.low")}</SelectItem>
              <SelectItem value="medium">{t("browse.medium")}</SelectItem>
              <SelectItem value="high">{t("browse.high")}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* 🔹 ISSUES LIST (LIKE CARD SCREENSHOT) */}
        {loading ? (
          <p className="text-center mt-20">{t("browse.loading")}</p>
        ) : filteredIssues.length === 0 ? (
          <p className="text-center mt-20">{t("browse.noIssues")}</p>
        ) : (
          <div className="space-y-6">
            {filteredIssues.map((issue: any) => {
              const category = getCategoryById(issue.category);
              const Icon = category?.icon;

              return (
                <Link key={issue.id} to={`/issues/${issue.id}`}>
                  <Card className="hover:shadow-lg transition overflow-hidden">
                    <CardContent className="p-0 sm:flex">


                      <div className="p-6 flex-1 flex flex-col items-start justify-between">
                        <div className="w-full">
                          <div className="flex items-start justify-between gap-4 mb-2">
                            <h3 className="font-semibold text-lg line-clamp-1">
                              {issue.title}
                            </h3>
                            {issue.status && (
                              <Badge className="capitalize shrink-0">{t(`issues.${issue.status.toLowerCase().replace(" ", "")}`) || issue.status}</Badge>
                            )}
                          </div>

                          <div className="flex items-center gap-2 mb-3">
                            {issue.urgency === "high" && (
                              <Badge variant="destructive" className="h-5 text-[10px] px-1.5">{t("browse.urgentBadge")}</Badge>
                            )}
                            <span className="text-xs text-muted-foreground bg-secondary px-2 py-0.5 rounded-md">
                              {t(`categories.${issue.category}.name`)}
                            </span>
                          </div>

                          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                            {issue.description}
                          </p>
                        </div>

                        <div className="flex items-center gap-4 text-xs text-muted-foreground mt-auto">
                          {issue.location_address && (
                            <span className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {issue.location_address}
                            </span>
                          )}
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {issue.reported_at
                              ? formatDistanceToNow(
                                new Date(issue.reported_at),
                                { addSuffix: true }
                              )
                              : t("common.recently")}
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
    </Layout >
  );
}
 
 
