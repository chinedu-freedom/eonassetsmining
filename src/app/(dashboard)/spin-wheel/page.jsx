"use client"

import { useState } from "react"
import { Search, Edit, Trash2, EyeOff, Settings, Plus, Trophy, Target, PieChart, FileText, Copy, Printer } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const spinPrizesData = [
  { id: "1", position: 1, color: "#10b981", name: "0.5 USDT", subtext: "solar:coin-bold", value: 0.50, weight: 95, probability: "30.25%", isJackpot: false, status: "ACTIVE" },
  { id: "2", position: 2, color: "#3b82f6", name: "0.8 USDT", subtext: "solar:coins-bold", value: 0.80, weight: 60, probability: "19.11%", isJackpot: false, status: "ACTIVE" },
  { id: "3", position: 3, color: "#f59e0b", name: "1 USDT", subtext: "solar:diamond-bold", value: 1.00, weight: 40, probability: "12.74%", isJackpot: false, status: "ACTIVE" },
  { id: "4", position: 4, color: "#8b5cf6", name: "2.5 USDT", subtext: "solar:cup-star-bold", value: 2.50, weight: 15, probability: "4.78%", isJackpot: false, status: "ACTIVE" },
  { id: "5", position: 5, color: "#6b7280", name: "Try again", subtext: "solar:refresh-bold", value: 0.00, weight: 98, probability: "31.21%", isJackpot: false, status: "ACTIVE" },
  { id: "6", position: 6, color: "#ec4899", name: "5 USDT", subtext: "solar:gift-bold", value: 5.00, weight: 3, probability: "0.96%", isJackpot: false, status: "ACTIVE" },
  { id: "7", position: 7, color: "#14b8a6", name: "10 USDT", subtext: "solar:coin-bold", value: 10.00, weight: 2, probability: "0.64%", isJackpot: false, status: "ACTIVE" },
  { id: "8", position: 8, color: "#ef4444", name: "JACKPOT 25", subtext: "solar:crown-bold", value: 25.00, weight: 1, probability: "0.32%", isJackpot: true, status: "ACTIVE" },
]

