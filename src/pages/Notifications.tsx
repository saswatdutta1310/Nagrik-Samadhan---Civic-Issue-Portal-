import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, CheckCircle2, Info, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { hi, enIN } from "date-fns/locale";
import { useLanguage } from "@/contexts/LanguageContext";

// Mock notifications (since no backend table was specified for this)
const MOCK_NOTIFICATIONS = [
    {
        id: 1,
        title: "Issue Resolved",
        description: "The pothole report at MG Road has been marked as resolved.",
        time: "2 hours ago",
        type: "success",
        read: false,
        date: new Date(Date.now() - 2 * 60 * 60 * 1000)
    },
    {
        id: 2,
        title: "Status Update",
        description: "Your report #1024 is now 'In Progress'.",
        time: "1 day ago",
        type: "info",
        read: true,
        date: new Date(Date.now() - 24 * 60 * 60 * 1000)
    },
    {
        id: 3,
        title: "Weekly Summary",
        description: "You have earned 50 points this week!",
        time: "3 days ago",
        type: "reward",
        read: true,
        date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
    },
];

export default function Notifications() {
    const { t, language } = useLanguage();
    const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);

    const markAllRead = () => {
        setNotifications(notifications.map(n => ({ ...n, read: true })));
    };

    return (
        <Layout>
            <div className="container max-w-3xl py-8">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-3xl font-bold flex items-center gap-3">
                        <Bell className="h-8 w-8 text-primary" />
                        {t("nav.notifications")}
                    </h1>
                    <Button variant="outline" size="sm" onClick={markAllRead}>
                        {t("notifications.markAllRead")}
                    </Button>
                </div>

                <div className="space-y-4">
                    {notifications.length === 0 ? (
                        <div className="text-center py-12 text-muted-foreground">
                            <Bell className="h-12 w-12 mx-auto mb-4 opacity-20" />
                            <p>{t("notifications.noNotifications")}</p>
                        </div>
                    ) : (
                        notifications.map((n) => (
                            <Card key={n.id} className={`transition-colors ${!n.read ? "bg-accent/20 border-accent" : ""}`}>
                                <CardContent className="p-4 flex gap-4 items-start">
                                    <div className={`mt-1 h-8 w-8 rounded-full flex items-center justify-center shrink-0 ${n.type === 'success' ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' :
                                        n.type === 'reward' ? 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400' :
                                            'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
                                        }`}>
                                        {n.type === 'success' ? <CheckCircle2 className="h-4 w-4" /> :
                                            n.type === 'reward' ? <AlertTriangle className="h-4 w-4" /> :
                                                <Info className="h-4 w-4" />}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between items-start">
                                            <h4 className={`text-base font-semibold ${!n.read ? "text-foreground" : "text-muted-foreground"}`}>
                                                {n.title}
                                            </h4>
                                            <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                                                {formatDistanceToNow(n.date, {
                                                    addSuffix: true,
                                                    locale: language === 'hi' ? hi : enIN
                                                })}
                                            </span>
                                        </div>
                                        <p className="text-sm text-muted-foreground mt-1">
                                            {n.description}
                                        </p>
                                    </div>
                                    {!n.read && (
                                        <div className="h-2 w-2 rounded-full bg-primary mt-2 shrink-0" />
                                    )}
                                </CardContent>
                            </Card>
                        ))
                    )}
                </div>
            </div>
        </Layout>
    );
}
