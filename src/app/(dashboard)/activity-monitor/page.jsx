"use client"

import { useState } from "react"
import { History, Search, RotateCcw, Filter, LogIn, UserPlus, Dices, CalendarCheck, Maximize, Database } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const stats = [
  { title: "ACTIVITIES TODAY", value: "0", bg: "bg-gradient-to-r from-[#7367F0] to-[#9E95F5]" },
  { title: "ACTIVE USERS", value: "0", bg: "bg-gradient-to-r from-[#28C76F] to-[#48DA89]" },
  { title: "LOGINS TODAY", value: "0", bg: "bg-gradient-to-r from-[#00CFE8] to-[#2BD9F0]" },
  { title: "DEPOSITS TODAY", value: "0", bg: "bg-gradient-to-r from-[#EA5455] to-[#F08182]" }, // actually pink
  { title: "WITHDRAWALS", value: "0", bg: "bg-gradient-to-r from-[#FF9F43] to-[#FFB76B]" }, // orange/red
  { title: "REGISTRATIONS", value: "0", bg: "bg-gradient-to-r from-[#4B4B4B] to-[#7A7A7A]" }, // dark blue/grey
]

// Overriding some exact colors to match the image better based on visual check
const customStats = [
  { title: "ACTIVITIES TODAY", value: "0", bg: "bg-[#7e56c5]" },
  { title: "ACTIVE USERS", value: "0", bg: "bg-[#29d378]" },
  { title: "LOGINS TODAY", value: "0", bg: "bg-[#4cc5d9]" },
  { title: "DEPOSITS TODAY", value: "0", bg: "bg-[#f2639b]" },
  { title: "WITHDRAWALS", value: "0", bg: "bg-[#f45c43]" },
  { title: "REGISTRATIONS", value: "0", bg: "bg-[#354877]" },
]

const activityData = [
  {
    id: "#361",
    time: { date: "Jun 05, 2026", time: "21:01:34", ago: "17 hours ago" },
    user: { email: "chinedufreedom10@gmail.com", id: "34" },
    action: "USER LOGIN",
    actionColor: "bg-[#00cfe8] hover:bg-[#00cfe8]/90",
    icon: LogIn,
    ip: "102.90.99.105",
    admin: "-",
  },
  {
    id: "#360",
    time: { date: "May 27, 2026", time: "14:24:26", ago: "1 week ago" },
    user: { email: "balleryoung88@gmail.com", id: "35" },
    action: "USER REGISTERED",
    actionColor: "bg-[#28c76f] hover:bg-[#28c76f]/90",
    icon: UserPlus,
    ip: "102.90.102.152",
    admin: "-",
  },
  {
    id: "#359",
    time: { date: "May 27, 2026", time: "10:15:55", ago: "1 week ago" },
    user: { email: "chinedufreedom10@gmail.com", id: "34" },
    action: "USER LOGIN",
    actionColor: "bg-[#00cfe8] hover:bg-[#00cfe8]/90",
    icon: LogIn,
    ip: "102.90.101.127",
    admin: "-",
  },
  {
    id: "#358",
    time: { date: "May 27, 2026", time: "10:13:22", ago: "1 week ago" },
    user: { email: "chinedufreedom10@gmail.com", id: "34" },
    action: "SPIN WHEEL",
    actionColor: "bg-[#00cfe8] hover:bg-[#00cfe8]/90",
    icon: Dices,
    ip: "102.90.101.127",
    admin: "-",
  },
  {
    id: "#357",
    time: { date: "May 27, 2026", time: "10:12:20", ago: "1 week ago" },
    user: { email: "chinedufreedom10@gmail.com", id: "34" },
    action: "DAILY CHECK-IN",
    actionColor: "bg-[#28c76f] hover:bg-[#28c76f]/90",
    icon: CalendarCheck,
    ip: "102.90.101.127",
    admin: "-",
  },
]

