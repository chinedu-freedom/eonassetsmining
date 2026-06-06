"use client";

import { Card } from "@/components/ui/card";
import { Search, MoreVertical, Edit2, Trash2, Ban } from "lucide-react";

const mockUsers = [
  { id: "USR-001", name: "Alex Chen", email: "alex.chen@example.com", balance: "$12,450.00", status: "Active", joined: "Oct 24, 2025" },
  { id: "USR-002", name: "Sarah Miller", email: "smiller99@example.com", balance: "$3,200.50", status: "Active", joined: "Oct 22, 2025" },
  { id: "USR-003", name: "James Wilson", email: "j.wilson@example.com", balance: "$0.00", status: "Suspended", joined: "Oct 15, 2025" },
  { id: "USR-004", name: "Elena Rodriguez", email: "elena.r@example.com", balance: "$45,230.75", status: "Active", joined: "Sep 30, 2025" },
  { id: "USR-005", name: "David Kim", email: "dkim.invest@example.com", balance: "$8,900.00", status: "Pending", joined: "Nov 02, 2025" },
];

export default function UsersPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">User Management</h1>
          <p className="text-slate-400 text-sm">View and manage all registered users.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input 
              type="text" 
              placeholder="Search users..." 
              className="bg-[#131823] border border-white/10 rounded-xl py-2 pl-9 pr-4 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500/50 w-full sm:w-64 transition-all"
            />
          </div>
          <button className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors">
            Add User
          </button>
        </div>
      </div>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-white/5 border-b border-white/5 text-slate-400">
              <tr>
                <th className="px-6 py-4 font-medium">User Details</th>
                <th className="px-6 py-4 font-medium">Balance</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Joined Date</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {mockUsers.map((user) => (
                <tr key={user.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="font-medium text-white">{user.name}</span>
                      <span className="text-xs text-slate-500">{user.email}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium text-slate-200">{user.balance}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      user.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400' : 
                      user.status === 'Suspended' ? 'bg-red-500/10 text-red-400' : 
                      'bg-orange-500/10 text-orange-400'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-400">{user.joined}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 text-slate-400 hover:text-blue-400 hover:bg-blue-400/10 rounded-lg transition-colors">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-orange-400 hover:bg-orange-400/10 rounded-lg transition-colors">
                        <Ban className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-white/5 flex items-center justify-between text-sm text-slate-400">
          <span>Showing 1 to 5 of 2,405 users</span>
          <div className="flex gap-2">
            <button className="px-3 py-1 bg-white/5 hover:bg-white/10 rounded-lg transition-colors">Prev</button>
            <button className="px-3 py-1 bg-white/5 hover:bg-white/10 rounded-lg transition-colors">Next</button>
          </div>
        </div>
      </Card>
    </div>
  );
}
