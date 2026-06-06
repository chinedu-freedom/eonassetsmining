"use client"

import { useState } from "react"
import { Search, Edit, Trash2, Plus, Gift, History } from "lucide-react"
import { Button } from "@/components/ui/button"
import GiftCodeDialog from "@/components/modals/GiftCodeDialog"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const giftCodesData = [
  // { id: "1", sn: 1, codeName: "New Year Promo", giftCode: "NY2024", amount: 50.00, usage: 10, maxUses: 100, status: "Active" },
]

export default function GiftBonusPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isDialogOpen, setDialogOpen] = useState(false)
  const [editingGiftCode, setEditingGiftCode] = useState(null)

  const filteredData = giftCodesData.filter((item) => {
    const matchesSearch = 
      item.codeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.giftCode.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || item.status.toLowerCase() === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between w-full mb-6 gap-4">
        <div className="flex items-center gap-3">
          <Gift className="w-6 h-6 text-[#5A8DEE]" />
          <h1 className="text-2xl font-bold text-gray-800">Gift Codes Management</h1>
        </div>
        <div className="flex items-center space-x-3 w-full md:w-auto">
          <Button className="flex-1 md:flex-none bg-[#00CFDD] hover:bg-[#00b5c2] text-white h-10 px-4 rounded-md shadow-sm border-0">
            <History className="w-4 h-4 mr-2" />
            Redemption History
          </Button>
          <Button 
            className="flex-1 md:flex-none bg-[#5A8DEE] hover:bg-[#4778d9] text-white h-10 px-4 rounded-md shadow-sm border-0"
            onClick={() => {
              setEditingGiftCode(null)
              setDialogOpen(true)
            }}
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Gift Code
          </Button>
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
                  placeholder="Search by code name or code..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white border-gray-200 h-10 w-full"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-52 bg-white border-gray-200 h-10">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
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
                  <TableHead className="w-[60px] font-bold text-gray-600 uppercase text-[12px] tracking-wider py-4 pl-6">#</TableHead>
                  <TableHead className="font-bold text-gray-600 uppercase text-[12px] tracking-wider py-4">CODE NAME</TableHead>
                  <TableHead className="font-bold text-gray-600 uppercase text-[12px] tracking-wider py-4">GIFT CODE</TableHead>
                  <TableHead className="font-bold text-gray-600 uppercase text-[12px] tracking-wider py-4">AMOUNT</TableHead>
                  <TableHead className="font-bold text-gray-600 uppercase text-[12px] tracking-wider py-4">USAGE</TableHead>
                  <TableHead className="font-bold text-gray-600 uppercase text-[12px] tracking-wider py-4">MAX USES</TableHead>
                  <TableHead className="font-bold text-gray-600 uppercase text-[12px] tracking-wider py-4">STATUS</TableHead>
                  <TableHead className="font-bold text-gray-600 uppercase text-[12px] tracking-wider py-4 text-right pr-6 w-[120px]">ACTIONS</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.length > 0 ? (
                  filteredData.map((item) => (
                    <TableRow key={item.id} className="hover:bg-gray-50 border-b last:border-0">
                      <TableCell className="font-medium text-gray-700 text-[13px] py-4 pl-6">
                        {item.sn}
                      </TableCell>
                      <TableCell className="py-4">
                        <span className="font-medium text-gray-700 text-[13px]">{item.codeName}</span>
                      </TableCell>
                      <TableCell className="py-4">
                        <span className="font-medium text-[#5A8DEE] text-[13px] bg-blue-50 px-2 py-1 rounded-sm">{item.giftCode}</span>
                      </TableCell>
                      <TableCell className="py-4">
                        <span className="font-medium text-gray-700 text-[13px]">${item.amount.toFixed(2)}</span>
                      </TableCell>
                      <TableCell className="py-4">
                        <span className="font-medium text-gray-700 text-[13px]">{item.usage}</span>
                      </TableCell>
                      <TableCell className="py-4">
                        <span className="font-medium text-gray-700 text-[13px]">{item.maxUses}</span>
                      </TableCell>
                      <TableCell className="py-4">
                        <span className={`text-[12px] px-2.5 py-1 rounded-md font-medium ${
                          item.status.toLowerCase() === 'active' 
                            ? 'bg-[#39DA8A]/10 text-[#39DA8A]' 
                            : 'bg-yellow-50 text-yellow-600'
                        }`}>
                          {item.status}
                        </span>
                      </TableCell>
                      <TableCell className="py-4 text-right pr-6">
                        <div className="flex items-center justify-end space-x-2">
                          <Button 
                            variant="default" 
                            size="icon" 
                            className="h-8 w-8 bg-[#ffb822] hover:bg-[#e5a51f] text-white border-0 shadow-sm rounded-md"
                            title="Edit"
                            onClick={() => {
                              setEditingGiftCode(item)
                              setDialogOpen(true)
                            }}
                          >
                            <Edit className="w-[14px] h-[14px]" />
                          </Button>
                          <Button 
                            variant="default" 
                            size="icon" 
                            className="h-8 w-8 bg-[#ff5b5c] hover:bg-[#e55253] text-white border-0 shadow-sm rounded-md"
                            title="Delete"
                          >
                            <Trash2 className="w-[14px] h-[14px]" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-10 text-gray-500 bg-gray-50/30">
                      No data available in table
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <GiftCodeDialog 
        open={isDialogOpen} 
        setOpen={setDialogOpen} 
        initialData={editingGiftCode} 
      />
    </div>
  )
}
