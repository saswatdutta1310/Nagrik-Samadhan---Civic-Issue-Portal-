import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getCategoryById } from "@/lib/categories";
import { Clock, ArrowLeft, Loader2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";

type Issue = {
    id: string;
    title: string;
    description: string;
    category: string;
    urgency: "low" | "medium" | "high" | null;
    status: string | null;
    reported_at: string | null;
    user_id: string; // Assuming this is the column name
};

export default function MyIssues() {
    const { user, loading: authLoading } = useAuth();
    const [issues, setIssues] = useState<Issue[]>([]);
    const [loading, setLoading] = useState(true);

    // 🔹 FETCH ISSUES
    const fetchMyIssues = async () => {
        if (!user) return;

        setLoading(true);
        // Try querying by user_id first
        // Note: If the column is named differently (e.g. reporter_id), this might need adjustment.
        // Given standard supabase patterns, user_id is most common.
        const { data, error } = await supabase
            .from("issues")
            .select("id,title,description,category,urgency,status,reported_at,user_id")
            .eq("user_id", user.id)
            .order("reported_at", { ascending: false });

        if (error) {
            console.error("Error fetching my issues:", error);
        }

        setIssues((data as Issue[]) ?? []);
        setLoading(false);
    };

    useEffect(() => {
        if (!authLoading) {
            if (user) {
                fetchMyIssues();
            } else {
                setLoading(false);
            }
        }
    }, [user, authLoading]);

    if (authLoading) {
        return (
            <Layout>
                <div className="flex h-[50vh] items-center justify-center">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
            </Layout>
        );
    }

    if (!user) {
        return (
            <Layout>
                <div className="container py-20 text-center">
                    <h2 className="text-2xl font-bold mb-4">Please Sign In</h2>
                    <p className="text-muted-foreground mb-6">
                        You need to be logged in to view your reported issues.
                    </p>
                    <Link to="/auth">
                        <Button>Sign In</Button>
                    </Link>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="container py-10 max-w-4xl">
                <div className="flex items-center gap-4 mb-4">
                    <Link to="/" className="text-muted-foreground hover:text-foreground">
                        <ArrowLeft className="h-5 w-5" />
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold">My Issues History</h1>
                        <p className="text-muted-foreground mt-1">
                            Track the status of issues you have reported
                        </p>
                    </div>
                </div>

                {/* DASHBOARD STATS */}
                {!loading && issues.length > 0 && (
                    <div className="grid grid-cols-3 gap-4 mb-8">
                        <Card className="bg-primary/5 border-primary/20">
                            <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                                <span className="text-3xl font-bold text-primary mb-1">{issues.length}</span>
                                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Total Reported</span>
                            </CardContent>
                        </Card>
                        <Card className="bg-green-500/5 border-green-500/20">
                            <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                                <span className="text-3xl font-bold text-green-600 mb-1">
                                    {issues.filter(i => i.status === 'resolved').length}
                                </span>
                                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Resolved</span>
                            </CardContent>
                        </Card>
                        <Card className="bg-orange-500/5 border-orange-500/20">
                            <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                                <span className="text-3xl font-bold text-orange-600 mb-1">
                                    {issues.filter(i => i.status !== 'resolved').length}
                                </span>
                                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Pending</span>
                            </CardContent>
                        </Card>
                    </div>
                )}

                {loading ? (
                    <div className="py-20 text-center text-muted-foreground">
                        <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
                        Loading your history...
                    </div>
                ) : issues.length === 0 ? (
                    <div className="text-center py-16 border-2 border-dashed rounded-xl">
                        <h3 className="text-lg font-medium mb-2">No issues reported yet</h3>
                        <p className="text-muted-foreground mb-6">
                            You haven't reported any civic issues yet.
                        </p>
                        <Link to="/report">
                            <Button>Report an Issue</Button>
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {issues.map((issue) => {
                            const category = getCategoryById(issue.category);
                            const Icon = category?.icon;

                            return (
                                <Link key={issue.id} to={`/issues/${issue.id}`}>
                                    <Card className="hover:shadow-md transition duration-200">
                                        <CardContent className="p-5">
                                            <div className="flex items-start gap-4">
                                                {Icon && (
                                                    <div
                                                        className={`h-10 w-10 shrink-0 rounded-lg flex items-center justify-center ${category?.color}`}
                                                    >
                                                        <Icon className="h-5 w-5 text-white" />
                                                    </div>
                                                )}

                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                                                        <h3 className="font-semibold text-base truncate pr-2">
                                                            {issue.title}
                                                        </h3>
                                                        {issue.urgency === "high" && (
                                                            <Badge variant="destructive" className="h-5 text-[10px] px-1.5">URGENT</Badge>
                                                        )}
                                                    </div>

                                                    <p className="text-sm text-muted-foreground line-clamp-1 mb-2">
                                                        {issue.description}
                                                    </p>

                                                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                                        <span>{category?.name}</span>
                                                        <span className="flex items-center gap-1">
                                                            <Clock className="h-3 w-3" />
                                                            {issue.reported_at
                                                                ? formatDistanceToNow(
                                                                    new Date(issue.reported_at),
                                                                    { addSuffix: true }
                                                                )
                                                                : "Recently"}
                                                        </span>
                                                    </div>
                                                </div>

                                                <div className="shrink-0">
                                                    {issue.status && (
                                                        <Badge variant={issue.status === 'resolved' ? 'default' : 'secondary'} className="capitalize">
                                                            {issue.status}
                                                        </Badge>
                                                    )}
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
        </Layout>
    );
}
