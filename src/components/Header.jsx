"use client";

import { Bell, Search, Menu } from "lucide-react";
import * as Avatar from "@radix-ui/react-avatar";

export function Header() {
  return (
    <header className="h-[60px] flex items-center justify-between px-6 bg-white/95 backdrop-blur-md shadow-[0_4px_24px_0_rgba(34,41,47,0.1)] sticky top-0 z-20 font-['Rubik',sans-serif]">
      <div className="flex items-center gap-4">
        <button className="p-2 -ml-2 text-[#475f7b] hover:text-[#5A8DEE] lg:hidden">
          <Menu className="w-6 h-6" />
        </button>
      </div>
      
      <div className="flex items-center gap-4">
        
        <div className="flex items-center gap-3 cursor-pointer">
          <div className="hidden md:flex flex-col items-end">
            <span className="text-[14px] font-medium text-[#828d99]">eonassets</span>
          </div>
          <Avatar.Root className="inline-flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-blue-600 border-none shadow-sm">
            <Avatar.Fallback className="text-xl font-bold text-white leading-1 font-sans">
              K
            </Avatar.Fallback>
          </Avatar.Root>
        </div>
      </div>
    </header>
  );
}
