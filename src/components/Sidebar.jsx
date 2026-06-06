"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Home,
  ArrowRight,
  Play,
  ClipboardCheck,
  CalendarCheck,
  Loader,
  Newspaper,
  Building,
  Activity,
  LogOut,
  ChevronDown,
  ChevronUp
} from "lucide-react";

const navigation = [
  { name: "Home", href: "/ktdevpro/dashboard", icon: Home },
  { type: "divider", name: "APPS" },
  { name: "Packages", href: "/ktdevpro/packages", icon: ArrowRight },
  { 
    name: "Gift Bonus", 
    icon: Play,
    children: [
      { name: "Bonus", href: "/ktdevpro/gift-bonus/bonus" },
      { name: "Uses List", href: "/ktdevpro/gift-bonus/uses-list" }
    ]
  },
  { name: "Tasks", href: "/ktdevpro/tasks", icon: ClipboardCheck },
  { name: "Daily Check-In", href: "/ktdevpro/daily-check-in", icon: CalendarCheck },
  { name: "Spin Wheel", href: "/ktdevpro/spin-wheel", icon: Loader },
  { name: "News", href: "/ktdevpro/news", icon: Newspaper },
  { name: "Partners", href: "/ktdevpro/partners", icon: Building },
  { name: "Live Market", href: "/ktdevpro/live-market" }, // No icon
  { name: "Customers", href: "/ktdevpro/customers", icon: ArrowRight },
  { name: "Activity Monitor", href: "/ktdevpro/activity-monitor", icon: Activity },
  { name: "Purchase Record", href: "/ktdevpro/purchase-record", icon: ArrowRight },
  {
    name: "Recharge Payments",
    icon: Play,
    children: [
      { name: "Pending", href: "/ktdevpro/recharge/pending" },
      { name: "Approved", href: "/ktdevpro/recharge/approved" },
      { name: "Rejected", href: "/ktdevpro/recharge/rejected" }
    ]
  },
  {
    name: "Withdrawal Payments",
    icon: Play,
    children: [
      { name: "Pending", href: "/ktdevpro/withdrawals/pending" },
      { name: "Approved", href: "/ktdevpro/withdrawals/approved" },
      { name: "Rejected", href: "/ktdevpro/withdrawals/rejected" }
    ]
  },
  { name: "Slider Images", href: "/ktdevpro/slider-images", icon: ArrowRight },
  {
    name: "Settings",
    icon: Play,
    children: [
      { name: "General Settings", href: "/ktdevpro/settings/general" }
    ]
  }
];

export function Sidebar() {
  const pathname = usePathname();
  const [openMenus, setOpenMenus] = useState({});

  const toggleMenu = (name) => {
    setOpenMenus(prev => ({ ...prev, [name]: !prev[name] }));
  };

  const isActive = (href) => {
    if (!href) return false;
    return pathname === href || pathname.startsWith(href + '/');
  };

  const isChildActive = (children) => {
    return children?.some(child => isActive(child.href));
  };

  return (
    <div className="flex h-full w-[260px] flex-col bg-[#F9FAFB] shadow-[0_0_15px_0_rgba(0,0,0,0.05)] z-30 font-['Rubik',sans-serif] transition-all">
      <div className="flex h-[80px] items-center px-6 mt-2">
        <Link href="/ktdevpro/dashboard" className="flex items-center gap-3 w-full">
          <span className="text-[1.8rem] font-medium text-[#475f7b] tracking-wide">Dashboard</span>
        </Link>
      </div>
      
      <div className="flex-1 overflow-y-auto py-4 px-0">
        <nav className="space-y-1">
          {navigation.map((item, index) => {
            if (item.type === "divider") {
              return (
                <div key={index} className="px-6 pt-6 pb-2">
                  <span className="text-xs font-bold text-[#b4b7bd] tracking-wider uppercase">{item.name}</span>
                </div>
              );
            }

            const active = isActive(item.href) || isChildActive(item.children);
            const isOpen = openMenus[item.name] || isChildActive(item.children);

            if (item.children) {
              return (
                <div key={item.name} className={`px-3 mb-1 transition-all ${isOpen ? 'py-1' : ''}`}>
                  <div className={`rounded-[6px] overflow-hidden transition-all duration-200 ${isOpen ? 'bg-white border border-gray-100 shadow-sm' : ''}`}>
                    <button
                      onClick={() => toggleMenu(item.name)}
                      className={`w-full flex items-center justify-between px-3 py-[12px] transition-all duration-200 group ${
                        !isOpen && active ? "bg-[#e6ebf5] rounded-[4px]" : !isOpen ? "hover:bg-slate-50 hover:pl-4 rounded-[4px]" : "border-b border-gray-100"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        {item.icon && <item.icon className={`w-[22px] h-[22px] ${(active || isOpen) ? "text-[#5A8DEE]" : "text-[#475f7b] group-hover:text-[#5A8DEE] transition-colors"}`} />}
                        <span className={`text-[15px] ${(!isOpen && active) ? "text-[#5A8DEE] font-medium" : "text-[#475f7b]"}`}>{item.name}</span>
                      </div>
                      <ChevronDown className={`w-4 h-4 text-[#828d99] transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                    </button>
                    
                    {isOpen && (
                      <div className="py-2 space-y-1 bg-white">
                        {item.children.map((child) => {
                          const childActive = isActive(child.href);
                          return (
                            <Link
                              key={child.name}
                              href={child.href}
                              className={`flex items-center gap-4 pl-[20px] pr-3 py-[8px] transition-all duration-200 group ${
                                childActive ? "text-[#5A8DEE] font-medium" : "text-[#475f7b] hover:text-[#5A8DEE]"
                              }`}
                            >
                              <ArrowRight className={`w-[18px] h-[18px] ml-1 ${childActive ? "text-[#5A8DEE]" : "text-[#1a233a] group-hover:text-[#5A8DEE]"}`} />
                              <span className="text-[15px]">{child.name}</span>
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              );
            }

            return (
              <div key={item.name} className="px-3 mb-1">
                <Link
                  href={item.href || "#"}
                  className={`flex items-center gap-4 px-3 py-[12px] rounded-[4px] transition-all duration-200 group ${
                    active ? "bg-[#e6ebf5] text-[#5A8DEE] font-medium" : "text-[#475f7b] hover:bg-slate-50 hover:pl-4"
                  }`}
                >
                  {item.icon ? (
                    <item.icon className={`w-[22px] h-[22px] ${active ? "text-[#5A8DEE]" : "text-[#475f7b] group-hover:text-[#5A8DEE] transition-colors"}`} />
                  ) : (
                    <div className="w-[22px] h-[22px]" /> // Placeholder for items without icon
                  )}
                  <span className={`text-[15px] ${active ? "text-[#5A8DEE]" : "text-[#475f7b]"}`}>{item.name}</span>
                </Link>
              </div>
            );
          })}
        </nav>
      </div>
      
      <div className="p-4 border-t border-slate-100">
        <Link 
          href="/ktdevpro/login"
          className="flex items-center gap-4 px-3 py-3 rounded-[4px] text-[#475f7b] hover:bg-red-50 hover:text-red-500 transition-all group"
        >
          <LogOut className="w-[22px] h-[22px] group-hover:text-red-500 transition-colors" />
          <span className="font-medium text-[15px]">Sign Out</span>
        </Link>
      </div>
    </div>
  );
}
