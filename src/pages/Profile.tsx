import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";
import { useLanguage } from "@/contexts/LanguageContext";
import { User, Mail, Phone, MapPin, Save, Loader2, Shield, AlertCircle } from "lucide-react";

export default function Profile() {
    const { t } = useLanguage();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [user, setUser] = useState<any>(null);
    const [profile, setProfile] = useState({
        full_name: "",
        bio: "",
        phone: "",
        address: "",
        avatar_url: ""
    });

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            setLoading(true);
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return;
            setUser(user);

            const { data, error } = await supabase
                .from("profiles")
                .select("*")
                .eq("id", user.id)
                .single();

            if (error && error.code !== "PGRST116") throw error;

            if (data) {
                setProfile({
                    full_name: data.full_name || "",
                    bio: data.bio || "",
                    phone: data.phone || "",
                    address: data.address || "",
                    avatar_url: data.avatar_url || ""
                });
            } else {
                // Create profile if it doesn't exist
                const { error: insertError } = await supabase
                    .from("profiles")
                    .insert([{ id: user.id, email: user.email }]);

                if (insertError) console.error("Error creating profile:", insertError);
            }
        } catch (error: any) {
            console.error("Error fetching profile:", error);
            toast.error("Failed to load profile");
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        try {
            setSaving(true);
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return;

            const { error } = await supabase
                .from("profiles")
                .upsert({
                    id: user.id,
                    ...profile,
                    updated_at: new Date().toISOString()
                });

            if (error) throw error;
            toast.success("Profile updated successfully");
        } catch (error: any) {
            console.error("Error updating profile:", error);
            toast.error("Failed to update profile");
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <Layout>
                <div className="flex h-[80vh] items-center justify-center">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="container max-w-4xl py-8">
                <div className="flex items-center gap-4 mb-8">
                    <Avatar className="h-20 w-20 border-2 border-primary/20">
                        <AvatarImage src={profile.avatar_url} />
                        <AvatarFallback className="text-2xl font-bold bg-primary/10 text-primary">
                            {profile.full_name?.[0] || user?.email?.[0]?.toUpperCase() || "U"}
                        </AvatarFallback>
                    </Avatar>
                    <div>
                        <h1 className="text-3xl font-bold">{profile.full_name || "User Profile"}</h1>
                        <p className="text-muted-foreground">{user?.email}</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Public Info */}
                    <Card className="md:col-span-2">
                        <CardHeader>
                            <CardTitle>Personal Details</CardTitle>
                            <CardDescription>Update your personal information and bio.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="full_name">Full Name</Label>
                                <div className="relative">
                                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        id="full_name"
                                        className="pl-10"
                                        value={profile.full_name}
                                        onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
                                        placeholder="Enter your full name"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="bio">Bio</Label>
                                <Textarea
                                    id="bio"
                                    placeholder="Tell us a bit about yourself..."
                                    className="min-h-[100px]"
                                    value={profile.bio}
                                    onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="phone">Phone Number</Label>
                                    <div className="relative">
                                        <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            id="phone"
                                            className="pl-10"
                                            value={profile.phone}
                                            onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                                            placeholder="+91 XXXXX XXXXX"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="address">Address / Area</Label>
                                    <div className="relative">
                                        <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            id="address"
                                            className="pl-10"
                                            value={profile.address}
                                            onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                                            placeholder="Your neighborhood"
                                        />
                                    </div>
                                </div>
                            </div>

                            <Button onClick={handleSave} disabled={saving} className="w-full md:w-auto">
                                {saving ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Saving...
                                    </>
                                ) : (
                                    <>
                                        <Save className="mr-2 h-4 w-4" />
                                        Save Changes
                                    </>
                                )}
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Account Settings */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Account</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 text-sm">
                            <div className="space-y-1">
                                <p className="text-muted-foreground">Email</p>
                                <p className="font-medium flex items-center gap-2">
                                    <Mail className="h-4 w-4" />
                                    {user?.email}
                                </p>
                            </div>
                            <div className="pt-4 border-t space-y-3">
                                <p className="text-muted-foreground font-semibold uppercase text-[10px] tracking-wider">Aadhaar Status</p>
                                {localStorage.getItem("aadhaar_verified") === "true" ? (
                                    <div className="flex items-center gap-2 text-green-600 bg-green-50 dark:bg-green-900/20 px-3 py-2 rounded-lg">
                                        <Shield className="h-4 w-4" />
                                        <span className="font-medium">Verified</span>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-2 text-orange-600 bg-orange-50 dark:bg-orange-900/20 px-3 py-2 rounded-lg">
                                        <AlertCircle className="h-4 w-4" />
                                        <span className="font-medium">Unverified</span>
                                    </div>
                                )}
                                {!localStorage.getItem("aadhaar_verified") && (
                                    <Button variant="outline" size="sm" className="w-full">
                                        Verify Now
                                    </Button>
                                )}
                            </div>
                            <div className="pt-4 border-t space-y-1">
                                <p className="text-muted-foreground">User ID</p>
                                <p className="text-xs font-mono break-all">{user?.id}</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </Layout>
    );
}
