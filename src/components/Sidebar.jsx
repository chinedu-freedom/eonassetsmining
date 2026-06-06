"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Users, 
  ArrowDownToLine, 
  ArrowUpFromLine, 
  Settings, 
  LogOut,
  Wallet
} from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/ktdevpro", icon: LayoutDashboard },
  { name: "Users", href: "/ktdevpro/users", icon: Users },
  { name: "Deposits", href: "/ktdevpro/deposits", icon: ArrowDownToLine },
  { name: "Withdrawals", href: "/ktdevpro/withdrawals", icon: ArrowUpFromLine },
  { name: "Wallets", href: "/ktdevpro/wallets", icon: Wallet },
  { name: "Settings", href: "/ktdevpro/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-full w-64 flex-col bg-[#0B0E14] border-r border-white/5">
      <div className="flex h-16 items-center px-6 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
            <span className="font-bold text-white text-lg">E</span>
          </div>
          <span className="text-xl font-bold text-white tracking-wide">Eon Admin</span>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto py-6 px-3">
        <nav className="space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group ${
                  isActive 
                    ? "bg-blue-600/10 text-blue-400" 
                    : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
                }`}
              >
                <item.icon className={`w-5 h-5 ${isActive ? "text-blue-400" : "text-slate-500 group-hover:text-slate-300"}`} />
                <span className="font-medium text-sm">{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>
      
      <div className="p-4 border-t border-white/5">
        <Link 
          href="/ktdevpro/login"
          className="flex items-center gap-3 px-3 py-3 rounded-xl text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium text-sm">Sign Out</span>
        </Link>
      </div>
    </div>
  );
}
