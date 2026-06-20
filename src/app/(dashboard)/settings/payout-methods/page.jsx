"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, Edit, Trash2, Plus, Globe, ArrowUpDown, Loader2 } from "lucide-react"
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

export default function PayoutMethodsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    methodId: null,
  })

  const { data: methods, isLoading } = useFetchData("/admin/settings/payment-methods")
  const deleteMethodMutation = useDelete((id) => `/admin/settings/payment-methods/${id}`, "/admin/settings/payment-methods")

  const handleDeleteClick = (id) => {
    setConfirmDialog({ isOpen: true, methodId: id })
  }

  const executeDelete = async () => {
    if (confirmDialog.methodId) {
      try {
        await deleteMethodMutation.mutateAsync(confirmDialog.methodId)
      } catch (error) {
        // error handled
      } finally {
        setConfirmDialog({ isOpen: false, methodId: null })
      }
    }
  }

  const filteredMethods = methods?.filter((item) => {
    return item.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
           item.type?.toLowerCase().includes(searchTerm.toLowerCase())
  }) || []

  return (
    <div className="space-y-6 pb-10">
      <Card className="border-none shadow-sm bg-white rounded-md">
        <CardContent className="p-0">
          
          {/* Header Section */}
          <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h2 className="text-[1.2rem] font-medium text-[#475f7b]">Payout Methods (Withdrawals)</h2>
            <Link href="/settings/payout-methods/add">
              <Button className="bg-[#5A8DEE] hover:bg-[#4778d9] text-white px-4 h-10 font-medium rounded-sm-[4px] shadow-sm border-0 flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Add New
              </Button>
            </Link>
          </div>

          <div className="p-6">
            
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div className="flex rounded-md overflow-hidden border border-[#475f7b]">
                {/* Export placeholders */}
              </div>

              {/* Search */}
              <div className="flex items-center gap-2">
                <span className="text-[13px] text-gray-500">Search:</span>
                <Input 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-[200px] h-8 border-gray-200 focus-visible:ring-0 text-[13px]"
                  placeholder="Search by name..."
                />
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              {isLoading ? (
                <div className="flex justify-center items-center py-10">
                  <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
                </div>
              ) : (
                <Table className="min-w-[1000px] whitespace-nowrap">
                  <TableHeader className="min-w-[1000px] whitespace-nowrap">
                    <TableRow className="border-b border-gray-200 bg-transparent hover:bg-transparent min-w-[1000px] whitespace-nowrap">
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
                  <TableBody className="min-w-[1000px] whitespace-nowrap">
                    {filteredMethods.length > 0 ? filteredMethods.map((item, index) => (
                      <TableRow key={item.id} className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors min-w-[1000px] whitespace-nowrap">
                        <TableCell className="py-4 font-bold text-[13px] text-[#475f7b]">{index + 1}</TableCell>
                        <TableCell className="py-4">
                          <span className="font-bold text-[13px] text-[#475f7b]">{item.name}</span>
                        </TableCell>
                        <TableCell className="py-4">
                          {item.type?.toUpperCase() === 'BANK' && (
                            <span className="inline-flex items-center justify-center bg-[#5A8DEE] text-white px-4 py-1.5 rounded-[4px] text-[11px] font-bold tracking-wider">
                              BANK
                            </span>
                          )}
                          {item.type?.toUpperCase() === 'CRYPTO' && (
                            <span className="inline-flex items-center justify-center bg-[#FF9F43] text-white px-4 py-1.5 rounded-[4px] text-[11px] font-bold tracking-wider">
                              CRYPTO
                            </span>
                          )}
                          {(item.type?.toUpperCase() !== 'BANK' && item.type?.toUpperCase() !== 'CRYPTO') && (
                            <span className="inline-flex items-center justify-center bg-gray-500 text-white px-4 py-1.5 rounded-[4px] text-[11px] font-bold tracking-wider">
                              {item.type?.toUpperCase()}
                            </span>
                          )}
                        </TableCell>
                        <TableCell className="py-4 text-[13px] text-[#475f7b] font-medium">
                          ${item.min_amount} - ${item.max_amount}
                        </TableCell>
                        <TableCell className="py-4 text-[13px] text-[#475f7b] font-medium">
                          {item.charges}%
                        </TableCell>
                        <TableCell className="py-4">
                          {item.status ? (
                            <span className="inline-flex items-center justify-center bg-blue-600 text-white px-3 py-1.5 rounded-[4px] text-[11px] font-bold tracking-wider">
                              ACTIVE
                            </span>
                          ) : (
                            <span className="inline-flex items-center justify-center bg-[#ff5b5c] text-white px-3 py-1.5 rounded-[4px] text-[11px] font-bold tracking-wider">
                              INACTIVE
                            </span>
                          )}
                        </TableCell>
                        <TableCell className="py-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <Link href={`/settings/payout-methods/edit/${item.id}`}>
                              <Button size="icon" className="w-8 h-8 rounded-sm-[4px] bg-[#FF9F43] hover:bg-[#e08b39] border-0 shadow-none">
                                <Edit className="w-4 h-4 text-white" />
                              </Button>
                            </Link>
                            <Button 
                              size="icon" 
                              disabled={deleteMethodMutation.isPending}
                              onClick={() => handleDeleteClick(item.id)}
                              className="w-8 h-8 rounded-sm-[4px] bg-[#ff5b5c] hover:bg-[#e04e4f] border-0 shadow-none"
                            >
                              <Trash2 className="w-4 h-4 text-white" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    )) : (
                      <TableRow>
                        <TableCell colSpan={7} className="py-8 text-center text-gray-500">
                          No payout methods found.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              )}
            </div>

          </div>
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <Dialog open={confirmDialog.isOpen} onOpenChange={(isOpen) => setConfirmDialog({ ...confirmDialog, isOpen })}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this payout method? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmDialog({ isOpen: false, methodId: null })}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={executeDelete} disabled={deleteMethodMutation.isPending}>
              {deleteMethodMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Trash2 className="w-4 h-4 mr-2" />}
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
