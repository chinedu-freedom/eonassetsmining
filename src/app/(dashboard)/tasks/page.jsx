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
import { useFetchData, useDelete } from "@/hooks/useApi"
import DeleteConfirmationDialog from "@/components/modals/DeleteConfirmationDialog"

export default function TasksPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  
  const [isTaskDialogOpen, setIsTaskDialogOpen] = useState(false)
  const [selectedTask, setSelectedTask] = useState(null)

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [itemToDelete, setItemToDelete] = useState(null)

  const { data: tasksDataRes, isLoading } = useFetchData("/admin/rewards/tasks", ["admin-tasks"])
  const deleteMutation = useDelete((id) => `/admin/rewards/tasks/${id}`, ["admin-tasks"])

  const handleDeleteClick = (task) => {
    setItemToDelete(task)
    setDeleteDialogOpen(true)
  }

  const handleConfirmDelete = async () => {
    if (itemToDelete) {
      try {
        await deleteMutation.mutateAsync(itemToDelete.id)
        setDeleteDialogOpen(false)
        setItemToDelete(null)
      } catch (error) {
        // Handled by useApi
      }
    }
  }

  const tasksData = Array.isArray(tasksDataRes) ? tasksDataRes : []

  const filteredTasks = tasksData.filter((task) => {
    const matchesSearch =
      (task.task_name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (task.description || "").toLowerCase().includes(searchTerm.toLowerCase())
      
    const taskStatus = task.status ? "active" : "inactive"
    const matchesStatus = statusFilter === "all" || taskStatus === statusFilter

    return matchesSearch && matchesStatus
  })

  const totalTasks = tasksData.length
  const activeTasks = tasksData.filter((t) => t.status).length
  const inactiveTasks = totalTasks - activeTasks

  const stats = [
    {
      title: "Total Tasks",
      value: totalTasks.toString(),
      icon: ClipboardCheck,
      color: "text-blue-600",
      bg: "bg-blue-100",
    },
    {
      title: "Active Tasks",
      value: activeTasks.toString(),
      icon: CheckCircle,
      color: "text-green-600",
      bg: "bg-green-100",
    },
    {
      title: "Inactive Tasks",
      value: inactiveTasks.toString(),
      icon: Clock,
      color: "text-yellow-600",
      bg: "bg-yellow-100",
    }
  ]

  const getStatusColor = (status) => {
    if (status) return "bg-green-100 text-green-800"
    return "bg-yellow-100 text-yellow-800"
  }

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
      <Card className="border-none shadow-sm bg-white rounded-md">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4 w-full">
            <div className="flex items-center gap-4 w-full">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground z-10 pointer-events-none" />
                <Input
                  placeholder="Search tasks..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 bg-white border-gray-200 h-10 w-full"
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

      {/* Tasks Table */}
      <Card className="border-none shadow-sm bg-white rounded-md">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-gray-50/50 border-b">
                <TableRow className="hover:bg-transparent">
                  <TableHead className="w-[60px] font-bold text-gray-600 uppercase text-[12px] tracking-wider py-4 pl-6">#</TableHead>
                  <TableHead className="font-bold text-gray-600 uppercase text-[12px] tracking-wider py-4">NAME</TableHead>
                  <TableHead className="font-bold text-gray-600 uppercase text-[12px] tracking-wider py-4">INVITES REQUIRED</TableHead>
                  <TableHead className="font-bold text-gray-600 uppercase text-[12px] tracking-wider py-4">AMOUNT</TableHead>
                  <TableHead className="font-bold text-gray-600 uppercase text-[12px] tracking-wider py-4 max-w-[300px]">DESCRIPTION</TableHead>
                  <TableHead className="font-bold text-gray-600 uppercase text-[12px] tracking-wider py-4">STATUS</TableHead>
                  <TableHead className="font-bold text-gray-600 uppercase text-[12px] tracking-wider py-4 text-right pr-6 w-[120px]">ACTIONS</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-10 text-gray-500">
                      Loading...
                    </TableCell>
                  </TableRow>
                ) : filteredTasks.length > 0 ? (
                  filteredTasks.map((task, index) => (
                    <TableRow key={task.id} className="hover:bg-gray-50 border-b last:border-0">
                      <TableCell className="font-medium text-gray-700 text-[13px] py-4 pl-6">{index + 1}</TableCell>
                      <TableCell className="py-4">
                        <span className="font-medium text-gray-700 text-[13px]">{task.task_name}</span>
                      </TableCell>
                      <TableCell className="py-4">
                        <span className="font-medium text-gray-700 text-[13px]">{task.required_referrals}</span>
                      </TableCell>
                      <TableCell className="py-4">
                        <span className="font-medium text-gray-700 text-[13px]">${Number(task.reward_amount || 0).toFixed(2)}</span>
                      </TableCell>
                      <TableCell className="py-4 max-w-[300px] truncate text-gray-500 text-[13px]" title={task.description}>
                        {task.description}
                      </TableCell>
                      <TableCell className="py-4">
                        <span className={`text-[12px] px-2.5 py-1 rounded-md font-medium ${
                          task.status
                            ? 'bg-[#39DA8A]/10 text-[#39DA8A]' 
                            : 'bg-yellow-50 text-yellow-600'
                        }`}>
                          {task.status ? "Active" : "Inactive"}
                        </span>
                      </TableCell>
                      <TableCell className="py-4 text-right pr-6">
                        <div className="flex items-center justify-end space-x-2">
                          <Button 
                            variant="default" 
                            size="icon" 
                            className="h-8 w-8 bg-[#ffb822] hover:bg-[#e5a51f] text-white border-0 shadow-sm rounded-md"
                            title="Edit"
                            onClick={() => { setSelectedTask(task); setIsTaskDialogOpen(true); }}
                          >
                            <Edit className="w-[14px] h-[14px]" />
                          </Button>
                          <Button 
                            variant="default" 
                            size="icon" 
                            className="h-8 w-8 bg-[#ff5b5c] hover:bg-[#e55253] text-white border-0 shadow-sm rounded-md"
                            title="Delete"
                            onClick={() => handleDeleteClick(task)}
                          >
                            <Trash2 className="w-[14px] h-[14px]" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-10 text-gray-500 bg-gray-50/30">
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

      <DeleteConfirmationDialog 
        isOpen={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Task"
        description={`Are you sure you want to delete the task "${itemToDelete?.task_name}"? This action cannot be undone.`}
      />
    </div>
  )
}
