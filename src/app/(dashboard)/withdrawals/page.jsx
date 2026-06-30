"use client";

import { Card } from "@/components/ui/card";
import { Search, CheckCircle2, XCircle, Clock } from "lucide-react";

const mockWithdrawals = [
  { id: "WTH-2091", user: "Sarah Miller", amount: "850.00", method: "USDT (TRC20)", address: "T9zX...4kP2", status: "Pending", date: "Nov 02, 2025 10:15" },
  { id: "WTH-2092", user: "David Kim", amount: "3,400.00", method: "Bitcoin (BTC)", address: "bc1q...x89m", status: "Completed", date: "Nov 01, 2025 16:40" },
  { id: "WTH-2093", user: "Alex Chen", amount: "12,000.00", method: "Ethereum (ETH)", address: "0x7A...9f1E", status: "Failed", date: "Oct 30, 2025 09:20" },
];

export default function WithdrawalsPage() {
  let symbol = "$";
  if (typeof window !== "undefined") {
    try {
      const cached = localStorage.getItem("admin-platform-settings-symbol");
      if (cached) symbol = cached;
    } catch (e) {}
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Withdrawals</h1>
          <p className="text-slate-400 text-sm">Process and track user withdrawal requests.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input 
              type="text" 
              placeholder="Search ID or Address..." 
              className="bg-[#131823] border border-white/10 rounded-xl py-2 pl-9 pr-4 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500/50 w-full sm:w-64 transition-all"
            />
          </div>
        </div>
      </div>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-white/5 border-b border-white/5 text-slate-400">
              <tr>
                <th className="px-6 py-4 font-medium">Request ID</th>
                <th className="px-6 py-4 font-medium">User</th>
                <th className="px-6 py-4 font-medium">Amount</th>
                <th className="px-6 py-4 font-medium">Destination</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {mockWithdrawals.map((withdrawal) => (
                <tr key={withdrawal.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="font-medium text-white">{withdrawal.id}</span>
                      <span className="text-xs text-slate-500">{withdrawal.date}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium text-slate-200">{withdrawal.user}</td>
                  <td className="px-6 py-4 font-bold text-red-400">{symbol}{withdrawal.amount}</td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-slate-300">{withdrawal.method}</span>
                      <span className="text-xs font-mono text-slate-500">{withdrawal.address}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                      withdrawal.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 
                      withdrawal.status === 'Failed' ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 
                      'bg-orange-500/10 text-orange-400 border border-orange-500/20'
                    }`}>
                      {withdrawal.status === 'Completed' && <CheckCircle2 className="w-3 h-3" />}
                      {withdrawal.status === 'Pending' && <Clock className="w-3 h-3" />}
                      {withdrawal.status === 'Failed' && <XCircle className="w-3 h-3" />}
                      {withdrawal.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    {withdrawal.status === 'Pending' ? (
                      <div className="flex items-center justify-end gap-2">
                        <button className="px-3 py-1.5 text-xs font-medium bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 rounded-sm-sm transition-colors border border-emerald-500/20">
                          Process
                        </button>
                        <button className="px-3 py-1.5 text-xs font-medium bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-sm-sm transition-colors border border-red-500/20">
                          Deny
                        </button>
                      </div>
                    ) : (
                      <button className="text-xs text-slate-500 hover:text-white transition-colors">
                        View Receipt
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
