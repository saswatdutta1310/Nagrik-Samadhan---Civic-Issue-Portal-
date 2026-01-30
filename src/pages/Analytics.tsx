import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, PieChart, Pie, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from "recharts";
import { TrendingUp, CheckCircle2, Clock, XCircle, BarChart3, PieChart as PieChartIcon, Activity } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/lib/supabase";
import { MOCK_ISSUES, ACCOUNT_HOLDER_ISSUES } from "@/lib/mockData";

interface AnalyticsData {
    totalIssues: number;
    resolved: number;
    inProgress: number;
    reported: number;
    rejected: number;
    byCategory: { name: string; value: number }[];
    byStatus: { name: string; value: number }[];
    timeline: { date: string; count: number }[];
}

export default function Analytics() {
    const { t } = useLanguage();
    const [loading, setLoading] = useState(true);
    const [analytics, setAnalytics] = useState<AnalyticsData>({
        totalIssues: 0,
        resolved: 0,
        inProgress: 0,
        reported: 0,
        rejected: 0,
        byCategory: [],
        byStatus: [],
        timeline: [],
    });

    useEffect(() => {
        fetchAnalytics();
    }, []);

    const fetchAnalytics = async () => {
        try {
            setLoading(true);

            // Get current user
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return;

            // Fetch user's issues
            const { data: dbIssues, error } = await supabase
                .from("issues")
                .select("*")
                .eq("user_id", user.id);

            if (error) throw error;

            // Combine DB issues with Mock issues for demo
            const allIssues = [
                ...(dbIssues || []),
                ...MOCK_ISSUES,
                ...ACCOUNT_HOLDER_ISSUES
            ];

            // Normalize statuses for statistics
            const issues = allIssues.map(i => ({
                ...i,
                status: i.status === "open" ? "reported" : (i.status === "pending" ? "reported" : i.status)
            }));

            // Calculate statistics
            const totalIssues = issues.length;
            const resolved = issues.filter((i) => i.status === "resolved").length;
            const inProgress = issues.filter((i) => i.status === "in_progress").length;
            const reported = issues.filter((i) => i.status === "reported").length;
            const rejected = issues.filter((i) => i.status === "rejected").length;

            // Group by category
            const categoryMap = new Map<string, number>();
            issues.forEach((issue) => {
                const count = categoryMap.get(issue.category) || 0;
                categoryMap.set(issue.category, count + 1);
            });
            const byCategory = Array.from(categoryMap.entries()).map(([name, value]) => ({
                name: t(`categories.${name}.name`) || name.charAt(0).toUpperCase() + name.slice(1),
                value,
            }));

            // Group by status
            const byStatus = [
                { name: t("issues.reported"), value: reported },
                { name: t("issues.inProgress"), value: inProgress },
                { name: t("issues.resolved"), value: resolved },
                { name: t("issues.rejected"), value: rejected },
            ].filter((item) => item.value > 0);

            // Timeline (last 7 days)
            const timeline: { date: string; count: number }[] = [];
            const today = new Date();
            for (let i = 6; i >= 0; i--) {
                const date = new Date(today);
                date.setDate(date.getDate() - i);
                const dateStr = date.toISOString().split("T")[0];
                const count = issues.filter((issue) => {
                    const issueDate = new Date(issue.reported_at || issue.created_at).toISOString().split("T")[0];
                    return issueDate === dateStr;
                }).length;
                timeline.push({
                    date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
                    count,
                });
            }

            setAnalytics({
                totalIssues,
                resolved,
                inProgress,
                reported,
                rejected,
                byCategory,
                byStatus,
                timeline,
            });
        } catch (error) {
            console.error("Error fetching analytics:", error);
        } finally {
            setLoading(false);
        }
    };

    const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

    const stats = [
        {
            title: t("analytics.totalIssues"),
            value: analytics.totalIssues,
            icon: BarChart3,
            color: "text-blue-500",
            bgColor: "bg-blue-500/10",
        },
        {
            title: t("analytics.resolved"),
            value: analytics.resolved,
            icon: CheckCircle2,
            color: "text-green-500",
            bgColor: "bg-green-500/10",
        },
        {
            title: t("analytics.inProgress"),
            value: analytics.inProgress,
            icon: Clock,
            color: "text-yellow-500",
            bgColor: "bg-yellow-500/10",
        },
        {
            title: t("analytics.pending"),
            value: analytics.reported,
            icon: Activity,
            color: "text-orange-500",
            bgColor: "bg-orange-500/10",
        },
    ];

    if (loading) {
        return (
            <Layout>
                <div className="container py-8">
                    <div className="flex items-center justify-center h-64">
                        <p className="text-muted-foreground">{t("common.loading")}</p>
                    </div>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="container py-8 space-y-8">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold mb-2">{t("analytics.title")}</h1>
                    <p className="text-muted-foreground">
                        {t("analytics.comprehensiveOverview")}
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat, index) => {
                        const Icon = stat.icon;
                        return (
                            <Card key={index}>
                                <CardContent className="p-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm text-muted-foreground mb-1">
                                                {stat.title}
                                            </p>
                                            <p className="text-3xl font-bold">{stat.value}</p>
                                        </div>
                                        <div className={`h-12 w-12 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
                                            <Icon className={`h-6 w-6 ${stat.color}`} />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>

                {/* Charts */}
                <Tabs defaultValue="overview" className="space-y-6">
                    <TabsList>
                        <TabsTrigger value="overview">{t("analytics.overview")}</TabsTrigger>
                        <TabsTrigger value="category">{t("analytics.byCategory")}</TabsTrigger>
                        <TabsTrigger value="timeline">{t("analytics.timeline")}</TabsTrigger>
                    </TabsList>

                    {/* Overview Tab */}
                    <TabsContent value="overview" className="space-y-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Status Distribution */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <PieChartIcon className="h-5 w-5" />
                                        {t("analytics.byStatus")}
                                    </CardTitle>
                                    <CardDescription>{t("analytics.statusDistribution")}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    {analytics.byStatus.length > 0 ? (
                                        <ResponsiveContainer width="100%" height={300}>
                                            <PieChart>
                                                <Pie
                                                    data={analytics.byStatus}
                                                    cx="50%"
                                                    cy="50%"
                                                    labelLine={false}
                                                    label={({ name, percent }) =>
                                                        `${name}: ${(percent * 100).toFixed(0)}%`
                                                    }
                                                    outerRadius={80}
                                                    fill="#8884d8"
                                                    dataKey="value"
                                                >
                                                    {analytics.byStatus.map((entry, index) => (
                                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                    ))}
                                                </Pie>
                                                <Tooltip />
                                            </PieChart>
                                        </ResponsiveContainer>
                                    ) : (
                                        <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                                            {t("analytics.noData")}
                                        </div>
                                    )}
                                </CardContent>
                            </Card>

                            {/* Resolution Rate */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <TrendingUp className="h-5 w-5" />
                                        {t("analytics.resolutionRate")}
                                    </CardTitle>
                                    <CardDescription>{t("analytics.percentageResolved")}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <div className="text-center">
                                            <p className="text-5xl font-bold text-green-500">
                                                {analytics.totalIssues > 0
                                                    ? Math.round((analytics.resolved / analytics.totalIssues) * 100)
                                                    : 0}
                                                %
                                            </p>
                                            <p className="text-sm text-muted-foreground mt-2">
                                                {analytics.resolved} {t("analytics.outOf")} {analytics.totalIssues} {t("analytics.issuesResolved")}
                                            </p>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="flex justify-between text-sm">
                                                <span>{t("issues.resolved")}</span>
                                                <span className="font-medium">{analytics.resolved}</span>
                                            </div>
                                            <div className="w-full bg-muted rounded-full h-2">
                                                <div
                                                    className="bg-green-500 h-2 rounded-full transition-all"
                                                    style={{
                                                        width: `${analytics.totalIssues > 0 ? (analytics.resolved / analytics.totalIssues) * 100 : 0}%`,
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    {/* Category Tab */}
                    <TabsContent value="category">
                        <Card>
                            <CardHeader>
                                <CardTitle>{t("analytics.byCategory")}</CardTitle>
                                <CardDescription>{t("analytics.categoryBreakdown")}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                {analytics.byCategory.length > 0 ? (
                                    <ResponsiveContainer width="100%" height={400}>
                                        <BarChart data={analytics.byCategory}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="name" />
                                            <YAxis />
                                            <Tooltip />
                                            <Legend />
                                            <Bar dataKey="value" fill="#8884d8" name={t("nav.issues")} />
                                        </BarChart>
                                    </ResponsiveContainer>
                                ) : (
                                    <div className="h-[400px] flex items-center justify-center text-muted-foreground">
                                        {t("analytics.noData")}
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Timeline Tab */}
                    <TabsContent value="timeline">
                        <Card>
                            <CardHeader>
                                <CardTitle>{t("analytics.timeline")}</CardTitle>
                                <CardDescription>{t("analytics.last7Days")}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ResponsiveContainer width="100%" height={400}>
                                    <LineChart data={analytics.timeline}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="date" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Line
                                            type="monotone"
                                            dataKey="count"
                                            stroke="#8884d8"
                                            strokeWidth={2}
                                            name={t("nav.issues")}
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </Layout>
    );
}
