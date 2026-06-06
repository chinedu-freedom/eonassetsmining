"use client";

import { Bell, Search, Menu } from "lucide-react";
import * as Avatar from "@radix-ui/react-avatar";

export function Header() {
  return (
    <header className="h-16 flex items-center justify-between px-6 bg-[#0B0E14]/80 backdrop-blur-md border-b border-white/5 sticky top-0 z-20">
      <div className="flex items-center gap-4">
        <button className="p-2 -ml-2 text-slate-400 hover:text-white lg:hidden">
          <Menu className="w-5 h-5" />
        </button>
        <div className="relative hidden md:block">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input 
            type="text" 
            placeholder="Search users, txns..." 
            className="bg-[#131823] border border-white/10 rounded-full py-1.5 pl-10 pr-4 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500/50 w-64 transition-all"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <button className="relative p-2 text-slate-400 hover:text-white transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-500 rounded-full border-2 border-[#0B0E14]"></span>
        </button>
        
        <div className="h-6 w-px bg-white/10 mx-1"></div>
        
        <div className="flex items-center gap-3">
          <div className="hidden md:flex flex-col items-end">
            <span className="text-sm font-medium text-white">Admin User</span>
            <span className="text-xs text-slate-500">Superadmin</span>
          </div>
          <Avatar.Root className="inline-flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-slate-800 border border-white/10">
            <Avatar.Fallback className="text-sm font-medium text-blue-400 leading-1">
              AD
            </Avatar.Fallback>
          </Avatar.Root>
        </div>
      </div>
    </header>
  );
}
