"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Copy, Plus, Edit2, Trash2 } from "lucide-react";

const mockWallets = [
  { id: 1, name: "Bitcoin Primary", network: "BTC", address: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh", active: true },
  { id: 2, name: "Ethereum Main", network: "ERC20", address: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F", active: true },
  { id: 3, name: "USDT Tether", network: "TRC20", address: "TXLaQpe1o1y6xYwWd8bB4E7dD9Vq68z42Y", active: true },
];

export default function WalletsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Company Wallets</h1>
          <p className="text-slate-400 text-sm">Manage crypto addresses where users send their deposits.</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-sm-sm text-sm font-medium transition-colors flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Wallet
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockWallets.map((wallet) => (
          <Card key={wallet.id} className="relative overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg font-medium text-white">{wallet.name}</h3>
                    {wallet.active && (
                      <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>
                    )}
                  </div>
                  <span className="inline-block px-2 py-0.5 rounded text-xs font-medium bg-white/10 text-slate-300">
                    {wallet.network}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <button className="p-1.5 text-slate-400 hover:text-blue-400 hover:bg-blue-400/10 rounded-sm-sm transition-colors">
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-red-400/10 rounded-sm-sm transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div className="mt-6 space-y-2">
                <label className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Wallet Address</label>
                <div className="flex items-center justify-between p-3 rounded-lg bg-black/40 border border-white/5 font-mono text-sm text-slate-300 break-all gap-3">
                  <span className="truncate">{wallet.address}</span>
                  <button className="flex-shrink-0 text-slate-400 hover:text-white transition-colors" title="Copy Address">
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
