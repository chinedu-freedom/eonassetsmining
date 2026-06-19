"use client"

import { useState } from "react"
import Link from "next/link"
import { Edit, Trash2, Plus, ArrowUpDown, Image as ImageIcon } from "lucide-react"
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

const cryptoData = [
  { 
    sn: 1, 
    icon: "USDT",
    name: "Tether", 
    symbol: "USDT",
    network: "TRC20",
    networkName: "Tron Network",
    minMax: "10.00 - 999,999.00",
    fee: "0.00%",
    sortOrder: "1",
    status: "Active" 
  },
  { 
    sn: 2, 
    icon: "USDT",
    name: "Tether", 
    symbol: "USDT",
    network: "ERC20",
    networkName: "Ethereum Network",
    minMax: "10.00 - 999,999.00",
    fee: "0.00%",
    sortOrder: "2",
    status: "Inactive" 
  },
  { 
    sn: 3, 
    icon: "USDT",
    name: "Tether", 
    symbol: "USDT",
    network: "BEP20",
    networkName: "BNB Smart Chain",
    minMax: "10.00 - 999,999.00",
    fee: "0.00%",
    sortOrder: "3",
    status: "Active" 
  },
  { 
    sn: 4, 
    icon: "BTC",
    name: "Bitcoin", 
    symbol: "BTC",
    network: "BTC",
    networkName: "Bitcoin Network",
    minMax: "10.00 - 999,999.00",
    fee: "0.00%",
    sortOrder: "4",
    status: "Inactive" 
  },
]

