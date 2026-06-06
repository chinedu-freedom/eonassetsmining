"use client";

import { Card } from "@/components/ui/card";
import { Search, CheckCircle2, XCircle, Clock } from "lucide-react";

const mockDeposits = [
  { id: "DEP-8492", user: "Alex Chen", amount: "$5,000.00", method: "Bitcoin (BTC)", status: "Completed", date: "Nov 02, 2025 14:30" },
  { id: "DEP-8493", user: "Sarah Miller", amount: "$1,200.00", method: "Ethereum (ETH)", status: "Pending", date: "Nov 02, 2025 15:45" },
  { id: "DEP-8494", user: "James Wilson", amount: "$10,000.00", method: "USDT (TRC20)", status: "Completed", date: "Nov 01, 2025 09:15" },
  { id: "DEP-8495", user: "Elena Rodriguez", amount: "$500.00", method: "Bitcoin (BTC)", status: "Failed", date: "Oct 31, 2025 18:20" },
];

export default function DepositsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Deposits</h1>
          <p className="text-slate-400 text-sm">Monitor and approve user deposits.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input 
              type="text" 
              placeholder="Search TXN ID..." 
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
                <th className="px-6 py-4 font-medium">Transaction ID</th>
                <th className="px-6 py-4 font-medium">User</th>
                <th className="px-6 py-4 font-medium">Amount</th>
                <th className="px-6 py-4 font-medium">Method</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {mockDeposits.map((deposit) => (
                <tr key={deposit.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="font-medium text-white">{deposit.id}</span>
                      <span className="text-xs text-slate-500">{deposit.date}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium text-slate-200">{deposit.user}</td>
                  <td className="px-6 py-4 font-bold text-emerald-400">{deposit.amount}</td>
                  <td className="px-6 py-4 text-slate-400">{deposit.method}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                      deposit.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 
                      deposit.status === 'Failed' ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 
                      'bg-orange-500/10 text-orange-400 border border-orange-500/20'
                    }`}>
                      {deposit.status === 'Completed' && <CheckCircle2 className="w-3 h-3" />}
                      {deposit.status === 'Pending' && <Clock className="w-3 h-3" />}
                      {deposit.status === 'Failed' && <XCircle className="w-3 h-3" />}
                      {deposit.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    {deposit.status === 'Pending' ? (
                      <div className="flex items-center justify-end gap-2">
                        <button className="px-3 py-1.5 text-xs font-medium bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 rounded-lg transition-colors border border-emerald-500/20">
                          Approve
                        </button>
                        <button className="px-3 py-1.5 text-xs font-medium bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors border border-red-500/20">
                          Reject
                        </button>
                      </div>
                    ) : (
                      <button className="text-xs text-slate-500 hover:text-white transition-colors">
                        View Details
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
