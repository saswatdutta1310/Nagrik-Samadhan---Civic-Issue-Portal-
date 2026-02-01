import { Button } from "@/components/ui/button";
import { Languages } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export function LanguageToggle() {
    const { language, setLanguage } = useLanguage();

    const toggleLanguage = () => {
        setLanguage(language === "en" ? "hi" : "en");
    };

    return (
        <Button
            variant="outline"
            size="sm"
            onClick={toggleLanguage}
            className="gap-2"
        >
            <Languages className="h-4 w-4" />
            <span className="font-medium">
                {language === "en" ? "हिंदी" : "English"}
            </span>
        </Button>
    );
}
 
 
