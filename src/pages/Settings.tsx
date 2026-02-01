import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLanguage } from "@/contexts/LanguageContext";
import { Bell, Shield, Lock, Eye, Globe, Moon, Smartphone } from "lucide-react";

export default function Settings() {
    const { t, language, setLanguage } = useLanguage();
    const [notifications, setNotifications] = useState({
        email: true,
        sms: true,
        push: true,
        marketing: false
    });

    const [privacy, setPrivacy] = useState({
        publicProfile: false,
        showLocation: true,
        anonymousReporting: true
    });

    return (
        <Layout>
            <div className="container max-w-4xl py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">{t("user.settings")}</h1>
                    <p className="text-muted-foreground">Manage your account preferences and security settings.</p>
                </div>

                <div className="space-y-6">
                    {/* General Settings */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Globe className="h-5 w-5" />
                                General Settings
                            </CardTitle>
                            <CardDescription>Basic application preferences.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label>Language</Label>
                                    <p className="text-sm text-muted-foreground">Choose your preferred language.</p>
                                </div>
                                <Select value={language} onValueChange={(val: any) => setLanguage(val)}>
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Select Language" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="en">English</SelectItem>
                                        <SelectItem value="hi">हिंदी (Hindi)</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label>Theme</Label>
                                    <p className="text-sm text-muted-foreground">Customize the look of the platform.</p>
                                </div>
                                <Select defaultValue="system">
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Select Theme" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="light">
                                            <div className="flex items-center gap-2 font-normal">
                                                <Eye className="h-4 w-4" /> Light
                                            </div>
                                        </SelectItem>
                                        <SelectItem value="dark">
                                            <div className="flex items-center gap-2 font-normal">
                                                <Moon className="h-4 w-4" /> Dark
                                            </div>
                                        </SelectItem>
                                        <SelectItem value="system">
                                            <div className="flex items-center gap-2 font-normal">
                                                <Smartphone className="h-4 w-4" /> System
                                            </div>
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Notifications */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Bell className="h-5 w-5" />
                                Notifications
                            </CardTitle>
                            <CardDescription>Configure how you want to be notified.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="email-notif">Email Notifications</Label>
                                <Switch
                                    id="email-notif"
                                    checked={notifications.email}
                                    onCheckedChange={(val) => setNotifications({ ...notifications, email: val })}
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <Label htmlFor="sms-notif">SMS Notifications</Label>
                                <Switch
                                    id="sms-notif"
                                    checked={notifications.sms}
                                    onCheckedChange={(val) => setNotifications({ ...notifications, sms: val })}
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <Label htmlFor="push-notif">Push Notifications</Label>
                                <Switch
                                    id="push-notif"
                                    checked={notifications.push}
                                    onCheckedChange={(val) => setNotifications({ ...notifications, push: val })}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Privacy & Security */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Shield className="h-5 w-5" />
                                Privacy & Security
                            </CardTitle>
                            <CardDescription>Manage your data sharing and account security.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label htmlFor="anon-report">Anonymous Reporting</Label>
                                    <p className="text-sm text-muted-foreground">Hide your identity on public issue reports.</p>
                                </div>
                                <Switch
                                    id="anon-report"
                                    checked={privacy.anonymousReporting}
                                    onCheckedChange={(val) => setPrivacy({ ...privacy, anonymousReporting: val })}
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label htmlFor="show-loc">Show Precise Location</Label>
                                    <p className="text-sm text-muted-foreground">Show exact map coordinates on your reports.</p>
                                </div>
                                <Switch
                                    id="show-loc"
                                    checked={privacy.showLocation}
                                    onCheckedChange={(val) => setPrivacy({ ...privacy, showLocation: val })}
                                />
                            </div>

                            <div className="pt-4 border-t space-y-4">
                                <Button variant="outline" className="w-full justify-start text-destructive hover:text-destructive">
                                    <Lock className="h-4 w-4 mr-2" /> Change Password
                                </Button>
                                <Button variant="outline" className="w-full justify-start">
                                    <Shield className="h-4 w-4 mr-2" /> Two-Factor Authentication
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="flex justify-end gap-3">
                        <Button variant="outline">Cancel</Button>
                        <Button>Save Preferences</Button>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
 
