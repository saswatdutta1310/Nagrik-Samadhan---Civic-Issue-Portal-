import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";

// Transaction Type
export type Transaction = {
    id: number;
    title: string;
    date: string;
    amount: number;
    type: "credit" | "debit";
    status: "completed" | "pending";
};

type WalletContextType = {
    balance: number;
    transactions: Transaction[];
    addFunds: (amount: number, method: string) => void;
    withdrawFunds: (amount: number, method: string) => void;
};

const WalletContext = createContext<WalletContextType | undefined>(undefined);

// Helper for dates
const getRecentDate = (daysAgo: number) => {
    const d = new Date();
    d.setDate(d.getDate() - daysAgo);
    return d.toLocaleDateString("en-IN", { day: 'numeric', month: 'short', year: 'numeric' }) + ", 05:30 am";
};

const INITIAL_TRANSACTIONS: Transaction[] = [
    {
        id: 1,
        title: "Reward for verified issue #issue-6",
        date: getRecentDate(1),
        amount: 500,
        type: "credit",
        status: "completed",
    },
    {
        id: 2,
        title: "Bonus for completing review",
        date: getRecentDate(3),
        amount: 250,
        type: "credit",
        status: "completed",
    },
    {
        id: 3,
        title: "Monthly Top 10 reward",
        date: getRecentDate(5),
        amount: 1000,
        type: "credit",
        status: "completed",
    },
    {
        id: 5,
        title: "Withdrawal to UPI",
        date: getRecentDate(15),
        amount: 1000,
        type: "debit",
        status: "completed",
    },
];

export function WalletProvider({ children }: { children: React.ReactNode }) {
    // Initialize from Logic or LocalStorage if we wanted persistence
    const [balance, setBalance] = useState(2450);
    const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);

    // Add Funds
    const addFunds = (amount: number, method: string) => {
        setBalance((prev) => prev + amount);

        const newTx: Transaction = {
            id: Date.now(),
            title: "Funds Added to Wallet",
            date: "Just now",
            amount: amount,
            type: "credit",
            status: "completed",
        };

        setTransactions((prev) => [newTx, ...prev]);
        toast.success(`Successfully added ₹${amount.toLocaleString()} via ${method}`);
    };

    // Withdraw Funds
    const withdrawFunds = (amount: number, method: string) => {
        if (balance < amount) {
            toast.error("Insufficient balance");
            return;
        }

        setBalance((prev) => prev - amount);

        const newTx: Transaction = {
            id: Date.now(),
            title: `Withdrawal to ${method === 'upi' ? 'UPI' : 'Bank'}`,
            date: "Just now",
            amount: amount,
            type: "debit",
            status: "completed",
        };

        setTransactions((prev) => [newTx, ...prev]);
        toast.success(`Successfully withdrawn ₹${amount.toLocaleString()}`);
    };

    return (
        <WalletContext.Provider value={{ balance, transactions, addFunds, withdrawFunds }}>
            {children}
        </WalletContext.Provider>
    );
}

export function useWallet() {
    const context = useContext(WalletContext);
    if (context === undefined) {
        throw new Error("useWallet must be used within a WalletProvider");
    }
    return context;
}
 
 
