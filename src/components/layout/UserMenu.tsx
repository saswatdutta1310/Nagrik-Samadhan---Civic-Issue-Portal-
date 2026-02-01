import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  FileText,
  Wallet,
  Settings,
  LogOut,
  ChevronDown,
  Trophy,
  BarChart3,
  User
} from "lucide-react";

import { useWallet } from "@/contexts/WalletContext";
import { useLanguage } from "@/contexts/LanguageContext";

export default function UserMenu() {
  const { user, profile, signOut, loading } = useAuth();
  const { balance } = useWallet();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { t, language } = useLanguage();

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (loading) return <div className="px-3">{t("common.loading")}</div>;

  // 🔒 Not logged in → show Sign In / Sign Up
  if (!user) {
    return (
      <div className="flex gap-2">
        <Link to="/auth?mode=login">
          <Button variant="outline" size="sm">
            {t("nav.signIn")}
          </Button>
        </Link>
        <Link to="/auth?mode=signup">
          <Button size="sm">{t("nav.signUp")}</Button>
        </Link>
      </div>
    );
  }

  const name = profile?.full_name || user.email?.split("@")[0] || t("leaderboard.user") || "User";
  const email = user.email;
  const avatar = profile?.avatar_url;
  const points = profile?.points ?? 1250;

  return (
    <div className="flex items-center gap-4" ref={menuRef}>
      {/* Wallet Balance Badge */}
      <Link to="/wallet" className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl border bg-background font-semibold text-sm shadow-sm hover:bg-muted/50 transition-colors">
        <Wallet className="w-4 h-4 text-primary" />
        <span>₹{balance.toLocaleString(language === 'hi' ? 'hi-IN' : 'en-IN')}</span>
      </Link>

      <div className="relative">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2 rounded-full p-1 pr-3 hover:bg-muted/50 transition-colors border border-transparent hover:border-border"
        >
          <Avatar className="h-9 w-9 border border-border">
            {avatar ? (
              <AvatarImage src={avatar} />
            ) : (
              <AvatarFallback className="bg-primary/10 text-primary font-medium">
                {name
                  .split(" ")
                  .map((p) => p[0])
                  .slice(0, 2)
                  .join("")
                  .toUpperCase()}
              </AvatarFallback>
            )}
          </Avatar>

          <div className="hidden sm:flex flex-col items-start leading-none gap-0.5">
            <span className="text-sm font-semibold">{name}</span>
          </div>

          <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
        </button>

        {open && (
          <div className="absolute right-0 mt-2 w-72 rounded-2xl border bg-card shadow-xl ring-1 ring-black/5 animate-in fade-in zoom-in-95 duration-200 z-50 overflow-hidden">
            {/* User Header */}
            <Link to="/profile" onClick={() => setOpen(false)} className="block bg-muted/30 p-5 border-b hover:bg-muted/50 transition-colors">
              <h4 className="font-semibold text-base">{name}</h4>
              <p className="text-sm text-muted-foreground truncate">{email}</p>

              <div className="mt-3 flex items-center gap-2">
                <div className="inline-flex items-center gap-1.5 rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-700 border border-teal-100 dark:bg-teal-950/30 dark:text-teal-400 dark:border-teal-900">
                  <Trophy className="w-3.5 h-3.5" />
                  <span>{points} {t("common.points")}</span>
                </div>
              </div>
            </Link>

            {/* Menu Items */}
            <div className="p-2">
              <MenuItem
                to="/profile"
                icon={<User className="w-4 h-4" />}
                label="Profile"
                onClick={() => setOpen(false)}
              />
              <MenuItem
                to="/my-issues"
                icon={<FileText className="w-4 h-4" />}
                label={t("user.myIssues")}
                onClick={() => setOpen(false)}
              />
              <MenuItem
                to="/analytics"
                icon={<BarChart3 className="w-4 h-4" />}
                label={t("user.analytics")}
                onClick={() => setOpen(false)}
              />
              <MenuItem
                to="/wallet"
                icon={<Wallet className="w-4 h-4" />}
                label={t("user.wallet")}
                onClick={() => setOpen(false)}
              />
              <MenuItem
                to="/settings"
                icon={<Settings className="w-4 h-4" />}
                label={t("user.settings")}
                onClick={() => setOpen(false)}
              />

              <div className="my-1 border-t border-border/50" />

              <button
                onClick={async () => {
                  await signOut();
                  setOpen(false);
                }}
                className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-red-600 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                {t("user.signOut")}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function MenuItem({
  to,
  icon,
  label,
  onClick
}: {
  to: string,
  icon: React.ReactNode,
  label: string,
  onClick?: () => void
}) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-foreground hover:bg-muted transition-colors"
    >
      <span className="text-muted-foreground">{icon}</span>
      {label}
    </Link>
  );
}
 
