import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { supabase } from "@/lib/supabase";
import {
  Trophy,
  Medal,
  Award,
  Star,
  TrendingUp,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

type LeaderboardUser = {
  user_id: string;
  issues_reported: number;
  issues_resolved: number;
  score: number;
  rank: number;
};

const Leaderboard = () => {
  const { t } = useLanguage();
  const [users, setUsers] = useState<LeaderboardUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      const { data, error } = await supabase
        .from("user_scores")
        .select("user_id, issues_reported, issues_resolved");

      if (error || !data) {
        setLoading(false);
        return;
      }

      const ranked = data
        .map((u) => ({
          ...u,
          score: u.issues_reported * 10 + u.issues_resolved * 30,
        }))
        .sort((a, b) => b.score - a.score)
        .map((u, i) => ({ ...u, rank: i + 1 }))
        .slice(0, 10);

      setUsers(ranked);
      setLoading(false);
    };

    fetchLeaderboard();
  }, []);

  if (loading) {
    return (
      <Layout>
        <div className="py-20 text-center text-muted-foreground">
          {t("leaderboard.loading")}
        </div>
      </Layout>
    );
  }

  const topThree = users.slice(0, 3);
  const restOfList = users.slice(3);

  return (
    <Layout>
      <div className="bg-background py-8">
        <div className="container max-w-4xl">

          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-1.5 mb-4">
              <Trophy className="h-4 w-4 text-accent-foreground" />
              <span className="text-sm font-medium text-accent-foreground">
                {t("nav.leaderboard")}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              {t("leaderboard.title")}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t("leaderboard.subtitle")}
            </p>
          </div>

          {/* Top 3 Podium */}
          {topThree.length === 3 && (
            <div className="grid grid-cols-3 gap-4 mb-12">
              {/* 2nd */}
              <PodiumCard user={topThree[1]} place={2} />

              {/* 1st */}
              <PodiumCard user={topThree[0]} place={1} />

              {/* 3rd */}
              <PodiumCard user={topThree[2]} place={3} />
            </div>
          )}

          {/* Full Rankings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                {t("leaderboard.fullRankings")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {restOfList.map((user) => (
                  <div
                    key={user.user_id}
                    className="flex items-center gap-4 p-4 rounded-lg bg-muted/50 hover:bg-muted transition"
                  >
                    <span className="w-8 font-bold text-muted-foreground">
                      #{user.rank}
                    </span>
                    <Avatar>
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {user.user_id.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-medium">{t("leaderboard.user")} {user.user_id.slice(0, 6)}</p>
                      <p className="text-sm text-muted-foreground">
                        {user.issues_reported} {t("leaderboard.reported")} · {user.issues_resolved} {t("leaderboard.resolved")}
                      </p>
                    </div>
                    <p className="font-semibold">{user.score} {t("common.points")}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Rewards */}
          <Card className="mt-8 border-primary/50 bg-accent/30">
            <CardContent className="p-6">
              <div className="flex gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">{t("leaderboard.monthlyRewards")}</h3>
                  <div className="flex flex-wrap gap-3">
                    <Badge><Medal className="h-3 w-3 mr-1" />1st: ₹5,000</Badge>
                    <Badge variant="secondary">2nd: ₹3,000</Badge>
                    <Badge variant="secondary">3rd: ₹2,000</Badge>
                    <Badge variant="outline">
                      <Star className="h-3 w-3 mr-1" />4–10: ₹500
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </Layout>
  );
};

export default Leaderboard;

/* ------------------ PODIUM COMPONENT ------------------ */

function PodiumCard({
  user,
  place,
}: {
  user: LeaderboardUser;
  place: 1 | 2 | 3;
}) {
  const { t } = useLanguage();
  const size = place === 1 ? "h-24 w-24" : place === 2 ? "h-20 w-20" : "h-16 w-16";

  return (
    <div className={`flex flex-col items-center ${place === 2 ? "mt-8" : place === 3 ? "mt-12" : ""}`}>
      <Avatar className={`${size} border-4`}>
        <AvatarFallback className="text-xl bg-primary/10 text-primary">
          {user.user_id.slice(0, 2).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <h3 className="mt-4 font-semibold">{t("leaderboard.user")} {user.user_id.slice(0, 6)}</h3>
      <Badge className="mt-2">{user.score} {t("common.points")}</Badge>
    </div>
  );
}
 
