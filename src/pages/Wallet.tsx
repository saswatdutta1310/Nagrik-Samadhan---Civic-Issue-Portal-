import React, { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { toast } from "sonner";
import {
    Wallet as WalletIcon,
    Smartphone,
    Landmark,
    ArrowUpRight,
    ArrowDownLeft,
    Trophy,
    History,
    CreditCard,
    Plus,
    Activity,
    AlertCircle
} from "lucide-react";
import { useWallet } from "@/contexts/WalletContext";

export default function Wallet() {
    const { balance, transactions, addFunds, withdrawFunds } = useWallet();
    const [withdrawMethod, setWithdrawMethod] = useState<"upi" | "bank">("upi");
    const [amount, setAmount] = useState("");
    const [details, setDetails] = useState("");
    const [activeTab, setActiveTab] = useState("withdraw");

    const handleTransaction = (type: "credit" | "debit") => {
        if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
            toast.error("Please enter a valid amount");
            return;
        }

        const val = Number(amount);

        if (type === "debit") {
            if (val > balance) {
                toast.error("Insufficient balance");
                return;
            }
            withdrawFunds(val, withdrawMethod);
        } else {
            addFunds(val, "Online Payment");
        }

        setAmount("");
        setDetails("");
    };

    return (
        <Layout>
            <div className="container py-8 space-y-8">

                {/* Header Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Main Balance */}
                    <Card className="bg-primary text-primary-foreground border-none shadow-lg relative overflow-hidden">
                        <div className="absolute right-0 top-0 h-full w-1/2 bg-white/10 skew-x-12 translate-x-1/2" />
                        <CardContent className="p-6 relative z-10 flex flex-col justify-between h-full">
                            <div>
                                <p className="text-primary-foreground/80 font-medium mb-1">Current Balance</p>
                                <h2 className="text-4xl font-bold">₹{balance.toLocaleString()}</h2>
                            </div>
                            <div className="mt-4 flex items-center gap-2 text-sm text-primary-foreground/90">
                                <WalletIcon className="h-4 w-4" />
                                <span>Available for withdrawal</span>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Points */}
                    <Card>
                        <CardContent className="p-6 flex flex-col justify-between h-full">
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <p className="text-muted-foreground font-medium">Reward Points</p>
                                    <Trophy className="h-4 w-4 text-yellow-500" />
                                </div>
                                <h2 className="text-3xl font-bold">1,250</h2>
                            </div>
                            <div className="flex items-center gap-2 mt-2 text-sm text-green-600">
                                <ArrowUpRight className="h-4 w-4" />
                                +150 this week
                            </div>
                        </CardContent>
                    </Card>

                    {/* Lifetime */}
                    <Card>
                        <CardContent className="p-6 flex flex-col justify-between h-full">
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <p className="text-muted-foreground font-medium">Lifetime Earnings</p>
                                    <Activity className="h-4 w-4 text-blue-500" />
                                </div>
                                <h2 className="text-3xl font-bold">₹{(3450 + (balance > 2450 ? balance - 2450 : 0)).toLocaleString()}</h2>
                            </div>
                            <p className="text-sm text-muted-foreground mt-2">Total earnings from rewards</p>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                    {/* Transaction Manager */}
                    <Card className="h-full">
                        <CardHeader>
                            <CardTitle>Manage Funds</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                                <TabsList className="grid w-full grid-cols-2 mb-6">
                                    <TabsTrigger value="withdraw">Withdraw</TabsTrigger>
                                    <TabsTrigger value="add_fund">Add Funds</TabsTrigger>
                                </TabsList>

                                {/* WITHDRAW */}
                                <TabsContent value="withdraw" className="space-y-6">
                                    <div className="space-y-4">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div
                                                onClick={() => setWithdrawMethod("upi")}
                                                className={`cursor-pointer rounded-xl border-2 p-4 flex flex-col items-center justify-center gap-2 transition-all ${withdrawMethod === 'upi' ? 'border-primary bg-primary/5' : 'border-muted hover:border-primary/50'}`}
                                            >
                                                <Smartphone className={`h-6 w-6 ${withdrawMethod === 'upi' ? 'text-primary' : 'text-muted-foreground'}`} />
                                                <span className={`font-medium ${withdrawMethod === 'upi' ? 'text-foreground' : 'text-muted-foreground'}`}>UPI</span>
                                            </div>
                                            <div
                                                onClick={() => setWithdrawMethod("bank")}
                                                className={`cursor-pointer rounded-xl border-2 p-4 flex flex-col items-center justify-center gap-2 transition-all ${withdrawMethod === 'bank' ? 'border-primary bg-primary/5' : 'border-muted hover:border-primary/50'}`}
                                            >
                                                <Landmark className={`h-6 w-6 ${withdrawMethod === 'bank' ? 'text-primary' : 'text-muted-foreground'}`} />
                                                <span className={`font-medium ${withdrawMethod === 'bank' ? 'text-foreground' : 'text-muted-foreground'}`}>Bank Transfer</span>
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">Amount (₹)</label>
                                            <Input
                                                type="number"
                                                placeholder="Enter amount"
                                                value={amount}
                                                onChange={(e) => setAmount(e.target.value)}
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">
                                                {withdrawMethod === 'upi' ? 'UPI ID' : 'Account Number'}
                                            </label>
                                            <Input
                                                placeholder={withdrawMethod === 'upi' ? 'username@upi' : 'Account Number'}
                                                value={details}
                                                onChange={(e) => setDetails(e.target.value)}
                                            />
                                        </div>

                                        <Button className="w-full" onClick={() => handleTransaction("debit")}>
                                            Withdraw Money
                                        </Button>
                                    </div>
                                </TabsContent>

                                {/* ADD FUNDS */}
                                <TabsContent value="add_fund" className="space-y-6">
                                    <div className="p-4 bg-muted/40 rounded-lg text-sm text-muted-foreground mb-4 flex gap-3">
                                        <AlertCircle className="h-5 w-5 shrink-0 text-primary" />
                                        This is a simulation. Adding funds will increase your virtual wallet balance immediately.
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Amount to Add (₹)</label>
                                        <Input
                                            type="number"
                                            placeholder="Enter amount"
                                            value={amount}
                                            onChange={(e) => setAmount(e.target.value)}
                                            className="text-lg"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Payment Method</label>
                                        <div className="flex gap-4">
                                            <Button variant="outline" className="flex-1 gap-2">
                                                <CreditCard className="h-4 w-4" /> Card
                                            </Button>
                                            <Button variant="outline" className="flex-1 gap-2">
                                                <Smartphone className="h-4 w-4" /> UPI
                                            </Button>
                                        </div>
                                    </div>
                                    <Button className="w-full bg-green-600 hover:bg-green-700" onClick={() => handleTransaction("credit")}>
                                        <Plus className="h-4 w-4 mr-2" /> Add Funds
                                    </Button>
                                </TabsContent>
                            </Tabs>
                        </CardContent>
                    </Card>

                    {/* Rewards Info & Recent Activity */}
                    <div className="space-y-8">
                        {/* Rewards */}
                        <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-950/20 dark:to-orange-950/20 border-yellow-200 dark:border-yellow-900">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-yellow-800 dark:text-yellow-500">
                                    <Trophy className="h-5 w-5" />
                                    Rewards Program
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex justify-between items-center text-sm">
                                    <span>Verified Issue Report</span>
                                    <span className="font-bold text-yellow-700">+100 pts</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span>Community Verification</span>
                                    <span className="font-bold text-yellow-700">+50 pts</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span>Top 10 Monthly Rank</span>
                                    <span className="font-bold text-yellow-700">₹1,000 Cash</span>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Recent Activity */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Activity className="h-5 w-5" />
                                    Recent Activity
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center justify-between text-sm">
                                    <div className="flex items-center gap-3">
                                        <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                                            <ArrowUpRight className="h-4 w-4" />
                                        </div>
                                        <div>
                                            <p className="font-medium">Earned Points</p>
                                            <p className="text-xs text-muted-foreground">For reporting pothole</p>
                                        </div>
                                    </div>
                                    <span className="font-bold text-green-600">+50 pts</span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <div className="flex items-center gap-3">
                                        <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                                            <Activity className="h-4 w-4" />
                                        </div>
                                        <div>
                                            <p className="font-medium">Contribution</p>
                                            <p className="text-xs text-muted-foreground">Funded Issue #129</p>
                                        </div>
                                    </div>
                                    <span className="font-bold text-blue-600">10 pts</span>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Transaction History */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <History className="h-5 w-5" />
                            Transaction History
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-1">
                            {transactions.map((tx) => (
                                <div key={tx.id} className="flex items-center justify-between p-4 rounded-lg hover:bg-muted/50 transition-colors border-b last:border-0 border-border/50">
                                    <div className="flex items-start gap-4">
                                        <div className={`mt-1 p-2 rounded-full ${tx.type === 'credit' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                            {tx.type === 'credit' ? <ArrowDownLeft className="h-4 w-4" /> : <ArrowUpRight className="h-4 w-4" />}
                                        </div>
                                        <div>
                                            <p className="font-medium text-foreground">{tx.title}</p>
                                            <p className="text-sm text-muted-foreground">{tx.date}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className={`font-semibold ${tx.type === 'credit' ? 'text-green-600' : 'text-red-500'}`}>
                                            {tx.type === 'credit' ? '+' : '-'}₹{tx.amount.toLocaleString()}
                                        </p>
                                        <p className="text-xs text-muted-foreground capitalize">{tx.status}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </Layout>
    );
}
