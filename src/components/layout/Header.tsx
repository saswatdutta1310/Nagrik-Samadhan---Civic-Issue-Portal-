import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Bell } from "lucide-react";
import { useState } from "react";
import UserMenu from "@/components/layout/UserMenu";
import { LanguageToggle } from "@/components/LanguageToggle";
import { useLanguage } from "@/contexts/LanguageContext";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { t } = useLanguage();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container flex h-16 items-center justify-between">

        {/* ✅ LOGO + APP NAME */}
        <Link
          to="/"
          className="flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md"
        >
          <img
            src="/logo.png"
            alt="Nagrik Samadhan Logo"
            className="h-9 w-9 object-contain"
            loading="eager"
          />
          <span className="text-lg md:text-xl font-bold text-foreground tracking-tight">
            Nagrik Samadhan
          </span>
        </Link>

        {/* ✅ DESKTOP NAV */}
        <nav className="hidden md:flex items-center gap-6">
          <NavLink to="/issues" active={location.pathname === "/issues"}>
            {t("nav.browseIssues")}
          </NavLink>
          <NavLink to="/report" active={location.pathname === "/report"}>
            {t("nav.report")}
          </NavLink>
          <NavLink to="/leaderboard" active={location.pathname === "/leaderboard"}>
            {t("nav.leaderboard")}
          </NavLink>
          <NavLink to="/about" active={location.pathname === "/about"}>
            {t("nav.about")}
          </NavLink>
        </nav>

        <div className="hidden md:flex items-center gap-2">
          <LanguageToggle />

          <Link to="/notifications">
            <Button
              variant="ghost"
              size="icon"
              aria-label={t("nav.notifications")}
            >
              <Bell className="h-5 w-5" />
            </Button>
          </Link>

          <UserMenu />
        </div>

        {/* ✅ MOBILE MENU TOGGLE */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          aria-label="Toggle menu"
          onClick={() => setMobileMenuOpen((v) => !v)}
        >
          {mobileMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </Button>
      </div>

      {/* ✅ MOBILE MENU */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-card">
          <nav className="container py-4 flex flex-col gap-3">
            <MobileNavLink
              to="/issues"
              active={location.pathname === "/issues"}
              onClick={() => setMobileMenuOpen(false)}
            >
              {t("nav.browseIssues")}
            </MobileNavLink>

            <MobileNavLink
              to="/report"
              active={location.pathname === "/report"}
              onClick={() => setMobileMenuOpen(false)}
            >
              {t("nav.report")}
            </MobileNavLink>

            <MobileNavLink
              to="/leaderboard"
              active={location.pathname === "/leaderboard"}
              onClick={() => setMobileMenuOpen(false)}
            >
              {t("nav.leaderboard")}
            </MobileNavLink>

            <MobileNavLink
              to="/about"
              active={location.pathname === "/about"}
              onClick={() => setMobileMenuOpen(false)}
            >
              {t("nav.about")}
            </MobileNavLink>

            {/* ✅ MOBILE USER MENU */}
            <div className="pt-3 mt-3 border-t border-border">
              <UserMenu />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

/* ---------- HELPERS ---------- */

function NavLink({
  to,
  active,
  children,
}: {
  to: string;
  active?: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      to={to}
      className={`text-sm font-medium transition-colors ${active
        ? "text-foreground"
        : "text-muted-foreground hover:text-foreground"
        }`}
    >
      {children}
    </Link>
  );
}

function MobileNavLink({
  to,
  active,
  onClick,
  children,
}: {
  to: string;
  active?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`py-2 text-sm font-medium ${active
        ? "text-foreground"
        : "text-muted-foreground hover:text-foreground"
        }`}
    >
      {children}
    </Link>
  );
}

export default Header;
 
 
