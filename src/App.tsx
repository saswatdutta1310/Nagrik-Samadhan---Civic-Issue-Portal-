import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
import Issues from "./pages/Issues";
import IssueDetail from "./pages/IssueDetail";
import ReportIssue from "./pages/ReportIssue";
import Leaderboard from "./pages/Leaderboard";
import Auth from "./pages/Auth";
import Wallet from "./pages/Wallet";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import Notifications from "./pages/Notifications";
import MyIssues from "./pages/MyIssues";
import Analytics from "./pages/Analytics";

import { AuthProvider } from "@/contexts/AuthContext";
import { WalletProvider } from "@/contexts/WalletContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { Chatbot } from "@/components/Chatbot";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <AuthProvider>
          <WalletProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <Routes>
                  {/* Home */}
                  <Route path="/" element={<Index />} />

                  {/* Issues */}
                  <Route path="/issues" element={<Issues />} />
                  <Route path="/issues/:id" element={<IssueDetail />} />
                  <Route path="/my-issues" element={<MyIssues />} />

                  {/* Report Issue */}
                  <Route path="/report" element={<ReportIssue />} />

                  {/* Leaderboard */}
                  <Route path="/leaderboard" element={<Leaderboard />} />

                  {/* Notifications */}
                  <Route path="/notifications" element={<Notifications />} />

                  {/* Analytics */}
                  <Route path="/analytics" element={<Analytics />} />

                  {/* Auth */}
                  <Route path="/auth" element={<Auth />} />

                  {/* Wallet */}
                  <Route path="/wallet" element={<Wallet />} />

                  {/* About */}
                  <Route path="/about" element={<About />} />

                  {/* Profile & Settings */}
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/settings" element={<Settings />} />

                  {/* 404 */}
                  <Route path="*" element={<NotFound />} />
                </Routes>

                {/* Global Chatbot */}
                <Chatbot />
              </BrowserRouter>
            </TooltipProvider>
          </WalletProvider>
        </AuthProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
}
 
