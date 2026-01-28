import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MapPin, ArrowLeft, Chrome } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../components/ui/tabs";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import { toast } from "sonner";
import { supabase } from "../lib/supabase";

export default function Auth() {
  const navigate = useNavigate();

  // Common
  const [loading, setLoading] = useState(false);

  // Email auth
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Phone OTP
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [otp, setOtp] = useState("");

  // Helper: prefix +91 only if user enters 10 digits
  const formatPhone = (raw: string) => {
    const digits = raw.replace(/\D/g, "").slice(0, 10);
    return `+91${digits}`;
  };

  // Google Login
  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: window.location.origin,
        },
      });
      if (error) {
        toast.error("Google login failed", { description: error.message });
      }
    } catch (err: any) {
      toast.error("Google login error", { description: err.message });
    } finally {
      setLoading(false);
    }
  };

  // Email sign up
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) {
        toast.error("Signup failed", { description: error.message });
      } else {
        toast.success("Account created", {
          description:
            "Check your email for confirmation (if enabled) and then sign in.",
        });
      }
    } catch (err: any) {
      toast.error("Signup error", { description: err.message });
    } finally {
      setLoading(false);
    }
  };

  // Email sign in
  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        toast.error("Login failed", { description: error.message });
        return;
      }
      toast.success("Login successful!", { description: "Welcome to Nagrik Samadhan" });
      navigate("/");
    } catch (err: any) {
      toast.error("Login error", { description: err.message });
    } finally {
      setLoading(false);
    }
  };

  // Send OTP to phone
  const handleSendOtp = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const digits = phoneNumber.replace(/\D/g, "");
    if (digits.length !== 10) {
      toast.error("Please enter a valid 10-digit phone number");
      return;
    }

    setLoading(true);
    try {
      const phone = formatPhone(phoneNumber);
      const { error } = await supabase.auth.signInWithOtp({
        phone,
      });
      if (error) {
        toast.error("Failed to send OTP", { description: error.message });
        return;
      }
      setShowOtpInput(true);
      toast.success("OTP sent successfully!", {
        description: `OTP sent to ${phone}`,
      });
    } catch (err: any) {
      toast.error("Error sending OTP", { description: err.message });
    } finally {
      setLoading(false);
    }
  };

  // Verify OTP
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    const digits = phoneNumber.replace(/\D/g, "");
    if (digits.length !== 10) {
      toast.error("Please enter a valid 10-digit phone number");
      return;
    }
    if (!otp) {
      toast.error("Please enter the OTP you received");
      return;
    }

    setLoading(true);
    try {
      const phone = formatPhone(phoneNumber);
      const { data, error } = await supabase.auth.verifyOtp({
        phone,
        token: otp,
        type: "sms",
      });
      if (error) {
        toast.error("OTP verification failed", { description: error.message });
        return;
      }
      toast.success("Logged in!", { description: "Welcome to Nagrik Samadhan" });
      navigate("/");
    } catch (err: any) {
      toast.error("OTP verify error", { description: err.message });
    } finally {
      setLoading(false);
    }
  };

  // Google Button Component
  const GoogleButton = ({ text }: { text: string }) => (
    <Button variant="outline" type="button" className="w-full gap-2" onClick={handleGoogleLogin} disabled={loading}>
      <svg className="h-5 w-5" viewBox="0 0 24 24">
        <path
          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          fill="#4285F4"
        />
        <path
          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          fill="#34A853"
        />
        <path
          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.84z"
          fill="#FBBC05"
        />
        <path
          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          fill="#EA4335"
        />
      </svg>
      {text}
    </Button>
  );

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container py-4">
          <Link to="/" className="inline-flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <MapPin className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">Nagrik Samadhan</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>

          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            {/* Login Tab */}
            <TabsContent value="login">
              <Card>
                <CardHeader>
                  <CardTitle>Welcome Back</CardTitle>
                  <CardDescription>
                    Login to track your reported issues and earn rewards
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Google Login */}
                  <div className="space-y-2">
                    <GoogleButton text="Continue with Google" />
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center"><span className="w-full border-t"></span></div>
                      <div className="relative flex justify-center text-xs uppercase"><span className="bg-background px-2 text-muted-foreground">Or continue with</span></div>
                    </div>
                  </div>

                  {/* Phone Login */}
                  <form onSubmit={showOtpInput ? handleVerifyOtp : handleSendOtp} className="space-y-4">
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <div className="flex gap-2 mt-2">
                        <div className="flex items-center px-3 border border-input rounded-md bg-muted">
                          <span className="text-sm text-muted-foreground">+91</span>
                        </div>
                        <Input
                          id="phone"
                          type="tel"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, "").slice(0, 10))}
                          placeholder="Enter 10-digit number"
                          className="flex-1"
                        />
                      </div>
                    </div>

                    {showOtpInput ? (
                      <div>
                        <Label htmlFor="otp">OTP</Label>
                        <Input
                          id="otp"
                          type="text"
                          value={otp}
                          onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                          placeholder="Enter OTP"
                        />
                      </div>
                    ) : null}

                    <div className="flex items-center justify-between gap-2">
                      <Button type="submit" disabled={loading} className="w-full">
                        {showOtpInput ? "Verify OTP & Login" : "Send OTP"}
                      </Button>
                      {showOtpInput ? (
                        <Button variant="ghost" onClick={() => { setShowOtpInput(false); setOtp(""); }}>
                          Edit Number
                        </Button>
                      ) : null}
                    </div>
                  </form>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center"><span className="w-full border-t"></span></div>
                    <div className="relative flex justify-center text-xs uppercase"><span className="bg-background px-2 text-muted-foreground">Or using email</span></div>
                  </div>

                  {/* Email Login */}
                  <form onSubmit={handleEmailLogin} className="space-y-4">
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                      />
                    </div>

                    <div>
                      <Label htmlFor="password">Password</Label>
                      <Input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Your password"
                      />
                    </div>

                    <div className="flex items-center justify-between gap-2">
                      <Button type="submit" disabled={loading} className="w-full">
                        Login with Email
                      </Button>
                    </div>
                    <div className="text-center">
                      <Link to="/forgot-password" className="text-sm text-muted-foreground hover:text-foreground">
                        Forgot password?
                      </Link>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Sign Up Tab */}
            <TabsContent value="signup">
              <Card>
                <CardHeader>
                  <CardTitle>Create an account</CardTitle>
                  <CardDescription>Sign up to report issues and participate</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">

                  {/* Google Signup */}
                  <div className="space-y-2">
                    <GoogleButton text="Sign up with Google" />
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center"><span className="w-full border-t"></span></div>
                      <div className="relative flex justify-center text-xs uppercase"><span className="bg-background px-2 text-muted-foreground">Or sign up with</span></div>
                    </div>
                  </div>

                  {/* Phone Signup (Same as login basically) */}
                  <form onSubmit={showOtpInput ? handleVerifyOtp : handleSendOtp} className="space-y-4">
                    <div>
                      <Label htmlFor="signup-phone">Phone Number</Label>
                      <div className="flex gap-2 mt-2">
                        <div className="flex items-center px-3 border border-input rounded-md bg-muted">
                          <span className="text-sm text-muted-foreground">+91</span>
                        </div>
                        <Input
                          id="signup-phone"
                          type="tel"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, "").slice(0, 10))}
                          placeholder="Enter 10-digit number"
                          className="flex-1"
                        />
                      </div>
                    </div>

                    {showOtpInput ? (
                      <div>
                        <Label htmlFor="signup-otp">OTP</Label>
                        <Input
                          id="signup-otp"
                          type="text"
                          value={otp}
                          onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                          placeholder="Enter OTP"
                        />
                      </div>
                    ) : null}

                    <Button type="submit" disabled={loading} variant="outline" className="w-full">
                      {showOtpInput ? "Verify & Create Account" : "Sign up with Phone"}
                    </Button>
                  </form>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center"><span className="w-full border-t"></span></div>
                    <div className="relative flex justify-center text-xs uppercase"><span className="bg-background px-2 text-muted-foreground">Or using email</span></div>
                  </div>

                  <form onSubmit={handleSignup} className="space-y-4">
                    <div>
                      <Label htmlFor="signup-email">Email</Label>
                      <Input
                        id="signup-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                      />
                    </div>

                    <div>
                      <Label htmlFor="signup-password">Password</Label>
                      <Input
                        id="signup-password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Create a password"
                      />
                    </div>

                    <div>
                      <Button type="submit" disabled={loading} className="w-full">
                        Create Account
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}