export default function SpinWheelPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  // Calculated Stats
  const totalWeight = spinPrizesData.reduce((acc, curr) => acc + curr.weight, 0)
  const totalPrizes = spinPrizesData.length
  const activePrizes = spinPrizesData.filter(p => p.status === "ACTIVE").length

  const stats = [
    {
      title: "Total Prizes",
      value: totalPrizes.toString(),
      icon: Trophy,
      color: "text-blue-600",
      bg: "bg-blue-100",
    },
    {
      title: "Total Weight",
      value: totalWeight.toString(),
      icon: Target,
      color: "text-purple-600",
      bg: "bg-purple-100",
    },
    {
      title: "Active Prizes",
      value: activePrizes.toString(),
      icon: PieChart,
      color: "text-green-600",
      bg: "bg-green-100",
    }
  ]

  const filteredPrizes = spinPrizesData.filter((prize) => {
    const matchesSearch =
      prize.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prize.subtext.toLowerCase().includes(searchTerm.toLowerCase())
      
    const matchesStatus = statusFilter === "all" || prize.status.toLowerCase() === statusFilter

    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between w-full mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Spin Wheel Prizes</h1>
          <p className="text-muted-foreground text-sm">Manage prizes, probabilities, and weights for the spin wheel</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" className="text-[#00cfdd] border-[#00cfdd] hover:bg-[#00cfdd]/10">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
          <Button className="bg-[#5A8DEE] hover:bg-[#4778d9] text-white">
            <Plus className="w-4 h-4 mr-2" />
            Add Prize
          </Button>
        </div>
      </div>

      {/* Info Banner */}
      <div className="bg-[#00cfdd] text-white px-4 py-3 rounded-md flex items-center shadow-sm">
        <Target className="w-5 h-5 mr-3" />
        <span className="font-medium">Total weight of active prizes: <strong>{totalWeight}</strong></span>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow border-border shadow-sm bg-card rounded-xl">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400">{stat.value}</h3>
                  <p className="text-[13px] font-medium text-muted-foreground mt-1 tracking-wide">{stat.title}</p>
                </div>
                <div className={`w-8 h-8 rounded-md bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-400`}>
                  <stat.icon className="w-4 h-4" strokeWidth={2} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters & Export Options */}
      <Card className="border-none shadow-sm bg-card">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4 w-full">
            {/* Export Buttons Removed */}
            <div className="flex items-center gap-4 w-full">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground z-10 pointer-events-none" />
                <Input
                  placeholder="Search prizes..."
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

      {/* Prizes Table */}
      <Card className="border-none shadow-sm bg-card">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-gray-50/50">
                <TableRow>
                  <TableHead className="w-[80px] font-bold text-gray-500 uppercase text-xs">POSITION</TableHead>
                  <TableHead className="font-bold text-gray-500 uppercase text-xs w-[80px]">COLOR</TableHead>
                  <TableHead className="font-bold text-gray-500 uppercase text-xs">NAME</TableHead>
                  <TableHead className="font-bold text-gray-500 uppercase text-xs">VALUE</TableHead>
                  <TableHead className="font-bold text-gray-500 uppercase text-xs">WEIGHT</TableHead>
                  <TableHead className="font-bold text-gray-500 uppercase text-xs">PROBABILITY</TableHead>
                  <TableHead className="font-bold text-gray-500 uppercase text-xs text-center">JACKPOT</TableHead>
                  <TableHead className="font-bold text-gray-500 uppercase text-xs">STATUS</TableHead>
                  <TableHead className="font-bold text-gray-500 uppercase text-xs text-right pr-6">ACTIONS</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPrizes.length > 0 ? (
                  filteredPrizes.map((prize) => (
                    <TableRow key={prize.id} className="hover:bg-gray-50/50">
                      <TableCell className="font-medium text-gray-700">{prize.position}</TableCell>
                      <TableCell>
                        <div 
                          className="w-6 h-6 rounded-sm shadow-sm" 
                          style={{ backgroundColor: prize.color }}
                          title={prize.color}
                        />
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="font-bold text-gray-800 text-[13px]">{prize.name}</span>
                          <span className="text-[11px] text-gray-400">{prize.subtext}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          className={prize.value > 0 ? "bg-[#39DA8A] text-white hover:bg-[#2bbd74] border-0" : "bg-[#475f7b] text-white hover:bg-[#34465b] border-0"} 
                          variant="outline"
                        >
                          ${prize.value.toFixed(2)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-gray-700">{prize.weight}</TableCell>
                      <TableCell>
                        <Badge className="bg-gray-200 text-gray-600 hover:bg-gray-300 border-0" variant="secondary">
                          {prize.probability}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        {prize.isJackpot ? (
                          <Badge className="bg-[#f59e0b] hover:bg-[#d97706] text-white border-0 px-3 py-0.5">
                            ★ JACKPOT
                          </Badge>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge className="bg-[#39DA8A] hover:bg-[#2bbd74] text-white border-0 text-[10px] tracking-wider uppercase px-2 py-0.5">
                          {prize.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right pr-6">
                        <div className="flex items-center justify-end space-x-1.5">
                          <Button 
                            variant="default" 
                            size="icon" 
                            className="h-8 w-8 bg-[#f59e0b] hover:bg-[#d97706] text-white border-0"
                            title="Edit"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="default" 
                            size="icon" 
                            className="h-8 w-8 bg-[#475f7b] hover:bg-[#34465b] text-white border-0"
                            title="Disable/Hide"
                          >
                            <EyeOff className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="default" 
                            size="icon" 
                            className="h-8 w-8 bg-[#ff5b5c] hover:bg-red-500 text-white border-0"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center py-10 text-gray-500">
                      No prizes found
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
