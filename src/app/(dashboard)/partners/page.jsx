"use client"

import { useState } from "react"
import Link from "next/link"
import { Building2, Edit } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const partnersData = [
  {
    id: "1",
    name: "Binance",
    status: "ACTIVE",
    logoText: "ETH",
    logoColor: "bg-blue-100 text-blue-600",
    image: "https://cryptologos.cc/logos/ethereum-eth-logo.png?v=029",
  },
  {
    id: "2",
    name: "Bybit",
    status: "ACTIVE",
    logoText: "BYBIT",
    logoColor: "bg-orange-50 text-orange-900",
    image: "https://cryptologos.cc/logos/bnb-bnb-logo.png?v=029", // Fallback if needed, we'll use a styled div if image fails
  },
  {
    id: "3",
    name: "Coinbase",
    status: "ACTIVE",
    logoText: "C",
    logoColor: "bg-blue-100 text-blue-600",
  },
  {
    id: "4",
    name: "KuCoin",
    status: "ACTIVE",
    logoText: "K",
    logoColor: "bg-teal-100 text-teal-600",
  },
  {
    id: "5",
    name: "Tesla",
    status: "ACTIVE",
    logoText: "T",
    logoColor: "bg-red-100 text-red-600",
  },
  {
    id: "6",
    name: "Gate.io",
    status: "ACTIVE",
    logoText: "Gate",
    logoColor: "bg-indigo-100 text-indigo-600",
  },
  {
    id: "7",
    name: "USDC",
    status: "ACTIVE",
    logoText: "U",
    logoColor: "bg-blue-100 text-blue-600",
  },
  {
    id: "8",
    name: "Tether",
    status: "ACTIVE",
    logoText: "T",
    logoColor: "bg-green-100 text-green-600",
  },
]

export default function PartnersManagementPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between w-full mb-6">
        <div>
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-blue-500" />
            <h1 className="text-xl font-semibold text-gray-700">Partners Management</h1>
          </div>
          <p className="text-gray-500 text-sm mt-1">Manage your platform partners displayed on the homepage. You can edit partner details but cannot delete them.</p>
        </div>
      </div>

      {/* Grid of Partners */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {partnersData.map((partner) => (
          <Card key={partner.id} className="border border-[#39DA8A]/60 shadow-sm bg-white rounded-md overflow-hidden hover:shadow-md transition-shadow">
            <CardContent className="p-6 flex flex-col items-center justify-center text-center">
              
              {/* Partner Logo Wrapper */}
              <div className="mb-4">
                {partner.image ? (
                   <div className={`w-14 h-14 rounded-xl flex items-center justify-center p-2 bg-orange-50`}>
                     <img src={partner.image} alt={partner.name} className="w-full h-full object-contain" />
                   </div>
                ) : (
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center font-bold text-xl ${partner.logoColor}`}>
                    {partner.logoText}
                  </div>
                )}
              </div>

              {/* Partner Name */}
              <h3 className="font-semibold text-gray-700 text-[15px] mb-2">{partner.name}</h3>

              {/* Status Badge */}
              <Badge className="bg-[#39DA8A]/10 hover:bg-[#39DA8A]/20 text-[#39DA8A] border-0 text-[10px] tracking-widest uppercase px-3 py-0.5 rounded font-bold mb-4">
                {partner.status}
              </Badge>

              {/* Edit Button */}
              <Link href={`/partners/${partner.id}`}>
                <Button 
                  variant="default" 
                  size="sm" 
                  className="bg-[#5A8DEE] hover:bg-[#4778d9] text-white border-0 rounded text-xs px-4 h-8 w-full"
                >
                  <Edit className="w-3.5 h-3.5 mr-1.5" />
                  Edit
                </Button>
              </Link>

            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
