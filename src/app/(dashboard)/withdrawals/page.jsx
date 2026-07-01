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
          <h1 className="text-2xl font-bold text-[#475f7b] mb-1">Withdrawals</h1>
          <p className="text-[#828d99] text-sm">Process and track user withdrawal requests.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search ID or Address..." 
              className="bg-white border border-gray-200 rounded-xl py-2 pl-9 pr-4 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:border-blue-500/50 w-full sm:w-64 transition-all shadow-sm"
            />
          </div>
        </div>
      </div>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600 bg-white">
            <thead className="bg-gray-50 border-b border-gray-100 text-gray-600 font-semibold">
              <tr>
                <th className="px-6 py-4 font-semibold text-[13px]">Request ID</th>
                <th className="px-6 py-4 font-semibold text-[13px]">User</th>
                <th className="px-6 py-4 font-semibold text-[13px]">Amount</th>
                <th className="px-6 py-4 font-semibold text-[13px]">Destination</th>
                <th className="px-6 py-4 font-semibold text-[13px]">Status</th>
                <th className="px-6 py-4 font-semibold text-[13px] text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {mockWithdrawals.map((withdrawal) => (
                <tr key={withdrawal.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="font-medium text-gray-800">{withdrawal.id}</span>
                      <span className="text-xs text-gray-400">{withdrawal.date}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-700">{withdrawal.user}</td>
                  <td className="px-6 py-4 font-bold text-red-500">{symbol}{withdrawal.amount}</td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-gray-600">{withdrawal.method}</span>
                      <span className="text-xs font-mono text-gray-400">{withdrawal.address}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                      withdrawal.status === 'Completed' ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' : 
                      withdrawal.status === 'Failed' ? 'bg-red-100 text-red-700 border border-red-200' : 
                      'bg-orange-100 text-orange-700 border border-orange-200'
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
                        <button className="px-3 py-1.5 text-xs font-medium bg-emerald-100 text-emerald-700 hover:bg-emerald-200 rounded-lg transition-colors border border-emerald-200">
                          Process
                        </button>
                        <button className="px-3 py-1.5 text-xs font-medium bg-red-100 text-red-700 hover:bg-red-200 rounded-lg transition-colors border border-red-200">
                          Deny
                        </button>
                      </div>
                    ) : (
                      <button className="text-xs text-gray-500 hover:text-gray-900 transition-colors">
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
