"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Briefcase, 
  User, 
  CircleDollarSign, 
  Clock, 
  FileText,
  DollarSign,
  TrendingUp,
  MoreVertical,
  Award,
  Loader2
} from "lucide-react";
import Image from "next/image";

export default function DashboardOverview() {
  const currentMonthYear = new Date().toLocaleString('default', { month: 'short', year: 'numeric' }).replace(' ', '-'); // e.g., 2026-Jun

  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    todayUsers: 0,
    totalAssets: 0,
    assetsValue: 0,
    inProgressAssetsCount: 0,
    inProgressAssetsSum: 0,
    pendingDepositsCount: 0,
    approvedDepositsCount: 0,
    pendingWithdrawalsCount: 0,
    approvedWithdrawalsCount: 0,
    pendingDepositsSum: 0,
    approvedDepositsSum: 0,
    pendingWithdrawalsSum: 0,
    approvedWithdrawalsSum: 0,
    todayDepositsSum: 0,
    todayWithdrawalsSum: 0,
    todayInvestmentsSum: 0,
    totalInterestAmount: 0
  });

  const [isLoading, setIsLoading] = useState(true);

  let symbol = "$";
  if (typeof window !== "undefined") {
    try {
      const cached = localStorage.getItem("admin-platform-settings-symbol");
      if (cached) symbol = cached;
    } catch (e) {}
  }

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/admin/dashboard/stats`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (res.ok) {
          const { data } = await res.json();
          setStats(data || {});
        }
      } catch (err) {
        console.error("Failed to fetch dashboard stats", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchStats();
  }, []);

  const allStats = [
    { title: "Total Assets", value: `${symbol}${Number(stats.totalAssets || 0).toFixed(2)}`, icon: Briefcase, colorClasses: "bg-[#f0f7ff] text-blue-600" },
    { title: "Total Users", value: (stats.totalUsers || 0).toString(), icon: User, colorClasses: "bg-[#ffeded] text-[#FF5B5C]" },
    { title: "Assets Value", value: `${symbol}${Number(stats.assetsValue || 0).toFixed(2)}`, icon: CircleDollarSign, colorClasses: "bg-[#e2ffe8] text-emerald-600" },
    { title: "In-Progress Assets", value: (stats.inProgressAssetsCount || 0).toString(), icon: Clock, colorClasses: "bg-[#ffeded] text-[#FF5B5C]" },

    { title: "Pending Withdraw Count", value: (stats.pendingWithdrawalsCount || 0).toString(), icon: FileText, colorClasses: "bg-[#ffeded] text-[#FF5B5C]" },
    { title: "Approved Withdraw Count", value: (stats.approvedWithdrawalsCount || 0).toString(), icon: FileText, colorClasses: "bg-[#e2ffe8] text-emerald-600" },
    { title: "Pending Deposit Count", value: (stats.pendingDepositsCount || 0).toString(), icon: FileText, colorClasses: "bg-[#ffeded] text-[#FF5B5C]" },
    { title: "Approved Deposit Count", value: (stats.approvedDepositsCount || 0).toString(), icon: FileText, colorClasses: "bg-[#e2ffe8] text-emerald-600" },

    { title: "Pending Withdraw Amount", value: `${symbol}${Number(stats.pendingWithdrawalsSum || 0).toFixed(2)}`, icon: DollarSign, colorClasses: "bg-[#ffeded] text-[#FF5B5C]" },
    { title: "Approved Withdraw Amount", value: `${symbol}${Number(stats.approvedWithdrawalsSum || 0).toFixed(2)}`, icon: DollarSign, colorClasses: "bg-[#e2ffe8] text-emerald-600" },
    { title: "Pending Deposit Amount", value: `${symbol}${Number(stats.pendingDepositsSum || 0).toFixed(2)}`, icon: DollarSign, colorClasses: "bg-[#ffeded] text-[#FF5B5C]" },
    { title: "Approved Deposit Amount", value: `${symbol}${Number(stats.approvedDepositsSum || 0).toFixed(2)}`, icon: DollarSign, colorClasses: "bg-[#e2ffe8] text-emerald-600" },

    { title: "Today Deposit", value: `${symbol}${Number(stats.todayDepositsSum || 0).toFixed(2)}`, icon: DollarSign, colorClasses: "bg-[#f0f7ff] text-blue-600" },
    { title: "Today Withdraw", value: `${symbol}${Number(stats.todayWithdrawalsSum || 0).toFixed(2)}`, icon: DollarSign, colorClasses: "bg-[#ffeded] text-[#FF5B5C]" },
    { title: "Today Users", value: (stats.todayUsers || 0).toString(), icon: User, colorClasses: "bg-[#f0f7ff] text-blue-600" },
    { title: "Today Assets", value: `${symbol}${Number(stats.todayInvestmentsSum || 0).toFixed(2)}`, icon: Briefcase, colorClasses: "bg-[#e2ffe8] text-emerald-600" }
  ];

  const StatCard = ({ title, value, icon: Icon, colorClasses }) => {
    const textColorClass = colorClasses.split(' ').find(c => c.startsWith('text-')) || 'text-blue-600';
    return (
      <Card className="border border-gray-100 shadow-[0_4px_24px_0_rgba(34,41,47,0.05)] rounded-[12px] bg-white">
        <CardContent className="p-5 flex items-center justify-between text-left">
          <div className="flex flex-col items-start min-w-0">
            <h3 className={`text-2xl sm:text-[28px] font-bold tracking-tight ${textColorClass} leading-tight mb-1 truncate w-full`}>
              {value}
            </h3>
            <div className="text-gray-500 text-[13px] sm:text-[14px] font-normal truncate w-full">
              {title}
            </div>
          </div>
          <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ml-4 ${colorClasses}`}>
            <Icon className="w-5 h-5" />
          </div>
        </CardContent>
      </Card>
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
        <p className="text-muted-foreground text-sm">Loading dashboard stats...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6 font-['Rubik',sans-serif]">
      {/* Grid of all stats cards mapped once in 3-column layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {allStats.map((stat, i) => (
          <StatCard key={i} {...stat} />
        ))}
      </div>
    </div>
  );
}
