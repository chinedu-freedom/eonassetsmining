"use client"

import { useState } from "react"
import { Search, ArrowDownToLine, Loader2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useFetchData } from "@/hooks/useApi"
import { format } from "date-fns"

export default function RejectedWithdrawPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const { data: withdrawalsRes, isLoading } = useFetchData("/admin/transactions/withdrawals", ["withdrawals"]);
  const withdrawals = Array.isArray(withdrawalsRes) ? withdrawalsRes : withdrawalsRes?.data || [];
  
  const safeFormatDate = (dateString) => {
    try {
      return format(new Date(dateString), "dd-MM-yyyy HH:mm:ss");
    } catch (e) {
      return dateString;
    }
  };

  const rejectedWithdrawals = withdrawals.filter(w => w.status === 'REJECTED');

  const displayData = rejectedWithdrawals.map((w, index) => ({
    id: w.id,
    sn: index + 1,
    userInfo: {
      name: w.user?.full_name || "Unknown",
      username: w.user?.email || "Unknown"
    },
    withdrawInfo: {
      method: w.network || "Crypto",
      transactionId: w.id,
      date: safeFormatDate(w.created_at)
    },
    amountDetails: {
      amount: Number(w.amount) || 0,
      charge: 0,
      payable: Number(w.amount) || 0
    },
    status: w.status
  }));

  const filteredData = displayData.filter((item) => {
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
          <h1 className="text-2xl font-bold text-gray-800">Rejected Withdraw Lists</h1>
        </div>
      </div>

      {/* Filters Container */}
      <Card className="border-none shadow-sm bg-white rounded-md">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4 w-full">
            <div className="flex items-center gap-4 w-full">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground z-10 pointer-events-none" />
                <Input
                  placeholder="Search by name, username or transaction id..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 bg-white border-gray-200 h-10 w-full"
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
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-10 text-gray-500 bg-gray-50/30">
                      <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2" />
                      Loading rejected withdrawals...
                    </TableCell>
                  </TableRow>
                ) : filteredData.length > 0 ? (
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
                        <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-sm font-bold bg-[#ff5b5c] text-white">
                          REJECTED
                        </span>
                      </TableCell>

                      {/* ACTIONS */}
                      <TableCell className="py-4 pr-6 align-middle">
                        <div className="text-[#00CFDD] font-medium text-[14px]">
                          Already<br />processed
                        </div>
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