export default function ActivityMonitorPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [ipTerm, setIpTerm] = useState("")
  const [actionType, setActionType] = useState("all")
  const [dateFrom, setDateFrom] = useState("")
  const [dateTo, setDateTo] = useState("")

  const filteredData = activityData.filter((record) => {
    const matchesSearch = record.user.email.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          record.user.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesIp = record.ip.toLowerCase().includes(ipTerm.toLowerCase())
    
    let matchesAction = true
    if (actionType !== "all") {
      const actionName = record.action.toLowerCase()
      if (actionType === "login" && !actionName.includes("login")) matchesAction = false
      if (actionType === "register" && !actionName.includes("registered")) matchesAction = false
      if (actionType === "spin" && !actionName.includes("spin")) matchesAction = false
      if (actionType === "checkin" && !actionName.includes("check-in")) matchesAction = false
    }

    let matchesDate = true
    if (dateFrom || dateTo) {
      const recordDate = new Date(record.time.date)
      if (dateFrom && recordDate < new Date(dateFrom)) matchesDate = false
      if (dateTo && recordDate > new Date(dateTo)) matchesDate = false
    }

    return matchesSearch && matchesIp && matchesAction && matchesDate
  })

  return (
    <div className="space-y-6">
      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {customStats.map((stat, index) => (
          <div key={index} className={`${stat.bg} rounded-xl p-4 text-white shadow-sm flex flex-col items-center justify-center min-h-[90px]`}>
            <div className="text-2xl md:text-3xl font-bold mb-1">{stat.value}</div>
            <div className="text-[10px] md:text-[11px] font-semibold tracking-wider uppercase text-white/90 text-center leading-tight">{stat.title}</div>
          </div>
        ))}
      </div>

      {/* Main Container */}
      <Card className="border-none shadow-sm bg-white rounded-md overflow-hidden">
        
        {/* Header Section */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2 text-gray-700">
              <History className="w-5 h-5 text-gray-500" />
              <h2 className="text-[18px] font-semibold text-gray-800">Activity Monitor</h2>
            </div>
            <Button className="bg-[#94a3b8] hover:bg-[#8292a8] text-white h-9 px-4 rounded-md pointer-events-none">
              <Database className="w-4 h-4 mr-2" />
              TOTAL: 23 RECORDS
            </Button>
          </div>

          {/* Filters Row */}
          <div className="bg-[#f8f9fa] p-4 rounded-md flex flex-wrap gap-4 items-end">
            <div className="flex-1 min-w-[150px]">
              <label className="text-[11px] font-semibold text-gray-500 mb-1.5 block">Action Type</label>
              <Select value={actionType} onValueChange={setActionType}>
                <SelectTrigger className="bg-white border-gray-200 h-9 text-gray-600">
                  <SelectValue placeholder="All Actions" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Actions</SelectItem>
                  <SelectItem value="login">User Login</SelectItem>
                  <SelectItem value="register">User Registered</SelectItem>
                  <SelectItem value="spin">Spin Wheel</SelectItem>
                  <SelectItem value="checkin">Daily Check-in</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1 min-w-[200px]">
              <label className="text-[11px] font-semibold text-gray-500 mb-1.5 block">User (ID/Username/Email)</label>
              <Input
                placeholder="Search user..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-white border-gray-200 h-9 placeholder:text-gray-400"
              />
            </div>
            <div className="flex-1 min-w-[150px]">
              <label className="text-[11px] font-semibold text-gray-500 mb-1.5 block">IP Address</label>
              <Input
                placeholder="e.g. 192.168.1.1"
                value={ipTerm}
                onChange={(e) => setIpTerm(e.target.value)}
                className="bg-white border-gray-200 h-9 placeholder:text-gray-400"
              />
            </div>
            <div className="w-[140px]">
              <label className="text-[11px] font-semibold text-gray-500 mb-1.5 block">Date From</label>
              <Input
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
                className="bg-white border-gray-200 h-9 text-gray-500"
              />
            </div>
            <div className="w-[140px]">
              <label className="text-[11px] font-semibold text-gray-500 mb-1.5 block">Date To</label>
              <Input
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
                className="bg-white border-gray-200 h-9 text-gray-500"
              />
            </div>

          </div>
        </div>

        {/* Table Section */}
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-gray-50/50 border-y">
              <TableRow className="hover:bg-transparent">
                <TableHead className="font-bold text-gray-500 uppercase text-[11px] tracking-wider py-4 w-[60px] pl-6">ID</TableHead>
                <TableHead className="font-bold text-gray-500 uppercase text-[11px] tracking-wider py-4 min-w-[140px]">TIME</TableHead>
                <TableHead className="font-bold text-gray-500 uppercase text-[11px] tracking-wider py-4 min-w-[250px]">USER</TableHead>
                <TableHead className="font-bold text-gray-500 uppercase text-[11px] tracking-wider py-4 min-w-[180px]">ACTION</TableHead>
                <TableHead className="font-bold text-gray-500 uppercase text-[11px] tracking-wider py-4 min-w-[140px]">DETAILS</TableHead>
                <TableHead className="font-bold text-gray-500 uppercase text-[11px] tracking-wider py-4 min-w-[130px]">IP ADDRESS</TableHead>
                <TableHead className="font-bold text-gray-500 uppercase text-[11px] tracking-wider py-4">ADMIN</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((record, index) => (
                <TableRow key={index} className="hover:bg-gray-50 border-b last:border-0">
                  <TableCell className="font-medium text-gray-500 text-[13px] py-4 pl-6">
                    {record.id}
                  </TableCell>
                  <TableCell className="py-4">
                    <div className="font-bold text-gray-800 text-[12px]">{record.time.date}</div>
                    <div className="text-[11px] text-gray-500 my-0.5">{record.time.time}</div>
                    <div className="text-[11px] text-gray-400">{record.time.ago}</div>
                  </TableCell>
                  <TableCell className="py-4">
                    <div className="font-bold text-[#5A8DEE] text-[13px] hover:underline cursor-pointer">{record.user.email}</div>
                    <div className="text-[12px] text-gray-500 mt-1">ID: {record.user.id}</div>
                  </TableCell>
                  <TableCell className="py-4">
                    <Badge className={`${record.actionColor} text-white border-0 px-3 py-1 rounded-full font-bold text-[10px] tracking-wide uppercase flex items-center w-fit gap-1.5`}>
                      <record.icon className="w-3.5 h-3.5" />
                      {record.action}
                    </Badge>
                  </TableCell>
                  <TableCell className="py-4">
                    <Button variant="outline" className="border-cyan-400 text-cyan-500 hover:bg-cyan-50 h-8 px-3 rounded text-xs font-medium bg-transparent">
                      <Maximize className="w-3.5 h-3.5 mr-1.5" />
                      View Details
                    </Button>
                  </TableCell>
                  <TableCell className="py-4">
                    <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-200 border-0 px-2 py-1 rounded-[4px] font-bold text-[11px]">
                      {record.ip}
                    </Badge>
                  </TableCell>
                  <TableCell className="py-4 text-gray-400 font-medium">
                    {record.admin}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
      </Card>
    </div>
  )
}
