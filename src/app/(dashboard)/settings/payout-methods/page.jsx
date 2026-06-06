"use client"

import { useState } from "react"
import Link from "next/link"
import { Edit, Trash2, Plus, Globe, ArrowUpDown } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const methodsData = [
  { 
    sn: 1, 
    name: "Bank", 
    subName: "Bank Transfer",
    type: "BANK", 
    countries: "1 COUNTRIES",
    countriesSub: "MX",
    gateway: "MANUAL", 
    minMax: "MX$5 - MX$10,000",
    charge: "5.00%",
    status: "ACTIVE" 
  },
  { 
    sn: 2, 
    name: "Crypto", 
    subName: "crypto",
    type: "CRYPTO", 
    countries: "ALL",
    countriesSub: "",
    gateway: "MANUAL", 
    minMax: "$5 - $10,000",
    charge: "2.00%",
    status: "ACTIVE" 
  },
]

export default function PayoutMethodsPage() {
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <div className="space-y-6 pb-10">
      <Card className="border-none shadow-sm bg-white rounded-md">
        <CardContent className="p-0">
          
          {/* Header Section */}
          <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h2 className="text-[1.2rem] font-medium text-[#475f7b]">Payout Methods (Withdrawals)</h2>
            <Link href="/settings/payout-methods/add">
              <Button className="bg-[#5A8DEE] hover:bg-[#4778d9] text-white px-4 h-10 font-medium rounded-[4px] shadow-sm border-0 flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Add New
              </Button>
            </Link>
          </div>

          <div className="p-6">
            
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              {/* Export Buttons */}
              <div className="flex rounded-md overflow-hidden border border-[#475f7b]">
                <button className="bg-[#475f7b] hover:bg-[#394c63] text-white px-4 py-1.5 text-[13px] font-medium border-r border-[#394c63] transition-colors">
                  Copy
                </button>
                <button className="bg-[#475f7b] hover:bg-[#394c63] text-white px-4 py-1.5 text-[13px] font-medium border-r border-[#394c63] transition-colors">
                  PDF
                </button>
                <button className="bg-[#475f7b] hover:bg-[#394c63] text-white px-4 py-1.5 text-[13px] font-medium border-r border-[#394c63] transition-colors">
                  JSON
                </button>
                <button className="bg-[#475f7b] hover:bg-[#394c63] text-white px-4 py-1.5 text-[13px] font-medium transition-colors">
                  Print
                </button>
              </div>

              {/* Search */}
              <div className="flex items-center gap-2">
                <span className="text-[13px] text-gray-500">Search:</span>
                <Input 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-[200px] h-8 border-gray-200 focus-visible:ring-0 text-[13px]"
                />
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-b border-gray-200 bg-transparent hover:bg-transparent">
                    <TableHead className="font-bold text-[#475f7b] text-[12px] uppercase w-[60px]">
                      <div className="flex items-center gap-1 cursor-pointer">S.N <ArrowUpDown className="w-3 h-3 text-gray-400" /></div>
                    </TableHead>
                    <TableHead className="font-bold text-[#475f7b] text-[12px] uppercase">
                      <div className="flex items-center gap-1 cursor-pointer">Name <ArrowUpDown className="w-3 h-3 text-gray-400" /></div>
                    </TableHead>
                    <TableHead className="font-bold text-[#475f7b] text-[12px] uppercase">
                      <div className="flex items-center gap-1 cursor-pointer">Type <ArrowUpDown className="w-3 h-3 text-gray-400" /></div>
                    </TableHead>
                    <TableHead className="font-bold text-[#475f7b] text-[12px] uppercase">
                      <div className="flex items-center gap-1 cursor-pointer">Countries <ArrowUpDown className="w-3 h-3 text-gray-400" /></div>
                    </TableHead>
                    <TableHead className="font-bold text-[#475f7b] text-[12px] uppercase">
                      <div className="flex items-center gap-1 cursor-pointer">Gateway <ArrowUpDown className="w-3 h-3 text-gray-400" /></div>
                    </TableHead>
                    <TableHead className="font-bold text-[#475f7b] text-[12px] uppercase">
                      <div className="flex items-center gap-1 cursor-pointer">Min/Max <ArrowUpDown className="w-3 h-3 text-gray-400" /></div>
                    </TableHead>
                    <TableHead className="font-bold text-[#475f7b] text-[12px] uppercase">
                      <div className="flex items-center gap-1 cursor-pointer">Charge <ArrowUpDown className="w-3 h-3 text-gray-400" /></div>
                    </TableHead>
                    <TableHead className="font-bold text-[#475f7b] text-[12px] uppercase">
                      <div className="flex items-center gap-1 cursor-pointer">Status <ArrowUpDown className="w-3 h-3 text-gray-400" /></div>
                    </TableHead>
                    <TableHead className="font-bold text-[#475f7b] text-[12px] uppercase text-right">
                      <div className="flex items-center justify-end gap-1 cursor-pointer">Actions <ArrowUpDown className="w-3 h-3 text-gray-400" /></div>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {methodsData.map((item, index) => (
                    <TableRow key={index} className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
                      <TableCell className="py-4 font-bold text-[13px] text-[#475f7b]">{item.sn}</TableCell>
                      <TableCell className="py-4">
                        <div className="flex flex-col">
                          <span className="font-bold text-[13px] text-[#475f7b]">{item.name}</span>
                          <span className="text-[11px] text-gray-400 mt-0.5">{item.subName}</span>
                        </div>
                      </TableCell>
                      <TableCell className="py-4">
                        {item.type === 'BANK' && (
                          <span className="inline-flex items-center justify-center bg-[#5A8DEE] text-white px-4 py-1.5 rounded-[4px] text-[11px] font-bold tracking-wider">
                            BANK
                          </span>
                        )}
                        {item.type === 'CRYPTO' && (
                          <span className="inline-flex items-center justify-center bg-[#FF9F43] text-white px-4 py-1.5 rounded-[4px] text-[11px] font-bold tracking-wider">
                            CRYPTO
                          </span>
                        )}
                      </TableCell>
                      <TableCell className="py-4">
                        <div className="flex flex-col items-start">
                          {item.countries === 'ALL' ? (
                            <span className="inline-flex items-center justify-center bg-[#00CFDD] text-white px-3 py-1.5 rounded-[4px] text-[11px] font-bold tracking-wider gap-1.5">
                              <Globe className="w-3.5 h-3.5" />
                              ALL
                            </span>
                          ) : (
                            <span className="inline-flex items-center justify-center bg-[#475f7b] text-white px-3 py-1.5 rounded-[4px] text-[11px] font-bold tracking-wider">
                              {item.countries}
                            </span>
                          )}
                          {item.countriesSub && (
                            <span className="text-[11px] text-gray-400 mt-1">{item.countriesSub}</span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="py-4">
                        <span className="inline-flex items-center justify-center bg-[#475f7b] text-white px-3 py-1.5 rounded-[4px] text-[11px] font-bold tracking-wider">
                          {item.gateway}
                        </span>
                      </TableCell>
                      <TableCell className="py-4 text-[13px] text-[#475f7b] font-medium">
                        {item.minMax}
                      </TableCell>
                      <TableCell className="py-4 text-[13px] text-[#475f7b] font-medium">
                        {item.charge}
                      </TableCell>
                      <TableCell className="py-4">
                        <span className="inline-flex items-center justify-center bg-[#39DA8A] text-white px-3 py-1.5 rounded-[4px] text-[11px] font-bold tracking-wider">
                          {item.status}
                        </span>
                      </TableCell>
                      <TableCell className="py-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <Button size="icon" className="w-8 h-8 rounded-[4px] bg-[#FF9F43] hover:bg-[#e08b39] border-0 shadow-none">
                            <Edit className="w-4 h-4 text-white" />
                          </Button>
                          <Button size="icon" className="w-8 h-8 rounded-[4px] bg-[#ff5b5c] hover:bg-[#e04e4f] border-0 shadow-none">
                            <Trash2 className="w-4 h-4 text-white" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            <div className="flex flex-col sm:flex-row justify-between items-center mt-6 text-[13px] text-gray-500 gap-4">
              <div>
                Showing 1 to 2 of 2 entries
              </div>
              <div className="flex items-center gap-1">
                <button className="px-3 py-1.5 border border-gray-200 bg-gray-50 text-gray-400 rounded-sm cursor-not-allowed">
                  Previous
                </button>
                <button className="px-3 py-1.5 border border-[#5A8DEE] bg-[#5A8DEE] text-white rounded-sm font-medium">
                  1
                </button>
                <button className="px-3 py-1.5 border border-gray-200 bg-gray-50 text-gray-400 rounded-sm cursor-not-allowed">
                  Next
                </button>
              </div>
            </div>

          </div>
        </CardContent>
      </Card>
    </div>
  )
}
