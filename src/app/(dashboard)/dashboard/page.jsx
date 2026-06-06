"use client";

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
  Award
} from "lucide-react";
import Image from "next/image";

const mainStats = [
  {
    title: "Total Assets",
    value: "0",
    icon: Briefcase,
    colorClasses: "bg-[#e2ffe8] text-[#39DA8A]" // light-success
  },
  {
    title: "Total Users",
    value: "7",
    icon: User,
    colorClasses: "bg-[#ffeded] text-[#FF5B5C]" // light-danger
  },
  {
    title: "Assets Value",
    value: "$0.00",
    icon: CircleDollarSign,
    colorClasses: "bg-[#e2ffe8] text-[#39DA8A]" 
  },
  {
    title: "In-Progress Assets",
    value: "0",
    icon: Clock,
    colorClasses: "bg-[#ffeded] text-[#FF5B5C]" 
  }
];

const countStats = [
  { title: "Pending Withdraw", value: "0", icon: FileText, colorClasses: "bg-[#ffeded] text-[#FF5B5C]" },
  { title: "Approved Withdraw", value: "0", icon: FileText, colorClasses: "bg-[#ffeded] text-[#FF5B5C]" },
  { title: "Pending Deposit", value: "3", icon: FileText, colorClasses: "bg-[#ffeded] text-[#FF5B5C]" },
  { title: "Approved Deposit", value: "1", icon: FileText, colorClasses: "bg-[#ffeded] text-[#FF5B5C]" },
];

const sumStats = [
  { title: "Pending Withdraw", value: "$0.00", icon: DollarSign, colorClasses: "bg-[#e2ffe8] text-[#39DA8A]" },
  { title: "Approved Withdraw", value: "$0.00", icon: DollarSign, colorClasses: "bg-[#e2ffe8] text-[#39DA8A]" },
  { title: "Pending Deposit", value: "$21.00", icon: DollarSign, colorClasses: "bg-[#e2ffe8] text-[#39DA8A]" },
  { title: "Approved Deposit", value: "$2.00", icon: DollarSign, colorClasses: "bg-[#e2ffe8] text-[#39DA8A]" },
];

const todayStats = [
  { title: "Today Deposit", value: "$0.00", icon: DollarSign, colorClasses: "bg-[#e2ffe8] text-[#39DA8A]" },
  { title: "Today Withdraw", value: "$0.00", icon: DollarSign, colorClasses: "bg-[#e2ffe8] text-[#39DA8A]" },
  { title: "Today Users", value: "0", icon: User, colorClasses: "bg-[#e2ffe8] text-[#39DA8A]" },
  { title: "Today Assets", value: "0", icon: Briefcase, colorClasses: "bg-[#e2ffe8] text-[#39DA8A]" },
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

export default function DashboardOverview() {
  const currentMonthYear = new Date().toLocaleString('default', { month: 'short', year: 'numeric' }).replace(' ', '-'); // e.g., 2026-Jun

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
              <h1 className="text-[#5A8DEE] text-[3.5rem] font-medium leading-[1.2] mb-3">$0.00</h1>
              <p className="text-[#828d99] text-[15px] max-w-[200px]">With total interest amount of $0.00.</p>
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