export default function PayoutCryptosPage() {
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <div className="space-y-6 pb-10">
      <Card className="border-none shadow-sm bg-white rounded-md">
        <CardContent className="p-0">
          
          {/* Header Section */}
          <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h2 className="text-[1.2rem] font-medium text-[#475f7b]">Payout Cryptocurrencies</h2>
            <Link href="/settings/payout-cryptos/add">
              <Button className="bg-[#5A8DEE] hover:bg-[#4778d9] text-white px-4 h-10 font-medium rounded-sm-[4px] shadow-sm border-0 flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Add New Crypto
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
              <Table className="min-w-[1000px] whitespace-nowrap">
                <TableHeader className="min-w-[1000px] whitespace-nowrap">
                  <TableRow className="border-b border-gray-200 bg-transparent hover:bg-transparent min-w-[1000px] whitespace-nowrap">
                    <TableHead className="font-bold text-[#475f7b] text-[12px] uppercase w-[60px] min-w-[1000px] whitespace-nowrap">
                      <div className="flex items-center gap-1 cursor-pointer">S.N <ArrowUpDown className="w-3 h-3 text-gray-400" /></div>
                    </TableHead>
                    <TableHead className="font-bold text-[#475f7b] text-[12px] uppercase min-w-[1000px] whitespace-nowrap">
                      <div className="flex items-center gap-1 cursor-pointer">Icon <ArrowUpDown className="w-3 h-3 text-gray-400" /></div>
                    </TableHead>
                    <TableHead className="font-bold text-[#475f7b] text-[12px] uppercase min-w-[1000px] whitespace-nowrap">
                      <div className="flex items-center gap-1 cursor-pointer">Name <ArrowUpDown className="w-3 h-3 text-gray-400" /></div>
                    </TableHead>
                    <TableHead className="font-bold text-[#475f7b] text-[12px] uppercase min-w-[1000px] whitespace-nowrap">
                      <div className="flex items-center gap-1 cursor-pointer">Symbol <ArrowUpDown className="w-3 h-3 text-gray-400" /></div>
                    </TableHead>
                    <TableHead className="font-bold text-[#475f7b] text-[12px] uppercase min-w-[1000px] whitespace-nowrap">
                      <div className="flex items-center gap-1 cursor-pointer">Network <ArrowUpDown className="w-3 h-3 text-gray-400" /></div>
                    </TableHead>
                    <TableHead className="font-bold text-[#475f7b] text-[12px] uppercase min-w-[1000px] whitespace-nowrap">
                      <div className="flex items-center gap-1 cursor-pointer">Min/Max Amount <ArrowUpDown className="w-3 h-3 text-gray-400" /></div>
                    </TableHead>
                    <TableHead className="font-bold text-[#475f7b] text-[12px] uppercase min-w-[1000px] whitespace-nowrap">
                      <div className="flex items-center gap-1 cursor-pointer">Fee <ArrowUpDown className="w-3 h-3 text-gray-400" /></div>
                    </TableHead>
                    <TableHead className="font-bold text-[#475f7b] text-[12px] uppercase min-w-[1000px] whitespace-nowrap">
                      <div className="flex items-center gap-1 cursor-pointer">Sort Order <ArrowUpDown className="w-3 h-3 text-gray-400" /></div>
                    </TableHead>
                    <TableHead className="font-bold text-[#475f7b] text-[12px] uppercase min-w-[1000px] whitespace-nowrap">
                      <div className="flex items-center gap-1 cursor-pointer">Status <ArrowUpDown className="w-3 h-3 text-gray-400" /></div>
                    </TableHead>
                    <TableHead className="font-bold text-[#475f7b] text-[12px] uppercase text-right min-w-[1000px] whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1 cursor-pointer">Actions <ArrowUpDown className="w-3 h-3 text-gray-400" /></div>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="min-w-[1000px] whitespace-nowrap">
                  {cryptoData.map((item, index) => (
                    <TableRow key={index} className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors min-w-[1000px] whitespace-nowrap">
                      <TableCell className="py-4 font-bold text-[13px] text-[#475f7b] min-w-[1000px] whitespace-nowrap">{item.sn}</TableCell>
                      <TableCell className="py-4 min-w-[1000px] whitespace-nowrap">
                        <div className="flex items-center gap-1.5 text-gray-400">
                          <ImageIcon className="w-4 h-4" />
                          <span className="text-[12px]">{item.icon}</span>
                        </div>
                      </TableCell>
                      <TableCell className="py-4 font-bold text-[13px] text-[#475f7b] min-w-[1000px] whitespace-nowrap">
                        {item.name}
                      </TableCell>
                      <TableCell className="py-4 min-w-[1000px] whitespace-nowrap">
                        <span className="inline-flex items-center justify-center bg-pink-50 text-pink-500 px-2.5 py-1 rounded-[4px] text-[11px] font-bold">
                          {item.symbol}
                        </span>
                      </TableCell>
                      <TableCell className="py-4 min-w-[1000px] whitespace-nowrap">
                        <div className="flex flex-col items-start">
                          <span className="inline-flex items-center justify-center bg-[#00CFDD] text-white px-3 py-1 rounded-[4px] text-[11px] font-bold">
                            {item.network}
                          </span>
                          <span className="text-[11px] text-gray-400 mt-1">{item.networkName}</span>
                        </div>
                      </TableCell>
                      <TableCell className="py-4 text-[13px] text-[#475f7b] font-medium min-w-[1000px] whitespace-nowrap">
                        {item.minMax}
                      </TableCell>
                      <TableCell className="py-4 text-[13px] text-[#475f7b] font-medium min-w-[1000px] whitespace-nowrap">
                        {item.fee}
                      </TableCell>
                      <TableCell className="py-4 font-bold text-[13px] text-[#475f7b] min-w-[1000px] whitespace-nowrap">
                        {item.sortOrder}
                      </TableCell>
                      <TableCell className="py-4 min-w-[1000px] whitespace-nowrap">
                        {item.status === 'Active' ? (
                          <span className="inline-flex items-center justify-center bg-blue-600 text-white px-3 py-1.5 rounded-[4px] text-[11px] font-medium">
                            Active
                          </span>
                        ) : (
                          <span className="inline-flex items-center justify-center bg-[#ff5b5c] text-white px-3 py-1.5 rounded-[4px] text-[11px] font-medium">
                            Inactive
                          </span>
                        )}
                      </TableCell>
                      <TableCell className="py-4 text-right min-w-[1000px] whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1.5">
                          <Button size="icon" className="w-8 h-8 rounded-sm-[4px] bg-[#FF9F43] hover:bg-[#e08b39] border-0 shadow-none">
                            <Edit className="w-4 h-4 text-white" />
                          </Button>
                          <Button size="icon" className="w-8 h-8 rounded-sm-[4px] bg-[#ff5b5c] hover:bg-[#e04e4f] border-0 shadow-none">
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
                Showing 1 to 4 of 4 entries
              </div>
              <div className="flex items-center gap-1">
                <button className="px-3 py-1.5 border border-gray-200 bg-gray-50 text-gray-400 rounded-sm-sm cursor-not-allowed">
                  Previous
                </button>
                <button className="px-3 py-1.5 border border-[#5A8DEE] bg-[#5A8DEE] text-white rounded-sm-sm font-medium">
                  1
                </button>
                <button className="px-3 py-1.5 border border-gray-200 bg-gray-50 text-gray-400 rounded-sm-sm cursor-not-allowed">
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
