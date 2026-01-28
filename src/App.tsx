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
import NotFound from "./pages/NotFound";
import Notifications from "./pages/Notifications";
import MyIssues from "./pages/MyIssues";

import { AuthProvider } from "@/contexts/AuthContext";
import { WalletProvider } from "@/contexts/WalletContext";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
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

                {/* Auth */}
                <Route path="/auth" element={<Auth />} />

                {/* Wallet */}
                <Route path="/wallet" element={<Wallet />} />

                {/* About */}
                <Route path="/about" element={<About />} />

                {/* 404 */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </WalletProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
