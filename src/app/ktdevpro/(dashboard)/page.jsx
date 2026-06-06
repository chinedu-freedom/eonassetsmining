"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Users, DollarSign, ArrowUpRight, ArrowDownRight, Activity } from "lucide-react";

const stats = [
  {
    title: "Total Users",
    value: "2,405",
    change: "+12.5%",
    trend: "up",
    icon: Users,
    colorClasses: {
      bg: "bg-blue-500/10",
      border: "border-blue-500/20",
      text: "text-blue-400",
      glow: "bg-blue-500"
    }
  },
  {
    title: "Total Deposits",
    value: "$45,231.89",
    change: "+8.2%",
    trend: "up",
    icon: ArrowDownRight,
    colorClasses: {
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/20",
      text: "text-emerald-400",
      glow: "bg-emerald-500"
    }
  },
  {
    title: "Total Withdrawals",
    value: "$12,450.00",
    change: "-2.4%",
    trend: "down",
    icon: ArrowUpRight,
    colorClasses: {
      bg: "bg-red-500/10",
      border: "border-red-500/20",
      text: "text-red-400",
      glow: "bg-red-500"
    }
  },
  {
    title: "Active Investments",
    value: "$142,300.50",
    change: "+14.1%",
    trend: "up",
    icon: Activity,
    colorClasses: {
      bg: "bg-indigo-500/10",
      border: "border-indigo-500/20",
      text: "text-indigo-400",
      glow: "bg-indigo-500"
    }
  }
];

export default function DashboardOverview() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white mb-2">Dashboard Overview</h1>
        <p className="text-slate-400">Welcome back. Here is what's happening with your platform today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <Card key={i} className="relative overflow-hidden group">
            {/* Background Glow */}
            <div className={`absolute -right-10 -top-10 w-32 h-32 rounded-full opacity-10 group-hover:opacity-20 blur-2xl transition-opacity ${stat.colorClasses.glow}`} />
            
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${stat.colorClasses.bg} ${stat.colorClasses.border}`}>
                  <stat.icon className={`w-6 h-6 ${stat.colorClasses.text}`} />
                </div>
                <div className={`flex items-center gap-1 text-sm font-medium px-2 py-1 rounded-full ${
                  stat.trend === "up" 
                    ? "bg-emerald-500/10 text-emerald-400" 
                    : "bg-red-500/10 text-red-400"
                }`}>
                  {stat.trend === "up" ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                  {stat.change}
                </div>
              </div>
              <h3 className="text-slate-400 text-sm font-medium mb-1">{stat.title}</h3>
              <p className="text-2xl font-bold text-white tracking-tight">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="h-full min-h-[400px]">
            <div className="p-6 border-b border-white/5">
              <h3 className="text-lg font-medium text-white">Recent Transactions</h3>
            </div>
            <div className="p-6 flex items-center justify-center h-[300px] text-slate-500">
              Transaction chart/table will appear here
            </div>
          </Card>
        </div>
        <div>
          <Card className="h-full min-h-[400px]">
            <div className="p-6 border-b border-white/5">
              <h3 className="text-lg font-medium text-white">Latest Users</h3>
            </div>
            <div className="p-6 flex items-center justify-center h-[300px] text-slate-500">
              User list will appear here
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
