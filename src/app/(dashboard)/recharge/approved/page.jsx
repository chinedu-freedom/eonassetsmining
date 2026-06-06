"use client"

import { useState } from "react"
import { Search, CreditCard } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const approvedPaymentsData = [
  {
    id: "1",
    sn: 1,
    userInfo: {
      name: "Lurdx",
      username: "Fxlurd@gmail.com",
      refId: "P7KR39"
    },
    paymentInfo: {
      paymentNumber: "ORD17790949194964",
      transactionId: "155884049",
      date: "18-05-2026 09:01:59"
    },
    amounts: {
      paymentAmount: 2.00,
      finalAmount: 2.00
    },
    operation: {
      status: "APPROVED",
      type: "AUTO",
      methodName: "usdt bep20",
      gateway: "oxapay"
    }
  }
];

export default function ApprovedRechargePage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredData = approvedPaymentsData.filter((item) => {
    const searchLower = searchTerm.toLowerCase()
    return (
      item.userInfo.name.toLowerCase().includes(searchLower) ||
      item.userInfo.username.toLowerCase().includes(searchLower) ||
      item.paymentInfo.paymentNumber.toLowerCase().includes(searchLower) ||
      item.paymentInfo.transactionId.toLowerCase().includes(searchLower)
    )
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between w-full mb-6 gap-4">
        <div className="flex items-center gap-3">
          <CreditCard className="w-6 h-6 text-[#5A8DEE]" />
          <h1 className="text-2xl font-bold text-gray-800">Approved Payment Lists</h1>
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
                  placeholder="Search by name, username, payment number or transaction id..."
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
                  <TableHead className="font-bold text-gray-600 uppercase text-[12px] tracking-wider py-4">PAYMENT INFO</TableHead>
                  <TableHead className="font-bold text-gray-600 uppercase text-[12px] tracking-wider py-4">PAYMENT AMOUNTS</TableHead>
                  <TableHead className="font-bold text-gray-600 uppercase text-[12px] tracking-wider py-4">PAYMENT OPERATION</TableHead>
                  <TableHead className="font-bold text-gray-600 uppercase text-[12px] tracking-wider py-4 pr-6">ACTIVE</TableHead>
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
                          <div className="text-[13px] text-gray-700">
                            Ref_id: <span className="font-medium">{item.userInfo.refId}</span>
                          </div>
                        </div>
                      </TableCell>

                      {/* PAYMENT INFO */}
                      <TableCell className="py-4">
                        <div className="flex flex-col space-y-1.5">
                          <div className="text-[13px] text-gray-700">
                            Payment Number: <br />
                            <span className="font-bold text-gray-900">{item.paymentInfo.paymentNumber}</span>
                          </div>
                          <div className="text-[13px] text-gray-700">
                            Transaction ID: <span className="font-bold text-gray-900">{item.paymentInfo.transactionId}</span>
                          </div>
                          <div className="text-[13px] text-gray-700">
                            Date : <span className="font-medium">{item.paymentInfo.date}</span>
                          </div>
                        </div>
                      </TableCell>

                      {/* PAYMENT AMOUNTS */}
                      <TableCell className="py-4">
                        <div className="flex flex-col space-y-1.5">
                          <div className="text-[13px] text-gray-700">
                            Payment Amount: <span className="font-medium">${item.amounts.paymentAmount.toFixed(2)}</span>
                          </div>
                          <div className="text-[13px] text-gray-700">
                            Final Amount: <span className="font-bold text-gray-900">${item.amounts.finalAmount.toFixed(2)}</span>
                          </div>
                        </div>
                      </TableCell>

                      {/* PAYMENT OPERATION */}
                      <TableCell className="py-4">
                        <div className="flex flex-col space-y-2">
                          <div className="flex items-center gap-2 text-[13px] text-gray-700">
                            Status: 
                            <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-sm font-bold bg-[#39DA8A] text-white">
                              {item.operation.status}
                            </span>
                          </div>
                          <div>
                            <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-sm font-bold bg-[#00CFDD] text-white">
                              {item.operation.type}
                            </span>
                          </div>
                          <div className="text-[13px] text-gray-700">
                            Method Name: <span className="font-medium">{item.operation.methodName}</span>
                          </div>
                          <div className="flex items-center gap-2 text-[13px] text-gray-700">
                            Gateway:
                            <span className="text-[10px] lowercase tracking-wider px-2 py-0.5 rounded-sm font-medium bg-pink-100 text-[#ff5b5c]">
                              {item.operation.gateway}
                            </span>
                          </div>
                        </div>
                      </TableCell>

                      {/* ACTIVE */}
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
