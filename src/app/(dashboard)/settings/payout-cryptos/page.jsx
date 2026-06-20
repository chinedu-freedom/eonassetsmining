"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, Info, Edit, Trash2, Plus, ArrowUpDown, Loader2 } from "lucide-react"
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { useFetchData, useDelete } from "@/hooks/useApi"
import { toast } from "sonner"
import Image from "next/image"

export default function PayoutCryptosPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortConfig, setSortConfig] = useState({ key: 'sort_order', direction: 'asc' })
  
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    cryptoId: null,
  })

  const { data: cryptos, isLoading } = useFetchData("/admin/settings/payout-cryptos")
  const deleteCryptoMutation = useDelete((id) => `/admin/settings/payout-cryptos/${id}`, "/admin/settings/payout-cryptos")

  const handleDeleteClick = (id) => {
    setConfirmDialog({ isOpen: true, cryptoId: id })
  }

  const executeDelete = async () => {
    if (confirmDialog.cryptoId) {
      try {
        await deleteCryptoMutation.mutateAsync(confirmDialog.cryptoId)
      } catch (error) {
        // error handled by hook
      } finally {
        setConfirmDialog({ isOpen: false, cryptoId: null })
      }
    }
  }

  const filteredCryptos = cryptos?.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.network.toLowerCase().includes(searchTerm.toLowerCase())
  ) || []

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    )
  }

  return (
    <div className="space-y-6 pb-10">
      <Card className="border-none shadow-sm bg-white rounded-md">
        <CardContent className="p-0">
          
          {/* Header Section */}
          <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h2 className="text-[1.2rem] font-medium text-[#475f7b]">Payout Cryptocurrencies</h2>
            <Link href="/settings/payout-cryptos/add">
              <Button className="bg-[#5A8DEE] hover:bg-[#4778d9] text-white px-4 h-10 font-medium rounded-sm shadow-sm border-0 flex items-center gap-2">
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
                <TableHeader>
                  <TableRow className="border-b border-gray-200 bg-transparent hover:bg-transparent">
                    <TableHead className="font-bold text-[#475f7b] text-[12px] uppercase w-[60px]">
                      <div className="flex items-center gap-1 cursor-pointer">S.N <ArrowUpDown className="w-3 h-3 text-gray-400" /></div>
                    </TableHead>
                    <TableHead className="font-bold text-[#475f7b] text-[12px] uppercase">
                      <div className="flex items-center gap-1 cursor-pointer">Icon <ArrowUpDown className="w-3 h-3 text-gray-400" /></div>
                    </TableHead>
                    <TableHead className="font-bold text-[#475f7b] text-[12px] uppercase">
                      <div className="flex items-center gap-1 cursor-pointer">Name <ArrowUpDown className="w-3 h-3 text-gray-400" /></div>
                    </TableHead>
                    <TableHead className="font-bold text-[#475f7b] text-[12px] uppercase">
                      <div className="flex items-center gap-1 cursor-pointer">Symbol <ArrowUpDown className="w-3 h-3 text-gray-400" /></div>
                    </TableHead>
                    <TableHead className="font-bold text-[#475f7b] text-[12px] uppercase">
                      <div className="flex items-center gap-1 cursor-pointer">Network <ArrowUpDown className="w-3 h-3 text-gray-400" /></div>
                    </TableHead>
                    <TableHead className="font-bold text-[#475f7b] text-[12px] uppercase">
                      <div className="flex items-center gap-1 cursor-pointer">Min/Max Amount <ArrowUpDown className="w-3 h-3 text-gray-400" /></div>
                    </TableHead>
                    <TableHead className="font-bold text-[#475f7b] text-[12px] uppercase">
                      <div className="flex items-center gap-1 cursor-pointer">Fee <ArrowUpDown className="w-3 h-3 text-gray-400" /></div>
                    </TableHead>
                    <TableHead className="font-bold text-[#475f7b] text-[12px] uppercase">
                      <div className="flex items-center gap-1 cursor-pointer">Sort Order <ArrowUpDown className="w-3 h-3 text-gray-400" /></div>
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
                  {filteredCryptos.length > 0 ? filteredCryptos.map((item, index) => (
                    <TableRow key={item.id} className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
                      <TableCell className="py-4 font-bold text-[13px] text-[#475f7b]">{index + 1}</TableCell>
                      <TableCell className="py-4">
                        <div className="flex items-center gap-1.5 text-gray-400">
                          {item.icon ? (
                            <img src={item.icon} alt={item.symbol} className="w-10 h-10 object-contain" />
                          ) : (
                            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-[11px] text-gray-500 font-bold">
                              {item.symbol.substring(0, 2)}
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="py-4 font-bold text-[13px] text-[#475f7b]">
                        {item.name}
                      </TableCell>
                      <TableCell className="py-4">
                        <span className="inline-flex items-center justify-center bg-pink-50 text-pink-500 px-2.5 py-1 rounded-[4px] text-[11px] font-bold">
                          {item.symbol}
                        </span>
                      </TableCell>
                      <TableCell className="py-4">
                        <div className="flex flex-col items-start">
                          <span className="inline-flex items-center justify-center bg-[#00CFDD] text-white px-3 py-1 rounded-[4px] text-[11px] font-bold">
                            {item.network}
                          </span>
                          <span className="text-[11px] text-gray-400 mt-1">{item.network_name}</span>
                        </div>
                      </TableCell>
                      <TableCell className="py-4 text-[13px] text-[#475f7b] font-medium">
                        {Number(item.min_amount).toFixed(2)} - {Number(item.max_amount).toFixed(2)}
                      </TableCell>
                      <TableCell className="py-4 text-[13px] text-[#475f7b] font-medium">
                        {Number(item.fee_percentage).toFixed(2)}% {Number(item.fixed_fee) > 0 ? `+ ${Number(item.fixed_fee).toFixed(2)}` : ''}
                      </TableCell>
                      <TableCell className="py-4 font-bold text-[13px] text-[#475f7b]">
                        {item.sort_order}
                      </TableCell>
                      <TableCell className="py-4">
                        {item.status ? (
                          <span className="inline-flex items-center justify-center bg-blue-600 text-white px-3 py-1.5 rounded-[4px] text-[11px] font-medium">
                            Active
                          </span>
                        ) : (
                          <span className="inline-flex items-center justify-center bg-[#ff5b5c] text-white px-3 py-1.5 rounded-[4px] text-[11px] font-medium">
                            Inactive
                          </span>
                        )}
                      </TableCell>
                      <TableCell className="py-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <Link href={`/settings/payout-cryptos/edit/${item.id}`}>
                            <Button size="icon" className="w-8 h-8 rounded-sm bg-[#FF9F43] hover:bg-[#e08b39] border-0 shadow-none">
                              <Edit className="w-4 h-4 text-white" />
                            </Button>
                          </Link>
                          <Button 
                            size="icon" 
                            disabled={deleteCryptoMutation.isPending}
                            onClick={() => handleDeleteClick(item.id)}
                            className="w-8 h-8 rounded-sm bg-[#ff5b5c] hover:bg-[#e04e4f] border-0 shadow-none"
                          >
                            <Trash2 className="w-4 h-4 text-white" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  )) : (
                    <TableRow>
                      <TableCell colSpan={10} className="text-center py-8 text-gray-500">
                        No payout cryptocurrencies found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Pagination Mock */}
            <div className="flex flex-col sm:flex-row justify-between items-center mt-6 text-[13px] text-gray-500 gap-4">
              <div>
                Showing {filteredCryptos.length > 0 ? 1 : 0} to {filteredCryptos.length} of {filteredCryptos.length} entries
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

      <Dialog open={confirmDialog.isOpen} onOpenChange={(isOpen) => setConfirmDialog({ ...confirmDialog, isOpen })}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this cryptocurrency? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmDialog({ isOpen: false, cryptoId: null })}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={executeDelete} disabled={deleteCryptoMutation.isPending}>
              {deleteCryptoMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Trash2 className="w-4 h-4 mr-2" />}
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
