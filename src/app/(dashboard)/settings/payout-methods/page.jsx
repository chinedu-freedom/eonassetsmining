"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, Edit, Trash2, Plus, Loader2 } from "lucide-react"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useFetchData, useDelete } from "@/hooks/useApi"
import { Badge } from "@/components/ui/badge"

export default function PayoutMethodsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
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
    const matchesSearch = item.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.type?.toLowerCase().includes(searchTerm.toLowerCase())
    let matchesStatus = true
    if (statusFilter === "active") matchesStatus = item.status === true
    if (statusFilter === "inactive") matchesStatus = item.status === false

    return matchesSearch && matchesStatus
  }) || []

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between w-full mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Payout Methods</h1>
          <p className="text-muted-foreground text-sm">Manage fiat and crypto payment gateways for withdrawals</p>
        </div>
        <div className="flex items-center space-x-3">
          <Link href="/settings/payout-methods/add">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-sm-sm px-6 shadow-lg">
              <Plus className="w-4 h-4 mr-2" />
              Add Method
            </Button>
          </Link>
        </div>
      </div>

      {/* Filters */}
      <Card className="border-none shadow-sm bg-card">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4 w-full">
            <div className="flex items-center gap-4 w-full">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground z-10 pointer-events-none" />
                <Input
                  placeholder="Search by name or type..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 bg-background"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-36 bg-background">
                  <SelectValue placeholder="Status" />
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

      {/* Table */}
      <Card className="border-none shadow-sm bg-card">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            {isLoading ? (
              <div className="flex justify-center items-center py-10">
                <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
              </div>
            ) : (
              <Table className="min-w-[1000px]">
                <TableHeader className="bg-gray-50/50">
                  <TableRow>
                    <TableHead className="w-[60px] font-bold text-gray-500 uppercase text-xs whitespace-nowrap">S.N</TableHead>
                    <TableHead className="font-bold text-gray-500 uppercase text-xs whitespace-nowrap">NAME</TableHead>
                    <TableHead className="font-bold text-gray-500 uppercase text-xs whitespace-nowrap">TYPE</TableHead>
                    <TableHead className="font-bold text-gray-500 uppercase text-xs whitespace-nowrap">MIN/MAX</TableHead>
                    <TableHead className="font-bold text-gray-500 uppercase text-xs whitespace-nowrap">CHARGE</TableHead>
                    <TableHead className="font-bold text-gray-500 uppercase text-xs whitespace-nowrap">STATUS</TableHead>
                    <TableHead className="font-bold text-gray-500 uppercase text-xs text-right pr-6 whitespace-nowrap">ACTIONS</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredMethods.length > 0 ? filteredMethods.map((item, index) => (
                    <TableRow key={item.id} className="hover:bg-gray-50/50">
                      <TableCell className="font-medium text-gray-700">{index + 1}</TableCell>
                      <TableCell>
                        <span className="font-bold text-gray-800 text-[13px]">{item.name}</span>
                      </TableCell>
                      <TableCell>
                        {item.type?.toUpperCase() === 'BANK' && (
                          <Badge className="bg-[#5A8DEE] text-white hover:bg-[#5A8DEE]/90 border-0">
                            BANK
                          </Badge>
                        )}
                        {item.type?.toUpperCase() === 'CRYPTO' && (
                          <Badge className="bg-[#FF9F43] text-white hover:bg-[#FF9F43]/90 border-0">
                            CRYPTO
                          </Badge>
                        )}
                        {(item.type?.toUpperCase() !== 'BANK' && item.type?.toUpperCase() !== 'CRYPTO') && (
                          <Badge className="bg-gray-500 text-white hover:bg-gray-600 border-0">
                            {item.type?.toUpperCase()}
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-[13px] text-gray-700 font-medium">
                        ${Number(item.min_amount).toFixed(2)} - ${Number(item.max_amount).toFixed(2)}
                      </TableCell>
                      <TableCell className="text-[13px] text-gray-700 font-medium">
                        {Number(item.charges).toFixed(2)}%
                      </TableCell>
                      <TableCell>
                        {item.status ? (
                          <Badge className="bg-emerald-500 hover:bg-emerald-600 text-white border-0">
                            Active
                          </Badge>
                        ) : (
                          <Badge className="bg-rose-500 hover:bg-rose-600 text-white border-0">
                            Inactive
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right pr-6">
                        <div className="flex items-center justify-end gap-1.5">
                          <Link href={`/settings/payout-methods/edit/${item.id}`}>
                            <Button size="icon" variant="ghost" className="w-8 h-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                              <Edit className="w-4 h-4" />
                            </Button>
                          </Link>
                          <Button 
                            size="icon" 
                            variant="ghost"
                            disabled={deleteMethodMutation.isPending}
                            onClick={() => handleDeleteClick(item.id)}
                            className="w-8 h-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            {deleteMethodMutation.isPending && confirmDialog.methodId === item.id ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <Trash2 className="w-4 h-4" />
                            )}
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
