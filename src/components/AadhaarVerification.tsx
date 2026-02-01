import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield, CheckCircle2, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";

interface AadhaarVerificationProps {
    open: boolean;
    onClose: () => void;
    onVerified: () => void;
}

export function AadhaarVerification({ open, onClose, onVerified }: AadhaarVerificationProps) {
    const { t } = useLanguage();
    const [aadhaarNumber, setAadhaarNumber] = useState("");
    const [otp, setOtp] = useState("");
    const [step, setStep] = useState<"input" | "otp" | "verified">("input");
    const [loading, setLoading] = useState(false);

    // Format Aadhaar number with spaces (XXXX XXXX XXXX)
    const formatAadhaar = (value: string) => {
        const digits = value.replace(/\D/g, "").slice(0, 12);
        const formatted = digits.match(/.{1,4}/g)?.join(" ") || digits;
        return formatted;
    };

    const handleAadhaarSubmit = async () => {
        const digits = aadhaarNumber.replace(/\D/g, "");

        // Validate Aadhaar number (12 digits)
        if (digits.length !== 12) {
            toast.error(t("common.invalidAadhaar") || "Please enter a valid 12-digit Aadhaar number");
            return;
        }

        // Basic Verhoeff algorithm check for Aadhaar validation
        if (!validateAadhaarChecksum(digits)) {
            toast.error("Invalid Aadhaar number");
            return;
        }

        setLoading(true);

        // Simulate API call to send OTP
        setTimeout(() => {
            setLoading(false);
            setStep("otp");
            toast.success(t("common.otpSent") || "OTP sent to your registered mobile number");
        }, 1500);
    };

    const handleOtpVerify = async () => {
        if (otp.length !== 6) {
            toast.error(t("common.invalidOtp") || "Please enter a valid 6-digit OTP");
            return;
        }

        setLoading(true);

        // Simulate API call to verify OTP
        setTimeout(() => {
            setLoading(false);
            setStep("verified");
            toast.success(t("common.aadhaarVerified") || "Aadhaar verified successfully!");

            // Store verification status (in production, this would be in backend)
            localStorage.setItem("aadhaar_verified", "true");

            setTimeout(() => {
                onVerified();
                onClose();
                resetForm();
            }, 2000);
        }, 1500);
    };

    const resetForm = () => {
        setAadhaarNumber("");
        setOtp("");
        setStep("input");
    };

    // Verhoeff algorithm for Aadhaar validation
    const validateAadhaarChecksum = (aadhaar: string): boolean => {
        // Multiplication table
        const d = [
            [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
            [1, 2, 3, 4, 0, 6, 7, 8, 9, 5],
            [2, 3, 4, 0, 1, 7, 8, 9, 5, 6],
            [3, 4, 0, 1, 2, 8, 9, 5, 6, 7],
            [4, 0, 1, 2, 3, 9, 5, 6, 7, 8],
            [5, 9, 8, 7, 6, 0, 4, 3, 2, 1],
            [6, 5, 9, 8, 7, 1, 0, 4, 3, 2],
            [7, 6, 5, 9, 8, 2, 1, 0, 4, 3],
            [8, 7, 6, 5, 9, 3, 2, 1, 0, 4],
            [9, 8, 7, 6, 5, 4, 3, 2, 1, 0],
        ];

        // Permutation table
        const p = [
            [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
            [1, 5, 7, 6, 2, 8, 3, 0, 9, 4],
            [5, 8, 0, 3, 7, 9, 6, 1, 4, 2],
            [8, 9, 1, 6, 0, 4, 3, 5, 2, 7],
            [9, 4, 5, 3, 1, 2, 6, 8, 7, 0],
            [4, 2, 8, 6, 5, 7, 3, 9, 0, 1],
            [2, 7, 9, 3, 8, 0, 6, 4, 1, 5],
            [7, 0, 4, 6, 9, 1, 3, 2, 5, 8],
        ];

        let c = 0;
        const reversedAadhaar = aadhaar.split("").reverse().join("");

        for (let i = 0; i < reversedAadhaar.length; i++) {
            c = d[c][p[(i % 8)][parseInt(reversedAadhaar[i])]];
        }

        return c === 0;
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <div className="flex items-center gap-3 mb-2">
                        <div className={`h-12 w-12 rounded-full flex items-center justify-center ${step === "verified" ? "bg-green-500/10" : "bg-primary/10"
                            }`}>
                            {step === "verified" ? (
                                <CheckCircle2 className="h-6 w-6 text-green-500" />
                            ) : (
                                <Shield className="h-6 w-6 text-primary" />
                            )}
                        </div>
                        <DialogTitle>
                            {step === "verified" ? t("aadhaar.verificationComplete") : t("aadhaar.verifyTitle")}
                        </DialogTitle>
                    </div>
                    <DialogDescription>
                        {step === "input" && t("aadhaar.enter12Digit")}
                        {step === "otp" && t("aadhaar.enterOtpDesc")}
                        {step === "verified" && t("aadhaar.successDesc")}
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-4">
                    {step === "input" && (
                        <>
                            <div className="space-y-2">
                                <Label htmlFor="aadhaar">{t("auth.aadhaar")}</Label>
                                <Input
                                    id="aadhaar"
                                    type="text"
                                    value={aadhaarNumber}
                                    onChange={(e) => setAadhaarNumber(formatAadhaar(e.target.value))}
                                    placeholder="XXXX XXXX XXXX"
                                    maxLength={14}
                                    className="text-lg tracking-wider"
                                />
                            </div>

                            <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900 rounded-lg p-3 space-y-2">
                                <div className="flex items-start gap-2">
                                    <AlertCircle className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                                    <div className="text-xs text-blue-700 dark:text-blue-300 space-y-1">
                                        <p className="font-semibold">{t("aadhaar.privacyNotice")}</p>
                                        <ul className="list-disc list-inside space-y-0.5 ml-2">
                                            <li>{t("aadhaar.privacyEncrypted")}</li>
                                            <li>{t("aadhaar.privacyOnlyStatus")}</li>
                                            <li>{t("aadhaar.privacyNotShared")}</li>
                                            <li>{t("aadhaar.privacyFraudPrevention")}</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <Button
                                onClick={handleAadhaarSubmit}
                                disabled={loading}
                                className="w-full"
                            >
                                {loading ? t("aadhaar.sendingOtp") : t("auth.sendOtp")}
                            </Button>
                        </>
                    )}

                    {step === "otp" && (
                        <>
                            <div className="space-y-2">
                                <Label htmlFor="otp">{t("auth.otp")}</Label>
                                <Input
                                    id="otp"
                                    type="text"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                                    placeholder={t("auth.enterOtp")}
                                    maxLength={6}
                                    className="text-lg tracking-widest text-center"
                                />
                            </div>

                            <div className="flex gap-2">
                                <Button
                                    variant="outline"
                                    onClick={() => setStep("input")}
                                    className="flex-1"
                                >
                                    {t("common.back")}
                                </Button>
                                <Button
                                    onClick={handleOtpVerify}
                                    disabled={loading}
                                    className="flex-1"
                                >
                                    {loading ? t("aadhaar.verifying") : t("aadhaar.verify")}
                                </Button>
                            </div>
                        </>
                    )}

                    {step === "verified" && (
                        <div className="text-center py-4">
                            <div className="h-16 w-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4">
                                <CheckCircle2 className="h-8 w-8 text-green-500" />
                            </div>
                            <p className="text-lg font-semibold mb-2">{t("aadhaar.verificationSuccessful")}</p>
                            <p className="text-sm text-muted-foreground">
                                {t("aadhaar.canAccessFeatures")}
                            </p>
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}
 
