"use client"

import { useState } from "react"
import { Search, ArrowDownToLine } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"

const pendingWithdrawData = [
  // Empty array to show "No data available in table" state as in the screenshot
]

export default function PendingWithdrawPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredData = pendingWithdrawData.filter((item) => {
    const searchLower = searchTerm.toLowerCase()
    return (
      item.userInfo?.name?.toLowerCase().includes(searchLower) ||
      item.userInfo?.username?.toLowerCase().includes(searchLower) ||
      item.withdrawInfo?.transactionId?.toLowerCase().includes(searchLower)
    )
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between w-full mb-6 gap-4">
        <div className="flex items-center gap-3">
          <ArrowDownToLine className="w-6 h-6 text-[#5A8DEE]" />
          <h1 className="text-2xl font-bold text-gray-800">Pending Withdraw Lists</h1>
        </div>
      </div>

      {/* Filters Container */}
      <Card className="border-none shadow-sm bg-white rounded-md">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4 w-full">
            <div className="flex items-center gap-4 w-full">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search by name, username or transaction id..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white border-gray-200 h-10 w-full"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Table Section */}
      <Card className="border-none shadow-sm bg-white rounded-md">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-gray-50/50 border-b">
                <TableRow className="hover:bg-transparent">
                  <TableHead className="w-[60px] font-bold text-gray-600 uppercase text-[12px] tracking-wider py-4 pl-6">S.N</TableHead>
                  <TableHead className="font-bold text-gray-600 uppercase text-[12px] tracking-wider py-4">USER INFO</TableHead>
                  <TableHead className="font-bold text-gray-600 uppercase text-[12px] tracking-wider py-4">WITHDRAW INFO</TableHead>
                  <TableHead className="font-bold text-gray-600 uppercase text-[12px] tracking-wider py-4">AMOUNT DETAILS</TableHead>
                  <TableHead className="font-bold text-gray-600 uppercase text-[12px] tracking-wider py-4">STATUS</TableHead>
                  <TableHead className="font-bold text-gray-600 uppercase text-[12px] tracking-wider py-4 pr-6">ACTIONS</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.length > 0 ? (
                  filteredData.map((item) => (
                    <TableRow key={item.id} className="hover:bg-gray-50 border-b last:border-0 align-top">
                      <TableCell className="font-medium text-gray-700 text-[13px] py-4 pl-6">
                        {item.sn}
                      </TableCell>
                      
                      {/* USER INFO */}
                      <TableCell className="py-4">
                        <div className="flex flex-col space-y-1.5">
                          <div className="text-[13px] text-gray-700">
                            Name: <span className="font-medium">{item.userInfo.name}</span>
                          </div>
                          <div className="text-[13px] text-gray-700">
                            Username: <br />
                            <span className="font-medium">{item.userInfo.username}</span>
                          </div>
                        </div>
                      </TableCell>

                      {/* WITHDRAW INFO */}
                      <TableCell className="py-4">
                        <div className="flex flex-col space-y-1.5">
                          <div className="text-[13px] text-gray-700">
                            Method: <span className="font-medium">{item.withdrawInfo.method}</span>
                          </div>
                          <div className="text-[13px] text-gray-700">
                            Transaction ID: <span className="font-bold text-gray-900">{item.withdrawInfo.transactionId}</span>
                          </div>
                          <div className="text-[13px] text-gray-700">
                            Date: <span className="font-medium">{item.withdrawInfo.date}</span>
                          </div>
                        </div>
                      </TableCell>

                      {/* AMOUNT DETAILS */}
                      <TableCell className="py-4">
                        <div className="flex flex-col space-y-1.5">
                          <div className="text-[13px] text-gray-700">
                            Amount: <span className="font-medium">${item.amountDetails.amount.toFixed(2)}</span>
                          </div>
                          <div className="text-[13px] text-gray-700">
                            Charge: <span className="text-red-500">${item.amountDetails.charge.toFixed(2)}</span>
                          </div>
                          <div className="text-[13px] text-gray-700">
                            Payable: <span className="font-bold text-gray-900">${item.amountDetails.payable.toFixed(2)}</span>
                          </div>
                        </div>
                      </TableCell>

                      {/* STATUS */}
                      <TableCell className="py-4">
                        <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-sm font-bold bg-[#ffb822] text-white">
                          PENDING
                        </span>
                      </TableCell>

                      {/* ACTIONS */}
                      <TableCell className="py-4 pr-6">
                        <Button 
                          className="bg-[#39DA8A] hover:bg-[#2bbd74] text-white font-medium px-6 py-2 h-9 rounded-md shadow-sm border-0"
                        >
                          Action
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-10 text-gray-500 bg-gray-50/30">
                      No data available in table
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
