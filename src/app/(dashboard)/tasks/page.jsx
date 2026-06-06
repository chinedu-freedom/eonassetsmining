"use client"

import { useState } from "react"
import { Search, Edit, Trash2, ClipboardCheck, CheckCircle, Clock, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import TaskDialog from "@/components/modals/TaskDialog"

const tasksData = [
  {
    id: "1",
    name: "Invite 1 registered Users to claim",
    invitesRequired: 1,
    amount: 3.00,
    description: "Invite 5 friends to complete activation - upgrade to VIP1 and get cash rewards.",
    status: "Active",
  },
  {
    id: "2",
    name: "Invite 10 users",
    invitesRequired: 10,
    amount: 10.00,
    description: "claim 10 usdt",
    status: "Active",
  }
]

const stats = [
  {
    title: "Total Tasks",
    value: "2",
    icon: ClipboardCheck,
    color: "text-blue-600",
    bg: "bg-blue-100",
  },
  {
    title: "Active Tasks",
    value: "2",
    icon: CheckCircle,
    color: "text-green-600",
    bg: "bg-green-100",
  },
  {
    title: "Inactive Tasks",
    value: "0",
    icon: Clock,
    color: "text-yellow-600",
    bg: "bg-yellow-100",
  }
]

export default function TasksPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  
  const [isTaskDialogOpen, setIsTaskDialogOpen] = useState(false)
  const [selectedTask, setSelectedTask] = useState(null)

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

  const filteredTasks = tasksData.filter((task) => {
    const matchesSearch =
      task.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase())
      
    const matchesStatus = statusFilter === "all" || task.status.toLowerCase() === statusFilter

    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between w-full mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Tasks Management</h1>
          <p className="text-muted-foreground text-sm">Manage and track user invitation tasks</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button onClick={() => { setSelectedTask(null); setIsTaskDialogOpen(true); }}>
            <Plus className="w-4 h-4 mr-2" />
            Add Task
          </Button>
        </div>
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

      {/* Filters */}
      <Card className="border-none shadow-sm bg-card">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search tasks..."
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
          </div>
        </CardContent>
      </Card>

      {/* Tasks Table */}
      <Card className="border-none shadow-sm bg-card">
        <CardHeader>
          <CardTitle>Tasks ({filteredTasks.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[80px]">S.N</TableHead>
                  <TableHead className="text-xs font-bold text-gray-500 tracking-wider">NAME</TableHead>
                  <TableHead className="text-xs font-bold text-gray-500 tracking-wider">INVITES REQUIRED</TableHead>
                  <TableHead className="text-xs font-bold text-gray-500 tracking-wider">AMOUNT</TableHead>
                  <TableHead className="text-xs font-bold text-gray-500 tracking-wider max-w-[300px]">DESCRIPTION</TableHead>
                  <TableHead className="text-xs font-bold text-gray-500 tracking-wider">STATUS</TableHead>
                  <TableHead className="text-xs font-bold text-gray-500 tracking-wider text-right">ACTIONS</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTasks.length > 0 ? (
                  filteredTasks.map((task, index) => (
                    <TableRow key={task.id}>
                      <TableCell className="font-medium text-gray-900">{index + 1}</TableCell>
                      <TableCell>
                        <div className="font-medium text-gray-900">{task.name}</div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium text-gray-900">{task.invitesRequired}</div>
                      </TableCell>
                      <TableCell className="font-medium text-gray-900">${task.amount.toFixed(2)}</TableCell>
                      <TableCell className="max-w-[300px] truncate text-gray-600" title={task.description}>
                        {task.description}
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(task.status)} variant="outline">{task.status}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <Button 
                            variant="default" 
                            size="icon" 
                            className="h-8 w-8 bg-yellow-400 hover:bg-yellow-500 text-white border-0"
                            onClick={() => { setSelectedTask(task); setIsTaskDialogOpen(true); }}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="default" 
                            size="icon" 
                            className="h-8 w-8 bg-[#ff5b5c] hover:bg-red-500 text-white border-0"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-10 text-gray-500">
                      No tasks found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      
      <TaskDialog 
        open={isTaskDialogOpen} 
        setOpen={setIsTaskDialogOpen} 
        initialData={selectedTask} 
      />
    </div>
  )
}
