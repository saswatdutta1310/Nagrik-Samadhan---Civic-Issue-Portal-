import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { AlertTriangle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface FraudAlertDialogProps {
    open: boolean;
    onClose: () => void;
}

export function FraudAlertDialog({ open, onClose }: FraudAlertDialogProps) {
    const { t } = useLanguage();

    return (
        <AlertDialog open={open} onOpenChange={onClose}>
            <AlertDialogContent className="max-w-md">
                <AlertDialogHeader>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="h-12 w-12 rounded-full bg-destructive/10 flex items-center justify-center">
                            <AlertTriangle className="h-6 w-6 text-destructive" />
                        </div>
                        <AlertDialogTitle className="text-xl">
                            {t("fraud.title")}
                        </AlertDialogTitle>
                    </div>
                    <AlertDialogDescription className="text-base space-y-3 pt-2">
                        <p className="font-semibold text-destructive">
                            {t("fraud.duplicate")}
                        </p>
                        <p>{t("fraud.message")}</p>
                        <p className="text-sm text-muted-foreground border-l-4 border-destructive pl-3 py-2 bg-destructive/5 rounded">
                            {t("fraud.warning")}
                        </p>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogAction onClick={onClose} className="w-full">
                        {t("common.close")}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
