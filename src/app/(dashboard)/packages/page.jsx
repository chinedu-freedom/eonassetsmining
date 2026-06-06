"use client"

import { useState } from "react"
import { Search, Edit, Download, Package, CheckCircle, Clock, XCircle, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import PlanDialog from "@/components/modals/PlanDialog"

const plans = [
  {
    id: "PKG-001",
    title: "Basic Miner",
    minDeposit: 100,
    maxDeposit: 500,
    dailyProfit: 1.5,
    duration: 30,
    isFixedDeposit: false,
    status: "Active",
    createdAt: "2024-05-31",
  },
  {
    id: "PKG-002",
    title: "Pro Miner",
    minDeposit: 500,
    maxDeposit: 2000,
    dailyProfit: 2.5,
    duration: 60,
    isFixedDeposit: true,
    status: "Active",
    createdAt: "2024-05-30",
  },
  {
    id: "PKG-003",
    title: "Elite Miner",
    minDeposit: 2000,
    maxDeposit: 10000,
    dailyProfit: 4.0,
    duration: 90,
    isFixedDeposit: true,
    status: "Inactive",
    createdAt: "2024-05-29",
  },
]

const stats = [
  {
    title: "Total Packages",
    value: "3",
    change: "+1",
    icon: Package,
    color: "text-blue-600",
    bg: "bg-blue-100",
  },
  {
    title: "Active Packages",
    value: "2",
    change: "+2",
    icon: CheckCircle,
    color: "text-green-600",
    bg: "bg-green-100",
  },
  {
    title: "Inactive Packages",
    value: "1",
    change: "-1",
    icon: Clock,
    color: "text-yellow-600",
    bg: "bg-yellow-100",
  },
  {
    title: "Highest Profit",
    value: "4.0%",
    change: "+0.5%",
    icon: XCircle,
    color: "text-purple-600",
    bg: "bg-purple-100",
  },
]

export default function PlansManagementPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")

  // Modal State
  const [open, setOpen] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState(null)

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-green-100 text-green-800"
      case "inactive":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTypeColor = (isFixed) => {
    if (isFixed) {
      return "bg-purple-100 text-purple-800"
    }
    return "bg-blue-100 text-blue-800"
  }

  const filteredPlans = plans.filter((plan) => {
    const matchesSearch =
      plan.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plan.title.toLowerCase().includes(searchTerm.toLowerCase())
      
    const matchesStatus = statusFilter === "all" || plan.status.toLowerCase() === statusFilter
    
    let matchesType = true;
    if (typeFilter === "fixed") matchesType = plan.isFixedDeposit === true;
    if (typeFilter === "flexible") matchesType = plan.isFixedDeposit === false;

    return matchesSearch && matchesStatus && matchesType
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between w-full mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Investment Packages</h1>
          <p className="text-muted-foreground text-sm">Manage and track investment plans</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button 
            onClick={() => {
              setSelectedPlan(null)
              setOpen(true)
            }}
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Package
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow border-border shadow-sm bg-card rounded-xl">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400">{stat.value}</h3>
                  <p className="text-[13px] font-medium text-muted-foreground mt-1 tracking-wide">{stat.title}</p>
                </div>
                <div className="w-8 h-8 rounded-md bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-400">
                  <stat.icon className="w-4 h-4" strokeWidth={2} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card className="border-none shadow-sm bg-card">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search packages..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-background"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48 bg-background">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-48 bg-background">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="fixed">Fixed Deposit</SelectItem>
                <SelectItem value="flexible">Flexible</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Orders Table */}
      <Card className="border-none shadow-sm bg-card">
        <CardHeader>
          <CardTitle>Packages ({filteredPlans.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Package ID</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Min - Max Deposit</TableHead>
                  <TableHead>Daily Profit</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPlans.map((plan) => (
                  <TableRow key={plan.id}>
                    <TableCell className="font-medium">{plan.id}</TableCell>
                    <TableCell>
                      <div className="font-medium text-foreground">{plan.title}</div>
                      <div className="text-sm text-muted-foreground">Created: {plan.createdAt}</div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium text-foreground">${plan.minDeposit} - ${plan.maxDeposit}</div>
                    </TableCell>
                    <TableCell className="font-medium text-foreground">{plan.dailyProfit}%</TableCell>
                    <TableCell className="font-medium">{plan.duration} Days</TableCell>
                    <TableCell>
                      <Badge className={getTypeColor(plan.isFixedDeposit)} variant="outline">
                        {plan.isFixedDeposit ? "Fixed" : "Flexible"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(plan.status)} variant="outline">{plan.status}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="h-8 w-8 p-0"
                          onClick={() => {
                            setSelectedPlan(plan)
                            setOpen(true)
                          }}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm" className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <PlanDialog
        open={open}
        setOpen={setOpen}
        initialData={selectedPlan}
      />
    </div>
  )
}