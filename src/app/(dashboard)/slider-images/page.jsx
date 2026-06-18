"use client"

import { useState } from "react"
import { Search, Edit, Trash2, Plus, Image as ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import SliderDialog from "@/components/modals/SliderDialog"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const sliderData = [
  { id: "1", sn: 1, photo: "/placeholder-1", pageView: "home_page", status: "active" },
  { id: "2", sn: 2, photo: "/placeholder-2", pageView: "home_page", status: "active" },
  { id: "3", sn: 3, photo: "/placeholder-3", pageView: "home_page", status: "active" },
]

export default function SliderImagesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isDialogOpen, setDialogOpen] = useState(false)
  const [editingSlider, setEditingSlider] = useState(null)

  const filteredData = sliderData.filter((item) => {
    const matchesSearch = item.pageView.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || item.status.toLowerCase() === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between w-full mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Slider Lists</h1>
        </div>
        <div className="flex items-center space-x-3">
          <Button 
            className="bg-[#5A8DEE] hover:bg-[#4778d9] text-white h-10 px-4 rounded-md"
            onClick={() => {
              setEditingSlider(null)
              setDialogOpen(true)
            }}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add New Item
          </Button>
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
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 bg-white border-gray-200 h-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-52 bg-white border-gray-200 h-10">
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

      {/* Table Section */}
      <Card className="border-none shadow-sm bg-white rounded-md">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-gray-50/50 border-b">
                <TableRow className="hover:bg-transparent">
                  <TableHead className="w-[80px] font-bold text-gray-600 uppercase text-[12px] tracking-wider py-4 pl-6">S.N</TableHead>
                  <TableHead className="font-bold text-gray-600 uppercase text-[12px] tracking-wider py-4">PHOTO</TableHead>
                  <TableHead className="font-bold text-gray-600 uppercase text-[12px] tracking-wider py-4">PAGE VIEW</TableHead>
                  <TableHead className="font-bold text-gray-600 uppercase text-[12px] tracking-wider py-4">STATUS</TableHead>
                  <TableHead className="font-bold text-gray-600 uppercase text-[12px] tracking-wider py-4 text-right pr-6 w-[120px]">ACTIVE</TableHead>
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
                        <div className="w-[60px] h-[36px] bg-[#e6ebf5] border border-gray-100 rounded-sm flex items-center justify-center text-[#5A8DEE] shadow-sm">
                          <ImageIcon className="w-4 h-4 opacity-50" />
                        </div>
                      </TableCell>
                      <TableCell className="py-4">
                        <span className="font-medium text-gray-700 text-[13px]">{item.pageView}</span>
                      </TableCell>
                      <TableCell className="py-4">
                        <span className="font-medium text-gray-700 text-[13px]">{item.status}</span>
                      </TableCell>
                      <TableCell className="py-4 text-right pr-6">
                        <div className="flex items-center justify-end space-x-2">
                          <Button 
                            variant="default" 
                            size="icon" 
                            className="h-8 w-8 bg-[#ffb822] hover:bg-[#e5a51f] text-white border-0 shadow-sm rounded-md"
                            title="Edit"
                            onClick={() => {
                              setEditingSlider(item)
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
                    <TableCell colSpan={5} className="text-center py-10 text-gray-500">
                      No slider images found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <SliderDialog 
        open={isDialogOpen} 
        setOpen={setDialogOpen} 
        initialData={editingSlider} 
      />
    </div>
  )
}
