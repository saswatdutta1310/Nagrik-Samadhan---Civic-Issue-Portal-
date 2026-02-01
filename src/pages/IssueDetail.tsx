import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";
import { MOCK_ISSUES, ACCOUNT_HOLDER_ISSUES } from "@/lib/mockData";
import {
  MapPin,
  Clock,
  User,
  IndianRupee,
  ArrowLeft,
  Share2,
  AlertTriangle,
  Calendar,
  Check,
  Building,
  Users,
  ArrowUpRight,
  CreditCard,
  QrCode,
  Landmark,
  Loader2
} from "lucide-react";
import MapPicker from "@/components/MapPicker";
import { useLanguage } from "@/contexts/LanguageContext";

const IssueDetail = () => {
  const { id } = useParams();
  const { t, language } = useLanguage();
  const [openPayment, setOpenPayment] = useState(false);
  const [issue, setIssue] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Helper for dynamic dates
  const getRecentDate = (daysAgo: number) => {
    const d = new Date();
    d.setDate(d.getDate() - daysAgo);
    return d.toLocaleDateString(language === 'hi' ? 'hi-IN' : 'en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  useEffect(() => {
    const fetchIssue = async () => {
      if (!id) return;
      setLoading(true);

      // 1. Check if it's a mock issue
      const mockIssue = MOCK_ISSUES.find(i => i.id === id);
      if (mockIssue) {
        setIssue(mockIssue);
        setLoading(false);
        return;
      }

      // 2. Check if it's an account holder mock issue
      const accIssue = ACCOUNT_HOLDER_ISSUES.find(i => i.id === id);
      if (accIssue) {
        setIssue(accIssue);
        setLoading(false);
        return;
      }

      // 3. Fallback to Supabase for real issues
      const { data, error } = await supabase
        .from("issues")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error fetching issue", error);
        toast.error(t("common.loadingError") || "Failed to load issue details");
      } else {
        setIssue(data);
      }
      setLoading(false);
    };

    fetchIssue();
  }, [id, t, language]);

  // Mock Data (Fallback if issue doesn't have funding info)
  const STATIC_FUNDING_DATA = {
    approvedCost: 45000,
    funded: 45000,
    government: 30000,
    community: 15000,
    progress: 100,
    contributors: [
      { name: t("funding.anonymous"), amount: 5000, date: getRecentDate(2) },
      { name: "Priya Gupta", amount: 3000, date: getRecentDate(3) },
      { name: "Amit Kumar", amount: 2000, date: getRecentDate(4) },
      { name: t("funding.anonymous"), amount: 5000, date: getRecentDate(5) },
    ]
  };

  const NEW_ISSUE_FUNDING_DATA = {
    approvedCost: 0,
    funded: 0,
    government: 0,
    community: 0,
    progress: 0,
    contributors: []
  };

  // Determine valid data source
  const fundingInfo = issue?.funding ? {
    approvedCost: issue.funding.total,
    funded: issue.funding.raised,
    government: issue.funding.government,
    community: issue.funding.community,
    progress: issue.funding.total > 0 ? (issue.funding.raised / issue.funding.total) * 100 : 0,
    contributors: issue.funding.contributors || []
  } : (issue?.status === 'reported' ? NEW_ISSUE_FUNDING_DATA : STATIC_FUNDING_DATA);

  const TIMELINE_STEPS = [
    {
      id: 1,
      title: t("timeline.reported"),
      description: t("timeline.reportedDesc"),
      date: issue?.reported_at ? new Date(issue.reported_at).toLocaleDateString(language === 'hi' ? 'hi-IN' : 'en-IN') : getRecentDate(1),
      status: "completed",
      isCurrent: true
    },
    {
      id: 2,
      title: t("timeline.stateReviewed"),
      description: t("timeline.stateReviewedDesc"),
      status: "pending",
    },
    {
      id: 3,
      title: t("timeline.municipalVerified"),
      description: t("timeline.municipalVerifiedDesc"),
      status: "pending",
    },
    {
      id: 4,
      title: t("timeline.costApproved"),
      description: t("timeline.costApprovedDesc"),
      status: "pending",
    },
    {
      id: 5,
      title: t("timeline.funded"),
      description: t("timeline.fundedDesc"),
      status: "pending",
    },
    {
      id: 6,
      title: t("timeline.inProgress"),
      description: t("timeline.inProgressDesc"),
      status: "pending",
    },
    {
      id: 7,
      title: t("timeline.resolved"),
      description: t("timeline.resolvedDesc"),
      status: "pending",
    }
  ];

  if (loading) {
    return (
      <Layout>
        <div className="flex h-[80vh] items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  if (!issue) {
    return (
      <Layout>
        <div className="container py-8 text-center">
          <h2 className="text-xl font-bold">{t("issues.notFound")}</h2>
          <Link to="/issues" className="text-primary hover:underline">{t("issues.backToIssues")}</Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container py-8">
        {/* BACK */}
        <Link
          to="/issues"
          className="inline-flex items-center gap-2 text-muted-foreground mb-6 hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          {t("issues.backToIssues")}
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT COLUMN */}
          <div className="lg:col-span-2 space-y-6">
            {/* HEADER CARD */}
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between mb-4">
                  <div>
                    <p className="text-sm text-muted-foreground capitalize">{t(`categories.${issue.category}.name`)} {t("issues.issue")}</p>
                    <Badge variant="secondary" className="mt-1 capitalize">{t(`issues.${issue.status.toLowerCase().replace(" ", "")}`) || issue.status}</Badge>
                  </div>

                  <div className="flex gap-2">
                    <Badge variant={issue.urgency === 'high' ? 'destructive' : 'outline'} className="gap-1 capitalize">
                      <AlertTriangle className="h-3 w-3" />
                      {t(`report.urgency${issue.urgency.charAt(0).toUpperCase() + issue.urgency.slice(1)}`)} {t("report.urgency")}
                    </Badge>
                    <Button size="sm" variant="outline">
                      <Share2 className="h-4 w-4 mr-2" />
                      {t("common.share")}
                    </Button>
                  </div>
                </div>

                <h1 className="text-3xl font-bold mb-4">{issue.title}</h1>

                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {issue.description}
                </p>

                <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
                  <span className="flex items-center gap-2">
                    <div className="p-1.5 bg-muted rounded-full">
                      <User className="h-3 w-3" />
                    </div>
                    {t("common.citizen")}
                  </span>
                  <span className="flex items-center gap-2">
                    <div className="p-1.5 bg-muted rounded-full">
                      <Clock className="h-3 w-3" />
                    </div>
                    {new Date(issue.reported_at).toLocaleDateString(language === 'hi' ? 'hi-IN' : 'en-IN')}
                  </span>
                  {issue.location_address && (
                    <span className="flex items-center gap-2">
                      <div className="p-1.5 bg-muted rounded-full">
                        <MapPin className="h-3 w-3" />
                      </div>
                      {issue.location_address}
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* STATUS TIMELINE */}
            <Card>
              <CardHeader>
                <CardTitle>{t("issues.statusTimeline")}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative space-y-0 pl-2">
                  {/* Vertical Line */}
                  <div className="absolute left-[27px] top-6 bottom-6 w-0.5 bg-slate-200 dark:bg-slate-800" />

                  {TIMELINE_STEPS.map((step, index) => (
                    <div key={step.id} className="relative flex gap-6 pb-8 last:pb-0">
                      {/* Icon/Number */}
                      <div className="relative z-10 flex-none bg-background py-1">
                        {step.isCurrent ? (
                          <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center border-4 border-white dark:border-background shadow-sm text-green-600">
                            <Check className="h-5 w-5 stroke-[3]" />
                          </div>
                        ) : step.status === 'completed' ? (
                          <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center border-4 border-white dark:border-background shadow-sm text-green-600">
                            <Check className="h-5 w-5 stroke-[3]" />
                          </div>
                        ) : (
                          <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center border-4 border-white dark:border-background text-muted-foreground font-semibold text-sm">
                            {index + 1}
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="pt-2">
                        <h3 className={`font-semibold ${step.isCurrent ? "text-primary" : ""}`}>
                          {step.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {step.description}
                        </p>
                        {step.date && (
                          <p className="text-xs text-muted-foreground mt-2 font-medium bg-muted/50 inline-block px-2 py-1 rounded">
                            {step.date}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* RIGHT COLUMN - FUNDING & ACTIONS */}
          <div className="space-y-6">

            {/* ACTION CARD */}
            <Card className="border-primary/20 bg-primary/5 shadow-md">
              <CardContent className="p-6 text-center space-y-4">
                <h3 className="font-semibold text-lg">{t("funding.helpSolve")}</h3>
                <p className="text-sm text-muted-foreground">
                  {t("funding.desc")}
                </p>

                <Dialog open={openPayment} onOpenChange={setOpenPayment}>
                  <DialogTrigger asChild>
                    <Button className="w-full h-12 text-lg shadow-lg hover:shadow-xl transition-all">
                      <IndianRupee className="h-5 w-5 mr-2" />
                      {t("funding.fundBtn")}
                    </Button>
                  </DialogTrigger>

                  {/* PAYMENT DIALOG CONTENT (SAME AS BEFORE) */}
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>{t("funding.contributeTitle")}</DialogTitle>
                      <DialogDescription>
                        {t("funding.paymentSecurity")}
                      </DialogDescription>
                    </DialogHeader>
                    <Tabs defaultValue="upi" className="w-full">
                      <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="upi">{t("wallet.upi")}</TabsTrigger>
                        <TabsTrigger value="card">{t("wallet.card")}</TabsTrigger>
                        <TabsTrigger value="netbanking">{t("wallet.netBanking")}</TabsTrigger>
                      </TabsList>

                      {/* AMOUNT INPUT */}
                      <div className="mt-4 mb-2">
                        <Label>{t("funding.amountLabel")}</Label>
                        <Input type="number" placeholder={t("funding.amountPlaceholder")} className="mt-1.5" />
                      </div>

                      <TabsContent value="upi" className="space-y-4 pt-4">
                        <div className="flex flex-col items-center p-4 border rounded-lg bg-slate-50 dark:bg-slate-900 border-dashed">
                          <QrCode className="h-32 w-32 text-slate-800 dark:text-slate-200 mb-2" />
                          <p className="text-xs text-muted-foreground">{t("funding.scanUpi")}</p>
                        </div>
                        <div className="space-y-2">
                          <Label>{t("funding.enterUpi")}</Label>
                          <Input placeholder="username@upi" />
                        </div>
                        <Button className="w-full bg-green-600 hover:bg-green-700 text-white" onClick={() => {
                          toast.success(t("common.paySuccess"));
                          setOpenPayment(false);
                        }}>
                          {t("funding.payContribute")}
                        </Button>
                      </TabsContent>

                      <TabsContent value="card" className="space-y-4 pt-4">
                        <div className="space-y-2">
                          <Label>{t("funding.cardNumber")}</Label>
                          <div className="relative">
                            <CreditCard className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input className="pl-9" placeholder="0000 0000 0000 0000" />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label>{t("funding.expiry")}</Label>
                            <Input placeholder="MM/YY" />
                          </div>
                          <div>
                            <Label>{t("funding.cvv")}</Label>
                            <Input placeholder="123" />
                          </div>
                        </div>
                        <Button className="w-full bg-blue-600 hover:bg-blue-700" onClick={() => {
                          toast.success(t("common.paySuccess"));
                          setOpenPayment(false);
                        }}>
                          {t("funding.paySecurely")}
                        </Button>
                      </TabsContent>

                      <TabsContent value="netbanking" className="space-y-4 pt-4">
                        <div className="space-y-2">
                          <Label>{t("funding.selectBank")}</Label>
                          <div className="grid grid-cols-2 gap-2">
                            {['HDFC', 'SBI', 'ICICI', 'Axis'].map(bank => (
                              <Button key={bank} variant="outline" className="justify-start">
                                <Landmark className="h-4 w-4 mr-2" />
                                {bank}
                              </Button>
                            ))}
                          </div>
                        </div>
                        <Button className="w-full mt-2" onClick={() => {
                          toast.success(t("common.redirectBank"));
                          setTimeout(() => {
                            toast.success(t("common.paySuccess"));
                            setOpenPayment(false);
                          }, 1500);
                        }}>
                          {t("funding.proceed")}
                        </Button>
                      </TabsContent>
                    </Tabs>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>

            {/* FUNDING STATUS */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ArrowUpRight className="h-5 w-5 text-green-600" />
                  {t("funding.status")}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">{t("funding.totalRequired")}</span>
                    <span className="font-semibold">₹{fundingInfo.approvedCost.toLocaleString(language === 'hi' ? 'hi-IN' : 'en-IN')}</span>
                  </div>
                  <Progress value={fundingInfo.progress} className="h-3" />
                  <div className="flex justify-between text-xs text-muted-foreground mt-2">
                    <span>{t("funding.raised")}: ₹{fundingInfo.funded.toLocaleString(language === 'hi' ? 'hi-IN' : 'en-IN')}</span>
                    <span>{Math.round(fundingInfo.progress)}%</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <Building className="h-4 w-4 text-blue-600" />
                      <span className="text-xs font-semibold text-blue-700 dark:text-blue-300">{t("funding.govtGrant")}</span>
                    </div>
                    <p className="font-bold">₹{fundingInfo.government.toLocaleString(language === 'hi' ? 'hi-IN' : 'en-IN')}</p>
                  </div>
                  <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <Users className="h-4 w-4 text-purple-600" />
                      <span className="text-xs font-semibold text-purple-700 dark:text-purple-300">{t("funding.community")}</span>
                    </div>
                    <p className="font-bold">₹{fundingInfo.community.toLocaleString(language === 'hi' ? 'hi-IN' : 'en-IN')}</p>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-semibold uppercase text-muted-foreground tracking-wider mb-3">
                    {t("funding.recentContributors")}
                  </h4>
                  <div className="space-y-2">
                    {fundingInfo.contributors.length > 0 ? (
                      fundingInfo.contributors.map((c: any, i: number) => (
                        <div key={i} className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-900 rounded-lg text-sm">
                          <span className="font-medium">{c.name}</span>
                          <div className="text-right">
                            <p className="font-semibold text-green-600">₹{c.amount.toLocaleString(language === 'hi' ? 'hi-IN' : 'en-IN')}</p>
                            <p className="text-[10px] text-muted-foreground">{c.date}</p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-muted-foreground italic">{t("funding.noContributions")}</p>
                    )}
                  </div>
                </div>

              </CardContent>
            </Card>

            {/* EXPECTED TIMELINE */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  {t("funding.expectedTimeline")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">{t("funding.estimatedStart")}</span>
                    <span className="font-medium">
                      {new Date().toLocaleDateString(language === 'hi' ? 'hi-IN' : 'en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">{t("funding.estimatedCompletion")}</span>
                    <span className="font-medium">
                      {(() => {
                        const d = new Date();
                        d.setDate(d.getDate() + 10);
                        return d.toLocaleDateString(language === 'hi' ? 'hi-IN' : 'en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
                      })()}
                    </span>
                  </div>
                  <div className="mt-2 pt-3 border-t">
                    <p className="text-xs text-muted-foreground">{t("issues.timelineNote")}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* LOCATION */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  {t("report.location")}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0 overflow-hidden rounded-b-xl">
                <div className="aspect-video w-full relative">
                  {/* Overlay to prevent interaction if needed, or allow it */}
                  <div className="absolute inset-0 pointer-events-none z-10 border-t" />
                  <MapPicker
                    lat={issue.latitude || 28.6139}
                    lng={issue.longitude || 77.2090}
                    onPick={() => { }}
                    enableGeolocation={false}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default IssueDetail;
 
