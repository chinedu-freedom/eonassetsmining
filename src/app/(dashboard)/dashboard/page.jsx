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

  const mainStats = [
    { title: "Total Assets", value: `${symbol}${Number(stats.totalAssets || 0).toFixed(2)}`, icon: Briefcase, colorClasses: "bg-[#e2ffe8] text-blue-600" },
    { title: "Total Users", value: (stats.totalUsers || 0).toString(), icon: User, colorClasses: "bg-[#ffeded] text-[#FF5B5C]" },
    { title: "Assets Value", value: `${symbol}${Number(stats.assetsValue || 0).toFixed(2)}`, icon: CircleDollarSign, colorClasses: "bg-[#e2ffe8] text-blue-600" },
    { title: "In-Progress Assets", value: (stats.inProgressAssetsCount || 0).toString(), icon: Clock, colorClasses: "bg-[#ffeded] text-[#FF5B5C]" }
  ];

  const countStats = [
    { title: "Pending Withdraw", value: (stats.pendingWithdrawalsCount || 0).toString(), icon: FileText, colorClasses: "bg-[#ffeded] text-[#FF5B5C]" },
    { title: "Approved Withdraw", value: (stats.approvedWithdrawalsCount || 0).toString(), icon: FileText, colorClasses: "bg-[#ffeded] text-[#FF5B5C]" },
    { title: "Pending Deposit", value: (stats.pendingDepositsCount || 0).toString(), icon: FileText, colorClasses: "bg-[#ffeded] text-[#FF5B5C]" },
    { title: "Approved Deposit", value: (stats.approvedDepositsCount || 0).toString(), icon: FileText, colorClasses: "bg-[#ffeded] text-[#FF5B5C]" },
  ];

  const sumStats = [
    { title: "Pending Withdraw", value: `${symbol}${Number(stats.pendingWithdrawalsSum || 0).toFixed(2)}`, icon: DollarSign, colorClasses: "bg-[#e2ffe8] text-blue-600" },
    { title: "Approved Withdraw", value: `${symbol}${Number(stats.approvedWithdrawalsSum || 0).toFixed(2)}`, icon: DollarSign, colorClasses: "bg-[#e2ffe8] text-blue-600" },
    { title: "Pending Deposit", value: `${symbol}${Number(stats.pendingDepositsSum || 0).toFixed(2)}`, icon: DollarSign, colorClasses: "bg-[#e2ffe8] text-blue-600" },
    { title: "Approved Deposit", value: `${symbol}${Number(stats.approvedDepositsSum || 0).toFixed(2)}`, icon: DollarSign, colorClasses: "bg-[#e2ffe8] text-blue-600" },
  ];

  const todayStats = [
    { title: "Today Deposit", value: `${symbol}${Number(stats.todayDepositsSum || 0).toFixed(2)}`, icon: DollarSign, colorClasses: "bg-[#e2ffe8] text-blue-600" },
    { title: "Today Withdraw", value: `${symbol}${Number(stats.todayWithdrawalsSum || 0).toFixed(2)}`, icon: DollarSign, colorClasses: "bg-[#e2ffe8] text-blue-600" },
    { title: "Today Users", value: (stats.todayUsers || 0).toString(), icon: User, colorClasses: "bg-[#e2ffe8] text-blue-600" },
    { title: "Today Assets", value: `${symbol}${Number(stats.todayInvestmentsSum || 0).toFixed(2)}`, icon: Briefcase, colorClasses: "bg-[#e2ffe8] text-blue-600" },
  ];

  const StatCard = ({ title, value, icon: Icon, colorClasses }) => (
    <Card className="border-none shadow-[0_4px_24px_0_rgba(34,41,47,0.1)] rounded-[0.5rem] bg-white">
      <CardContent className="p-6 text-center flex flex-col items-center justify-center">
        <div className={`w-[60px] h-[60px] rounded-full flex items-center justify-center mb-4 ${colorClasses}`}>
          <Icon className="w-8 h-8" />
        </div>
        <div className="text-[#828d99] text-[14px] truncate w-full mb-1">{title}</div>
        <h3 className="text-[1.8rem] font-medium text-[#475f7b] mb-0 leading-[1.2]">{value}</h3>
      </CardContent>
    </Card>
  );

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
        <p className="text-muted-foreground text-sm">Loading dashboard stats...</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 font-['Rubik',sans-serif]">
      {/* Top Row: Main Stats 4-column Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {mainStats.map((stat, i) => (
          <StatCard key={i} {...stat} />
        ))}
      </div>

      {/* Second Row: Visits Chart, Greeting */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Visits Chart Card - takes ~40% space */}
        <Card className="lg:col-span-5 border-none shadow-[0_4px_24px_0_rgba(34,41,47,0.1)] rounded-[0.5rem] bg-white">
          <div className="p-6 pb-0 flex justify-between items-center">
            <h4 className="text-[1.2rem] text-[#475f7b] font-medium tracking-[0.5px]">Visits Of {currentMonthYear}</h4>
            <MoreVertical className="w-5 h-5 text-[#828d99] cursor-pointer" />
          </div>
          <CardContent className="p-6 pt-0 flex flex-col items-center justify-center h-full min-h-[300px]">
            {/* Improved Radial Chart Representation */}
            <div className="relative w-[240px] h-[240px] flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                {/* Outer Ring - Target */}
                <circle cx="50" cy="50" r="42" fill="none" stroke="#5A8DEE" strokeWidth="3" strokeDasharray="263" strokeDashoffset="50" strokeLinecap="round" opacity="0.8" />
                {/* Middle Ring - Mart */}
                <circle cx="50" cy="50" r="35" fill="none" stroke="#FF5B5C" strokeWidth="3" strokeDasharray="219" strokeDashoffset="70" strokeLinecap="round" opacity="0.8" />
                {/* Inner Ring - Ebay */}
                <circle cx="50" cy="50" r="28" fill="none" stroke="#FDAC41" strokeWidth="3" strokeDasharray="175" strokeDashoffset="90" strokeLinecap="round" opacity="0.8" />
              </svg>
              
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-[1.8rem] text-[#475f7b] font-medium leading-[1.2]">80%</div>
                <div className="text-[#828d99] text-[13px] mt-1">Total Visits</div>
              </div>
            </div>
            
            <ul className="flex justify-around w-full mt-6 text-[13px] text-[#828d99] font-['IBM_Plex_Sans',sans-serif]">
              <li className="flex items-center"><span className="w-2 h-2 rounded-full bg-[#5A8DEE] mr-2"></span>Target</li>
              <li className="flex items-center"><span className="w-2 h-2 rounded-full bg-[#FF5B5C] mr-2"></span>Mart</li>
              <li className="flex items-center"><span className="w-2 h-2 rounded-full bg-[#FDAC41] mr-2"></span>Ebay</li>
            </ul>
          </CardContent>
        </Card>

        {/* Greeting Card - takes ~60% space */}
        <Card className="lg:col-span-7 border-none shadow-[0_4px_24px_0_rgba(34,41,47,0.1)] rounded-[0.5rem] bg-white relative overflow-hidden">
          <div className="p-8 z-10 relative">
            <h3 className="text-[1.8rem] text-[#475f7b] font-medium mb-2 leading-[1.2]">Congratulations eonassets!</h3>
            <p className="text-[#828d99] text-[15px] mb-8">Today mostly Invested</p>
          </div>
          <CardContent className="p-8 pt-0 z-10 relative">
            <div className="flex flex-col justify-end h-full mt-10">
              <h1 className="text-[#5A8DEE] text-[3.5rem] font-medium leading-[1.2] mb-3">{symbol}{Number(stats.todayInvestmentsSum || 0).toFixed(2)}</h1>
              <p className="text-[#828d99] text-[15px] max-w-[200px]">With total interest amount of {symbol}{Number(stats.totalInterestAmount || 0).toFixed(2)}.</p>
            </div>
          </CardContent>
          <div className="absolute right-[20px] bottom-[20px] z-0">
            <div className="w-[280px] h-[280px] bg-[url('https://eonassetsmining.com/admin/app-assets/images/icon/cup.png')] bg-contain bg-no-repeat bg-right-bottom opacity-100" />
          </div>
        </Card>

      </div>

      {/* Counts Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {countStats.map((stat, i) => (
          <StatCard key={i} {...stat} />
        ))}
      </div>

      {/* Sums Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {sumStats.map((stat, i) => (
          <StatCard key={i} {...stat} />
        ))}
      </div>

      {/* Today Sums Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {todayStats.map((stat, i) => (
          <StatCard key={i} {...stat} />
        ))}
      </div>

    </div>
  );
}
